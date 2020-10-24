const express = require("express")
const router = express.Router()
// const gravatar = require("gravatar")
// const bcrypt = require("bcryptjs")
// load User Model
const User = require("../models/Users")
const confirmBuying = require("../models/confirmBuying")
const UploadImagesData = require("../models/UploadImagesData")
const fs = require("fs")

const cloudinary = require("cloudinary").v2
cloudinary.config({ 
    cloud_name: 'deaz1bojg', 
    api_key: '645723722777177', 
    api_secret: 'XRGgePHQU2pAdluBm1nDxjCQ3_c' 
});

router.use("/test",(req,res) => 
    res.json({
    msg : "user works"
})) 


// register user
router.post("/register",(req,res)=>{
 
    // console.log("req.body.email",req.body.email)
    User.findOne({email : req.body.email })
        .then(user => {
            if(user){
                // email = false
                res.send(false)
                console.log("signup failed user exists...")
            }else{
                // email = true
                res.send(true)

                let newUser = new User({
                    signupAs : req.body.signupAs,
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    phone : req.body.phone,
                    email : req.body.email,
                    password : req.body.password    
                })

                newUser.save()
                    .then(user => console.log("successfully signup data"))
                    .catch(err => console.log(err))                
            }
        })
})

// User Login
  
router.post("/login",(req,res) => {
    var data = ""
    console.log("working login req")
    email  = req.body.email
    password = req.body.password
 
    User.findOne({email : email},function(err,result){
        console.log("DB result",result)
        data = result
        
        
    })
        .then( user => {
            if(!user){
                console.log("email address not found")
                res.send(false)
            }
            if(password == user.password){
                console.log("data",data)
                res.json({
                    validity : true,
                    data : data
                })
                console.log("successful Signin")
            }
            else{
                res.send(false)
                console.log("password not found")
                return res.status(404).json({password : "password incorrect"})

            }
        })
        .catch(err => {console.log("error",err)})
})

// COnfirm Buying

router.use("/confirmBuying",(req,res) => {


    let newItem = new confirmBuying ({
        User : req.body.userEmail,
        BuyingList : req.body.buyingList ,
        TotalPrice : req.body.totalPrice
    })
    console.log("newItem",newItem)
    newItem.save()
    .then(res => console.log("successfully inserted"))
    .catch(err => console.log("error in insertion",err))
})

router.use("/updateItem",(req,res)=> {
    // res.send("working update")
    // console.log("working update")
    UploadImagesData.updateOne({name : req.body.name},{
        stock : req.body.stock,
        price : req.body.price
    })
    .then(response =>{
        if(response.n === 1){
            console.log("update success",response)
            res.send(true)
        }
        else{
            console.log("update failed",response)
            res.send(false)
        }
    }) 
    .catch(err => console.log("error in updation",err))
})

router.use("/deleteItem",(req,res) => {

    UploadImagesData.deleteOne({name : req.body.name})
    .then(response=>{
        if(response.n == 0){
            console.log("item no delete response",res.n)
            res.send(false)
        }else{
            res.send(true)
        }
        console.log("delete response",response.n)
    })

})

router.post("/upload",(req,res)=> {
    console.log("in req")
    // base64
    var newImgData;
    cloudinary.uploader.upload(req.body.imageURL,{ tags: 'basic_sample' }, function (err, result){
        console.log("result",result.public_id)
        console.log("err",err)
            newImgData = new UploadImagesData({
            imageID : result.public_id,
            name : req.body.name,
            price : req.body.price,
            stock : req.body.stock,
            category : req.body.category,
            adminEntry : req.body.adminEntry
        })
    })
    // UploadImagesData.
    .then(response=> {
        newImgData.save()
        .then(response=> {
            res.send(true)
            console.log("successfully send to mongoDB")
        } )
        .catch(err=> {
            res.send(false)
            console.log("err in sending",err)
    })
    })
    .catch(err => res.send(err))
    
    // section


    
  
})
router.get("/getImages",(req,res)=>{
    cloudinary.api.resources((error,result) => {
        const arr = []
        UploadImagesData.find().cursor().eachAsync(async (model) => {
            arr.push(model)
            // console.log('images', model);
         })
         .then(response=> {
            res.json({
                images : result.resources,
                imagesData : arr
            } )
         })
    })
})
router.get("/getImagesData",(req,res)=> {
    const arr = []
    UploadImagesData.find().cursor().eachAsync(async (model) => {
        console.log('images', model.nameOfItem);
     });
})


module.exports = router
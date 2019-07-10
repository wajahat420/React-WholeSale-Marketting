const express = require("express")
const router = express.Router()
var fs = require('fs');
// var mongoose = require('mongoose');
var A = require("../models/getImages")

// img path


    // console.log("a",a)

// router.get('/', function (req, res, next) {
//     const arr= []
//     A.find().cursor().eachAsync(async (model) => {  
//         // if (err) return next(err);
//     arr.push(model)
//     console.log("image retrieved successfully")
//     // res.contentType(model.imageType);
//     // res.send(model.image);   
//     // console.log('do work with model: ', model);
//     console.log("array",arr.length)
// }); 

//   });      
// });


// // sending img to DB

    
      // start a demo server

router.get('/save', function (req, res, next) {

    console.log("working get")

    var a = new A({
        image : fs.readFileSync(imgPath),
        imageType : 'image/png'
        });
    
        a.save( (err, a) => {
        if (err) throw err;
    
        console.error('saved img to mongo');
    
    // A.findById(a, function (err, doc) {
    //   if (err) return next(err);
    //   res.contentType(doc.imageType);
    //   res.send(doc.image);
    // });      
    });
});

module.exports = router
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
// const fs = require("fs")




const index = require("./Routes/index")

const app = express()
const mongoURI = "mongodb://localhost/E-dealers"

// app.use(methodOverride('_method'));
// app.use(bodyParser.urlencoded({extended : false}))
// app.use(bodyParser.json())

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));




mongoose.connect(mongoURI,{ useNewUrlParser: true })
.then( () => console.log("successfully connected to mongoDB") )
.catch( (err) => console.log("err",err) )


// app.post('/upload',upload.single("fileName"), (req, res) => {
//     // res.sendFile(path.join(__dirname + '/ShoppingCart-React/public/index.html'));
//     console.log("fileName",req.body.fileName)
//     // res.json({ file: req.file });
//     // res.redirect('/');
//   });


app.get("/", (req,res) =>{
    res.send("working server");

})  





app.use("/",index)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))
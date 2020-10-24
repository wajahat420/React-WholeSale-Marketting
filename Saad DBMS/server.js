const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
// const fs = require("fs")
const path  = require("path")
const cors = require('cors')


const index = require("./Routes/index")
const app = express()
const mongoURI = "mongodb+srv://wajahat:node123@first.uba9r.mongodb.net/sample?retryWrites=true&w=majority"


app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


mongoose.connect(mongoURI,{ useNewUrlParser: true })
.then( () => console.log("successfully connected to mongoDB") )
.catch( (err) => console.log("err",err) )


app.use(express.static(path.join(__dirname, 'client/build')));


const port = process.env.PORT || 5000
app.use("/",index)
app.get("/", (req,res) =>{
    res.send(`server running on portttttt ${port}`)
})  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port)
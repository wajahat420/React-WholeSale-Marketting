const mongoose = require("mongoose")
const Schema = mongoose.Schema

var ImageSchema = new Schema({
    imageID : {
      type : String,
      required : true
    },
    name : {
      type : String,
      required : true
    },
    price : {
      type : Number,
      require : true,
    },
    stock : {
      type : Number,
      required : true
    },
    category : {
      type : String,
      required : true
    },   
    adminEntry : {
      type : Boolean,
      required : true
    }
  });


var Image = mongoose.model('images', ImageSchema);

module.exports = Image;
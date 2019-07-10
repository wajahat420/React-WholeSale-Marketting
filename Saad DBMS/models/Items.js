const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({

    nameOfItem : {
        type : String,
        required : true
    },
    priceOfItem : {
        type : String,
        required : true
    }
})

module.exports = Item = mongoose.model("items",UserSchema)
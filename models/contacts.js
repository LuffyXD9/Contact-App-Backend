const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    nickName : String,
    DOB : {
        type : Date,
    },
    mobileNumbers : [Number],
    emails : {type : [String], lowercase : true}
})

module.exports = mongoose.model("contacts",contactSchema);

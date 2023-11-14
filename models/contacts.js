const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    // id : {type : Date, immutable : true, default : Date.now()},
    firstName : String,
    lastName : String,
    nickName : String,
    DOB : Date,
    mobileNumbers : [Number],
    emails : {type : [String], lowercase : true}
})


module.exports = mongoose.model("contacts",contactSchema);

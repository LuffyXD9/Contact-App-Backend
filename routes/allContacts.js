const express = require('express')
const router = express.Router()
const Contacts = require('../models/contacts.js')

//get all contact
router.get('/', async(req,res)=>{
    try{
        const contacts = await Contacts.find();
        res.json(contacts);
    }catch (err){
        res.status(500).json({message : err.message})
    }
    // res.send('Hello Eveyone');
})

//get one
router.get('/:id', getContact, (req,res)=>{
    // console.log(res.contact);
    res.send(res.contact);
})

//create one
router.post('/', async(req,res)=>{
    // console.log(req.body.id);
    const contact = new Contacts({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        nickName : req.body.nickName,
        DOB : req.body.DOB,
        mobileNumbers : req.body.mobileNumbers,
        emails : req.body.emails,
    })
    try {
        const newContact = await contact.save();
        res.status(200).json(newContact);
    }catch (err) {
        res.status(500).json({message : err.message})
    }
})
//update one
router.patch('/:id', getContact, async(req,res)=>{
    if(req.body){
        Object.assign(res.contact, req.body);
    }
    try{
        // console.log(res.contact);
        const updatedContact = await res.contact.save();
        res.json(updatedContact);
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

//delete one
router.delete('/:id', getContact, async(req,res)=>{
    try {
        await res.contact.deleteOne();
        res.status(200).json({message : "Contact Deleted"});
    } catch (err) {
        res.status(500).json({message  : err.message});
    }

})

async function getContact(req, res, next){
    let contact;
    try {
        contact = await Contacts.findById(req.params.id);
        if(!contact){
            return res.status(404).json({message : "No contact"})
        }
        res.contact = contact;
        next();
    } catch (err) {
        return res.status(500).json({message : err.message})
    }
    
}
module.exports = router
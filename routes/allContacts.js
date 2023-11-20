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
    res.send(req.contact);
})

//create one
router.post('/', validateContact ,async(req,res)=>{
    //add validations
    const contact = new Contacts({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        nickName : req.body.nickName,
        DOB : req.body.DOB,
        mobileNumbers : req.body.mobileNumbers,
        emails : req.body.emails,
    })

    // const contact = new Contacts(req.body);
    try {
        const newContact = await contact.save();
        res.status(200).json(newContact);
    }catch (err) {
        res.status(500).json({message : err.message})
    }
})
//update one
router.patch('/:id', getContact, validateContact, async(req,res)=>{
    if(req.body){
        Object.assign(req.contact, req.body);
        //add validations on backend while updating
    }
    try{
        // console.log(res.contact);
        const updatedContact = await req.contact.save();
        res.json(updatedContact);
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

//delete one
router.delete('/:id', getContact, async(req,res)=>{
    try {
        await req.contact.deleteOne();
        res.status(200).json({message : "Contact Deleted"});
    } catch (err) {
        res.status(500).json({message  : err.message});
    }
})

async function getContact(req, res, next){
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Missing contact id in the request" });
        }
        const contact = await Contacts.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "No contact" });
        }
        req.contact = contact;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

function validateContact(req, res, next) {
    const { firstName, lastName, nickName, mobileNumbers, emails } = req.body;

    if (!firstName || !lastName || !nickName || !mobileNumbers || !emails) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(mobileNumbers) || mobileNumbers.some(number => !(/^\d{10}$/.test(number)))) {
        return res.status(400).json({ message: "Invalid mobile number format" });
    }

    if (!Array.isArray(emails) || emails.some(email => !(/\S+@\S+\.\S+/.test(email)))) {
        return res.status(400).json({ message: "Invalid email address format" });
    }

    next();
}

module.exports = router

//use req instead of res in getContact
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const contacts = require('./models/contacts.js');

mongoose.connect("mongodb://localhost:27017/contactsDB")

const db = mongoose.connection

db.on('error',(error)=>console.log(error));
db.once('open',() => console.log("Connected to Database"));

app.use(express.json());

const contactsRouter = require('./routes/allContacts.js')
app.use('/allcontacts', contactsRouter);

app.listen(5000, ()=> console.log("Listing on port 5000"));

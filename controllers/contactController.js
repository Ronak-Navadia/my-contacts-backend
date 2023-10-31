const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contact
//@access public

const getContacts = asyncHandler(async(req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts)
})

//@desc create contact
//@route POST /api/contact
//@access public

const createContact = asyncHandler(async(req, res) => {
  const {name, email, phone} = req.body;
  if(!name || !email || !phone){
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const contact = await Contact.create({
    name, email, phone
  })
  res.status(200).json({contact})
});

//@desc get contact
//@route GET /api/contact/:id
//@access public

const getContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error('Contact not found')
  }
  res.status(200).json(contact)
})

//@desc update contact
//@route PUT /api/contact/:id
//@access public

const updateContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error('Contact not found')
  }
  // console.log('here');
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  contact.save();

  const updatedContact = await Contact.findByIdAndUpdate(
    {_id: req.params.id},
    {$set: req.body}, 
    {new: true}
  )
  res.status(200).json(updatedContact)
})


//@desc del contact
//@route DELETE /api/contact/:id
//@access public

const delContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error('Contact not found')
  }

  await Contact.remove();
  res.status(200).json(contact)
})

module.exports = {getContacts, getContact, createContact, updateContact, delContact}
const Contact = require('../model/contact');

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
const getContactsById = async (req, res) => {
  const contactId = req.params.contactId;

  Contact.findById(contactId)
    .then(contact => {
      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json({ contact: contact });
    })
    .catch(err => res.status(404).json({ err: err }));
};

const addNewContact = async (req, res) => {
  const dataContact = req.body;

  try {
    if (dataContact) {
      const newContact = new Contact(dataContact);
      console.log(`new contact:`, newContact);
      const result = await newContact.save();
      res.status(201).json({ user: result });
    } else {
      res.status(400).json({ message: 'missing required name field' });
    }
  } catch (err) {
    console.log(err);
  }
};

const removeContact = (req, res) => {
  const contactId = req.params.contactId;

  Contact.findOneAndDelete({ _id: contactId })
    .then(contact => {
      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json({ contact: contact, message: 'contact deleted' });
    })
    .catch(err => res.status(404).json({ err: err }));
};

const patchContacts = (req, res) => {
  const contactId = req.params.contactId;
  const changes = req.body;
  if (!changes) {
    res.status(400).json({ message: 'missing fields' });
  } else {
    Contact.findOneAndUpdate(
      { _id: contactId },
      { $set: changes },
      { new: true },
    )
      .then(contact => {
        if (!contact) {
          return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({ contact: contact });
      })
      .catch(err => res.status(404).json({ err: err }));
  }
};

module.exports = {
  getContacts,
  getContactsById,
  addNewContact,
  removeContact,
  patchContacts,
};

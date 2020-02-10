const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 5000;
const dbConnection = require('./db/dbConnection');

dbConnection();
const Contact = require('./model/contact');
app.use(logger('dev'));
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  console.log('req.url :', req.url);

  next();
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

app.get('/api/contacts/:contactId', (req, res) => {
  const contactId = req.params.contactId;

  Contact.findById(contactId)
    .then(contact => {
      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json({ contact: contact });
    })
    .catch(err => res.status(404).json({ err: err }));
});

app.post('/api/contacts', async (req, res) => {
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
});

app.delete('/api/contacts/:contactId', (req, res) => {
  const contactId = req.params.contactId;

  Contact.findOneAndDelete({ _id: contactId })
    .then(contact => {
      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json({ contact: contact, message: 'contact deleted' });
    })
    .catch(err => res.status(404).json({ err: err }));
});

app.patch('/api/contacts/:contactId', (req, res) => {
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
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on ${port}`);
});

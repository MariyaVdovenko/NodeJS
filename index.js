const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 5000;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('./contacts');

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
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/contacts/:contactId', async (req, res) => {
  const contactId = req.params.contactId;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(200).json(contact);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    if (name && email && phone) {
      const result = await addContact(name, email, phone);
      res.status(201).json(result);
    } else {
      res.status(400).json({ message: 'missing required name field' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete('/api/contacts/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const contact = await removeContact(contactId);

    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.status(200).json({ message: 'contact deleted' });
    }
  } catch (err) {
    console.log(err);
  }
});

app.patch('/api/contacts/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const changes = req.body;

  try {
    if (!changes) {
      res.status(400).json({ message: 'missing fields' });
    } else {
      const updatingContacts = await updateContact(contactId, changes);
      if (!updatingContacts) {
        res.status(404).json({ message: 'Not found' });
      } else {
        res.status(200).json(updatingContacts);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on ${port}`);
});

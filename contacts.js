'use strict';
const path = require('path');
const fs = require('fs');
const promisify = require('./promisify');
const readFileAsync = promisify(fs.readFile);
const shortid = require('shortid');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const listContacts = await readFileAsync(contactsPath, 'utf8');
    return JSON.parse(listContacts);
  } catch (err) {
    console.log('ERROR:', err);
  }
}

async function getContactById(contactId) {
  try {
    const listContacts = await readFileAsync(contactsPath, 'utf8');
    const contacts = JSON.parse(listContacts);

    const contactById = contacts.find(
      contact => String(contact.id) === contactId, //string чтоб не менять те ID которые уже есть
    );
    return contactById;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const listContacts = await readFileAsync(contactsPath, 'utf8');
    const contacts = JSON.parse(listContacts);

    const newContacts = contacts.filter(contact => contact.id !== contactId);
    if (contacts.length !== newContacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(newContacts), err => {
        console.log(`Done!`);
      });
      return contacts;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  const contact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  try {
    const listContacts = await readFileAsync(contactsPath, 'utf8');
    const contacts = JSON.parse(listContacts);
    const newContacts = [...contacts, contact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), err => {
      console.log(`Add new contact -  ${name}!`);
    });
    return contact;
  } catch (err) {
    console.log(err);
  }
}

async function updateContact(contactId, changes) {
  try {
    const listContacts = await readFileAsync(contactsPath, 'utf8');
    const contacts = JSON.parse(listContacts);

    const contactById = contacts.find(
      contact => String(contact.id) === contactId,
    );

    if (!contactById) {
      return undefined;
    }
    Object.assign(contactById, changes);
    fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
      console.log(`Done!`);
    });
    return contactById;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

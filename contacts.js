'use strict';
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументировать каждую функцию

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    const contacts = JSON.parse(data);

    const contactById = contacts.find(contact => contact.id === contactId);
    console.log(contactById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    const contacts = JSON.parse(data);

    const newContacts = contacts.filter(contact => contact.id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newContacts), err => {
      console.log(`Done!`);
    });
  });
}

function addContact(name, email, phone) {
  const contact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    const contacts = JSON.parse(data);
    const newContacts = [...contacts, contact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), err => {
      console.log(`Add new contact -  ${name}!`);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

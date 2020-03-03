const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactsById,
  addNewContact,
  removeContact,
  patchContacts,
} = require('../contacts/controllers');

router.get('/', getContacts);
router.get('/:contactId', getContactsById);
router.post('/', addNewContact);
router.delete('/:contactId', removeContact);
router.patch('/:contactId', patchContacts);

module.exports = router;

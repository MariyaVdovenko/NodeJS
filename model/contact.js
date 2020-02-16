const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  { timestamps: true },
);

const Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;

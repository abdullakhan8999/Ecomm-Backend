// Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   message: {
      type: String,
      required: true,
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Contact', contactSchema);
// Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   email: {
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

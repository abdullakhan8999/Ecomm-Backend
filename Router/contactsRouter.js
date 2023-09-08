const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/auth");
const { createContact, getAllContacts, getContactDetails, deleteContact } = require("../Controller/contactsController");

// Create a new contact
router.route('/create/contacts').post(isAuthenticatedUser, createContact);

// Get all contacts
router.route('/getAll/contacts').get(isAuthenticatedUser, authorizedRoles("admin"), getAllContacts);
router.route('/delete/contact/:id').delete(isAuthenticatedUser, authorizedRoles("admin"), deleteContact);
router.route('/get/contact/:id').delete(isAuthenticatedUser, authorizedRoles("admin"), getContactDetails);

module.exports = router;
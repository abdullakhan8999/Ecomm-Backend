const ContactModel = require("../Models/ContactModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middleware/catchAsyncError");
// Create a new contact
exports.createContact = catchAsyncError(async (req, res) => {
   try {
      const { name, email, message } = req.body;

      if (!name, !email, !message) {
         return next(new ErrorHandler("Please fill all the fields", 404));
      };

      const newContact = new ContactModel({
         userId: req.user._id,
         name,
         email,
         message,
      });
      const savedContact = await newContact.save();
      res.status(201).json({ status: "success", savedContact });
   } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ error: 'Error creating contact' });
   }
});

// Get all contacts
exports.getAllContacts = catchAsyncError(async (req, res) => {
   try {
      const contacts = await ContactModel.find().sort({ created_at: -1 });
      res.status(201).json({ status: "success", contacts });
   } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Error fetching contacts' });
   }
})

// DELETE a contact
exports.deleteContact = catchAsyncError(async (req, res) => {
   try {
      const id = req.params.id;
      if (!id) {
         return next(new ErrorHandler("Please provide an id", 404));
      }
      const contact = await ContactModel.findById(id);
      if (!contact) {
         return next(new ErrorHandler("Contact not found", 404));
      }
      await ContactModel.findByIdAndDelete(id);

      res.status(201).json({ status: "success deleted", });
   } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Error fetching contacts' });
   }
})

// get details of a contact

exports.getContactDetails = catchAsyncError(async (req, res) => {
   try {
      const id = req.params.id;
      if (!id) {
         return next(new ErrorHandler("Please provide an id", 404));
      }
      const contact = await ContactModel.findById(id);
      if (!contact) {
         return next(new ErrorHandler("Contact not found", 404));
      }
      res.status(201).json({ status: "success", contact });
   } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Error fetching contacts' });
   }
})
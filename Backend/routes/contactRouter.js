const express = require('express');
const router = express.Router();
const Contact = require('../models/contact-model'); // Assuming you have a Contact model

// POST request to submit contact form data
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new Contact document
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save to the database
    await newContact.save();

    // Respond with success message
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

module.exports = router;

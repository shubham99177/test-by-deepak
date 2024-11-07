const Contact = require('../models/contact-model'); 

module.exports.Contact = async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const newContact = new Contact({
        name,
        email,
        message,
      });
  
      await newContact.save();
      res.status(201).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
      console.error('Error saving contact form:', error);
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  }
const express = require('express');
const router = express.Router();
const Event = require('./models/Event.js');
const Registration = require('./models/Registration.js');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register for an event
router.post('/register', async (req, res) => {
  try {
    const { name, email, eventId } = req.body;
    const registration = new Registration({ name, email, eventId });
    await registration.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get registrations for a user (by email)
router.get('/registrations/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const registrations = await Registration.find({ email });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

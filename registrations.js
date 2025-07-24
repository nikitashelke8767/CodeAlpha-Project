const express = require('express');
const router = express.Router();
const Registration = require('./models/Registration');

// Register user to event
router.post('/', async (req, res) => {
    const { name, email, eventId } = req.body;
    const reg = new Registration({ name, email, eventId });
    await reg.save();
    res.json({ message: 'Registered successfully', registration: reg });
});

// View registrations
router.get('/', async (req, res) => {
    const regs = await Registration.find().populate('eventId');
    res.json(regs);
});

// Cancel registration
router.delete('/:id', async (req, res) => {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Registration cancelled' });
});

module.exports = router;

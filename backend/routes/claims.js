const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Assuming Claim is a Mongoose model defined in backend/models/claim.js
const Claim = require('../models/claim');

// Threshold for manager approval
const APPROVAL_THRESHOLD = 700;

// Route to submit a new claim
router.post('/submit', async (req, res) => {
  try {
    const { description, amount, bills } = req.body;
    const newClaim = new Claim({
      description,
      amount,
      bills,
      status: amount > APPROVAL_THRESHOLD ? 'Pending Manager Approval' : 'Submitted'
    });
    const savedClaim = await newClaim.save();
    res.status(201).json(savedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error submitting claim' });
  }
});

// Route to get all claims
router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving claims' });
  }
});

// Route to get a specific claim by ID
router.get('/:id', async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving claim' });
  }
});

// Route to update a claim (e.g., for manager approval)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error updating claim' });
  }
});

module.exports = router;

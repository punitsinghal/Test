const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Assuming Claim is a Mongoose model defined in backend/models/claim.js
const Claim = require('../models/claim');

// Route to approve a claim
router.put('/approve/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error approving claim' });
  }
});

// Route to reject a claim
router.put('/reject/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error rejecting claim' });
  }
});

// Route to request corrections on a claim
router.put('/correction/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, { status: 'Needs Correction' }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error requesting correction on claim' });
  }
});

module.exports = router;

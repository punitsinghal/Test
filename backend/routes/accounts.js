const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Assuming Claim is a Mongoose model defined in backend/models/claim.js
const Claim = require('../models/claim');

// Route to finalize approval of a claim
router.put('/final-approve/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, { status: 'Final Approved' }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error finalizing approval of claim' });
  }
});

// Route to process payment for a claim
router.put('/process-payment/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, { paymentProcessed: true }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment for claim' });
  }
});

// Route to export payment data and claim history
router.get('/export', async (req, res) => {
  try {
    const claims = await Claim.find();
    const dataToExport = claims.map(({ _id, description, status, paymentProcessed }) => ({
      id: _id,
      description,
      status,
      paymentProcessed
    }));
    res.setHeader('Content-Disposition', 'attachment; filename=claims_payment_data.json');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(dataToExport, null, 2));
  } catch (error) {
    res.status(500).json({ error: 'Error exporting payment data and claim history' });
  }
});

module.exports = router;

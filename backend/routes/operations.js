const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Assuming Claim is a Mongoose model defined in backend/models/claim.js
const Claim = require('../models/claim');

// Route to verify a claim
router.put('/verify/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    if (!updatedClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(updatedClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error verifying claim' });
  }
});

// Route to filter claims based on query parameters
router.get('/filter', async (req, res) => {
  try {
    const { status, verified } = req.query;
    const filterCriteria = {};
    if (status) filterCriteria.status = status;
    if (verified) filterCriteria.verified = verified === 'true';

    const claims = await Claim.find(filterCriteria);
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ error: 'Error filtering claims' });
  }
});

// Route to export claim data
router.get('/export', async (req, res) => {
  try {
    const claims = await Claim.find();
    const dataToExport = claims.map(({ _id, description, status, verified }) => ({
      id: _id,
      description,
      status,
      verified
    }));
    res.setHeader('Content-Disposition', 'attachment; filename=claims_data.json');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(dataToExport, null, 2));
  } catch (error) {
    res.status(500).json({ error: 'Error exporting claim data' });
  }
});

module.exports = router;

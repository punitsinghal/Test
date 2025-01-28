const mongoose = require('mongoose');

// Define the Claim schema
const claimSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  bills: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['Submitted', 'Pending Manager Approval', 'Approved', 'Rejected', 'Needs Correction', 'Final Approved'],
    default: 'Submitted'
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'
  },
  verified: {
    type: Boolean,
    default: false
  },
  paymentProcessed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create the Claim model
const Claim = mongoose.model('Claim', claimSchema);

// Export the model
module.exports = Claim;

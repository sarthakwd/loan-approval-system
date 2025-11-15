const mongoose = require('mongoose');

const loanOfficerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  branch: { type: String }
});

module.exports = mongoose.model('LoanOfficer', loanOfficerSchema);

const mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String, required: true },
  companySize: { type: String },
  website: { type: String },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
    linkedin: { type: String }
  },
  companyLogo: { type: String }, // Field to store the company logo path
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CompanyProfile', CompanyProfileSchema);
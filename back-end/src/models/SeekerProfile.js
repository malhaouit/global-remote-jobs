const mongoose = require('mongoose');

const SeekerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String, required: true },
  skills: [{ type: String, required: true }],
  experience: { type: String, required: true },
  education: { type: String, required: true },
  contactInfo: {
    email: { 
      type: String, 
      required: true, 
      match: [/.+\@.+\..+/, 'Please fill a valid email address.']  // Email validation regex
    },
    phone: { 
      type: String, 
      match: [/^\+?[1-9]\d{1,14}$/, 'Please fill a valid phone number.']  // Example phone validation
    },
    linkedin: { type: String }
  },
  profileImage: { type: String },
}, { timestamps: true });  // Automatically add createdAt and updatedAt

module.exports = mongoose.model('SeekerProfile', SeekerProfileSchema);
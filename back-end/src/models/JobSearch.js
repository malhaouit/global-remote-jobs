const mongoose = require('mongoose');

const JobSearchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobTitle: { type: String, required: true },
  jobCategory: { type: String, required: true },
  jobType: { type: String, required: true },  // e.g., Full-time, Part-time, Remote
  location: { type: String, required: true },
  skills: [{ type: String, required: true }],  // List of skills
  otherSkills: { type: String },               // For additional or custom skills
  createdAt: { type: Date, default: Date.now }, // Timestamp when the criteria was created
});

module.exports = mongoose.model('JobSearch', JobSearchSchema);
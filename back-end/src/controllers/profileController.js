const multer = require('multer');
const path = require('path');
const SeekerProfile = require('../models/SeekerProfile');
const CompanyProfile = require('../models/CompanyProfile');
const User = require('../models/User');

const createSeekerProfile = async (req, res) => {
  try {
    const { bio, skills, experience, education, contactInfo } = req.body;
    const profileImage = req.file ? req.file.path : null;

    // Check if the user already has a profile
    const existingProfile = await SeekerProfile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    // Create a new profile
    const newProfile = new SeekerProfile({
      user: req.user.id,
      bio,
      skills: skills.split(','), // Assuming skills come as a comma-separated string
      experience,
      education,
      contactInfo,
      profileImage,
    });

    await newProfile.save();
    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const createCompanyProfile = async (req, res) => {
  try {
    const { companyName, description, industry, companySize, website, contactInfo } = req.body;
    const companyLogo = req.file ? req.file.path : null;

    // Check if the user already has a profile
    const existingProfile = await CompanyProfile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    // Create a new company profile
    const newProfile = new CompanyProfile({
      user: req.user.id,
      companyName,
      description,
      industry,
      companySize,
      website,
      contactInfo,
      companyLogo,
    });

    await newProfile.save();
    res.status(201).json({ message: 'Company profile created successfully', profile: newProfile });
  } catch (error) {
    console.error('Error creating company profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Profile for Logged In User
const getProfileByRole = async (req, res) => {
  try {
    const role = req.params.role;
    let profile;

    if (role === 'job_seeker') {
      profile = await SeekerProfile.findOne({ user: req.user.id }).populate('user', 'firstName');
    } else if (role === 'company') {
      profile = await CompanyProfile.findOne({ user: req.user.id }).populate('user', 'firstName');
    }

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

const getProfile = async (req, res) => {
  try {
    const role = req.user.role;
    let profile;

    if (role === 'job_seeker') {
      profile = await SeekerProfile.findOne({ user: req.user.id }).populate('user', 'firstName lastName email');
    } else if (role === 'company') {
      profile = await CompanyProfile.findOne({ user: req.user.id });
    }

    if (!profile) {
      // Fetch the user's basic info if no profile is found
      const user = await User.findById(req.user.id, 'firstName lastName email');
      return res.status(200).json({
        message: 'Profile not found',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Modify Seeker Profile
const modifySeekerProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await SeekerProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Seeker profile not found' });
    }

    // Update fields
    profile.bio = req.body.bio || profile.bio;
    profile.skills = req.body.skills ? req.body.skills.split(',') : profile.skills;
    profile.experience = req.body.experience || profile.experience;
    profile.education = req.body.education || profile.education;
    profile.contactInfo.email = req.body['contactInfo[email]'] || profile.contactInfo.email;
    profile.contactInfo.phone = req.body['contactInfo[phone]'] || profile.contactInfo.phone;
    profile.contactInfo.linkedin = req.body['contactInfo[linkedin]'] || profile.contactInfo.linkedin;

    // Update profile image if provided
    if (req.file) {
      profile.profileImage = req.file.path;
    }

    await profile.save();
    res.status(200).json({ message: 'Seeker profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating seeker profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Modify Company Profile
const modifyCompanyProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await CompanyProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    // Update fields
    profile.companyName = req.body.companyName || profile.companyName;
    profile.description = req.body.description || profile.description;
    profile.industry = req.body.industry || profile.industry;
    profile.companySize = req.body.companySize || profile.companySize;
    profile.website = req.body.website || profile.website;
    profile.contactInfo.email = req.body['contactInfo[email]'] || profile.contactInfo.email;
    profile.contactInfo.phone = req.body['contactInfo[phone]'] || profile.contactInfo.phone;
    profile.contactInfo.linkedin = req.body['contactInfo[linkedin]'] || profile.contactInfo.linkedin;

    // Update company logo if provided
    if (req.file) {
      profile.companyLogo = req.file.path;
    }

    await profile.save();
    res.status(200).json({ message: 'Company profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating company profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteProfile = async (req, res) => {
  // Logic for deleting profile goes here
};

module.exports = { 
  createSeekerProfile, 
  createCompanyProfile, 
  getProfileByRole, 
  getProfile,
  modifySeekerProfile,
  modifyCompanyProfile,
  deleteProfile,
};
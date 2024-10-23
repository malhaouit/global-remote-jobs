const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const { createSeekerProfile, createCompanyProfile, getProfileByRole, getProfile, modifySeekerProfile, modifyCompanyProfile, deleteProfileDetails } = require('../controllers/profileController');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

// Multer file filter to accept only image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isAllowedMimeType = allowedTypes.test(file.mimetype);
  const isAllowedExtName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isAllowedMimeType && isAllowedExtName) {
    return cb(null, true); // Accept file
  } else {
    cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!')); // Reject file
  }
};

// Initialize multer with the storage and file filter
const upload = multer({ storage, fileFilter });

// Route for creating a job seeker profile with an image
router.post('/seeker', protect, upload.single('profileImage'), createSeekerProfile);

// Route for creating a company profile with a logo
router.post('/company', protect, upload.single('companyLogo'), createCompanyProfile);

// **New Routes**: Modify profile for job seeker and company
// Route for modifying job seeker profile
router.put('/seeker', protect, upload.single('profileImage'), modifySeekerProfile);

// Route for modifying company profile
router.put('/company', protect, upload.single('companyLogo'), modifyCompanyProfile);

// Fetch, update, or delete the authenticated user's profile
router.route('/')
  .get(protect, getProfile);

// Route to deleted the seeker profile
router.delete('/delete-profile', protect, deleteProfileDetails);

// Get profile by role
router.get('/:role', protect, getProfileByRole);

module.exports = router;
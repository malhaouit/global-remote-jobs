const express = require('express');
const { signUpSeeker, signUpCompany, login, confirmEmail } = require('../controllers/authController');

const router = express.Router();

// Sign Up routes
router.post('/signup/seeker', signUpSeeker);
router.post('/signup/company', signUpCompany);

// Login Route
router.post('/login', login);

// Email confirmation route
router.get('/confirm/:token', confirmEmail);

module.exports = router;
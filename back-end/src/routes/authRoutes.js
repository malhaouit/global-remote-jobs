const express = require('express');
const { signUpSeeker, signUpCompany } = require('../controllers/authController');

const router = express.Router();

router.post('/signup/seeker', signUpSeeker);
router.post('/signup/company', signUpCompany);

module.exports = router;
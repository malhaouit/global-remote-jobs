const express = require('express');
const { contactForm } = require('../controllers/contactController');

const router = express.Router();

// Contact route
router.post('/', contactForm);

module.exports = router;
const express = require('express');
const { getJobs, getFilteredJobs } = require('../controllers/jobController');  // Import both controllers

const router = express.Router();

// All jobs
router.get('/', getJobs);

// New route for filtered jobs
router.get('/filtered', getFilteredJobs);

module.exports = router;
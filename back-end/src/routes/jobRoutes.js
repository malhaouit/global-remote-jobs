const express = require('express');
const { getJobs, getFilteredJobs, getJobDetails, getPaginatedJobs } = require('../controllers/jobController');  // Import both controllers

const router = express.Router();

// All jobs
router.get('/', getJobs);

// New route for filtered jobs
router.get('/filtered', getFilteredJobs);

// New route for pagination
router.get('/paginated', getPaginatedJobs);

// New route to fech job details by ID or slug
router.get('/:id', getJobDetails);


module.exports = router;
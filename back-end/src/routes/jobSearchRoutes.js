const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { saveJobSearchCriteria, getSavedJobSearchCriteria, findJobs } = require('../controllers/jobSearchController');

const router = express.Router();

router.post('/save-search', protect, saveJobSearchCriteria); // Save search criteria
router.get('/get-search', protect, getSavedJobSearchCriteria);
router.post('/find-jobs', protect, findJobs);

module.exports = router;

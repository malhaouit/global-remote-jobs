const JobSearch = require('../models/JobSearch'); 
const axios = require('axios');
require('dotenv').config();

const saveJobSearchCriteria = async (req, res) => {
  const { jobTitle, jobCategory, jobType, location, skills, otherSkills } = req.body;
  const userId = req.user.id;

  try {
    // Store job search criteria in the database
    const existingCriteria = await JobSearch.findOne({ user: userId });
    if (existingCriteria) {
      // Update existing criteria
      existingCriteria.jobTitle = jobTitle;
      existingCriteria.jobCategory = jobCategory;
      existingCriteria.jobType = jobType;
      existingCriteria.location = location;
      existingCriteria.skills = skills;
      existingCriteria.otherSkills = otherSkills;
      await existingCriteria.save();
    } else {
      // Create new criteria
      const newCriteria = new JobSearch({
        user: userId,
        jobTitle,
        jobCategory,
        jobType,
        location,
        skills,
        otherSkills,
      });
      await newCriteria.save();
    }    
    res.status(200).json({ message: 'Job search criteria saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save job search criteria', error });
  }
};

const getSavedJobSearchCriteria = async (req, res) => {
  const userId = req.user.id;

  try {
    const criteria = await JobSearch.findOne({ user: userId });
    if (!criteria) {
      return res.status(404).json({ message: 'No job search criteria found' });
    }

    res.status(200).json(criteria);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve job search criteria', error });
  }
};

// Controller to fetch and filter jobs
const findJobs = async (req, res) => {
  const { jobTitle, jobCategory, jobType, location, skills } = req.body;

  try {
    // Log the query parameters you're sending to the Remotive API
    console.log("Searching for jobs with the following criteria:", {
      jobTitle, jobCategory, jobType, location, skills
    });

    // Make the API request to Remotive (this example doesn't use specific filters)
    const response = await axios.get('https://remotive.com/api/remote-jobs', {
      params: {
        search: jobTitle, // Search by job title
        category: jobCategory, // Category
        job_type: jobType, // Job type
        location, // Location
        skills // Skills (optional)
      }
    });

    console.log("Response from Remotive API:", response.data);

    if (response.data && response.data.jobs) {
      // Send back the jobs to the front-end
      return res.json({ jobs: response.data.jobs });
    } else {
      return res.status(404).json({ message: 'No jobs found' });
    }
  } catch (error) {
    // Log the exact error that occurs
    console.error('Error fetching jobs from Remotive API:', error.message, error.response?.data);
    return res.status(500).json({ message: 'Failed to fetch jobs', error });
  }
};

module.exports = { saveJobSearchCriteria, getSavedJobSearchCriteria, findJobs };
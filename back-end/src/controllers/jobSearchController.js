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
  // const { jobTitle, jobCategory, jobType, location, skills } = req.body;

  // try {
  //   console.log("Searching for jobs with the following criteria:", {
  //     jobTitle, jobCategory, jobType, location, skills
  //   });

  //   // Make the API request to Remotive (without relying on specific filters from API)
  //   const response = await axios.get('https://remotive.com/api/remote-jobs');

  //   if (response.data && response.data.jobs) {
  //     // Split skills string by commas into an array, and trim whitespace
  //     const skillsArray = skills ? skills.split(',').map(skill => skill.trim().toLowerCase()) : [];

  //     // Perform manual filtering on the job results
  //     const filteredJobs = response.data.jobs.filter(job => {
  //       // Check each filter condition
  //       const matchesTitle = jobTitle ? job.title.toLowerCase().includes(jobTitle.toLowerCase()) : true;
  //       const matchesCategory = jobCategory ? job.category.toLowerCase() === jobCategory.toLowerCase() : true;
  //       const matchesType = jobType ? job.job_type.toLowerCase() === jobType.toLowerCase() : true;
  //       const matchesLocation = location ? job.candidate_required_location.toLowerCase().includes(location.toLowerCase()) : true;
  //       const matchesSkills = skillsArray.length > 0 ? skillsArray.every(skill => job.tags.map(tag => tag.toLowerCase()).includes(skill)) : true;

  //       return matchesTitle && matchesCategory && matchesType && matchesLocation && matchesSkills;
  //     });

  //     // Map the filtered jobs to match the front-end expected format
  //     const mappedJobs = filteredJobs.map(job => ({
  //       id: job.id,
  //       title: job.title,
  //       company_name: job.company_name,
  //       company_logo: job.company_logo_url || '', // Using the correct field or fallback
  //       candidate_required_location: job.candidate_required_location,
  //       job_type: job.job_type,
  //       salary: job.salary || 'Not specified', // Ensure there's always a value
  //       publication_date: job.publication_date
  //     }));

  //     // Send back the mapped jobs to the front-end
  //     return res.json({ jobs: mappedJobs });
  //   } else {
  //     return res.status(404).json({ message: 'No jobs found' });
  //   }
  // } catch (error) {
  //   console.error('Error fetching jobs from Remotive API:', error.message, error.response?.data);
  //   return res.status(500).json({ message: 'Failed to fetch jobs', error });
  // }
};

module.exports = { saveJobSearchCriteria, getSavedJobSearchCriteria, findJobs };
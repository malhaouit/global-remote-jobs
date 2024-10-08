const axios = require('axios');

// Test: curl http://localhost:5000/api/jobs
const getJobs = async (req, res) => {
  try {
    const response = await axios.get('https://remotive.com/api/remote-jobs');
    const jobs = response.data;
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

const getFilteredJobs = async (req, res) => {
  try {
    const response = await axios.get('https://remotive.com/api/remote-jobs');
    const jobs = response.data.jobs;

    // Filter jobs to only return the necessary fields
    const filteredJobs = jobs
    .filter(job => job.title && job.company_name)
    .map(job => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      logo: job.company_logo,
      location: job.candidate_required_location,
      salary: job.salary || 'Not specified',
      job_type: job.job_type,
      publication_date: job.publication_date,
    }));

    res.json(filteredJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered jobs' });
  }
};

const getJobDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get('https://remotive.com/api/remote-jobs');
    const job = response.data.jobs.find((job) => job.id === parseInt(id));

    if (job) {
      res.json({
        title: job.title,
        company: job.company_name,
        logo: job.company_logo,
        description: job.description,
        skills: job.tags,
        location: job.candidate_required_location,
        salary: job.salary || 'Not specified',
        job_type: job.job_type,
        category: job.category,
        apply_url: job.url,
        publication_date: job.publication_date,
      });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details' });
  }
};

const getPaginatedJobs = async (req, res) => {
  const { page = 1, limit = 10, job_type, location, category, custom_category } = req.query;
  const startIndex = (page - 1) * limit;

  try {
    const response = await axios.get('https://remotive.com/api/remote-jobs');
    let jobs = response.data.jobs;

    // Filter jobs by job_type
    if (job_type) {
      jobs = jobs.filter(job => job.job_type === job_type);
    }

    // Filter jobs by location
    if (location) {
      jobs = jobs.filter(job => job.candidate_required_location.toLowerCase() === location.toLowerCase());
    }

    // Filter jobs by category (either from dropdown or custom input)
    if (custom_category) {
      jobs = jobs.filter(job => job.category.toLowerCase().includes(custom_category.toLowerCase()));
    } else if (category) {
      jobs = jobs.filter(job => job.category === category);
    }

    // Apply pagination to the filtered jobs
    const paginatedJobs = jobs.slice(startIndex, startIndex + parseInt(limit));

    res.json({
      totalJobs: jobs.length,        // Total jobs after filtering
      currentPage: page,
      totalPages: Math.ceil(jobs.length / limit), // Total pages after filtering
      jobs: paginatedJobs,           // Paginated jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

module.exports = { getJobs, getFilteredJobs, getJobDetails, getPaginatedJobs };
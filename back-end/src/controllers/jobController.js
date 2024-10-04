const axios = require('axios');

const getJobs = async (req, res) => {
  try {
    const response = await axios.get('https://remoteok.com/api');
    const jobs = response.data;
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

const getFilteredJobs = async (req, res) => {
  try {
    const response = await axios.get('https://remoteok.com/api');
    const jobs = response.data;

    // Filter jobs to only return the necessary fields
    const filteredJobs = jobs
    .filter(job => job.position && job.company)
    .map(job => ({
      title: job.position,
      company: job.company,
      logo: job.company_logo,
      location: job.location,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      posted_date: job.date,
    }));

    res.json(filteredJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered jobs' });
  }
};

module.exports = { getJobs, getFilteredJobs };
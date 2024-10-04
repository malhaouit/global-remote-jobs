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

module.exports = { getJobs };
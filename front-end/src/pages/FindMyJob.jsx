import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import './FindMyJob.css';

const FindMyJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [showOtherCategoryInput, setShowOtherCategoryInput] = useState(false);
  const [jobResults, setJobResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.error('No token found. User may not be authenticated.');
      return;
    }

    const fetchSavedCriteria = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/job-search/get-search`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setJobTitle(data.jobTitle || '');
          setJobCategory(data.jobCategory || '');
          setJobType(data.jobType || '');
          setLocation(data.location || '');

          // Fetch jobs based on the saved criteria
          fetchJobs({
            jobTitle: data.jobTitle || '',
            jobCategory: data.jobCategory || '',
            jobType: data.jobType || '',
            location: data.location || '',
          });
        } else {
          console.log('No saved search criteria found.');
        }
      } catch (error) {
        console.error('Error fetching saved criteria:', error);
      }
    };

    fetchSavedCriteria();
  }, [token]);

  // Fetch jobs and filter them based on criteria
  const fetchJobs = async (criteria) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://remotive.com/api/remote-jobs');
      if (response.ok) {
        const data = await response.json();
        const filteredJobs = filterJobs(data.jobs, criteria);
        setJobResults(filteredJobs);
      } else {
        setError('Failed to fetch jobs from Remotive API.');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter jobs based on the search criteria
  const filterJobs = (jobs, criteria) => {
    return jobs.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(criteria.jobTitle.toLowerCase());
      const categoryMatch = criteria.jobCategory === 'other' ? true : job.category === criteria.jobCategory;
      const typeMatch = !criteria.jobType || job.job_type.toLowerCase() === criteria.jobType.toLowerCase();
      const locationMatch = !criteria.location || job.candidate_required_location.toLowerCase().includes(criteria.location.toLowerCase());

      return titleMatch && categoryMatch && typeMatch && locationMatch;
    });
  };

  // Save search criteria and fetch jobs
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      jobTitle,
      jobCategory: showOtherCategoryInput ? otherCategory : jobCategory,
      jobType,
      location,
    };

    try {
      const saveSearchResponse = await fetch(`${import.meta.env.VITE_API_URL}/job-search/save-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!saveSearchResponse.ok) {
        throw new Error(`Failed to save search criteria: ${saveSearchResponse.statusText}`);
      }

      // Fetch jobs after saving criteria
      fetchJobs(formData);
      setIsEditing(false); // Close editing mode after saving
    } catch (error) {
      console.error('Error saving or fetching jobs:', error);
      setError('Failed to fetch jobs');
    }
  };

  return (
    <div className="find-my-job-page">
      <h1>My Criteria</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            placeholder="Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            placeholder="Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Job Category:</label>
          <select value={jobCategory} onChange={(e) => setJobCategory(e.target.value)} disabled={!isEditing}>
            <option value="">Select a category</option>
            <option value="Software Development">Software Development</option>
            <option value="Finance / Legal">Finance / Legal</option>
            <option value="Product">Product</option>
            <option value="Marketing">Marketing</option>
            <option value="DevOps / Sysadmin">DevOps / Sysadmin</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Project Management">Project Management</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Design">Design</option>
            <option value="Customer Service">Customer Service</option>
            <option value="other">Other</option>
          </select>
        </div>

        {showOtherCategoryInput && (
          <div className="form-group">
            <label>Other Category:</label>
            <input
              type="text"
              placeholder="Category"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              required={showOtherCategoryInput}
              disabled={!isEditing}
            />
          </div>
        )}

        <div className="form-group">
          <label>Job Type:</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)} disabled={!isEditing}>
            <option value="">Select a job type</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="button-group">
          <button type="button" onClick={() => setIsEditing(!isEditing)} className="edit-btn">
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button type="submit" className="save-btn" disabled={!isEditing}>
            Save My Criteria
          </button>
        </div>
      </form>

      {/* Display job results */}
      {isLoading ? (
        <p className="loading-message">Fetching jobs, please wait...</p>
      ) : jobResults.length > 0 ? (
        <div className="job-card-container">
          {jobResults.map((job, index) => (
            <JobCard
              key={index}
              id={job.id}
              title={job.title}
              company={job.company_name}
              logo={job.company_logo}
              location={job.candidate_required_location}
              job_type={job.job_type}
              salary={job.salary}
              posted_date={job.publication_date}
            />
          ))}
        </div>
      ) : (
        <p>No jobs found based on your criteria.</p>
      )}
    </div>
  );
};

export default FindMyJob;
import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import './FindMyJob.css';

const FindMyJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [otherSkills, setOtherSkills] = useState('');
  const [showOtherCategoryInput, setShowOtherCategoryInput] = useState(false);
  const [showOtherSkillsInput, setShowOtherSkillsInput] = useState(false);
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
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setJobTitle(data.jobTitle || '');
          setJobCategory(data.jobCategory || '');
          setJobType(data.jobType || '');
          setLocation(data.location || '');
          setSkills(data.skills || '');
          fetchJobs(data);
        } else {
          console.log('No saved search criteria found.');
        }
      } catch (error) {
        console.error('Error fetching saved criteria:', error);
      }
    };

    fetchSavedCriteria();
  }, [token]);

  const fetchJobs = async (formData) => {
    setIsLoading(true);
    try {
      const findJobsResponse = await fetch(`${import.meta.env.VITE_API_URL}/job-search/find-jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (findJobsResponse.ok) {
        const data = await findJobsResponse.json();
        setJobResults(data.jobs || []);
      } else {
        setError(`Failed to fetch jobs: ${findJobsResponse.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setJobCategory(value);
    setShowOtherCategoryInput(value === 'other');
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkills(value);
    setShowOtherSkillsInput(value === 'other');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      jobTitle,
      jobCategory: showOtherCategoryInput ? otherCategory : jobCategory,
      jobType,
      location,
      skills: showOtherSkillsInput ? otherSkills : skills,
    };

    try {
      const saveSearchResponse = await fetch(`${import.meta.env.VITE_API_URL}/job-search/save-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!saveSearchResponse.ok) {
        throw new Error(`Failed to save search criteria: ${saveSearchResponse.statusText}`);
      }

      // Fetch jobs after saving criteria
      fetchJobs(formData);
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Job Category:</label>
          <select
            value={jobCategory}
            onChange={handleCategoryChange}
            disabled={!isEditing}
          >
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
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              required={showOtherCategoryInput}
              disabled={!isEditing}
            />
          </div>
        )}

        <div className="form-group">
          <label>Job Type:</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            disabled={!isEditing}
          >
            <option value="">Select a job type</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <select
            value={skills}
            onChange={handleSkillsChange}
            disabled={!isEditing}
          >
            <option value="">Select skills</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="Figma">Figma</option>
            <option value="technical writing">Technical writing</option>
            <option value="CI/CD">CI/CD</option>
            <option value="agile">Agile</option>
            <option value="Jira">Jira</option>
            <option value="Django">Django</option>
            <option value="excel">Excel</option>
            <option value="growth marketing">Growth marketing</option>
            <option value="sales operations">Sales operations</option>
            <option value="video editing">Video editing</option>
            <option value="other">Other</option>
          </select>
        </div>

        {showOtherSkillsInput && (
          <div className="form-group">
            <label>Other Skills:</label>
            <input
              type="text"
              value={otherSkills}
              onChange={(e) => setOtherSkills(e.target.value)}
              required={showOtherSkillsInput}
              disabled={!isEditing}
            />
          </div>
        )}

        <div className="button-group">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="edit-btn"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button type="submit" className="save-btn" disabled={!isEditing}>
            Save My Criteria
          </button>
        </div>
      </form>

      {/* Display results */}
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
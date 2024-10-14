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

  const token = localStorage.getItem('token');  // Assuming token is used

  // Fetch saved criteria on load
  useEffect(() => {
    if (!token) {
      console.error('No token found. User may not be authenticated.');
      return;
    }

    const fetchSavedCriteria = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/job-search/get-search`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Prefill form with saved data
          setJobTitle(data.jobTitle || '');
          setJobCategory(data.jobCategory || '');
          setJobType(data.jobType || '');
          setLocation(data.location || '');
          setSkills(data.skills || '');
        } else {
          console.log('No saved search criteria found.');
        }
      } catch (error) {
        console.error('Error fetching saved criteria:', error);
      }
    };

    fetchSavedCriteria();
  }, [token]);

  // Handle category selection and toggle other input
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
    setIsLoading(true);

    const formData = {
      jobTitle,
      jobCategory: showOtherCategoryInput ? otherCategory : jobCategory,
      jobType,
      location,
      skills: showOtherSkillsInput ? otherSkills : skills,
    };

    try {
      // Save the search criteria
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

      // After saving the search criteria, fetch the jobs
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
        console.log(data.jobs[2]);
        setJobResults(data.jobs || []);  // Display the jobs below the form
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

  return (
    <div className="find-my-job-page">
      {/* {isLoading && <p>Loading...</p>} */}
      <h1>Find My Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Job Category:</label>
          <select value={jobCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Other Category Input (conditionally rendered) */}
        {showOtherCategoryInput && (
          <div className="form-group">
            <label>Other Category:</label>
            <input
              type="text"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              required={showOtherCategoryInput}
            />
          </div>
        )}

        <div className="form-group">
          <label>Job Type:</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Select a job type</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <select value={skills} onChange={handleSkillsChange}>
            <option value="">Select skills</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Other Skills Input (conditionally rendered) */}
        {showOtherSkillsInput && (
          <div className="form-group">
            <label>Other Skills:</label>
            <input
              type="text"
              value={otherSkills}
              onChange={(e) => setOtherSkills(e.target.value)}
              required={showOtherSkillsInput}
            />
          </div>
        )}

        <button type="submit">Find Jobs</button>
      </form>

      {/* Display results */}
      {/* <div className="job-results">
        {error && <p className="error-message">{error}</p>}
        {jobResults.length > 0 ? (
          <ul>
            {jobResults.map((job) => (
              <li key={job.id}>
                <strong>{job.title}</strong> - {job.company_name} - {job.candidate_required_location}
              </li>
            ))}
          </ul>
        ) : (
          <p>{isLoading ? 'Loading jobs...' : 'No jobs found based on your criteria.'}</p>
        )}
      </div> */}
      {/* Display results using JobCard component */}
      <div className="job-results-grid">
        {error && <p className="error-message">{error}</p>}
        {jobResults.length > 0 ? (
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
          <p>{isLoading ? 'Loading jobs...' : 'No jobs found based on your criteria.'}</p>
        )}
      </div>
    </div>
  );
};

export default FindMyJob;
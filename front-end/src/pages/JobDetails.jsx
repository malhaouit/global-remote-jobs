import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import he from 'he';
import defaultCompanyLogo from '../assets/default-company-logo.png';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from the URL
  const [job, setJob] = useState(null); // State to hold job details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch job details from the back-end
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${id}`);
        const data = await response.json();
        setJob(data); // Set the job data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails(); // Fetch the job details when the component mounts
  }, [id]);

  if (loading) {
    return <div className="loading">Loading the job...</div>; // Display a loading message while fetching data
  }

  if (!job) {
    return <div>Job not found</div>; // Display an error if no job is found
  }

  return (
    <div>
      <Header />

      <div className="container">
        {/* Section 1: Company info and Job title */}
        <section className="job-header">
          <div className="company-box">
            <div className="company-info">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                onError={(e) => e.target.src = defaultCompanyLogo}  
              />
              <h3>{job.company}</h3>
            </div>
            <div className="job-actions">
              <button className="share-btn">Share Job</button>
              <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
                <button className="apply-btn">Apply</button>
              </a>
            </div>
          </div>

          <div className="title-box">
            <h2>{job.title}</h2>
          </div>
        </section>

        {/* Section 2: Job description and details */}
        <section className="job-details">
          <div className="left-block">
            <div dangerouslySetInnerHTML={{ __html: he.decode(job.description) }}></div>
          </div>
          <div className="right-block">
            <div className="job-info-box">
              <p><strong>Location:</strong></p>
              <ul>
                <li>{job.location}</li>
              </ul>
              <p><strong>Job type:</strong></p>
              <ul>
                <li>{job.job_type}</li>
              </ul>
              <p><strong>Salary:</strong></p>
              <ul>
                <li>{job.salary}</li>
              </ul>
              <p><strong>Posted on:</strong></p>
              <ul>
                <li>{new Date(job.publication_date).toLocaleDateString()}</li>
              </ul>
            </div>
            <div className="skills-box">
              <p><strong>Skills:</strong></p>
              <ul>
                {job.skills && job.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="category-section">
              <p><strong>Category:</strong></p>
              <ul>
                <li>{job.category}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Centered Apply Button */}
        <div className="apply-section">
          <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
            <button className="apply-btn-large">Apply</button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetails;
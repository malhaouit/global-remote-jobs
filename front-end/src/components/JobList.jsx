import React, { useEffect, useState } from "react";
import JobCard from './JobCard';
import './JobList.css';
import { Link } from "react-router-dom";

const JobList = ({ jobs }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobs.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [jobs]);

  const displayedJobs = jobs.slice(0, 12);

  return (
    <section className="job-list">
      <h2>New Jobs</h2>

      {/* Display a loading message or spinner while jobs are being fetched */}
      {loading && (
        <div className='loading-message'>
          <p>Loading jobs, please wait...</p>
        </div>
      )}

      {/* Display the no jobs message if no jobs are found */}
      {!loading && jobs.length === 0 && (
        <div className="no-jobs-message">
          <p>No jobs available right now.</p>
        </div>
      )}

      {/* Job Grid */}
      <div className="job-grid">
        {!loading && jobs.length > 0 &&
          displayedJobs.map((job, index) => (
            <JobCard 
              key={index}
              id={job.id}
              title={job.title}
              company={job.company}
              logo={job.logo}
              location={job.location}
              salary={job.salary}
              job_type={job.job_type}
              posted_date={job.publication_date}
            />
          ))
        }
      </div>
      
      {/* More Jobs Button */}
      {!loading && jobs.length > 0 && (
        <Link to='/jobs' className="no-style-link">
          <button className="more-jobs-btn">More Jobs</button>
        </Link>
      )}
    </section>
  );
};

export default JobList;
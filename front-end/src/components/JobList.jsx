import React from "react";
import JobCard from './JobCard';
import './JobList.css';

const JobList = ({ jobs }) => {
  const displayedJobs = jobs.slice(0, 12);
 
  return (
    <section className="job-list">
      <h2>New Jobs</h2>
      <div className="job-grid">
        {jobs.length > 0 ? (
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
        ) : (
          <p>No jobs available right now.</p>
        )}
      </div>
      <button className="more-jobs-btn">More Jobs</button>
    </section>
  );
};

export default JobList;
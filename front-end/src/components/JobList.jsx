import React from "react";
import JobCard from './JobCard';
import './JobList.css';

const JobList = () => {
  const jobs = [
    { title: "Software Engineer", company: "Tech Corp", type: "Full-time", salary: "90k USD/year", location: "United States", posted: "10 minutes ago" },
    { title: "Software Engineer", company: "Tech Corp", type: "Full-time", salary: "90k USD/year", location: "United States", posted: "10 minutes ago" },
    { title: "Software Engineer", company: "Tech Corp", type: "Full-time", salary: "90k USD/year", location: "United States", posted: "10 minutes ago" },
    { title: "Software Engineer", company: "Tech Corp", type: "Full-time", salary: "90k USD/year", location: "United States", posted: "10 minutes ago" },
    // Add more jobs here
  ];

  return (
    <section className="job-list">
      <h2>New Jobs</h2>
      <div className="job-grid">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
      <button className="more-jobs-btn">More Jobs</button>
    </section>
  );
};

export default JobList;
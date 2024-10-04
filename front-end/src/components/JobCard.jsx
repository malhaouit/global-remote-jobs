import React from "react";
import './JobCard.css';
import defaultCompanyLogo from '../assets/default-company-logo.png';

const JobCard = ({ title, company, logo, location, salary_min, salary_max, posted_date }) => {
  
  return (
    <div className="job-card">
      <h3>{title}</h3>
      <div className="company-info">
        <img
          src={logo} 
          alt={`${company} logo`} 
          className="company-logo" 
          onError={(e) => e.target.src = defaultCompanyLogo}
        />
        <p>{company}</p>
      </div>
      <div className="job-info">
        <span>{location}</span>
        <span>{salary_min ? `$${salary_min}` : ''} - {salary_max ? `$${salary_max}` : ''}</span>
      </div>
      <p className="posted-time">Posted on: {new Date(posted_date).toLocaleString()}</p>
    </div>
  );
};

export default JobCard;
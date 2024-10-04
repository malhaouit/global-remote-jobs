import React from "react";
import './JobCard.css';
import CompanyLogo from '../assets/web.jpg';

const JobCard = ({ title, company, type, salary, location, posted }) => {
  return (
    <div className="job-card">
      <h3>{title}</h3>
      <div className="company-info">
        <img src={CompanyLogo} alt={`${company} logo`} className="company-logo" />
        <p>{company}</p>
      </div>
      <div className="job-info">
        <span>{location}</span>
        <span>{type}</span>
        <span>{salary}</span>
      </div>
      <p className="posted-time">{posted}</p>
    </div>
  );
};

export default JobCard;
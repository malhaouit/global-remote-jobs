import { Link } from "react-router-dom";
import './JobCard.css';
import defaultCompanyLogo from '../assets/default-company-logo.png';

const JobCard = ({ id, title, company, logo, location, job_type, salary, posted_date }) => {
  return (
    <Link to={`/job/${id}`} className="job-card">
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
          <ul>
            <li>{location}</li>
            <li>{salary !== 'Not specified' ? salary : 'Salary not provided'}</li>
            <li>{job_type}</li>
          </ul>
          {/* <span>{location}</span>
          <span>{salary !== 'Not specified' ? salary : 'Salary not provided'}</span>
          <span>{job_type}</span> */}
        </div>
        <p className="posted-time">Posted on: {new Date(posted_date).toLocaleDateString()}</p>
    </Link>
  );
};

export default JobCard;
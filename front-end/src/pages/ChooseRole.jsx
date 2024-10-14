import React from "react";
import { Link } from "react-router-dom";
import './ChooseRole.css';

// Add images (replace the paths with your own images)
import seekerIcon from '../assets/seeker-icon.svg'; 
import companyIcon from '../assets/company-icon.svg'; 

const ChooseRole = () => {
  return (
    <div className="choose-role-container">
      <h2>Select Your Role</h2>
      <div className="role-options">
        {/* Job Seeker Button */}
        <Link to="/signup/seeker" className="role-btn">
          <div className="role-box">
            <div>
              <h3>Job Seeker</h3>
              <p>Find your dream remote job</p>
            </div>
            <img src={seekerIcon} alt="Job Seeker Icon" />
          </div>
        </Link>

        {/* Company Button */}
        <Link to="/signup/company" className="role-btn">
          <div className="role-box">
            <div>
              <h3>Company</h3>
              <p>Find the right talent for your organization</p>
            </div>
            <img src={companyIcon} alt="Company Icon" />
          </div>
        </Link>
      </div>

      {/* New section for login and returning to home */}
      <div className="additional-links">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
        <p>Go back to <Link to="/">Home page</Link></p>
      </div>
    </div>
  );
};

export default ChooseRole;
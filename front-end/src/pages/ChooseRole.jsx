import React from "react";
import { Link } from "react-router-dom";
import './ChooseRole.css';

const ChooseRole = () => {
  return (
    <div className="choose-role-container">
      <h2>Select Your Role</h2>
      <div className="role-options">
        {/* Job Seeker Button */}
        <Link to="/signup/seeker" className="role-btn">
          <div className="role-box">
            <h3>Job Seeker</h3>
            <p>Find your dream remote job</p>
          </div>
        </Link>

        {/* Company Button */}
        <Link to="/signup/company" className="role-btn">
          <div className="role-box">
            <h3>Company</h3>
            <p>Find the right talent for your organization</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChooseRole;
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import JobList from "../components/JobList";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import './HomePage.css';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch filtered jobs from the back-end API
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs/filtered');
        const data = await response.json();
        setJobs(data);
      } catch {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs(); // Call the function to fetch jobs
  }, []);

  return (
    <div>
      <Header />
      <div className="cover">
        <div className="cover-content">
          <h1>Opportunity is <br /> wherever you are</h1>
          <p>We’re connecting the best remote talent with the best remote companies.</p>
          <div className="button-group">
            <button className="browse-jobs">Browse jobs</button>
            <button className="post-job-btn">Post a Job</button>
          </div>
        </div>
      </div>
      <JobList jobs={jobs} />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
import React from "react";
import Header from "../components/Header";
import JobList from "../components/JobList";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import './HomePage.css';

const HomePage = () => {
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
      <JobList />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
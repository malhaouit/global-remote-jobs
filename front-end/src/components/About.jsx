import React from "react";
import { Link } from "react-router-dom";
import './About.css';  // Optional: Create this file for custom About page styling.

const About = () => {
  return (
    <div className="about-container">
      <h1>About GlobalRemoteJobs</h1>
      <p>
        <Link to='/' className='link'><strong>GlobalRemoteJobs</strong></Link> is a platform dedicated to connecting job seekers with remote work opportunities across the globe. 
        Our mission is to make remote work accessible and efficient for everyone, by providing a seamless experience for 
        job seekers and employers alike.
      </p>
      <h2>For Job Seekers</h2>
      <p>
        Whether you're a recent graduate, a digital nomad, or an experienced professional looking to transition into remote work, 
        we strive to provide a variety of job opportunities tailored to your skills and needs. With our easy-to-use platform, 
        you can find jobs that match your expertise, location preferences, and career goals. Our goal is to empower you to find 
        a job that fits your lifestyle and helps you grow.
      </p>
      <h2>For Companies</h2>
      <p>
        At GlobalRemoteJobs, we also support companies in finding top-notch remote talent. We understand the challenges of 
        sourcing qualified candidates for remote positions, which is why we make it easy for businesses to post jobs and connect 
        with skilled professionals from around the world. Our platform offers a user-friendly job posting experience, allowing 
        companies to showcase their remote opportunities and attract the right candidates.
      </p>
      <p>
        By partnering with us, companies can reach a diverse pool of talented job seekers who are ready to contribute from 
        anywhere. Whether you're a startup looking to build a remote team or a well-established organization seeking specialized 
        skills, GlobalRemoteJobs can help you find the perfect fit.
      </p>
      <p>
        At GlobalRemoteJobs, we believe that remote work is the future, and we're here to help job seekers and employers 
        succeed in this new era. Thank you for being a part of our community!
      </p>
    </div>
  );
};

export default About;
import React from "react";
import './PrivacyPolicy.css';
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>Last Updated: 21/10/2024</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to <Link to='/' className='link'><strong>GlobalRemoteJobs</strong></Link>. Your privacy is very important to us. This privacy policy explains how we collect, 
        use, and protect your personal information when you use our website.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
        <li><strong>Profile Information:</strong> Details you provide when creating a profile, such as job preferences and skills.</li>
        <li><strong>Usage Data:</strong> Information about how you interact with our website, such as pages visited and time spent on the site.</li>
        <li><strong>Cookies:</strong> To enhance user experience, we may use cookies to store user preferences and track website usage.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>Your information may be used for the following purposes:</p>
      <ul>
        <li>To provide and maintain our service.</li>
        <li>To communicate with you regarding updates, support, or customer service.</li>
        <li>To improve user experience and analyze how our services are used.</li>
        <li>To send marketing and promotional materials (you can opt-out at any time).</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your personal information. However, please be aware 
        that no method of transmission over the internet is 100% secure.
      </p>

      <h2>5. Sharing Your Information</h2>
      <p>
        We do not sell or trade your personal information to third parties. We may share information with trusted partners 
        who assist us in operating our website, as long as they agree to keep this information confidential.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. To exercise these rights, please contact us 
        through the information provided on the contact page.
      </p>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new 
        policy on this page.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this privacy policy, please contact us at <a href="/contact"> <strong>Contact Us</strong></a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
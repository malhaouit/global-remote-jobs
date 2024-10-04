import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer>
        <p>&copy; 2024 GlobalRemoteJobs. All rights reserved.</p>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
    </footer>
  );
};

export default Footer;
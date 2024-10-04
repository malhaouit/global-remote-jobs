import React from "react";
import './CallToAction.css';

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Sign Up for Free</h2>
        <button className="cta-btn">Let's Connect</button>
        <button className="cta-feedback-btn">Give Us Feddback</button>
      </div>
    </section>
  );
};

export default CallToAction;
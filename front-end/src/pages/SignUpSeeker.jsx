import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUpSeeker.css';

const SignUpSeeker = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Make POST request to backend to signup job seeker
    try {
      const response = await fetch('http://localhost:5000/api/signup/seeker', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Signup successful');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  return (
    <div className="signup-seeker">
      <h2>Job Seeker Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="switch-text">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
  );
};

export default SignUpSeeker;
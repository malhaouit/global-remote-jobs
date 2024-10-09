import React, { useState } from "react";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful');
        // Store token in local storage or session storage
        localStorage.setItem('token', data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="switch-text">
        Don’t have an account? <a href="/signup">Sign up here</a>
      </div>
    </div>
  );
};

export default Login;
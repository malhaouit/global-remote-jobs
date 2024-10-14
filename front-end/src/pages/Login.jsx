import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // For navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful');
        localStorage.setItem('token', data.token); // Store the JWT in local storage
        localStorage.setItem('role', data.role);
        navigate('/');
        console.log('Role:', data.role);
        console.log('Token:', data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Server error occurred.');
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
        <p>Don’t have an account? <a href="/signup">Sign up here</a></p>
        <p>Go back to <a href="/">Home page</a></p>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FarmerLogin.css';

const FarmerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/farmers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ ${result.message} Redirecting...`);
        console.log('Login successful:', result.farmer);
        
        // Redirect to farmer home page with username
        setTimeout(() => {
          navigate(`/${result.farmer.username}`);
        }, 1500);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please check if the server is running.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="farmer-login-container">
      <div className="login-form">
        <h2>Farmer Login</h2>
        
        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="form-footer">
          <p>Don't have an account? <a href="/farmer-signup">Sign up here</a></p>
          <p><a href="#forgot-password">Forgot Password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin;
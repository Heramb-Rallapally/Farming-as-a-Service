import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
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
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check hardcoded admin credentials
      if (formData.username === 'admin' && formData.password === '1234') {
        setMessage('✅ Admin login successful! Redirecting...');
        console.log('Admin login successful');
        
        // Redirect to admin home page
        setTimeout(() => {
          navigate('/AdminHome');
        }, 1500);
      } else {
        setMessage('❌ Invalid admin credentials. Please try again.');
      }
    } catch (error) {
      setMessage('❌ Login failed. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-form">
        <div className="admin-header">
          <div className="admin-icon">👨‍💼</div>
          <h2>Admin Login</h2>
          <p>FaaS Administration Portal</p>
        </div>
        
        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Admin Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter admin username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Admin Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Logging In...' : 'Login as Admin'}
          </button>
        </form>

        <div className="form-footer">
          <p><a href="/">← Back to Home</a></p>
          <div className="admin-help">
            <small>Need help? Contact system administrator</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
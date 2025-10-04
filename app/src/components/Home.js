import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">
          <h1>FaaS</h1>
          <span>Farming as a Service</span>
        </div>
        <div className="nav-links">
          <Link to="/Adminlogin" className="nav-link">Admin Login</Link>
          <Link to="/FarmerSignup" className="nav-link">Farmer Signup</Link>
          <Link to="/FarmerLogin" className="nav-link">Farmer Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to FaaS</h1>
          <h2 className="hero-subtitle">Farming as a Service</h2>
          <p className="hero-description">
            Revolutionizing agriculture through technology. Connect farmers with modern farming solutions, 
            resources, and expert guidance to maximize crop yield and sustainable farming practices.
          </p>
          <div className="hero-buttons">
            <Link to="/farmer-signup" className="btn btn-primary">Get Started as Farmer</Link>
            <Link to="/admin-login" className="btn btn-secondary">Admin Portal</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="farming-icon">🌾</div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <h3>Our Services</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚜</div>
            <h4>Smart Farming</h4>
            <p>Modern farming techniques and equipment management</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Crop Analytics</h4>
            <p>Data-driven insights for better crop management</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h4>Sustainable Solutions</h4>
            <p>Eco-friendly farming practices and solutions</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
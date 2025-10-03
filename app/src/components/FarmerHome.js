import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import './FarmerHome.css';

const FarmerHome = () => {
  const { t, i18n } = useTranslation();
  const { username } = useParams();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t('good_morning');
    if (hour < 17) return t('good_afternoon');
    return t('good_evening');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="farmer-home-container">
      {/* Header */}
      <header className="farmer-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>{getGreeting()}, {username}! 🌾</h1>
            <p className="date-time">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="header-actions">
            <div className="language-switcher">
              <button 
                onClick={() => changeLanguage('en')} 
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
              >
                English
              </button>
              <button 
                onClick={() => changeLanguage('hi')} 
                className={`lang-btn ${i18n.language === 'hi' ? 'active' : ''}`}
              >
                हिंदी
              </button>
            </div>
            <Link to="/profile" className="profile-btn">{t('my_profile')}</Link>
            <Link to="/" className="logout-btn">{t('logout')}</Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="dashboard">
        <div className="dashboard-grid">
          
          {/* Quick Stats */}
          <div className="dashboard-card stats-card">
            <h3>{t('farm_overview')}</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">{t('active_crops')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">{t('acres')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-label">{t('harvest_ready')}</span>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="dashboard-card weather-card">
            <h3>{t('todays_weather')}</h3>
            <div className="weather-info">
              <div className="temperature">28°C</div>
              <div className="weather-details">
                <p>{t('partly_cloudy')}</p>
                <p>{t('humidity')}: 65%</p>
                <p>{t('good_farming_day')}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card actions-card">
            <h3>{t('quick_actions')}</h3>
            <div className="action-buttons">
              <button className="action-btn plant-btn">
                {t('plant_crops')}
              </button>
              <button className="action-btn harvest-btn">
                {t('harvest')}
              </button>
              <button className="action-btn water-btn">
                {t('irrigation')}
              </button>
              <button className="action-btn market-btn">
                {t('market_prices')}
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card activity-card">
            <h3>{t('recent_activity')}</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">🌱</span>
                <div className="activity-details">
                  <p>{t('planted_tomatoes')}</p>
                  <small>{t('hours_ago')}</small>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">💧</span>
                <div className="activity-details">
                  <p>{t('watered_wheat')}</p>
                  <small>{t('yesterday')}</small>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🌾</span>
                <div className="activity-details">
                  <p>{t('harvested_corn')}</p>
                  <small>{t('days_ago')}</small>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="dashboard-card notifications-card">
            <h3>{t('notifications')}</h3>
            <div className="notifications-list">
              <div className="notification-item urgent">
                <p>{t('pest_alert')}</p>
                <small>{t('take_action')}</small>
              </div>
              <div className="notification-item info">
                <p>{t('rain_expected')}</p>
                <small>{t('plan_accordingly')}</small>
              </div>
              <div className="notification-item success">
                <p>{t('fertilizer_delivery')}</p>
                <small>{t('ready_to_use')}</small>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="dashboard-card services-card">
            <h3>{t('faas_services')}</h3>
            <div className="services-grid">
              <div className="service-item">
                <span className="service-icon">🤖</span>
                <p>{t('ai_crop_analysis')}</p>
              </div>
              <div className="service-item">
                <span className="service-icon">📱</span>
                <p>{t('mobile_monitoring')}</p>
              </div>
              <div className="service-item">
                <span className="service-icon">🎯</span>
                <p>{t('precision_farming')}</p>
              </div>
              <div className="service-item">
                <span className="service-icon">📈</span>
                <p>{t('yield_optimization')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmerHome;
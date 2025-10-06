import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './FarmerProduce.css';

const FarmerProduce = () => {
  const { username } = useParams();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    farmerName: '',
    cropType: '',
    cropAmount: '',
    costPrice: '',
    sellPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const cropOptions = [
    'Rice', 'Wheat', 'Corn', 'Tomato', 'Potato', 'Onion', 
    'Cotton', 'Sugarcane', 'Soybean', 'Barley', 'Millet', 'Other'
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateProfit = () => {
    const cost = parseFloat(formData.costPrice);
    const sell = parseFloat(formData.sellPrice);
    const amount = parseFloat(formData.cropAmount);
    
    if (cost && sell && amount) {
      const totalCost = cost * amount;
      const totalRevenue = sell * amount;
      const profit = totalRevenue - totalCost;
      const profitPercentage = ((profit / totalCost) * 100).toFixed(2);
      
      return {
        totalCost,
        totalRevenue,
        profit,
        profitPercentage
      };
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/farmers/produce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        const profitData = result.produce.profitAnalysis;
        setMessage(`✅ ${result.message} Profit: ₹${profitData.profit.toFixed(2)} (${profitData.profitPercentage})`);
        
        // Reset form
        setFormData({
          farmerName: '',
          cropType: '',
          cropAmount: '',
          costPrice: '',
          sellPrice: ''
        });
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ ${t('network_error')}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const profitData = calculateProfit();

  return (
    <div className="farmer-produce-container">
      <div className="produce-form">
        <div className="form-header">
          <div className="header-top">
            <h2>{t('add_crop_produce')}</h2>
            <div className="language-switcher">
              <span>{t('language')}: </span>
              <button 
                onClick={() => changeLanguage('en')} 
                className={i18n.language === 'en' ? 'active' : ''}
              >
                English
              </button>
              <button 
                onClick={() => changeLanguage('hi')} 
                className={i18n.language === 'hi' ? 'active' : ''}
              >
                हिंदी
              </button>
            </div>
          </div>
          <p>{t('crop_details_subtitle')}</p>
        </div>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Farmer Name */}
          <div className="form-group">
            <label htmlFor="farmerName">{t('farmer_name')}</label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              placeholder={t('farmer_name_placeholder')}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cropType">{t('crop_type')}</label>
            <select
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">{t('select_crop_type')}</option>
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Amount */}
          <div className="form-group">
            <label htmlFor="cropAmount">{t('crop_amount')}</label>
            <input
              type="number"
              id="cropAmount"
              name="cropAmount"
              value={formData.cropAmount}
              onChange={handleChange}
              placeholder={t('crop_amount_placeholder')}
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          {/* Cost Price */}
          <div className="form-group">
            <label htmlFor="costPrice">{t('cost_price')}</label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              placeholder={t('cost_price_placeholder')}
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          {/* Sell Price */}
          <div className="form-group">
            <label htmlFor="sellPrice">{t('selling_price')}</label>
            <input
              type="number"
              id="sellPrice"
              name="sellPrice"
              value={formData.sellPrice}
              onChange={handleChange}
              placeholder={t('selling_price_placeholder')}
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          {/* Profit Calculation Display */}
          {profitData && (
            <div className="profit-display">
              <h3>{t('profit_analysis')}</h3>
              <div className="profit-grid">
                <div className="profit-item">
                  <span className="profit-label">{t('total_cost')}</span>
                  <span className="profit-value">₹{profitData.totalCost.toFixed(2)}</span>
                </div>
                <div className="profit-item">
                  <span className="profit-label">{t('total_revenue')}</span>
                  <span className="profit-value">₹{profitData.totalRevenue.toFixed(2)}</span>
                </div>
                <div className="profit-item">
                  <span className="profit-label">{t('profit_loss')}</span>
                  <span className={`profit-value ${profitData.profit >= 0 ? 'profit' : 'loss'}`}>
                    ₹{profitData.profit.toFixed(2)}
                  </span>
                </div>
                <div className="profit-item">
                  <span className="profit-label">{t('profit_margin')}</span>
                  <span className={`profit-value ${profitData.profit >= 0 ? 'profit' : 'loss'}`}>
                    {profitData.profitPercentage}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? t('saving') : t('save_produce_details')}
          </button>
        </form>

        <div className="form-footer">
          <p><a href={`/${username}`}>{t('back_to_dashboard')}</a></p>
        </div>
      </div>
    </div>
  );
};

export default FarmerProduce;
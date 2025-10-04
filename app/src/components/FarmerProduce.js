import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './FarmerProduce.css';

const FarmerProduce = () => {
  const { username } = useParams();
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
      setMessage('❌ Network error. Please check if the server is running.');
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
          <h2>🌾 Add Crop Produce</h2>
          <p>Enter your crop details for better farm management</p>
        </div>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Farmer Name */}
          <div className="form-group">
            <label htmlFor="farmerName">Farmer Name:</label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              placeholder="Enter farmer name"
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cropType">Crop Type:</label>
            <select
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select crop type</option>
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Amount */}
          <div className="form-group">
            <label htmlFor="cropAmount">Crop Amount (in Kg):</label>
            <input
              type="number"
              id="cropAmount"
              name="cropAmount"
              value={formData.cropAmount}
              onChange={handleChange}
              placeholder="Enter amount in kilograms"
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          {/* Cost Price */}
          <div className="form-group">
            <label htmlFor="costPrice">Cost Price per Kg (₹):</label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              value={formData.costPrice}
              onChange={handleChange}
              placeholder="Enter cost price per kg"
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          {/* Sell Price */}
          <div className="form-group">
            <label htmlFor="sellPrice">Selling Price per Kg (₹):</label>
            <input
              type="number"
              id="sellPrice"
              name="sellPrice"
              value={formData.sellPrice}
              onChange={handleChange}
              placeholder="Enter selling price per kg"
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>

          {/* Profit Calculation Display */}
          {profitData && (
            <div className="profit-display">
              <h3>💰 Profit Analysis</h3>
              <div className="profit-grid">
                <div className="profit-item">
                  <span className="profit-label">Total Cost:</span>
                  <span className="profit-value">₹{profitData.totalCost.toFixed(2)}</span>
                </div>
                <div className="profit-item">
                  <span className="profit-label">Total Revenue:</span>
                  <span className="profit-value">₹{profitData.totalRevenue.toFixed(2)}</span>
                </div>
                <div className="profit-item">
                  <span className="profit-label">Profit/Loss:</span>
                  <span className={`profit-value ${profitData.profit >= 0 ? 'profit' : 'loss'}`}>
                    ₹{profitData.profit.toFixed(2)}
                  </span>
                </div>
                <div className="profit-item">
                  <span className="profit-label">Profit Margin:</span>
                  <span className={`profit-value ${profitData.profit >= 0 ? 'profit' : 'loss'}`}>
                    {profitData.profitPercentage}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Produce Details'}
          </button>
        </form>

        <div className="form-footer">
          <p><a href={`/${username}`}>← Back to Dashboard</a></p>
        </div>
      </div>
    </div>
  );
};

export default FarmerProduce;
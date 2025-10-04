const express = require('express');
const router = express.Router();
const FarmerDetails = require('../models/Farmer_details');

// POST route for farmer signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if farmer already exists
    const existingFarmer = await FarmerDetails.findOne({ username });
    if (existingFarmer) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    // Create new farmer
    const newFarmer = new FarmerDetails({
      username,
      password
    });

    const savedFarmer = await newFarmer.save();

    res.status(201).json({
      success: true,
      message: 'Farmer registered successfully',
      farmer: {
        id: savedFarmer._id,
        username: savedFarmer.username
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
      error: error.message
    });
  }
});

// POST route for farmer login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find farmer by username
    const farmer = await FarmerDetails.findOne({ username });
    if (!farmer) {
      return res.status(400).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Check password (in production, you'd use bcrypt to compare hashed passwords)
    if (farmer.password !== password) {
      return res.status(400).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: 'Login successful',
      farmer: {
        id: farmer._id,
        username: farmer.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

// POST route for farmer produce
router.post('/produce', async (req, res) => {
  try {
    const { farmerName, cropType, cropAmount, costPrice, sellPrice } = req.body;

    // Validate required fields
    if (!farmerName || !cropType || !cropAmount || !costPrice || !sellPrice) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Find farmer by username
    const farmer = await FarmerDetails.findOne({ username: farmerName });
    if (!farmer) {
      return res.status(400).json({
        success: false,
        message: 'Farmer not found. Please check the farmer name.'
      });
    }

    // Create new produce entry
    const FarmerProduceDetails = require('../models/Farmer_produce_details');
    const newProduce = new FarmerProduceDetails({
      farmerId: farmer._id,
      cropType,
      cropAmount: parseFloat(cropAmount),
      costPrice: parseFloat(costPrice),
      sellPrice: parseFloat(sellPrice)
    });

    const savedProduce = await newProduce.save();

    // Calculate profit data
    const totalCost = savedProduce.costPrice * savedProduce.cropAmount;
    const totalRevenue = savedProduce.sellPrice * savedProduce.cropAmount;
    const profit = totalRevenue - totalCost;
    const profitPercentage = ((profit / totalCost) * 100).toFixed(2);

    res.status(201).json({
      success: true,
      message: 'Produce details saved successfully',
      produce: {
        id: savedProduce._id,
        cropType: savedProduce.cropType,
        cropAmount: savedProduce.cropAmount,
        costPrice: savedProduce.costPrice,
        sellPrice: savedProduce.sellPrice,
        createdAt: savedProduce.createdAt,
        profitAnalysis: {
          totalCost,
          totalRevenue,
          profit,
          profitPercentage: `${profitPercentage}%`
        }
      }
    });

  } catch (error) {
    console.error('Produce save error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving produce details',
      error: error.message
    });
  }
});

module.exports = router;
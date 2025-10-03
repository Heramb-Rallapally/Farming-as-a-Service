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

module.exports = router;
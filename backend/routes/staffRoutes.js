const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Staff Registration
router.post('/register', async (req, res) => {
  try {
    const { name, employeeId, email, password } = req.body;

    // Check if staff already exists
    const existingStaff = await Staff.findOne({ 
      $or: [{ employeeId }, { email }] 
    });

    if (existingStaff) {
      return res.status(400).json({ 
        message: 'Staff with this employee ID or email already exists' 
      });
    }

    // Create new staff
    const staff = new Staff({
      name,
      employeeId,
      email,
      password
    });

    await staff.save();

    // Create token
    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Remove password from response
    staff.password = undefined;

    res.status(201).json({
      success: true,
      token,
      staff
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Get all staff members (Admin only)
router.get('/all', async (req, res) => {
  try {
    const staff = await Staff.find().select('-password');
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ message: 'Error fetching staff members' });
  }
});

// Staff Login
router.post('/login', async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    
    if (!employeeId || !password) {
      return res.status(400).json({ message: 'Please provide employee ID and password' });
    }

    const staff = await Staff.findOne({ employeeId });
    if (!staff) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await staff.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: staff._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      staff: {
        id: staff._id,
        name: staff.name,
        employeeId: staff.employeeId,
        email: staff.email,
        role: staff.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all staff (protected route)
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find().select('-password');
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get staff profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const staff = await Staff.findById(decoded.id).select('-password');
    
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json(staff);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
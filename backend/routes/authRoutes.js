import express from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Rate limiting for OTP requests
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: 'Too many OTP requests, please try again later'
});

// Temporary storage for OTPs (replace with database in production)
const otpStore = new Map();

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// List all users (for testing purposes)
router.get('/users', async (req, res) => {
  try {
    console.log('Fetching all users...');
    const users = await User.find({}, { password: 0 }); // Exclude password field
    console.log('Total users in database:', users.length);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    console.log('Registration attempt:', { name, email, phoneNumber });

    // Validate input
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phoneNumber }]
    });

    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return res.status(400).json({ 
        message: existingUser.email === email 
          ? 'Email already registered' 
          : 'Phone number already registered' 
      });
    }

    // Create new user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role: 'customer'
    });
    console.log('User created successfully:', user.email);

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Staff login route
router.post('/staff/login', async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    console.log('Staff login attempt:', employeeId);
    
    // Find staff by employeeId
    const staff = await User.findOne({ 
      employeeId,
      role: 'staff'
    });
    
    if (!staff) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await staff.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET || 'your-secret-key',
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
    console.error('Staff login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

// Generate and send OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Store OTP with timestamp (valid for 5 minutes)
    otpStore.set(phoneNumber, {
      otp,
      timestamp: Date.now(),
      attempts: 0
    });

    // For development: Return the OTP in the response
    // In production, this would be sent via SMS
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    
    res.json({
      success: true,
      message: 'OTP sent successfully',
      // For development only: Include the OTP in the response
      otp: otp
    });
  } catch (error) {
    console.error('OTP generation error:', error);
    res.status(500).json({ message: 'Failed to generate OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const storedData = otpStore.get(phoneNumber);

    if (!storedData) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    // Check if OTP is expired (5 minutes)
    if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
      otpStore.delete(phoneNumber);
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Check if too many attempts
    if (storedData.attempts >= 3) {
      otpStore.delete(phoneNumber);
      return res.status(400).json({ message: 'Too many attempts. Please request a new OTP' });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      storedData.attempts += 1;
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { phoneNumber },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' }
    );

    // Clear OTP data
    otpStore.delete(phoneNumber);

    res.json({
      success: true,
      message: 'OTP verified successfully',
      resetToken
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { phoneNumber, newPassword } = req.body;

    // In production, update password in database
    console.log(`Password reset for ${phoneNumber}`);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

export default router; 
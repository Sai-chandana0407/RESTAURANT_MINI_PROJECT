import express from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

const router = express.Router();

// Temporary user data store (replace with database later)
const users = [];

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

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, hash this password
      phoneNumber,
      role: 'customer'
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// User login route
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    
    const token = jwt.sign(
      { email, role: 'user' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        email,
        name: email.split('@')[0],
        role: 'user'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Staff login route
router.post('/staff/login', (req, res) => {
  try {
    const { employeeId, password } = req.body;
    console.log('Staff login attempt:', employeeId);
    
    const token = jwt.sign(
      { employeeId, role: 'staff' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      staff: {
        employeeId,
        name: `Staff-${employeeId}`,
        role: 'staff'
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
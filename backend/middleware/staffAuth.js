const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');

const staffAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find staff by id
    const staff = await Staff.findById(decoded.id);
    
    if (!staff) {
      return res.status(401).json({ message: 'Staff not found' });
    }

    // Add staff to request object
    req.staff = staff;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = staffAuth; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const addEmployees = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Employee details to add
    const employees = [
      {
        name: 'Chef Michael',
        email: 'chef.michael@restaurant.com',
        password: 'chef123',
        role: 'staff'
      },
      {
        name: 'Waiter Robert',
        email: 'waiter.robert@restaurant.com',
        password: 'waiter123',
        role: 'staff'
      },
      {
        name: 'Manager Sarah',
        email: 'manager.sarah@restaurant.com',
        password: 'manager123',
        role: 'admin'
      }
    ];

    // Add employees
    for (const employee of employees) {
      // Check if employee already exists
      const existingEmployee = await User.findOne({ email: employee.email });
      
      if (existingEmployee) {
        console.log(`Employee ${employee.name} already exists`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(employee.password, salt);

      const newEmployee = new User({
        name: employee.name,
        email: employee.email,
        password: hashedPassword,
        role: employee.role
      });

      await newEmployee.save();
      console.log(`Added employee: ${employee.name} (${employee.role})`);
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addEmployees(); 
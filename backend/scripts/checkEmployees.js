import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const checkAndAddEmployees = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check for existing staff
    const existingStaff = await User.find({ role: 'staff' });
    console.log(`Found ${existingStaff.length} staff members in the database`);

    if (existingStaff.length === 0) {
      console.log('No staff members found. Adding default staff...');
      
      // Default staff details
      const defaultStaff = [
        {
          name: 'John Doe',
          email: 'john.doe@restaurant.com',
          password: 'staff123',
          role: 'staff'
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@restaurant.com',
          password: 'staff123',
          role: 'staff'
        }
      ];

      // Add staff members
      for (const staff of defaultStaff) {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(staff.password, salt);

        const newStaff = new User({
          name: staff.name,
          email: staff.email,
          password: hashedPassword,
          role: staff.role
        });

        await newStaff.save();
        console.log(`Added staff member: ${staff.name}`);
      }
    } else {
      console.log('Existing staff members:');
      existingStaff.forEach(staff => {
        console.log(`- ${staff.name} (${staff.email})`);
      });
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkAndAddEmployees(); 
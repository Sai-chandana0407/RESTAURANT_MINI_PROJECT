import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const testUsers = [
  {
    name: 'Test Customer',
    email: 'customer@test.com',
    password: 'test123',
    phoneNumber: '1234567890',
    role: 'customer'
  },
  {
    name: 'Test Staff',
    email: 'staff@test.com',
    password: 'test123',
    phoneNumber: '0987654321',
    employeeId: 'EMP001',
    role: 'staff'
  }
];

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing test users
    await User.deleteMany({
      email: { $in: testUsers.map(user => user.email) }
    });
    console.log('Cleared existing test users');

    // Add test users
    for (const user of testUsers) {
      const newUser = await User.create(user);
      console.log(`Created test user: ${newUser.email}`);
    }

    // Verify users were created
    const users = await User.find({
      email: { $in: testUsers.map(user => user.email) }
    });
    console.log('\nTest users in database:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nConnection closed');
  }
}

testConnection(); 
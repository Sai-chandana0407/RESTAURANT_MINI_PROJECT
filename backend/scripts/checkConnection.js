import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function checkConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB!');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nCollections in database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    // If users collection exists, count documents
    if (collections.some(col => col.name === 'users')) {
      const userCount = await mongoose.connection.db.collection('users').countDocuments();
      console.log(`\nNumber of users in database: ${userCount}`);
    }

  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nConnection closed');
  }
}

checkConnection(); 
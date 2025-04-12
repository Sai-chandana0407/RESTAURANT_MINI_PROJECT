import bcrypt from 'bcryptjs';

const generateHashedPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Original password:', password);
    console.log('Hashed password:', hashedPassword);
    console.log('\nCopy this hashed password to use in MongoDB Atlas:');
    console.log(hashedPassword);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage - change the password as needed
generateHashedPassword('employee123'); 
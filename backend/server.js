import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menu.js';
import connectDB from './config/db.js';
import path from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.use('/assets', express.static(path.join(process.cwd(), 'backend/assets')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

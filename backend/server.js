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

app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

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

// Try different ports if the default port is in use
const startServer = async () => {
  let currentPort = port;
  while (currentPort < port + 10) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(currentPort, () => {
          console.log(`Server is running on port ${currentPort}`);
          resolve();
        });
        server.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.log(`Port ${currentPort} is in use, trying ${currentPort + 1}...`);
            currentPort++;
            reject(err);
          } else {
            reject(err);
          }
        });
      });
      break;
    } catch (err) {
      if (err.code !== 'EADDRINUSE') {
        console.error('Server error:', err);
        process.exit(1);
      }
    }
  }
};

startServer();

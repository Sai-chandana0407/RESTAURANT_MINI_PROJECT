import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// 👇 You must use file path helpers for importing local files in ES Modules
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/order.js';
import reservationRoutes from './routes/reservation.js';
import reviewRoutes from './routes/review.js';
import inventoryRoutes from './routes/inventory.js';
import paymentRoutes from './routes/payment.js';

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

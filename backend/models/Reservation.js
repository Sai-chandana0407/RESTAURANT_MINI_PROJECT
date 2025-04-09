import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, 
  date: { type: String, required: true },
  time: { type: String, required: true }, 
  numberOfGuests: { type: Number, required: true },
  tableNumber: { type: Number, required: true }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;

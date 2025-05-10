const Reservation = require('../models/Reservation');

exports.bookTable = async (req, res) => {
  try {
    const { name, date, time, numberOfGuests, tableNumber } = req.body;

    const existing = await Reservation.findOne({ date, time, tableNumber });
    if (existing) return res.status(400).json({ message: 'Table already booked for this slot' });

    const reservation = await Reservation.create({
      userId: req.user.id,
      name,
      date,
      time,
      numberOfGuests,
      tableNumber
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: 'Failed to book table' });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reservations' });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel reservation' });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all reservations' });
  }
};

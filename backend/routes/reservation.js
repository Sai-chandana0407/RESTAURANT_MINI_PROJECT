const express = require('express');
const router = express.Router();
const {
  bookTable,
  getMyReservations,
  cancelReservation,
  getAllReservations
} = require('../controllers/reservationController');

const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

router.post('/', auth, bookTable);
router.get('/my', auth, getMyReservations);
router.delete('/:id', auth, cancelReservation);

router.get('/', auth, roleCheck(['admin', 'staff']), getAllReservations);

module.exports = router;

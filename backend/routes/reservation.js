import express from 'express';
import {
  bookTable,
  getMyReservations,
  cancelReservation,
  getAllReservations
} from '../controllers/reservationController.js';

import auth from '../middleware/auth.js';
import roleCheck from '../middleware/role.js';

const router = express.Router();

router.post('/', auth, bookTable);
router.get('/my', auth, getMyReservations);
router.delete('/:id', auth, cancelReservation);
router.get('/', auth, roleCheck(['admin', 'staff']), getAllReservations);

export default router;

import express from 'express';
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

import auth from '../middleware/auth.js';
import roleCheck from '../middleware/role.js';

const router = express.Router();

router.post('/', auth, placeOrder); 
router.get('/my', auth, getMyOrders); 
router.get('/', auth, roleCheck(['admin', 'staff']), getAllOrders);
router.put('/:id', auth, roleCheck(['admin', 'staff']), updateOrderStatus);

export default router;

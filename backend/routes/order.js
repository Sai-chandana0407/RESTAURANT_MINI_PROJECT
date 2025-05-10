const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');

const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

router.post('/', auth, placeOrder); 
router.get('/my', auth, getMyOrders); 

router.get('/', auth, roleCheck(['admin', 'staff']), getAllOrders);
router.put('/:id', auth, roleCheck(['admin', 'staff']), updateOrderStatus);

module.exports = router;

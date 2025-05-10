const express = require('express');
const router = express.Router();
const {
  addItem,
  getItems,
  updateQuantity,
  getLowStockItems
} = require('../controllers/inventoryController');

const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

router.post('/', auth, roleCheck(['admin', 'staff']), addItem);
router.get('/', auth, roleCheck(['admin', 'staff']), getItems);
router.put('/:id', auth, roleCheck(['admin', 'staff']), updateQuantity);
router.get('/low-stock/all', auth, roleCheck(['admin', 'staff']), getLowStockItems);

module.exports = router;

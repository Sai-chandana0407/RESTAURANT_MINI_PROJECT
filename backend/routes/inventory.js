import express from 'express';
import {
  addItem,
  getItems,
  updateQuantity,
  getLowStockItems
} from '../controllers/inventoryController.js';

import auth from '../middleware/auth.js';
import roleCheck from '../middleware/role.js';

const router = express.Router();

router.post('/', auth, roleCheck(['admin', 'staff']), addItem);
router.get('/', auth, roleCheck(['admin', 'staff']), getItems);
router.put('/:id', auth, roleCheck(['admin', 'staff']), updateQuantity);
router.get('/low-stock/all', auth, roleCheck(['admin', 'staff']), getLowStockItems);

export default router;

import express from 'express';
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';

import { protect, admin } from '../middleware/auth.js';
import { roleCheck } from '../middleware/role.js';

const router = express.Router();

router.get('/', getMenu);
router.post('/', protect, roleCheck(['admin']), createMenuItem);
router.put('/:id', protect, roleCheck(['admin']), updateMenuItem);
router.delete('/:id', protect, roleCheck(['admin']), deleteMenuItem);

export default router;

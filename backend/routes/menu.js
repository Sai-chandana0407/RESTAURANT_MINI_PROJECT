import express from 'express';
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';

import auth from '../middleware/auth.js';
import roleCheck from '../middleware/role.js';

const router = express.Router();

router.get('/', getMenu);
router.post('/', auth, roleCheck(['admin']), createMenuItem);
router.put('/:id', auth, roleCheck(['admin']), updateMenuItem);
router.delete('/:id', auth, roleCheck(['admin']), deleteMenuItem);

export default router;

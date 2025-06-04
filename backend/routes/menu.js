import express from 'express';
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';

import { protect, admin } from '../middleware/auth.js';
import { roleCheck } from '../middleware/role.js';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

router.get('/', getMenu);
router.post('/', protect, roleCheck(['admin']), createMenuItem);
router.put('/:id', protect, roleCheck(['admin']), updateMenuItem);
router.delete('/:id', protect, roleCheck(['admin']), deleteMenuItem);

// Get all menu items
router.get('/all', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ message: 'Error fetching menu item' });
  }
});

export default router;

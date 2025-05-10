const express = require('express');
const router = express.Router();
const {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const auth = require('../middleware/auth');
const roleCheck = require('../middleware/role');

router.get('/', getMenu);

router.post('/', auth, roleCheck(['admin']), createMenuItem);
router.put('/:id', auth, roleCheck(['admin']), updateMenuItem);
router.delete('/:id', auth, roleCheck(['admin']), deleteMenuItem);

module.exports = router;

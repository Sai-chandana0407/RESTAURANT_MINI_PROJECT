import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;

    let totalAmount = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
      totalAmount += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

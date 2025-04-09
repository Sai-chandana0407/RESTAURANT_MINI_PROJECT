import InventoryItem from '../models/InventoryItem.js';

export const addItem = async (req, res) => {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item' });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
};

export const updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  try {
    const item = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update quantity' });
  }
};

export const getLowStockItems = async (req, res) => {
  try {
    const lowStock = await InventoryItem.find({
      $expr: { $lte: ["$quantity", "$threshold"] }
    });
    res.json(lowStock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch low stock items' });
  }
};

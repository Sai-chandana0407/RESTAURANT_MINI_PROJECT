import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['placed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'placed'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;

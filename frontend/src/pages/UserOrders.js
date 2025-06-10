import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserOrders.css';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      // Use different endpoints based on user role
      const endpoint = user?.role === 'admin' || user?.role === 'staff' 
        ? 'http://localhost:5000/api/orders'
        : 'http://localhost:5000/api/orders/my';

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. Please try again later.');
      setLoading(false);
    }
  };

  const handlePayment = (orderId) => {
    const paymentId = `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    navigate('/payment', { 
      state: { 
        orderId,
        paymentId,
        amount: orders.find(order => order._id === orderId)?.totalAmount
      } 
    });
  };

  if (loading) return <div className="text-center mt-4">Loading orders...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (orders.length === 0) return <div className="text-center mt-4">No orders found</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.name || 'N/A'}</td>
                <td>
                  <ul className="list-unstyled">
                    {order.items.map(item => (
                      <li key={item._id}>
                        {item.menuItem?.name || 'Unknown Item'} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span className={`badge ${order.status === 'placed' ? 'bg-warning' : 'bg-success'}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === 'placed' && (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePayment(order._id)}
                    >
                      Process Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserOrders; 

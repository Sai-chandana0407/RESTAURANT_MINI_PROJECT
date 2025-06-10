import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminMenuManager.css';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/menu';

function AdminMenuManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    available: true
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem('token');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  // Fetch menu items
  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, config);
      setMenuItems(res.data);
    } catch (err) {
      setError('Failed to fetch menu items');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Handle form input
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Add or update menu item
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // Ensure 'available' is boolean
      const submitForm = { ...form, available: Boolean(form.available) };
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, submitForm, config);
      } else {
        await axios.post(API_URL, submitForm, config);
      }
      setForm({ name: '', description: '', category: '', price: '', image: '', available: true });
      setEditingId(null);
      fetchMenu();
    } catch (err) {
      setError('Failed to save menu item. Make sure you are logged in as admin.');
    }
  };

  // Edit menu item
  const handleEdit = item => {
    setForm({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      image: item.image,
      available: item.available
    });
    setEditingId(item._id);
  };

  // Delete menu item
  const handleDelete = async id => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, config);
      fetchMenu();
    } catch (err) {
      setError('Failed to delete menu item.');
    }
  };

  return (
    <div className="container py-4" style={{ minHeight: '100vh', overflowY: 'auto' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Menu Management</h2>
        <Link to="/user-orders" className="btn btn-primary">
          View User Orders
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Name" required />
          </div>
          <div className="col-md-3">
            <input name="description" value={form.description} onChange={handleChange} className="form-control" placeholder="Description" />
          </div>
          <div className="col-md-2">
            <input name="category" value={form.category} onChange={handleChange} className="form-control" placeholder="Category" />
          </div>
          <div className="col-md-1">
            <input name="price" value={form.price} onChange={handleChange} className="form-control" placeholder="Price" type="number" min="0" step="0.01" required />
          </div>
          <div className="col-md-2">
            <input name="image" value={form.image} onChange={handleChange} className="form-control" placeholder="Image URL" />
          </div>
          <div className="col-md-1 d-flex align-items-center">
            <input name="available" type="checkbox" checked={form.available} onChange={handleChange} className="form-check-input me-2" />
            <span>Available</span>
          </div>
        </div>
        <button className="btn btn-success mt-3" type="submit">{editingId ? 'Update' : 'Add'} Item</button>
        {editingId && <button className="btn btn-secondary mt-3 ms-2" type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', category: '', price: '', image: '', available: true }); }}>Cancel</button>}
      </form>
      <h4>Menu Items</h4>
      {loading ? <div>Loading...</div> : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.image && <img src={item.image.startsWith('http') ? item.image : `/assets/${item.image.replace(/^\/assets\//, '')}`} alt={item.name} style={{ width: 60, height: 40, objectFit: 'cover' }} />}</td>
                <td>{item.available ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminMenuManager;

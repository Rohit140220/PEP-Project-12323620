import React, { useState } from 'react';
import './SupplierForm.css';

export default function SupplierForm({ onAdd }) {
  const [formData, setFormData] = useState({ name: '', contact: '', category: '', status: 'Active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="form-container">
      <h2>Onboard New Supplier</h2>
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" onChange={(e) => setFormData({...formData, contact: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Industry Category</label>
          <input type="text" onChange={(e) => setFormData({...formData, category: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Initial Status</label>
          <select onChange={(e) => setFormData({...formData, status: e.target.value})}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Save Supplier</button>
      </form>
    </div>
  );
}
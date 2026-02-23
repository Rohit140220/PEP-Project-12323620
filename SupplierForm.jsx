import React, { useState } from 'react';
import './SupplierForm.css';

export default function SupplierForm({ onAdd }) {
  // Expanded initial state with new fields
  const initialState = {
    name: '',
    category: '',
    contact: '',
    phone: '',
    website: '',
    address: '',
    status: 'Active',
    notes: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Send data to App.jsx
    
    // Show success banner
    setShowSuccess(true);
    
    // Reset form to blank
    setFormData(initialState);
    
    // Hide success banner after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleClear = () => {
    setFormData(initialState);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Onboard New Supplier</h2>
        <p>Enter the vendor's detailed information below to add them to your directory.</p>
      </div>

      {/* Dynamic Success Notification */}
      {showSuccess && (
        <div className="success-banner">
          ✅ Supplier successfully added to the directory!
        </div>
      )}

      <form onSubmit={handleSubmit} className="custom-form">
        
        {/* Section 1: Basic Info */}
        <h3 className="section-title">1. Company Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name <span className="required">*</span></label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
              placeholder="e.g., Acme Corp" 
            />
          </div>
          <div className="form-group">
            <label>Industry Category <span className="required">*</span></label>
            <input 
              type="text" 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
              required 
              placeholder="e.g., Manufacturing" 
            />
          </div>
        </div>

        {/* Section 2: Contact Info */}
        <h3 className="section-title">2. Contact Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Email Address <span className="required">*</span></label>
            <input 
              type="email" 
              value={formData.contact} 
              onChange={(e) => setFormData({...formData, contact: e.target.value})} 
              required 
              placeholder="contact@company.com" 
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              placeholder="+1 (555) 000-0000" 
            />
          </div>
          <div className="form-group">
            <label>Website URL</label>
            <input 
              type="url" 
              value={formData.website} 
              onChange={(e) => setFormData({...formData, website: e.target.value})} 
              placeholder="https://www.company.com" 
            />
          </div>
          <div className="form-group">
            <label>Headquarters</label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
              placeholder="City, Country" 
            />
          </div>
        </div>

        {/* Section 3: Status & Notes */}
        <h3 className="section-title">3. Account Settings</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Initial Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>Additional Notes</label>
            <textarea 
              value={formData.notes} 
              onChange={(e) => setFormData({...formData, notes: e.target.value})} 
              placeholder="Payment terms, special agreements, or internal notes..." 
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="btn-clear" onClick={handleClear}>Clear Form</button>
          <button type="submit" className="btn-submit">Save Supplier</button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import './UserProfile.css';

export default function UserProfile({ isAdmin, visitorProfile, setVisitorProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Added password to the state
  const [formData, setFormData] = useState({
    name: visitorProfile?.name || '',
    email: visitorProfile?.email || '',
    password: visitorProfile?.password || '' 
  });

  // Hardcoded Admin Data
  const adminData = {
    name: "System Administrator",
    role: "Owner / Admin",
    email: "admin@vendorbase.com",
    joined: "January 2024",
    permissions: "Full Access (Read, Write, Delete)"
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setVisitorProfile({
      name: formData.name,
      email: formData.email,
      password: formData.password, // Save the password
      role: "User",
      joined: visitorProfile?.joined || new Date().toLocaleDateString(),
      permissions: "Restricted Access (Read Only)"
    });
    setIsEditing(false);
  };

  // --- VIEW 1: Admin Profile ---
  if (isAdmin) {
    return (
      <div className="profile-container">
        <h1 className="page-title">My Profile</h1>
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar avatar-admin">{adminData.name.charAt(0)}</div>
            <div className="profile-title">
              <h2>{adminData.name}</h2>
              <span className="role-badge admin-badge">{adminData.role}</span>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-group"><label>Email</label><p>{adminData.email}</p></div>
            <div className="detail-group"><label>Account Security</label><p>Password Protected (••••••••)</p></div>
            <div className="detail-group"><label>Member Since</label><p>{adminData.joined}</p></div>
            <div className="detail-group"><label>Permissions</label><p>{adminData.permissions}</p></div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: Visitor Creating/Editing Profile ---
  if (isEditing || !visitorProfile) {
    return (
      <div className="profile-container">
        <h1 className="page-title">{visitorProfile ? "Edit Profile" : "Create Your Profile"}</h1>
        <div className="profile-card">
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
                placeholder="e.g., Jane Doe"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
                placeholder="jane@example.com"
              />
            </div>
            {/* New Password Field */}
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
                placeholder="Create a strong password"
                minLength="6"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-save">Save Profile</button>
              {visitorProfile && (
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW 3: Visitor Viewing Their Created Profile ---
  return (
    <div className="profile-container">
      <div className="title-row">
        <h1 className="page-title">My Profile</h1>
        <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
      </div>
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar avatar-user">{visitorProfile.name.charAt(0).toUpperCase()}</div>
          <div className="profile-title">
            <h2>{visitorProfile.name}</h2>
            <span className="role-badge user-badge">{visitorProfile.role}</span>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-group"><label>Email</label><p>{visitorProfile.email}</p></div>
          {/* Show masked password for security */}
          <div className="detail-group"><label>Account Security</label><p>Password Set (••••••••)</p></div>
          <div className="detail-group"><label>Member Since</label><p>{visitorProfile.joined}</p></div>
          <div className="detail-group"><label>Permissions</label><p>{visitorProfile.permissions}</p></div>
        </div>
      </div>
    </div>
  );
}
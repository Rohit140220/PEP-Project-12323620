import React, { useState } from 'react';
import './UserProfile.css';

export default function UserProfile({ isAdmin, visitorProfile, setVisitorProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Expanded state to hold more professional details
  const [formData, setFormData] = useState({
    name: visitorProfile?.name || '',
    email: visitorProfile?.email || '',
    password: visitorProfile?.password || '',
    jobTitle: visitorProfile?.jobTitle || '',
    company: visitorProfile?.company || '',
    phone: visitorProfile?.phone || ''
  });

  // Expanded Admin Data to look like a real enterprise owner
  const adminData = {
    name: "System Administrator",
    role: "Owner / Admin",
    email: "admin@vendorbase.com",
    phone: "+1 (800) 555-ADMIN",
    department: "IT Operations",
    location: "Global Headquarters",
    joined: "January 2024",
    lastLogin: new Date().toLocaleString(),
    permissions: "Full Access (Read, Write, Delete)"
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setVisitorProfile({
      ...formData,
      role: "User",
      joined: visitorProfile?.joined || new Date().toLocaleDateString(),
      permissions: "Restricted Access (Read Only)"
    });
    setIsEditing(false);
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile? This cannot be undone.")) {
      localStorage.removeItem('vendorbase_profile');
      setVisitorProfile(null);
    }
  };

  // --- VIEW 1: Admin Profile ---
  if (isAdmin) {
    return (
      <div className="profile-container">
        <h1 className="page-title">Admin Settings & Profile</h1>
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar avatar-admin">{adminData.name.charAt(0)}</div>
            <div className="profile-title">
              <h2>{adminData.name}</h2>
              <span className="role-badge admin-badge">{adminData.role}</span>
            </div>
          </div>
          
          <h3 className="section-title">Account Details</h3>
          <div className="profile-details-grid">
            <div className="detail-group"><label>Email Address</label><p>{adminData.email}</p></div>
            <div className="detail-group"><label>Phone Number</label><p>{adminData.phone}</p></div>
            <div className="detail-group"><label>Department</label><p>{adminData.department}</p></div>
            <div className="detail-group"><label>Office Location</label><p>{adminData.location}</p></div>
          </div>

          <h3 className="section-title">System Security</h3>
          <div className="profile-details-grid">
            <div className="detail-group"><label>Account Security</label><p>Password Protected (••••••••)</p></div>
            <div className="detail-group"><label>System Permissions</label><p>{adminData.permissions}</p></div>
            <div className="detail-group"><label>Member Since</label><p>{adminData.joined}</p></div>
            <div className="detail-group"><label>Last Active Login</label><p>{adminData.lastLogin}</p></div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: Visitor Creating/Editing Profile ---
  if (isEditing || !visitorProfile) {
    return (
      <div className="profile-container">
        <h1 className="page-title">{visitorProfile ? "Edit Your Profile" : "Set Up Your Account"}</h1>
        <div className="profile-card">
          <form onSubmit={handleSaveProfile} className="profile-form">
            
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="e.g., Jane Doe" />
              </div>
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" value={formData.jobTitle} onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} placeholder="e.g., Procurement Manager" />
              </div>
              <div className="form-group">
                <label>Company / Organization</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="e.g., Acme Corp" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <h3 className="section-title">Security & Login</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="jane@example.com" />
              </div>
              <div className="form-group">
                <label>Password <span className="required">*</span></label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required placeholder="Create a strong password" minLength="6" />
              </div>
            </div>

            <div className="form-actions">
              {visitorProfile && (
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              )}
              <button type="submit" className="btn-save">Save Profile</button>
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
        <h1 className="page-title">My Account</h1>
        <div className="header-actions">
          <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button className="btn-delete-account" onClick={handleDeleteProfile}>Delete Account</button>
        </div>
      </div>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar avatar-user">{visitorProfile.name.charAt(0).toUpperCase()}</div>
          <div className="profile-title">
            <h2>{visitorProfile.name}</h2>
            <span className="role-badge user-badge">{visitorProfile.role}</span>
          </div>
        </div>

        <h3 className="section-title">Professional Details</h3>
        <div className="profile-details-grid">
          <div className="detail-group"><label>Job Title</label><p>{visitorProfile.jobTitle || 'Not specified'}</p></div>
          <div className="detail-group"><label>Company</label><p>{visitorProfile.company || 'Not specified'}</p></div>
          <div className="detail-group"><label>Email Address</label><p>{visitorProfile.email}</p></div>
          <div className="detail-group"><label>Phone Number</label><p>{visitorProfile.phone || 'Not specified'}</p></div>
        </div>

        <h3 className="section-title">System Access</h3>
        <div className="profile-details-grid">
          <div className="detail-group"><label>Account Security</label><p>Password Set (••••••••)</p></div>
          <div className="detail-group"><label>System Permissions</label><p>{visitorProfile.permissions}</p></div>
          <div className="detail-group"><label>Member Since</label><p>{visitorProfile.joined}</p></div>
        </div>
      </div>
    </div>
  );
}

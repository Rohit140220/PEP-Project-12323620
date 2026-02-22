import React from 'react';
import './Sidebar.css';

export default function Sidebar({ activeView, setActiveView, isAdmin, setIsAdmin }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <h2>VendorBase</h2>
        
        {/* Link back to the Homepage */}
        <div className="go-home-btn" onClick={() => setActiveView('home')}>
          ← Back to Website
        </div>

        <ul>
          <li 
            className={activeView === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={activeView === 'suppliers' ? 'active' : ''} 
            onClick={() => setActiveView('suppliers')}
          >
            Supplier List
          </li>
          <li 
            className={activeView === 'profile' ? 'active' : ''} 
            onClick={() => setActiveView('profile')}
          >
            My Profile
          </li>
          {/* Conditionally render the Add Supplier tab only if Admin */}
          {isAdmin && (
            <li 
              className={activeView === 'add' ? 'active' : ''} 
              onClick={() => setActiveView('add')}
            >
              Add Supplier
            </li>
          )}
        </ul>
      </div>

      {/* Simulator Toggle to test roles */}
      <div className="role-simulator">
        <p>Current Role: <strong>{isAdmin ? 'Admin' : 'Visitor'}</strong></p>
        <button 
          className={`role-btn ${isAdmin ? 'admin-active' : 'user-active'}`}
          onClick={() => setIsAdmin(!isAdmin)}
        >
          Switch to {isAdmin ? 'Visitor' : 'Admin'} View
        </button>
      </div>
    </nav>
  );
}
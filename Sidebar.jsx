import React from 'react';
import './Sidebar.css';

export default function Sidebar({ activeView, setActiveView, isAdmin, setIsAdmin }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-icon">📦</div>
          <h2>VendorBase</h2>
        </div>
        
        {/* Link back to the Homepage */}
        <div className="go-home-btn" onClick={() => setActiveView('home')}>
          <span className="nav-icon">⬅️</span>
          <span>Back to Website</span>
        </div>

        {/* Main Navigation Menu */}
        <ul className="nav-menu">
          <p className="nav-label">MAIN MENU</p>
          <li 
            className={activeView === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveView('dashboard')}
          >
            <span className="nav-icon">📊</span> Dashboard
          </li>
          <li 
            className={activeView === 'suppliers' ? 'active' : ''} 
            onClick={() => setActiveView('suppliers')}
          >
            <span className="nav-icon">📋</span> Supplier Directory
          </li>
          
          <p className="nav-label">USER</p>
          <li 
            className={activeView === 'profile' ? 'active' : ''} 
            onClick={() => setActiveView('profile')}
          >
            <span className="nav-icon">👤</span> My Profile
          </li>
          
          {/* Conditionally render the Add Supplier tab only if Admin */}
          {isAdmin && (
            <>
              <p className="nav-label">MANAGEMENT</p>
              <li 
                className={activeView === 'add' ? 'active' : ''} 
                onClick={() => setActiveView('add')}
              >
                <span className="nav-icon">➕</span> Add Supplier
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Upgraded Simulator Toggle */}
      <div className="sidebar-bottom">
        <div className="role-simulator">
          <div className="role-header">
            <span className="nav-icon">⚙️</span> Environment
          </div>
          <div className="role-status">
            Viewing as: <strong className={isAdmin ? 'text-admin' : 'text-visitor'}>{isAdmin ? 'Admin' : 'Visitor'}</strong>
          </div>
          <button 
            className={`role-btn ${isAdmin ? 'admin-active' : 'user-active'}`}
            onClick={() => setIsAdmin(!isAdmin)}
          >
            Switch to {isAdmin ? 'Visitor' : 'Admin'}
          </button>
        </div>
      </div>
    </nav>
  );
}

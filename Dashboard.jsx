import React from 'react';
import './Dashboard.css';

export default function Dashboard({ suppliers }) {
  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'Active').length;
  const inactiveSuppliers = totalSuppliers - activeSuppliers;

  // Grab the 3 most recently added suppliers (reverses the list and slices it)
  const recentSuppliers = [...suppliers].reverse().slice(0, 3);

  // Automatically count how many suppliers belong to each category
  const categoryCounts = suppliers.reduce((acc, supplier) => {
    acc[supplier.category] = (acc[supplier.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      <header className="dashboard-top">
        <h1 className="page-title">System Overview</h1>
        <p className="welcome-text">Here is a summary of your supply chain data today.</p>
      </header>

      {/* Top Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📊</div>
          <div>
            <h3>Total Suppliers</h3>
            <p className="stat-number">{totalSuppliers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div>
            <h3>Active Partners</h3>
            <p className="stat-number active-text">{activeSuppliers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">⚠️</div>
          <div>
            <h3>Inactive Partners</h3>
            <p className="stat-number inactive-text">{inactiveSuppliers}</p>
          </div>
        </div>
      </div>

      {/* Bottom Widgets Section */}
      <div className="dashboard-widgets">
        
        {/* Widget 1: Category Breakdown */}
        <div className="widget-card">
          <h3 className="widget-title">Suppliers by Category</h3>
          <div className="category-list">
            {Object.keys(categoryCounts).length === 0 ? (
              <p className="empty-text">No categories found.</p>
            ) : (
              Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="category-item">
                  <span className="cat-name">{category}</span>
                  <span className="cat-count">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Widget 2: Recently Added Partners */}
        <div className="widget-card">
          <h3 className="widget-title">Recently Added Partners</h3>
          <div className="recent-list">
            {recentSuppliers.length === 0 ? (
              <p className="empty-text">No recent activity.</p>
            ) : (
              recentSuppliers.map((supplier) => (
                <div key={supplier.id} className="recent-item">
                  <div className="recent-avatar">{supplier.name.charAt(0)}</div>
                  <div className="recent-info">
                    <h4>{supplier.name}</h4>
                    <p>{supplier.contact}</p>
                  </div>
                  <span className={`badge ${supplier.status.toLowerCase()}`}>
                    {supplier.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
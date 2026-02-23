import React from 'react';
import './Dashboard.css';

export default function Dashboard({ suppliers }) {
  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'Active').length;
  const inactiveSuppliers = totalSuppliers - activeSuppliers;

  // Grab the 4 most recently added suppliers
  const recentSuppliers = [...suppliers].reverse().slice(0, 4);

  // Automatically count and calculate percentages for categories
  const categoryCounts = suppliers.reduce((acc, supplier) => {
    acc[supplier.category] = (acc[supplier.category] || 0) + 1;
    return acc;
  }, {});

  // Sort categories from highest to lowest and calculate width percentage
  const categoryData = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalSuppliers > 0 ? Math.round((count / totalSuppliers) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count);

  // Get today's date formatted nicely
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="page-title">System Overview</h1>
          <p className="welcome-text">Supply chain analytics for {today}.</p>
        </div>
        <div className="header-actions">
          <button className="btn-report">📄 Generate Report</button>
        </div>
      </header>

      {/* Top Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📦</div>
          <div className="stat-info">
            <h3>Total Suppliers</h3>
            <div className="stat-value-row">
              <p className="stat-number">{totalSuppliers}</p>
              <span className="trend-badge positive">↑ 12%</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <h3>Active Partners</h3>
            <div className="stat-value-row">
              <p className="stat-number active-text">{activeSuppliers}</p>
              <span className="trend-badge positive">↑ 5%</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">⚠️</div>
          <div className="stat-info">
            <h3>Inactive / Pending</h3>
            <div className="stat-value-row">
              <p className="stat-number inactive-text">{inactiveSuppliers}</p>
              <span className="trend-badge negative">↓ 2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Widgets Section */}
      <div className="dashboard-widgets">
        
        {/* Widget 1: Category Breakdown with Progress Bars */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Industry Breakdown</h3>
          </div>
          <div className="category-list">
            {categoryData.length === 0 ? (
              <p className="empty-text">No categories found.</p>
            ) : (
              categoryData.map((cat) => (
                <div key={cat.name} className="category-item">
                  <div className="cat-info">
                    <span className="cat-name">{cat.name}</span>
                    <span className="cat-count">{cat.count} ({cat.percentage}%)</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Widget 2: Recently Added Partners */}
        <div className="widget-card">
          <div className="widget-header">
            <h3 className="widget-title">Recent Onboarding</h3>
          </div>
          <div className="recent-list">
            {recentSuppliers.length === 0 ? (
              <p className="empty-text">No recent activity.</p>
            ) : (
              recentSuppliers.map((supplier) => (
                <div key={supplier.id} className="recent-item">
                  <div className="recent-avatar">{supplier.name.charAt(0)}</div>
                  <div className="recent-details">
                    <h4>{supplier.name}</h4>
                    <a href={`mailto:${supplier.contact}`} className="recent-email">
                      {supplier.contact}
                    </a>
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

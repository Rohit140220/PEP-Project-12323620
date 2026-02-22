import React from 'react';
import './Home.css';

export default function Home({ setActiveView }) {
  return (
    <div className="home-container">
      {/* Navigation Bar for Home Page */}
      <nav className="home-nav">
        <div className="logo">VendorBase</div>
        <button className="btn-login" onClick={() => setActiveView('dashboard')}>
          Go to Dashboard →
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Smarter Supplier Management</h1>
        <p>
          Streamline your vendor onboarding, track active partnerships, and securely manage your supply chain all in one powerful dashboard.
        </p>
        <button className="btn-cta" onClick={() => setActiveView('dashboard')}>
          Get Started Now
        </button>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Centralized Directory</h3>
          <p>Keep all your supplier contacts, categories, and statuses organized in a single, easily searchable location.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Role-Based Security</h3>
          <p>Protect sensitive data with Admin and Visitor views. Control exactly who can view, add, or delete vendor records.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Real-Time Analytics</h3>
          <p>Instantly track your total suppliers, active partnerships, and inactive vendors with our dynamic dashboard.</p>
        </div>
      </section>

      {/* Standard Website Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-column brand-col">
            <h2>VendorBase</h2>
            <p>Your complete solution for modern supply chain management.</p>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press & Media</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#api">API Documentation</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 VendorBase Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
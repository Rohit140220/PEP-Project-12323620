import React, { useState } from 'react';
import './Home.css';

export default function Home({ setActiveView }) {
  // State to control the popup window
  const [activeModal, setActiveModal] = useState(null);

  // Helper function to close the modal when clicking outside of it
  const closeModal = (e) => {
    if (e.target.className === 'modal-overlay') setActiveModal(null);
  };

  // Content for the different footer links
  const modalContent = {
    'About Us': "VendorBase was founded to simplify supply chain management for businesses of all sizes. Our mission is to provide intuitive tools that foster stronger vendor relationships.",
    'Careers': "We're always looking for talented individuals! Currently, we have open positions in Engineering, Product, and Sales. Check back soon for specific job listings.",
    'Press & Media': "For all press inquiries and media kits, please contact media@vendorbase.com.",
    'Help Center': "Need assistance? Our support team is available 24/7. Access detailed guides and FAQs in your admin dashboard.",
    'API Documentation': "Our REST API allows seamless integration with your existing ERP systems. Documentation is available for enterprise clients upon request.",
    'Blog': "Stay tuned! We'll be launching our blog soon with industry insights on supply chain optimization and procurement strategies.",
    'Privacy Policy': "We take your data seriously. VendorBase complies with industry-standard encryption protocols. We do not sell your personal or vendor data to third parties.",
    'Terms of Service': "By using VendorBase, you agree to our standard terms of use. This platform is provided 'as is' for the purpose of supplier management.",
    'Contact Us': "Reach out to us anytime at hello@vendorbase.com or call our support line at 1-800-VENDORB."
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
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

      {/* Interactive Footer Section */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-column brand-col">
            <h2>VendorBase</h2>
            <p>Your complete solution for modern supply chain management.</p>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li onClick={() => setActiveModal('About Us')}>About Us</li>
              <li onClick={() => setActiveModal('Careers')}>Careers</li>
              <li onClick={() => setActiveModal('Press & Media')}>Press & Media</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li onClick={() => setActiveModal('Help Center')}>Help Center</li>
              <li onClick={() => setActiveModal('API Documentation')}>API Documentation</li>
              <li onClick={() => setActiveModal('Blog')}>Blog</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li onClick={() => setActiveModal('Privacy Policy')}>Privacy Policy</li>
              <li onClick={() => setActiveModal('Terms of Service')}>Terms of Service</li>
              <li onClick={() => setActiveModal('Contact Us')}>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 VendorBase Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* The Dynamic Modal (Popup Box) */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box">
            <button className="btn-close-modal" onClick={() => setActiveModal(null)}>✖</button>
            <h2>{activeModal}</h2>
            <div className="modal-divider"></div>
            <p className="modal-text">{modalContent[activeModal]}</p>
            <button className="btn-modal-action" onClick={() => setActiveModal(null)}>
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

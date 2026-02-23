import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import SupplierTable from './SupplierTable.jsx';
import SupplierForm from './SupplierForm.jsx';
import UserProfile from './UserProfile.jsx';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(true); 
  
  // 1. Load Profile from Local Storage (or start null)
  const [visitorProfile, setVisitorProfile] = useState(() => {
    const savedProfile = localStorage.getItem('vendorbase_profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  }); 
  
  // 2. Load Suppliers from Local Storage (or start with defaults)
  const [suppliers, setSuppliers] = useState(() => {
    const savedSuppliers = localStorage.getItem('vendorbase_suppliers');
    if (savedSuppliers) return JSON.parse(savedSuppliers);
    return [
      { id: 1, name: 'TechNova Solutions', contact: 'alice@technova.com', category: 'Electronics', status: 'Active' },
      { id: 2, name: 'Global Logistics', contact: 'bob@global.com', category: 'Shipping', status: 'Inactive' }
    ];
  });

  // 3. Save to Local Storage every time data changes!
  useEffect(() => {
    localStorage.setItem('vendorbase_suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    if (visitorProfile) {
      localStorage.setItem('vendorbase_profile', JSON.stringify(visitorProfile));
    }
  }, [visitorProfile]);

  useEffect(() => {
    if (!isAdmin && activeView === 'add') {
      setActiveView('dashboard');
    }
  }, [isAdmin, activeView]);

  const handleAddSupplier = (newSupplier) => {
    setSuppliers([...suppliers, { id: Date.now(), ...newSupplier }]);
    setActiveView('suppliers');
  };

  const handleDelete = (id) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  if (activeView === 'home') return <Home setActiveView={setActiveView} />;

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} setActiveView={setActiveView} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="main-content">
        {activeView === 'dashboard' && <Dashboard suppliers={suppliers} />}
        {activeView === 'suppliers' && <SupplierTable suppliers={suppliers} onDelete={handleDelete} isAdmin={isAdmin} />}
        {activeView === 'add' && isAdmin && <SupplierForm onAdd={handleAddSupplier} />}
        {activeView === 'profile' && <UserProfile isAdmin={isAdmin} visitorProfile={visitorProfile} setVisitorProfile={setVisitorProfile} />}
      </main>
    </div>
  );
}

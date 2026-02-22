import React, { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import SupplierTable from './SupplierTable.jsx';
import SupplierForm from './SupplierForm.jsx';
import UserProfile from './UserProfile.jsx';
import './App.css';

export default function App() {
  // Start the app on the 'home' page by default
  const [activeView, setActiveView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(true); 
  const [visitorProfile, setVisitorProfile] = useState(null); 
  
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'TechNova Solutions', contact: 'alice@technova.com', category: 'Electronics', status: 'Active' },
    { id: 2, name: 'Global Logistics', contact: 'bob@global.com', category: 'Shipping', status: 'Inactive' },
  ]);

  // Security check: Kick non-admins out of the 'add' page
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

  // If the view is 'home', ONLY show the full-screen landing page
  if (activeView === 'home') {
    return <Home setActiveView={setActiveView} />;
  }

  // Otherwise, show the Dashboard layout with the Sidebar
  return (
    <div className="app-layout">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />
      
      <main className="main-content">
        {activeView === 'dashboard' && <Dashboard suppliers={suppliers} />}
        
        {activeView === 'suppliers' && (
          <SupplierTable suppliers={suppliers} onDelete={handleDelete} isAdmin={isAdmin} />
        )}
        
        {activeView === 'add' && isAdmin && (
          <SupplierForm onAdd={handleAddSupplier} />
        )}

        {activeView === 'profile' && (
          <UserProfile 
            isAdmin={isAdmin} 
            visitorProfile={visitorProfile} 
            setVisitorProfile={setVisitorProfile} 
          />
        )}
      </main>
    </div>
  );
}
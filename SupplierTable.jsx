import React, { useState } from 'react';
import './SupplierTable.css';

export default function SupplierTable({ suppliers, onDelete, isAdmin }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Compute the filtered list in real-time
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || supplier.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Function to download the table data as a CSV file
  const handleExportCSV = () => {
    const headers = ['Company Name,Contact Email,Category,Status'];
    const rows = filteredSuppliers.map(s => `"${s.name}","${s.contact}","${s.category}","${s.status}"`);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vendorbase_suppliers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="table-container">
      <div className="table-header-row">
        <h2>Supplier Directory</h2>
        <button onClick={handleExportCSV} className="btn-export">📥 Export CSV</button>
      </div>

      {/* New Toolbar for Search and Filter */}
      <div className="table-toolbar">
        <input 
          type="text" 
          placeholder="Search by name or category..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Contact</th>
              <th>Category</th>
              <th>Status</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? "5" : "4"} className="empty-table">
                  No suppliers match your search.
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.contact}</td>
                  <td>{s.category}</td>
                  <td>
                    <span className={`badge ${s.status.toLowerCase()}`}>
                      {s.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td>
                      <button onClick={() => onDelete(s.id)} className="btn-delete">Remove</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

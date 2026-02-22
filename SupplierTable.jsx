import React from 'react';
import './SupplierTable.css';

export default function SupplierTable({ suppliers, onDelete, isAdmin }) {
  return (
    <div className="table-container">
      <h2>Supplier Directory</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Contact</th>
            <th>Category</th>
            <th>Status</th>
            {/* Only show the Action header if Admin */}
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.contact}</td>
              <td>{s.category}</td>
              <td>
                <span className={`badge ${s.status.toLowerCase()}`}>
                  {s.status}
                </span>
              </td>
              {/* Only show the Delete button if Admin */}
              {isAdmin && (
                <td>
                  <button onClick={() => onDelete(s.id)} className="btn-delete">Remove</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
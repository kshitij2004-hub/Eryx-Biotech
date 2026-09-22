import React from 'react';

function AdminDashboard({ products }) {
  return (
    <div style={{ padding: '40px 0', color: 'var(--text-primary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)' }}>Ecosystem Terminal Control</h2>
        <span style={{ fontSize: '12px', color: '#00FF66', background: 'rgba(0,255,102,0.1)', padding: '6px 14px', borderRadius: '4px', fontFamily: 'monospace' }}>ROOT ACCESS ENABLED</span>
      </div>
      
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color, rgba(161,161,181,0.15))', padding: '25px', borderRadius: '8px', transition: 'background 0.3s, border 0.3s' }}>
        <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '20px' }}>Active Cloud Ledger Nodes ({products.length})</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, rgba(161,161,181,0.2))', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '12px' }}>COMPOUND ID</th>
              <th style={{ padding: '12px' }}>DESIGNATION</th>
              <th style={{ padding: '12px' }}>CLASSIFICATION</th>
              <th style={{ padding: '12px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={{ borderBottom: '1px solid var(--border-color, rgba(161,161,181,0.08))' }}>
                <td style={{ padding: '12px', fontFamily: 'monospace', color: '#5B3FFF' }}>0x{p._id}7F</td>
                <td style={{ padding: '12px', fontWeight: '500', color: 'var(--text-primary)' }}>{p.name}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{p.category}</td>
                <td style={{ padding: '12px', color: '#00FF66' }}>ACTIVE</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
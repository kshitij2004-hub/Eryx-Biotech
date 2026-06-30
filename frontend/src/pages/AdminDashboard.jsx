import React from 'react';

function AdminDashboard({ products }) {
  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#F3F4F6' }}>Ecosystem Terminal Control</h2>
        <span style={{ fontSize: '12px', color: '#00FF66', background: 'rgba(0,255,102,0.1)', padding: '6px 14px', borderRadius: '4px', fontFamily: 'monospace' }}>ROOT ACCESS ENABLED</span>
      </div>
      <div style={{ background: '#12121A', border: '1px solid rgba(161,161,181,0.1)', padding: '25px', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '18px', color: '#F3F4F6', marginBottom: '20px' }}>Active Cloud Ledger Nodes ({products.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(161,161,181,0.2)', color: '#A1A1B5' }}>
              <th style={{ padding: '12px' }}>COMPOUND ID</th>
              <th style={{ padding: '12px' }}>DESIGNATION</th>
              <th style={{ padding: '12px' }}>CLASSIFICATION</th>
              <th style={{ padding: '12px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={{ borderBottom: '1px solid rgba(161,161,181,0.05)' }}>
                <td style={{ padding: '12px', fontFamily: 'monospace', color: '#5B3FFF' }}>0x{p._id}7F</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{p.name}</td>
                <td style={{ padding: '12px' }}>{p.category}</td>
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
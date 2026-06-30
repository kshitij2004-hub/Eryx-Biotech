import React from 'react';

function AdminLogin({ setCurrentPage }) {
  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary bypass to preview the admin control view
    setCurrentPage('dashboard');
  };

  return (
    <div style={{ padding: '60px 0', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '28px', color: '#F3F4F6', marginBottom: '10px' }}>Core System Access</h2>
      <p style={{ color: '#A1A1B5', fontSize: '14px', marginBottom: '30px' }}>Authorized clearance profiles only</p>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Operator Clearance ID" style={{ padding: '12px', background: '#12121A', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: '#FFF' }} />
        <input type="password" placeholder="Cryptographic Key Pass" style={{ padding: '12px', background: '#12121A', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: '#FFF' }} />
        <button type="submit" style={{ background: 'none', border: '1px solid #F5C518', color: '#F5C518', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>INITIALIZE OVERRIDE</button>
      </form>
    </div>
  );
}

export default AdminLogin;
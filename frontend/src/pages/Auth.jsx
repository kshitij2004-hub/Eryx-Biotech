import React, { useState } from 'react';

function Auth({ setUser, setCurrentPage }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuthentication = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Sign Up: Anyone can register as a standard user
      setUser({ name: name || 'User', role: 'user' });
      setCurrentPage('safety');
    } else {
      // Sign In: Check for the secret Admin credentials first
      if (emailOrId === 'ERYX-ROOT-99' && password === 'admin123') {
        setUser({ name: 'Administrator', role: 'admin' });
        setCurrentPage('dashboard'); // Takes them to the hidden admin panel
      } else {
        // Standard User Login: Accepts ANY other email/password combinations automatically
        const displayName = emailOrId.split('@')[0] || 'User';
        setUser({ name: displayName, role: 'user' });
        setCurrentPage('safety'); // Takes them to the general safety page
      }
    }
  };

  return (
    <div style={{ padding: '60px 0', maxWidth: '420px', margin: '0 auto', color: 'var(--text-primary)' }}>
      
      {/* Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', borderBottom: '1px solid var(--border-color, rgba(161,161,181,0.15))', paddingBottom: '15px', transition: 'border-color 0.3s' }}>
        <button 
          type="button"
          onClick={() => setIsSignUp(false)} 
          style={{ background: 'none', border: 'none', color: !isSignUp ? '#F5C518' : 'var(--text-secondary)', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          SIGN IN
        </button>
        <button 
          type="button"
          onClick={() => setIsSignUp(true)} 
          style={{ background: 'none', border: 'none', color: isSignUp ? '#F5C518' : 'var(--text-secondary)', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          CREATE ACCOUNT
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', margin: '0 0 8px 0', fontWeight: '600' }}>
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
          {isSignUp ? 'Sign up to submit and monitor safety reports.' : 'Please log in to access your dashboard.'}
        </p>
      </div>

      <form onSubmit={handleAuthentication} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {isSignUp && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '14px', background: 'var(--bg-input)', border: '1px solid var(--border-color, rgba(161,161,181,0.2))', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '14px', transition: 'background 0.3s, border 0.3s' }} 
          />
        )}

        <input 
          type="text" 
          placeholder="Email Address" 
          value={emailOrId}
          onChange={(e) => setEmailOrId(e.target.value)}
          required
          style={{ padding: '14px', background: 'var(--bg-input)', border: '1px solid var(--border-color, rgba(161,161,181,0.2))', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '14px', transition: 'background 0.3s, border 0.3s' }} 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '14px', background: 'var(--bg-input)', border: '1px solid var(--border-color, rgba(161,161,181,0.2))', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '14px', transition: 'background 0.3s, border 0.3s' }} 
        />

        <button 
          type="submit" 
          style={{ background: 'none', border: '1px solid #F5C518', color: '#F5C518', padding: '14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {isSignUp ? 'Register' : 'Log In'}
        </button>
      </form>

      {/* Secret panel hint - only displays when running locally for your development convenience */}
      {!isSignUp && import.meta.env.DEV && (
        <div style={{ marginTop: '25px', padding: '12px', borderRadius: '4px', background: 'var(--bg-card, rgba(245,197,24,0.05))', border: '1px solid rgba(245,197,24,0.15)', fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', transition: 'background 0.3s' }}>
          💡 **Admin Gateway:** Use <span style={{ color: '#F5C518' }}>ERYX-ROOT-99</span> / <span style={{ color: '#F5C518' }}>admin123</span> to bypass to the admin layout. Any other input logs in as a normal user.
        </div>
      )}
    </div>
  );
}

export default Auth;
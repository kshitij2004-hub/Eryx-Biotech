import React, { useState } from 'react';

function Auth({ setUser, setCurrentPage }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuthentication = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Use the name they signed up with, or default to a clean fallback
      setUser({ name: name || 'User', role: 'user' });
      setCurrentPage('safety');
    } else {
      // 🕵️‍♂️ THE ADMIN OVERRIDE CHECK
      if (emailOrId === 'ERYX-ROOT-99' && password === 'admin123') {
        setUser({ name: 'Administrator', role: 'admin' });
        setCurrentPage('dashboard');
      } else {
        // Standard User Login - Extracting a display name from the email handle for the UI
        const displayName = emailOrId.split('@')[0] || 'User';
        setUser({ name: displayName, role: 'user' });
        setCurrentPage('safety');
      }
    }
  };

  return (
    <div style={{ padding: '60px 0', maxWidth: '420px', margin: '0 auto' }}>
      
      {/* Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', borderBottom: '1px solid rgba(161,161,181,0.1)', paddingBottom: '15px' }}>
        <button 
          type="button"
          onClick={() => setIsSignUp(false)} 
          style={{ background: 'none', border: 'none', color: !isSignUp ? '#F5C518' : '#A1A1B5', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          SIGN IN
        </button>
        <button 
          type="button"
          onClick={() => setIsSignUp(true)} 
          style={{ background: 'none', border: 'none', color: isSignUp ? '#F5C518' : '#A1A1B5', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          CREATE ACCOUNT
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', color: '#F3F4F6', margin: '0 0 8px 0', fontWeight: '600' }}>
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <p style={{ color: '#A1A1B5', fontSize: '14px', margin: 0 }}>
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
            style={{ padding: '14px', background: '#12121A', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: '#FFF', fontSize: '14px' }} 
          />
        )}

        {/* Consistently maps to Email Address for both Sign Up and Sign In */}
        <input 
          type="text" 
          placeholder="Email Address" 
          value={emailOrId}
          onChange={(e) => setEmailOrId(e.target.value)}
          required
          style={{ padding: '14px', background: '#12121A', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: '#FFF', fontSize: '14px' }} 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '14px', background: '#12121A', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: '#FFF', fontSize: '14px' }} 
        />

        <button 
          type="submit" 
          style={{ background: 'none', border: '1px solid #F5C518', color: '#F5C518', padding: '14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {isSignUp ? 'Register' : 'Log In'}
        </button>
      </form>

      {/* 🛡️ SAFE ENVIRONMENT GUARD */}
      {/* This block renders ONLY during local development and completely self-destructs in production builds */}
      {!isSignUp && import.meta.env.DEV && (
        <div style={{ marginTop: '25px', padding: '12px', borderRadius: '4px', background: 'rgba(245,197,24,0.05)', border: '1px solid rgba(245,197,24,0.15)', fontSize: '12px', color: '#A1A1B5', textAlign: 'center' }}>
          💡 **Admin Demo Account:** Enter <span style={{ color: '#F5C518' }}>ERYX-ROOT-99</span> in the email field with password <span style={{ color: '#F5C518' }}>admin123</span> to open the admin panel.
        </div>
      )}
    </div>
  );
}

export default Auth;
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate a secure handshake/transmission broadcast since it's informational
    setTimeout(() => {
      setLoading(false);
      setStatus({ 
        type: 'success', 
        text: 'Data packet broadcasted. Transmission logged to local session context.' 
      });
      setFormData({ email: '', message: '' });
    }, 1200);
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'window.innerWidth > 768 ? "1fr 1fr" : "1fr"', gap: '50px', alignItems: 'start', minHeight: '80vh' }}>
      
      {/* 📡 LEFT PANEL: OFFICIAL CORPORATE DIRECTORY VECTOR */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#F3F4F6', marginBottom: '10px', letterSpacing: '-0.5px' }}>
            Contact Us
          </h2>
          <div style={{ height: '2px', width: '60px', background: '#F5C518', marginBottom: '25px' }}></div>
        </div>

        {/* Head Office Node */}
        <div style={{ padding: '20px', background: '#12121A', borderLeft: '3px solid #F5C518', borderRadius: '0 4px 4px 0' }}>
          <h4 style={{ color: '#F3F4F6', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📍 Head Office
          </h4>
          <p style={{ color: '#A1A1B5', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            Corporate Office: A/6-202, AMBERNATH(W), MIDC,<br />
            THANE, MAHARASHTRA - 421505
          </p>
        </div>

        {/* Comms Tier (Phone & WhatsApp) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#12121A', borderRadius: '4px', border: '1px solid rgba(161,161,181,0.1)' }}>
            <h4 style={{ color: '#F3F4F6', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              📞 Phone
            </h4>
            <a href="tel:+919136506985" style={{ color: '#F5C518', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>
              +91-91365-06985
            </a>
          </div>

          <div style={{ padding: '20px', background: '#12121A', borderRadius: '4px', border: '1px solid rgba(161,161,181,0.1)' }}>
            <h4 style={{ color: '#F3F4F6', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              💬 WhatsApp
            </h4>
            <a href="https://wa.me/919136506985" target="_blank" rel="noopener noreferrer" style={{ color: '#2ecc71', fontSize: '16px', fontWeight: '600', textDecoration: 'none' }}>
              +91-91365-06985
            </a>
          </div>
        </div>

        {/* Email & Corporate Registration */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ padding: '20px', background: '#12121A', borderRadius: '4px', border: '1px solid rgba(161,161,181,0.1)' }}>
            <h4 style={{ color: '#F3F4F6', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              ✉️ Email
            </h4>
            <a href="mailto:eryxhealthcare@gmail.com" style={{ color: '#F5C518', fontSize: '15px', textDecoration: 'none', breakWord: 'break-all' }}>
              eryxhealthcare@gmail.com
            </a>
          </div>

          <div style={{ padding: '20px', background: '#12121A', borderRadius: '4px', border: '1px solid rgba(161,161,181,0.1)' }}>
            <h4 style={{ color: '#F3F4F6', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              🔑 CIN
            </h4>
            <code style={{ color: '#A1A1B5', fontSize: '13px', fontFamily: 'monospace', background: '#08080B', padding: '4px 6px', borderRadius: '2px' }}>
              U24100MH2018PTC317668
            </code>
          </div>
        </div>

        {/* Branch / Logistical Nodes */}
        <div style={{ padding: '20px', background: '#12121A', borderLeft: '3px solid #6f42c1', borderRadius: '0 4px 4px 0' }}>
          <h4 style={{ color: '#F3F4F6', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏢 Branch Office / Warehouse
          </h4>
          <p style={{ color: '#A1A1B5', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            Central Depot/ Warehouse: Village- Chaturpur Ichhuri,<br />
            P.O. - Kurebhar, Ayodhya- Sultanpur Road,<br />
            Dist- Sultanpur, 228151
          </p>
        </div>
      </div>

    </div>
  );
}

export default Contact;
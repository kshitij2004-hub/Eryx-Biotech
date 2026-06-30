import React from 'react';
import { Link } from 'react-router-dom'; // 1. Added Link import

function Footer({ handleNavigation }) {
  const footerStyle = {
    backgroundColor: 'transparent',
    color: '#A1A1B5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '80px 20px 30px 20px',
    borderTop: '1px solid rgba(161, 161, 181, 0.08)',
    fontSize: '14px',
    lineHeight: '1.6'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '40px',
    marginBottom: '50px'
  };

  const columnStyle = {
    flex: '1 1 220px',
    minWidth: '220px'
  };

  const brandColumnStyle = {
    flex: '1 1 280px',
    minWidth: '250px'
  };

  const headingStyle = {
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '25px',
    borderBottom: '1px solid rgba(161, 161, 181, 0.08)',
    paddingBottom: '10px'
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const linkStyle = {
    color: '#A1A1B5',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    fontSize: '13px',
    fontWeight: '500'
  };

  const contactItemStyle = {
    marginBottom: '18px',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const contactLabelStyle = {
    color: '#F3F4F6',
    fontWeight: '600',
    fontSize: '12px',
    letterSpacing: '0.3px'
  };



  const handleLinkHover = (e, color) => {
    e.target.style.color = color;
  };

  const handleIconHover = (e, isEnter) => {
    e.currentTarget.style.backgroundColor = isEnter ? 'rgba(91, 63, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)';
    e.currentTarget.style.borderColor = isEnter ? '#5B3FFF' : 'rgba(255, 255, 255, 0.05)';
    e.currentTarget.style.color = isEnter ? '#FFFFFF' : '#A1A1B5';
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* COLUMN 1: BRAND LOGO & CORPORATE DESCRIPTION */}
        <div style={brandColumnStyle}>
          <div style={{ marginBottom: '22px' }}>
            <Link to="/">
              <img 
                src="/assets/logos/eryx-logo.png" 
                alt="Eryx Corporate Logo" 
                style={{ height: '52px', width: 'auto', objectFit: 'contain', cursor: 'pointer' }}
              />
            </Link>
          </div>
          <p style={{ fontSize: '13px', color: '#8E8E9F', paddingRight: '20px', lineHeight: '1.6', margin: 0 }}>
            Innovating healthcare through research-driven pharmaceutical solutions. 
            Committed to quality, trust, and global health standards.
          </p>
        </div>

        {/* COLUMN 2: QUICK NAVIGATION MAP */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Quick Links</h4>
          <ul style={listStyle}>
            <li><Link to="/" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Home</Link></li>
            <li><Link to="/about" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>About Us</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>All Products</Link></li>
            <li><Link to="/about" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Our Directors</Link></li>
            <li><Link to="/contact" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Contact Us</Link></li>
          </ul>
        </div>

        {/* COLUMN 3: PRODUCT SEGMENTS */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Product Categories</h4>
          <ul style={listStyle}>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Tablets</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Capsules</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Syrups</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Injections</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#FFFFFF')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Supplements</Link></li>
          </ul>
        </div>

        {/* COLUMN 4: DETAILED CORPORATE REGISTRY DATA */}
        <div style={{ ...columnStyle, flex: '1 1 320px' }}>
          <h4 style={headingStyle}>Contact Us</h4>
          
          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>📍 Head Office:</span>
            <span style={{ color: '#E4E4E7' }}>Corporate Office: A/6-202, AMBERNATH(W), MIDC, THANE, MAHARASHTRA- 421505</span>
          </div>

          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={contactItemStyle}>
              <span style={contactLabelStyle}>📞 Phone:</span>
              <span style={{ color: '#E4E4E7' }}>+91-91365-06985</span>
            </div>
            <div style={contactItemStyle}>
              <span style={contactLabelStyle}>💬 WhatsApp:</span>
              <span style={{ color: '#E4E4E7' }}>+91-91365-06985</span>
            </div>
          </div>

          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>✉️ Email:</span>
            <span style={{ color: '#F5C518', fontWeight: '500' }}>eryxhealthcare@gmail.com</span>
          </div>

          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>🔑 CIN:</span>
            <span style={{ fontFamily: 'monospace', letterSpacing: '0.5px', color: '#E4E4E7' }}>U24100MH2018PTC317668</span>
          </div>

          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>🏢 Branch Office / Warehouse:</span>
            <span style={{ color: '#E4E4E7' }}>Central Depot/ Warehouse: Village- Chaturpur Ichhuri, P.O. - Kurebhar, Ayodhya- Sultanpur Road, Dist- Sultanpur, 228151</span>
          </div>
        </div>

      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(161, 161, 181, 0.06)', margin: '30px 0 25px 0' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#6B6B7C' }}>
        <div>
          &copy; 2026 Eryx Pharmaceuticals. All Rights Reserved.
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <Link to="/privacy" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#F3F4F6')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Privacy Policy</Link> | 
          <Link to="/terms" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#F3F4F6')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Terms & Conditions</Link> | 
          <Link to="/refunds" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#F3F4F6')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Refund & Cancellation Terms</Link> | 
          <Link to="/payment" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#F3F4F6')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Payment Terms</Link> | 
          <Link to="/order-terms" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#F3F4F6')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Order Terms</Link> | 
          <Link to="/sitemap" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#F3F4F6')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>Sitemap</Link> | 
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, '#F3F4F6')} onMouseLeave={(e) => handleLinkHover(e, '#A1A1B5')}>XML Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ handleNavigation, darkMode = true }) {
  // 🎨 Dynamic Theme Colors matching global portal design
  const currentTheme = {
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    textSubtle: darkMode ? '#8E8E9F' : '#6B7280',
    labelColor: darkMode ? '#F3F4F6' : '#111827',
    valueColor: darkMode ? '#E4E4E7' : '#374151',
    borderLight: darkMode ? 'rgba(161, 161, 181, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    borderFaint: darkMode ? 'rgba(161, 161, 181, 0.06)' : 'rgba(0, 0, 0, 0.06)',
    footerBg: 'transparent'
  };

  const footerStyle = {
    backgroundColor: currentTheme.footerBg,
    color: currentTheme.textMuted,
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    padding: '80px max(4%, 20px) 30px max(4%, 20px)',
    borderTop: `1px solid ${currentTheme.borderLight}`,
    fontSize: '14px',
    lineHeight: '1.6',
    transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
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
    color: currentTheme.textMain,
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '25px',
    borderBottom: `1px solid ${currentTheme.borderLight}`,
    paddingBottom: '10px',
    transition: 'color 0.3s ease, border-color 0.3s ease'
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
    color: currentTheme.textMuted,
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
    color: currentTheme.labelColor,
    fontWeight: '600',
    fontSize: '12px',
    letterSpacing: '0.3px',
    transition: 'color 0.3s ease'
  };

  const handleLinkHover = (e, color) => {
    e.target.style.color = color;
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
          <p style={{ fontSize: '13px', color: currentTheme.textSubtle, paddingRight: '20px', lineHeight: '1.6', margin: 0, transition: 'color 0.3s ease' }}>
            Innovating healthcare through research-driven pharmaceutical solutions. 
            Committed to quality, trust, and global health standards.
          </p>
        </div>

        {/* COLUMN 2: QUICK NAVIGATION MAP */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Quick Links</h4>
          <ul style={listStyle}>
            <li><Link to="/" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Home</Link></li>
            <li><Link to="/about" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>About Us</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>All Products</Link></li>
            <li><Link to="/about" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Our Directors</Link></li>
            <li><Link to="/contact" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Contact Us</Link></li>
          </ul>
        </div>

        {/* COLUMN 3: PRODUCT SEGMENTS */}
        <div style={columnStyle}>
          <h4 style={headingStyle}>Product Categories</h4>
          <ul style={listStyle}>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Tablets</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Capsules</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Syrups</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Injections</Link></li>
            <li><Link to="/products" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Supplements</Link></li>
          </ul>
        </div>

        {/* COLUMN 4: DETAILED CORPORATE REGISTRY DATA */}
        <div style={{ ...columnStyle, flex: '1 1 320px' }}>
          <h4 style={headingStyle}>Contact Us</h4>
          
          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>📍 Head Office:</span>
            <span style={{ color: currentTheme.valueColor, transition: 'color 0.3s ease' }}>Corporate Office: A/6-202, AMBERNATH(W), MIDC, THANE, MAHARASHTRA- 421505</span>
          </div>

          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            <div style={contactItemStyle}>
              <span style={contactLabelStyle}>📞 Phone:</span>
              <span style={{ color: currentTheme.valueColor, transition: 'color 0.3s ease' }}>+91-91365-06985</span>
            </div>
            <div style={contactItemStyle}>
              <span style={contactLabelStyle}>💬 WhatsApp:</span>
              <span style={{ color: currentTheme.valueColor, transition: 'color 0.3s ease' }}>+91-91365-06985</span>
            </div>
          </div>

          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>✉️ Email:</span>
            <span style={{ color: darkMode ? '#F5C518' : '#D97706', fontWeight: '500', transition: 'color 0.3s ease' }}>eryxhealthcare@gmail.com</span>
          </div>

          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>🔑 CIN:</span>
            <span style={{ fontFamily: 'monospace', letterSpacing: '0.5px', color: currentTheme.valueColor, transition: 'color 0.3s ease' }}>U24100MH2018PTC317668</span>
          </div>

          <div style={contactItemStyle}>
            <span style={contactLabelStyle}>🏢 Branch Office / Warehouse:</span>
            <span style={{ color: currentTheme.valueColor, transition: 'color 0.3s ease' }}>Central Depot/ Warehouse: Village- Chaturpur Ichhuri, P.O. - Kurebhar, Ayodhya- Sultanpur Road, Dist- Sultanpur, 228151</span>
          </div>
        </div>

      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${currentTheme.borderFaint}`, margin: '30px 0 25px 0', transition: 'border-color 0.3s ease' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', fontSize: '12px', color: currentTheme.textSubtle, transition: 'color 0.3s ease' }}>
        <div>
          &copy; 2026 Eryx Pharmaceuticals. All Rights Reserved.
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <Link to="/privacy" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Privacy Policy</Link> | 
          <Link to="/terms" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Terms & Conditions</Link> | 
          <Link to="/refunds" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Refund & Cancellation Terms</Link> | 
          <Link to="/payment" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Payment Terms</Link> | 
          <Link to="/order-terms" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Order Terms</Link> | 
          <Link to="/sitemap" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>Sitemap</Link> | 
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => handleLinkHover(e, currentTheme.textMain)} onMouseLeave={(e) => handleLinkHover(e, currentTheme.textMuted)}>XML Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
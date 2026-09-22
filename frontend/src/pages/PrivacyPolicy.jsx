import React, { useEffect } from 'react';

function PrivacyPolicy({ handleNavigation, darkMode = true }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 🎨 Dynamic Theme Colors (Matches PortalDirectory, About, and Dashboard pages)
  const currentTheme = {
    wrapperBg: darkMode ? '#08080A' : '#FFFFFF',
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? 'rgba(19, 19, 26, 0.65)' : '#F9FAFB',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    accentPurple: '#5B3FFF',
    accentYellow: '#F5C518'
  };

  const dynamicStyles = {
    wrapper: { 
      backgroundColor: currentTheme.wrapperBg, 
      color: currentTheme.textMuted, 
      padding: '120px max(4%, 20px) 100px max(4%, 20px)', 
      minHeight: '85vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      transition: 'background-color 0.3s ease, color 0.3s ease',
      boxSizing: 'border-box'
    },
    container: { 
      maxWidth: '850px', 
      margin: '0 auto', 
      textAlign: 'left',
      backgroundColor: currentTheme.cardBg,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${currentTheme.cardBorder}`,
      borderRadius: '16px',
      padding: '40px max(5%, 40px)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    },
    backBtn: { 
      background: 'none', 
      border: 'none', 
      color: currentTheme.accentPurple, 
      cursor: 'pointer', 
      fontWeight: '700', 
      fontSize: '13px', 
      marginBottom: '30px', 
      padding: 0, 
      textTransform: 'uppercase', 
      letterSpacing: '1px',
      transition: 'opacity 0.2s'
    },
    title: { 
      fontSize: '38px', 
      fontFamily: '"Playfair Display", Georgia, serif', 
      fontWeight: '600', 
      color: currentTheme.textMain, 
      margin: '0 0 8px 0', 
      letterSpacing: '0.5px', 
      transition: 'color 0.3s ease' 
    },
    subtitle: { 
      fontSize: '13px', 
      color: currentTheme.accentPurple, 
      fontWeight: '600', 
      textTransform: 'uppercase', 
      letterSpacing: '1px', 
      marginBottom: '30px' 
    },
    divider: { 
      border: 'none', 
      height: '1px', 
      backgroundColor: currentTheme.cardBorder, 
      marginBottom: '30px', 
      transition: 'background-color 0.3s ease' 
    },
    section: { 
      margin: '35px 0' 
    },
    sectionTitle: { 
      fontSize: '18px', 
      fontWeight: '600', 
      color: currentTheme.textMain, 
      marginBottom: '12px', 
      transition: 'color 0.3s ease' 
    },
    sectionText: { 
      fontSize: '15px', 
      color: currentTheme.textMuted, 
      lineHeight: '1.7', 
      margin: 0, 
      transition: 'color 0.3s ease' 
    }
  };

  return (
    <div style={dynamicStyles.wrapper}>
      <div style={dynamicStyles.container}>
        <button 
          onClick={() => handleNavigation('home')} 
          style={dynamicStyles.backBtn}
          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          &larr; Back to Home
        </button>
        
        <h1 style={dynamicStyles.title}>Privacy Policy</h1>
        <p style={dynamicStyles.subtitle}>Effective Date: May 15, 2026</p>
        <hr style={dynamicStyles.divider} />

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>1. Information Architecture & Collection</h3>
          <p style={dynamicStyles.sectionText}>
            We collect technical logs, session identifiers, and user-submitted data parameters across our biomedical platform interfaces to optimize clinical distribution pathways and secure account authenticity.
          </p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>2. Data Utilization & Processing</h3>
          <p style={dynamicStyles.sectionText}>
            Collected parameters are utilized strictly for authenticating platform access, maintaining system performance metrics, fulfilling pharmaceutical inquiries, and ensuring compliance with regulatory distribution standards.
          </p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>3. Security Infrastructure</h3>
          <p style={dynamicStyles.sectionText}>
            We deploy enterprise-grade encryption matrices, secure SSL protocols, and restricted database access vectors to safeguard intellectual property, corporate records, and user communication channels against unauthorized entry.
          </p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>4. Policy Modifications</h3>
          <p style={dynamicStyles.sectionText}>
            Eryx Healthcare Pvt. Ltd. reserves the right to modify, adjust, or update this privacy framework periodically. Continued navigation of our platform constitutes formal acceptance of any updated privacy terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
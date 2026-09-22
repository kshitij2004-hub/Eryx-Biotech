import React, { useEffect } from 'react';

function TermsConditions({ handleNavigation, darkMode = true }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 🎨 Dynamic Theme Colors (Matches PortalDirectory, About, Products, and RefundPolicy pages)
  const currentTheme = {
    wrapperBg: darkMode ? '#08080A' : '#FFFFFF',
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? 'rgba(19, 19, 26, 0.65)' : '#F9FAFB',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    accentPurple: '#5B3FFF'
  };

  const dynamicStyles = {
    wrapper: { 
      backgroundColor: currentTheme.wrapperBg, 
      color: currentTheme.textMuted, 
      padding: '120px max(4%, 20px) 100px max(4%, 20px)', 
      minHeight: '85vh', 
      fontFamily: '"Inter", system-ui, sans-serif', 
      transition: 'background-color 0.3s ease, color 0.3s ease',
      boxSizing: 'border-box'
    },
    container: { 
      maxWidth: '900px', 
      margin: '0 auto', 
      textAlign: 'left',
      backgroundColor: currentTheme.cardBg,
      border: `1px solid ${currentTheme.cardBorder}`,
      borderRadius: '16px',
      padding: '40px clamp(20px, 5vw, 60px)',
      backdropFilter: 'blur(10px)',
      boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.03)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
    },
    backBtn: { 
      background: 'none', 
      border: 'none', 
      color: currentTheme.accentPurple, 
      cursor: 'pointer', 
      fontWeight: '700', 
      fontSize: '12px', 
      marginBottom: '25px', 
      padding: 0, 
      textTransform: 'uppercase', 
      letterSpacing: '1px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    title: { 
      fontSize: 'clamp(28px, 4vw, 38px)', 
      fontFamily: '"Playfair Display", Georgia, serif', 
      fontWeight: '600', 
      color: currentTheme.textMain, 
      margin: '0 0 8px 0', 
      letterSpacing: '0.5px', 
      transition: 'color 0.3s ease' 
    },
    subtitle: { 
      fontSize: '12px', 
      color: currentTheme.accentPurple, 
      fontWeight: '700', 
      textTransform: 'uppercase', 
      letterSpacing: '1px', 
      marginBottom: '30px' 
    },
    divider: { 
      border: 'none', 
      height: '1px', 
      backgroundColor: currentTheme.cardBorder, 
      marginBottom: '10px', 
      transition: 'background-color 0.3s ease' 
    },
    section: { 
      margin: '35px 0' 
    },
    sectionTitle: { 
      fontSize: '17px', 
      fontWeight: '700', 
      color: currentTheme.textMain, 
      marginBottom: '12px', 
      transition: 'color 0.3s ease' 
    },
    sectionText: { 
      fontSize: '14.5px', 
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
        
        <h1 style={dynamicStyles.title}>Terms & Conditions</h1>
        <p style={dynamicStyles.subtitle}>Effective Date: May 15, 2026</p>
        <hr style={dynamicStyles.divider} />

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>1. Acceptance of Terms</h3>
          <p style={dynamicStyles.sectionText}>By accessing, browsing, or utilizing this digital platform, you acknowledge that you have read, understood, and agree to be fully bound by the terms, operational protocols, and legal provisions outlined within this user agreement.</p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>2. Use License</h3>
          <p style={dynamicStyles.sectionText}>Permission is granted to temporarily view or cache a single copy of the informational materials, product sheets, or framework data on the Eryx Pharmaceuticals platform strictly for personal, non-commercial, transitory reference. This constitutes a license of use, not a transfer of statutory title.</p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>3. Disclaimer</h3>
          <p style={dynamicStyles.sectionText}>The materials hosted across this system are provided on an "as is" and "as available" basis. Eryx Pharmaceuticals makes no explicit or implied warranties, and hereby disclaims and negates all other warranties including, without limitation, implied conditions of merchantability, structural accuracy, or fitness for specific medical distribution tracks.</p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>4. Limitations of Liability</h3>
          <p style={dynamicStyles.sectionText}>In no event shall Eryx Pharmaceuticals, its corporate entities, or its supply chain partners be held liable for any damages (including, without limitation, systemic data loss, commercial profit deficits, or operational pipeline interruptions) arising directly out of the utilization or inability to navigate the materials on this digital interface.</p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
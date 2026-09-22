import React, { useEffect } from 'react';

function RefundPolicy({ handleNavigation, darkMode = true }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 🎨 Dynamic Theme Colors (Matches PortalDirectory, About, and Products pages)
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
        
        <h1 style={dynamicStyles.title}>Refund & Cancellation Terms</h1>
        <p style={dynamicStyles.subtitle}>Eryx Healthcare Pvt. Ltd. | Quality, Technology & Innovation</p>
        <hr style={dynamicStyles.divider} />

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>1. Online Payment Transmission Protocols</h3>
          <p style={dynamicStyles.sectionText}>During the processing of online payments via credit cards, debit cards, or institutional banking channels, external server malfunctions or local internet connectivity drops may cause diagnostic disconnects. Eryx Healthcare Pvt. Ltd. is not responsible for transaction states where funds are debited from the payer but blocked by third-party gateways before completing transmission.</p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>2. Acknowledgment Generation Failures</h3>
          <p style={dynamicStyles.sectionText}>If an infrastructure or network malfunction prevents the system from generating a digital receipt or transaction acknowledgment post-debit, the transaction will undergo manual audit. Verification is contingent upon terminal settlement confirmation.</p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>3. Processing Discrepancies & Double Debits</h3>
          <p style={dynamicStyles.sectionText}>In instances where a payment is deducted from the payer's account but does not register in the corporate account of Eryx Healthcare Pvt. Ltd., or if a system latency error causes a double-debit event, the user must contact their financial institution to initiate gateway reconciliation.</p>
        </div>

        <div style={dynamicStyles.section}>
          <h3 style={dynamicStyles.sectionTitle}>4. Liability & Settlement Verification</h3>
          <p style={dynamicStyles.sectionText}>Eryx Healthcare Pvt. Ltd. holds no financial liability or operational responsibility for any product order until the complete cleared funds are officially credited into the verified Bank Account of Eryx Healthcare Pvt. Ltd. Once successfully credited, standard internal refund policies and corporate procurement norms shall apply.</p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
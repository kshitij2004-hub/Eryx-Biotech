import React, { useEffect } from 'react';

function PaymentTerms({ handleNavigation, darkMode = true }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // 🎨 Dynamic Theme Colors (Matches About, Dashboard, and Products pages)
  const currentTheme = {
    wrapperBg: darkMode ? '#08080A' : '#FFFFFF',
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? 'rgba(19, 19, 26, 0.65)' : '#F9FAFB',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    accentPurple: '#5B3FFF',
    dividerColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
  };

  const dynamicPageStyles = {
    wrapper: { 
      backgroundColor: currentTheme.wrapperBg, 
      color: currentTheme.textMuted, 
      padding: '120px 20px 100px 20px', 
      minHeight: '85vh', 
      fontFamily: 'system-ui, sans-serif', 
      transition: 'background-color 0.3s ease, color 0.3s ease' 
    },
    container: { 
      maxWidth: '800px', 
      margin: '0 auto', 
      textAlign: 'left',
      backgroundColor: currentTheme.cardBg,
      backdropFilter: 'blur(10px)',
      padding: '40px',
      borderRadius: '8px',
      border: `1px solid ${currentTheme.cardBorder}`,
      transition: 'background-color 0.3s ease, border 0.3s ease'
    },
    backBtn: { 
      background: 'none', 
      border: 'none', 
      color: currentTheme.accentPurple, 
      cursor: 'pointer', 
      fontWeight: '600', 
      fontSize: '13px', 
      marginBottom: '30px', 
      padding: 0, 
      textTransform: 'uppercase', 
      letterSpacing: '1px' 
    },
    title: { 
      fontSize: '38px', 
      fontWeight: '700', 
      color: currentTheme.textMain, 
      margin: '0 0 8px 0', 
      transition: 'color 0.3s ease' 
    },
    subtitle: { 
      fontSize: '13px', 
      color: currentTheme.accentPurple, 
      fontWeight: '600', 
      textTransform: 'uppercase', 
      letterSpacing: '1px', 
      marginBottom: '40px' 
    },
    divider: { 
      border: 'none', 
      height: '1px', 
      backgroundColor: currentTheme.dividerColor, 
      marginBottom: '30px', 
      transition: 'background-color 0.3s ease' 
    },
    section: { 
      margin: '40px 0' 
    },
    sectionTitle: { 
      fontSize: '18px', 
      fontWeight: '600', 
      color: currentTheme.textMain, 
      marginBottom: '14px', 
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
    <div style={dynamicPageStyles.wrapper}>
      <div style={dynamicPageStyles.container}>
        <button onClick={() => handleNavigation('home')} style={dynamicPageStyles.backBtn}>&larr; Back to Home</button>
        <h1 style={dynamicPageStyles.title}>Payment Terms</h1>
        <p style={dynamicPageStyles.subtitle}>Eryx Healthcare Pvt. Ltd. | Quality, Technology & Innovation</p>
        <hr style={dynamicPageStyles.divider} />

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>1. Third-Party Gateway Redirection</h3>
          <p style={dynamicPageStyles.sectionText}>For online payment processing, you will be securely redirected to an external third-party portal. This payment gateway is neither owned, monitored, nor controlled by Eryx Healthcare Pvt. Ltd. Consequently, we do not sponsor, endorse, or accept legal liability for any external transactions, tracking mechanisms, services, or data privacy protocols active on their domain. Accessing these payment infrastructures is done strictly at your own operational risk.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>2. Limitation of Liability & External Vulnerabilities</h3>
          <p style={dynamicPageStyles.sectionText}>Eryx Healthcare Pvt. Ltd., along with its directors, officers, and associates, shall assume no liability for financial or structural damages arising from: (a) service deficiencies or processing downtime on third-party portals; (b) hardware, software, or network equipment failures on your local network; (c) third-party platform server slowdowns or complete terminal breakdowns; or (d) data interception, active malicious tracking, or unauthorized cryptographic breaches ("hacking") targetting information processed during gateway handoffs.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>3. User Entry Validation & Card Status Disclaimers</h3>
          <p style={dynamicPageStyles.sectionText}>The platform operator accepts no liability if a transfer fails to reach the correct corporate account due to a user inputting incorrect billing credentials, invoice numbers, or personal details. Furthermore, if a payment is refused or declined by your credit/debit card provider or financial institution for any reason, Eryx Healthcare Pvt. Ltd. is under no obligation to notify you of the rejection. It remains your sole responsibility to check with your banking institution to verify complete fund deduction.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>4. Service Intermediary Framework</h3>
          <p style={dynamicPageStyles.sectionText}>Eryx Healthcare Pvt. Ltd. utilizes trusted third-party merchant intermediaries to secure transaction pipelines. No product processing sequence, allocation, or supply-chain ledger updates will execute until funds have completely cleared and settled into the official bank account of Eryx Healthcare Pvt. Ltd.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>5. Binding Transactions & Dynamic Amendments</h3>
          <p style={dynamicPageStyles.sectionText}>Upon finishing an online payment pipeline, a definitive transaction confirmation window will be generated. All entry parameters become legally binding the exact moment this confirmation registers on-screen. Users are advised to save a copy of these receipts for record-keeping. Eryx Healthcare Pvt. Ltd. retains the absolute right to amend, reconfigure, or replace these payment terms at any time without prior notice; continued usage of this feature implies acknowledgment of the updated framework.</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentTerms;
import React, { useEffect } from 'react';

function OrderTerms({ handleNavigation, darkMode = true }) {
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
        <h1 style={dynamicPageStyles.title}>Order Terms</h1>
        <p style={dynamicPageStyles.subtitle}>Eryx Healthcare Pvt. Ltd. | Quality, Technology & Innovation</p>
        <hr style={dynamicPageStyles.divider} />

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>1. Pricing, Taxation, and Rate Calibration</h3>
          <p style={dynamicPageStyles.sectionText}>Quoted special rates apply across all listed pharmaceutical brands, with the explicit exception of DPCO (Drug Price Control Order) formulations and specialized topical ointments. Statutory Goods and Services Tax (GST) will be charged extra as applicable over base quotations. All final commercial product packaging carries a Maximum Retail Price (MRP) inclusive of all embedded taxes. Due to volatile raw resource changes and shifting market vectors, net metrics including NET RATE, PTS (Price to Stockist), PTR (Price to Retailer), and final MRP will be revised and calibrated from time to time.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>2. Financial Settlements and Logistics Governance</h3>
          <p style={dynamicPageStyles.sectionText}>All logistical inventory allocations operate strictly on an upfront advance-payment framework. Outbound freight, courier channels, and general transportation charges are to be borne entirely by the purchasing entity. If requested explicitly by the customer before batch dispatch, consignments can be fully insured against transit risks, with all premium expenditures billed as separate financial line items.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>3. Non-Returnable Inventory Policy & Expiry Settlements</h3>
          <p style={dynamicPageStyles.sectionText}>All medical distribution transactions execute on a definitive, non-returnable baseline; goods cannot be taken back once they leave our fulfillment centers. Expiring or dated inventory elements will under no circumstances be settled, credited, or compensated back based on discounted project rates, legacy pricing structures, or active batch promotional schemes.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>4. Mandatory Regulatory Verification for Invoicing</h3>
          <p style={dynamicPageStyles.sectionText}>To securely generate a commercial tax invoice, purchasing entities are required to furnish verifiable electronic or physical copies of the following corporate data metrics: (a) Firm's Drug License (DL) Identification; (b) FSSAI Registration Certificate; (c) valid GSTIN Profile; (d) Corporate PAN Number; (e) primary Point-of-Contact Email Address and Mobile Number; (f) explicit Billing and Shipping Destinations; and (g) the identity of the designated Key Person in charge of procurement.</p>
        </div>

        <div style={dynamicPageStyles.section}>
          <h3 style={dynamicPageStyles.sectionTitle}>5. Order Execution Autonomy & Legal Jurisdiction</h3>
          <p style={dynamicPageStyles.sectionText}>Eryx Healthcare Pvt. Ltd. retains total organizational autonomy and reserves the absolute corporate right to execute, delay, prune, or completely deny any batch order placement at its sole discretion. Any operational, financial, or contract disputes arising directly from transactions on this system are subject strictly to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.</p>
        </div>
      </div>
    </div>
  );
}

export default OrderTerms;
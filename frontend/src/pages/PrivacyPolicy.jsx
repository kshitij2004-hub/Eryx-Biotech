import React, { useEffect } from 'react';

function PrivacyPolicy({ handleNavigation }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.container}>
        <button onClick={() => handleNavigation('home')} style={pageStyles.backBtn}>&larr; Back to Home</button>
        <h1 style={pageStyles.title}>Privacy Policy</h1>
        <p style={pageStyles.subtitle}>Last Updated: May 15, 2026</p>
        <hr style={pageStyles.divider} />

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>1. Introduction</h3>
          <p style={pageStyles.sectionText}>Welcome to Eryx Pharmaceuticals. We respect your privacy and are deeply committed to protecting your personal data. This privacy policy outlines how we safeguard and process your information when you interact with our digital platform.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>2. The Data We Collect</h3>
          <p style={pageStyles.sectionText}>We may collect, use, store, and transfer distinct categories of personal data to optimize our operations. This includes Identity Data (Name, Company), Contact Data (Email, Phone), and Technical Data (IP addresses, browser configurations, and telemetry).</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>3. How We Use Your Data</h3>
          <p style={pageStyles.sectionText}>We only process your data within strict legal frameworks. Most commonly, this information is utilized to register your entity as a new customer or partner, process and deliver tailored pipeline inquiries, and continuously improve our web infrastructure and services.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>4. Data Security</h3>
          <p style={pageStyles.sectionText}>We have deployed rigorous corporate security protocols and encryption measures designed to prevent your personal data from being accidentally lost, compromised, altered, or accessed in an unauthorized manner.</p>
        </div>
      </div>
    </div>
  );
}

// Reusable styling layout shared across files
const pageStyles = {
  wrapper: { backgroundColor: '#08080A', color: '#F3F4F6', padding: '120px 20px 100px 20px', minHeight: '85vh', fontFamily: 'system-ui, sans-serif' },
  container: { maxWidth: '800px', margin: '0 auto', textAlign: 'left' },
  backBtn: { background: 'none', border: 'none', color: '#5B3FFF', cursor: 'pointer', fontWeight: '600', fontSize: '13px', marginBottom: '30px', padding: 0, textTransform: 'uppercase', letterSpacing: '1px' },
  title: { fontSize: '38px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 8px 0' },
  subtitle: { fontSize: '13px', color: '#5B3FFF', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '40px' },
  divider: { border: 'none', height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: '10px' },
  section: { margin: '40px 0' },
  sectionTitle: { fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '14px' },
  sectionText: { fontSize: '15px', color: '#A1A1B5', lineHeight: '1.7', margin: 0 }
};

export default PrivacyPolicy;
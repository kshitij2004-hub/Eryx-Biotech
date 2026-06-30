import React, { useEffect } from 'react';

function TermsConditions({ handleNavigation }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.container}>
        <button onClick={() => handleNavigation('home')} style={pageStyles.backBtn}>&larr; Back to Home</button>
        <h1 style={pageStyles.title}>Terms & Conditions</h1>
        <p style={pageStyles.subtitle}>Effective Date: May 15, 2026</p>
        <hr style={pageStyles.divider} />

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>1. Acceptance of Terms</h3>
          <p style={pageStyles.sectionText}>By accessing, browsing, or utilizing this digital platform, you acknowledge that you have read, understood, and agree to be fully bound by the terms, operational protocols, and legal provisions outlined within this user agreement.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>2. Use License</h3>
          <p style={pageStyles.sectionText}>Permission is granted to temporarily view or cache a single copy of the informational materials, product sheets, or framework data on the Eryx Pharmaceuticals platform strictly for personal, non-commercial, transitory reference. This constitutes a license of use, not a transfer of statutory title.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>3. Disclaimer</h3>
          <p style={pageStyles.sectionText}>The materials hosted across this system are provided on an "as is" and "as available" basis. Eryx Pharmaceuticals makes no explicit or implied warranties, and hereby disclaims and negates all other warranties including, without limitation, implied conditions of merchantability, structural accuracy, or fitness for specific medical distribution tracks.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>4. Limitations of Liability</h3>
          <p style={pageStyles.sectionText}>In no event shall Eryx Pharmaceuticals, its corporate entities, or its supply chain partners be held liable for any damages (including, without limitation, systemic data loss, commercial profit deficits, or operational pipeline interruptions) arising directly out of the utilization or inability to navigate the materials on this digital interface.</p>
        </div>
      </div>
    </div>
  );
}

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

export default TermsConditions;
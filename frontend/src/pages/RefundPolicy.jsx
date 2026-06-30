import React, { useEffect } from 'react';

function RefundPolicy({ handleNavigation }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.container}>
        <button onClick={() => handleNavigation('home')} style={pageStyles.backBtn}>&larr; Back to Home</button>
        <h1 style={pageStyles.title}>Refund & Cancellation Terms</h1>
        <p style={pageStyles.subtitle}>Eryx Healthcare Pvt. Ltd. | Quality, Technology & Innovation</p>
        <hr style={pageStyles.divider} />

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>1. Online Payment Transmission Protocols</h3>
          <p style={pageStyles.sectionText}>During the processing of online payments via credit cards, debit cards, or institutional banking channels, external server malfunctions or local internet connectivity drops may cause diagnostic disconnects. Eryx Healthcare Pvt. Ltd. is not responsible for transaction states where funds are debited from the payer but blocked by third-party gateways before completing transmission.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>2. Acknowledgment Generation Failures</h3>
          <p style={pageStyles.sectionText}>If an infrastructure or network malfunction prevents the system from generating a digital receipt or transaction acknowledgment post-debit, the transaction will undergo manual audit. Verification is contingent upon terminal settlement confirmation.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>3. Processing Discrepancies & Double Debits</h3>
          <p style={pageStyles.sectionText}>In instances where a payment is deducted from the payer's account but does not register in the corporate account of Eryx Healthcare Pvt. Ltd., or if a system latency error causes a double-debit event, the user must contact their financial institution to initiate gateway reconciliation.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>4. Liability & Settlement Verification</h3>
          <p style={pageStyles.sectionText}>Eryx Healthcare Pvt. Ltd. holds no financial liability or operational responsibility for any product order until the complete cleared funds are officially credited into the verified Bank Account of Eryx Healthcare Pvt. Ltd. Once successfully credited, standard internal refund policies and corporate procurement norms shall apply.</p>
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

export default RefundPolicy;
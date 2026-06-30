import React, { useEffect } from 'react';

function PaymentTerms({ handleNavigation }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.container}>
        <button onClick={() => handleNavigation('home')} style={pageStyles.backBtn}>&larr; Back to Home</button>
        <h1 style={pageStyles.title}>Payment Terms</h1>
        <p style={pageStyles.subtitle}>Eryx Healthcare Pvt. Ltd. | Quality, Technology & Innovation</p>
        <hr style={pageStyles.divider} />

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>1. Third-Party Gateway Redirection</h3>
          <p style={pageStyles.sectionText}>For online payment processing, you will be securely redirected to an external third-party portal. This payment gateway is neither owned, monitored, nor controlled by Eryx Healthcare Pvt. Ltd. Consequently, we do not sponsor, endorse, or accept legal liability for any external transactions, tracking mechanisms, services, or data privacy protocols active on their domain. Accessing these payment infrastructures is done strictly at your own operational risk.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>2. Limitation of Liability & External Vulnerabilities</h3>
          <p style={pageStyles.sectionText}>Eryx Healthcare Pvt. Ltd., along with its directors, officers, and associates, shall assume no liability for financial or structural damages arising from: (a) service deficiencies or processing downtime on third-party portals; (b) hardware, software, or network equipment failures on your local network; (c) third-party platform server slowdowns or complete terminal breakdowns; or (d) data interception, active malicious tracking, or unauthorized cryptographic breaches ("hacking") targetting information processed during gateway handoffs.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>3. User Entry Validation & Card Status Disclaimers</h3>
          <p style={pageStyles.sectionText}>The platform operator accepts no liability if a transfer fails to reach the correct corporate account due to a user inputting incorrect billing credentials, invoice numbers, or personal details. Furthermore, if a payment is refused or declined by your credit/debit card provider or financial institution for any reason, Eryx Healthcare Pvt. Ltd. is under no obligation to notify you of the rejection. It remains your sole responsibility to check with your banking institution to verify complete fund deduction.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>4. Service Intermediary Framework</h3>
          <p style={pageStyles.sectionText}>Eryx Healthcare Pvt. Ltd. utilizes trusted third-party merchant intermediaries to secure transaction pipelines. No product processing sequence, allocation, or supply-chain ledger updates will execute until funds have completely cleared and settled into the official bank account of Eryx Healthcare Pvt. Ltd.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>5. Binding Transactions & Dynamic Amendments</h3>
          <p style={pageStyles.sectionText}>Upon finishing an online payment pipeline, a definitive transaction confirmation window will be generated. All entry parameters become legally binding the exact moment this confirmation registers on-screen. Users are advised to save a copy of these receipts for record-keeping. Eryx Healthcare Pvt. Ltd. retains the absolute right to amend, reconfigure, or replace these payment terms at any time without prior notice; continued usage of this feature implies acknowledgment of the updated framework.</p>
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

export default PaymentTerms;
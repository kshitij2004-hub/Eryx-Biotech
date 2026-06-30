import React, { useEffect } from 'react';

function OrderTerms({ handleNavigation }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={pageStyles.wrapper}>
      <div style={pageStyles.container}>
        <button onClick={() => handleNavigation('home')} style={pageStyles.backBtn}>&larr; Back to Home</button>
        <h1 style={pageStyles.title}>Order Terms</h1>
        <p style={pageStyles.subtitle}>Eryx Healthcare Pvt. Ltd. | Quality, Technology & Innovation</p>
        <hr style={pageStyles.divider} />

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>1. Pricing, Taxation, and Rate Calibration</h3>
          <p style={pageStyles.sectionText}>Quoted special rates apply across all listed pharmaceutical brands, with the explicit exception of DPCO (Drug Price Control Order) formulations and specialized topical ointments. Statutory Goods and Services Tax (GST) will be charged extra as applicable over base quotations. All final commercial product packaging carries a Maximum Retail Price (MRP) inclusive of all embedded taxes. Due to volatile raw resource changes and shifting market vectors, net metrics including NET RATE, PTS (Price to Stockist), PTR (Price to Retailer), and final MRP will be revised and calibrated from time to time.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>2. Financial Settlements and Logistics Governance</h3>
          <p style={pageStyles.sectionText}>All logistical inventory allocations operate strictly on an upfront advance-payment framework. Outbound freight, courier channels, and general transportation charges are to be borne entirely by the purchasing entity. If requested explicitly by the customer before batch dispatch, consignments can be fully insured against transit risks, with all premium expenditures billed as separate financial line items.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>3. Non-Returnable Inventory Policy & Expiry Settlements</h3>
          <p style={pageStyles.sectionText}>All medical distribution transactions execute on a definitive, non-returnable baseline; goods cannot be taken back once they leave our fulfillment centers. Expiring or dated inventory elements will under no circumstances be settled, credited, or compensated back based on discounted project rates, legacy pricing structures, or active batch promotional schemes.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>4. Mandatory Regulatory Verification for Invoicing</h3>
          <p style={pageStyles.sectionText}>To securely generate a commercial tax invoice, purchasing entities are required to furnish verifiable electronic or physical copies of the following corporate data metrics: (a) Firm's Drug License (DL) Identification; (b) FSSAI Registration Certificate; (c) valid GSTIN Profile; (d) Corporate PAN Number; (e) primary Point-of-Contact Email Address and Mobile Number; (f) explicit Billing and Shipping Destinations; and (g) the identity of the designated Key Person in charge of procurement.</p>
        </div>

        <div style={pageStyles.section}>
          <h3 style={pageStyles.sectionTitle}>5. Order Execution Autonomy & Legal Jurisdiction</h3>
          <p style={pageStyles.sectionText}>Eryx Healthcare Pvt. Ltd. retains total organizational autonomy and reserves the absolute corporate right to execute, delay, prune, or completely deny any batch order placement at its sole discretion. Any operational, financial, or contract disputes arising directly from transactions on this system are subject strictly to the exclusive jurisdiction of the courts of Mumbai, Maharashtra, India.</p>
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

export default OrderTerms;
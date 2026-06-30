import React from 'react';

function AdverseEventForm() {
  return (
    <form style={{ backgroundColor: 'var(--deep-space)', padding: '30px', borderRadius: '6px', border: '1px solid rgba(161,161,181,0.1)', marginTop: '30px' }} onSubmit={e => e.preventDefault()}>
      <h3 style={{ color: 'var(--soft-white)', margin: '0 0 20px 0', fontSize: '18px', fontWeight: '500' }}>Report Telemetry Discrepancy</h3>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', color: 'var(--muted-gray)', marginBottom: '8px', fontSize: '12px' }}>Compound Identification Code</label>
        <input type="text" placeholder="e.g. ERYTHRO-ALPHA-01" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--obsidian-black)', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: 'var(--soft-white)', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: 'var(--muted-gray)', marginBottom: '8px', fontSize: '12px' }}>Telemetry Observation Notes</label>
        <textarea rows="4" placeholder="Detail anomalous reaction metrics..." style={{ width: '100%', padding: '12px', backgroundColor: 'var(--obsidian-black)', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: 'var(--soft-white)', boxSizing: 'border-box' }}></textarea>
      </div>
      <button type="submit" style={{ backgroundColor: 'var(--royal-purple)', color: 'var(--soft-white)', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
        Submit Telemetry Report
      </button>
    </form>
  );
}

export default AdverseEventForm;
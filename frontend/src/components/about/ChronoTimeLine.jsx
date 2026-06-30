import React from 'react';

function ChronoTimeLine() {
  const milestones = [
    { code: "STG-01", title: "Biomaterial Boundary Architecture", body: "Initial discovery systems for high-density computational sequence matrix tracking structures." },
    { code: "STG-02", title: "Decentralized Atlas Integration", body: "Successful deployment of encrypted cross-verification data nodes for secure record telemetry." },
    { code: "STG-03", title: "Active Compound Distribution", body: "Expanding structural configurations, custom packing layers, and institution analytics arrays." }
  ];

  return (
    <div style={{ borderLeft: '2px solid var(--royal-purple)', paddingLeft: '35px', marginLeft: '10px' }}>
      {milestones.map((m, i) => (
        <div key={i} style={{ marginBottom: '45px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '-46px', top: '3px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--obsidian-black)', border: '3px solid var(--metallic-gold)' }}></div>
          <span style={{ fontFamily: 'monospace', color: 'var(--metallic-gold)', fontSize: '12px', fontWeight: 'bold' }}>{m.code}</span>
          <h4 style={{ color: 'var(--soft-white)', margin: '6px 0 10px 0', fontSize: '18px', fontWeight: '500' }}>{m.title}</h4>
          <p style={{ color: 'var(--muted-gray)', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{m.body}</p>
        </div>
      ))}
    </div>
  );
}

export default ChronoTimeLine;
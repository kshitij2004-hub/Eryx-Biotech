import React from 'react';

function ProductiveMovingRibbon() {
  const terms = [
    'Bio-Available Formulations', 'Molecular Validation', 'Distribution Integrity', 
    'Systemic Safety', 'WHO-GMP Compliance', 'High-Efficacy Therapeutics',
    'National Drug Compliance', 'Rigorous Stability Testing'
  ];

  // Array duplicated to maintain a seamless, stutter-free scrolling loop animation
  const loopArray = [...terms, ...terms];

  return (
    <div style={{ 
      width: '100%', 
      overflow: 'hidden', 
      background: 'rgba(161, 161, 181, 0.02)', 
      borderTop: '1px solid rgba(161, 161, 181, 0.05)', 
      borderBottom: '1px solid rgba(161, 161, 181, 0.05)', 
      padding: '16px 0',
      position: 'relative'
    }}>
      {/* Dynamic Keyframe Injection to guarantee immediate standalone compilation */}
      <style>{`
        @keyframes customRibbonMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      <div style={{ 
        display: 'flex', 
        width: 'max-content', 
        animation: 'customRibbonMarquee 30s linear infinite',
        gap: '60px'
      }}>
        {loopArray.map((text, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap' }}>
            <span style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              letterSpacing: '2.5px', 
              color: '#A1A1B5', 
              fontFamily: 'monospace' 
            }}>
              {text}
            </span>
            <span style={{ color: '#F5C518', fontSize: '11px' }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductiveMovingRibbon;
import React from 'react';

function ProductCard({ product }) {
  return (
    <div style={{ backgroundColor: 'var(--deep-space)', border: '1px solid rgba(161,161,181,0.1)', padding: '25px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '10px', color: 'var(--neon-purple)', background: 'rgba(91,63,255,0.1)', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>
            {product.category}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--muted-gray)', fontFamily: 'monospace' }}>{product.type}</span>
        </div>
        <h4 style={{ color: 'var(--soft-white)', fontSize: '18px', margin: '0 0 12px 0', fontWeight: '500' }}>{product.name}</h4>
        <p style={{ color: 'var(--muted-gray)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{product.description}</p>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--metallic-gold)', letterSpacing: '1px', fontFamily: 'monospace', borderTop: '1px solid rgba(161,161,181,0.08)', paddingTop: '12px', marginTop: '20px' }}>
        PACKAGING: {product.packaging}
      </div>
    </div>
  );
}

export default ProductCard;
import React from 'react';

function FeaturedProducts({ handleNavigation }) {
  const products = [
    {
      id: 'eryxovit-i',
      name: 'ERYXOVIT-I',
      category: 'TABLETS',
      description: 'Age Related Macular Degeneration (ARMD). A Tonic for Retina, AREDS 2 based formulae for ARMD.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' // Replace with your packshot cuts
    },
    {
      id: 'hylodium',
      name: 'HYLODIUM',
      category: 'OPHTHALMIC',
      description: 'Hylodium Lubricant Eye Drop is an eye lubricant or artificial tears used to relieve dry eyes.',
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'eryxolub',
      name: 'ERYXOLUB',
      category: 'OPHTHALMIC',
      description: 'Eryxolub Lubricant Eye Drop is an eye lubricant or artificial tears used to relieve dry eyes.',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?auto=format&fit=crop&q=80&w=400'
    }
  ];

  // Styles
  const sectionStyle = {
    padding: '80px 20px',
    backgroundColor: '#F8FAFC',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#004B87',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  const gridStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '50px'
  };

  const cardStyle = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease'
  };

  const imgContainerStyle = {
    position: 'relative',
    height: '240px',
    backgroundColor: '#F1F5F9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    color: '#004B87',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '20px',
    letterSpacing: '0.5px'
  };

  const bodyStyle = {
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  };

  const prodNameStyle = {
    color: '#004B87',
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    letterSpacing: '0.5px'
  };

  const descStyle = {
    color: '#64748B',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '0 0 25px 0',
    flexGrow: 1
  };

  const actionBtnStyle = {
    border: '1px solid #004B87',
    backgroundColor: 'transparent',
    color: '#004B87',
    padding: '12px',
    fontSize: '13px',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  };

  const footerCtaContainer = {
    textAlign: 'center',
    marginTop: '20px'
  };

  const mainCtaStyle = {
    backgroundColor: '#004B87',
    color: '#FFFFFF',
    border: 'none',
    padding: '15px 35px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,75,135,0.15)',
    transition: 'background 0.2s'
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headerStyle}>
        🎓 Featured Clinical Formulations
      </h2>

      <div style={gridStyle}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle} className="prod-card">
            <div style={imgContainerStyle}>
              <span style={badgeStyle}>{product.category}</span>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
            
            <div style={bodyStyle}>
              <h3 style={prodNameStyle}>{product.name}</h3>
              <p style={descStyle}>{product.description}</p>
              <button 
                style={actionBtnStyle}
                onClick={() => handleNavigation('products')}
              >
                VIEW FORMULATION &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Bottom Link Requested */}
      <div style={footerCtaContainer}>
        <button 
          style={mainCtaStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#003561'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#004B87'}
          onClick={() => handleNavigation('products')}
        >
          View Full Formulation Catalogue
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
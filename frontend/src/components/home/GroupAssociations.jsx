import React from 'react';

function GroupAssociations() {
  // Exact names and matching public official portals
  const partners = [
    { 
      name: 'Bhakti Vedanta Hospital', 
      url: 'https://www.bhaktivedantahospital.com/' 
    },
    { 
      name: 'K. J. Somaiya Hospital & Research Centre', 
      url: 'https://somaiyahospital.somaiya.edu/' 
    },
    { 
      name: 'KIMS Hospitals', 
      url: 'https://www.kimshospitals.com/' 
    },
    { 
      name: 'Apollo Hospitals', 
      url: 'https://www.apollohospitals.com/' 
    },
    { 
      name: 'Max Healthcare', 
      url: 'https://www.maxhealthcare.in/' 
    },
    { 
      name: 'Fortis Healthcare', 
      url: 'https://www.fortishealthcare.com/' 
    },
    { 
      name: 'Medanta Medicity', 
      url: 'https://www.medanta.org/' 
    }
  ];

  return (
    <section style={{ padding: '60px 0 80px 0', textAlign: 'center' }}>
      
      {/* 🏷️ SECTION HEADER */}
      <span style={{ 
        fontSize: '11px', 
        fontWeight: '700', 
        color: '#5B3FFF', 
        letterSpacing: '2px', 
        textTransform: 'uppercase', 
        display: 'block', 
        marginBottom: '12px' 
      }}>
        Our Trusted Partners
      </span>
      
      <h2 style={{ 
        fontSize: '32px', 
        fontWeight: '700', 
        color: '#F3F4F6', 
        margin: '0 0 12px 0',
        letterSpacing: '0.5px'
      }}>
        Associated Healthcare & Distribution Channels
      </h2>
      
      {/* Centered accent indicator bar */}
      <div style={{ 
        width: '48px', 
        height: '3px', 
        backgroundColor: '#5B3FFF', 
        margin: '0 auto 50px auto',
        borderRadius: '2px'
      }}></div>

      {/* 📊 GRID CONTAINER */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {partners.map((partner, index) => (
          <a 
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              textDecoration: 'none',
              background: '#111116', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderRadius: '8px', 
              padding: '35px 20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '100px',
              transition: 'all 0.25s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.borderColor = '#5B3FFF'; 
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.background = '#14141F';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(91, 63, 255, 0.15)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; 
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.background = '#111116';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h4 style={{ 
              color: '#F3F4F6', 
              fontSize: '15px', 
              fontWeight: '600', 
              margin: 0,
              lineHeight: '1.4',
              letterSpacing: '0.3px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.target.style.color = '#F3F4F6'}
            >
              {partner.name}
            </h4>
          </a>
        ))}
      </div>

    </section>
  );
}

export default GroupAssociations;
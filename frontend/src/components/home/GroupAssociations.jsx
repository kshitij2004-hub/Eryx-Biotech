import React from 'react';

function GroupAssociations({ darkMode = true, currentTheme }) {
  // Fallback theme in case it's rendered independently
  const theme = currentTheme || {
    textMain: darkMode ? '#F3F4F6' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? '#111116' : '#FFFFFF',
    cardAltBg: darkMode ? '#14141F' : '#F9FAFB',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)',
    accentPurple: '#5B3FFF',
  };

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
        color: theme.accentPurple, 
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
        color: theme.textMain, // Dynamically switches color based on theme!
        margin: '0 0 12px 0',
        letterSpacing: '0.5px',
        transition: 'color 0.3s ease'
      }}>
        Associated Healthcare & Distribution Channels
      </h2>
      
      {/* Centered accent indicator bar */}
      <div style={{ 
        width: '48px', 
        height: '3px', 
        backgroundColor: theme.accentPurple, 
        margin: '0 auto 50px auto',
        borderRadius: '2px'
      }}></div>

      {/* 📊 GRID CONTAINER */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {partners.map((partner, index) => (
          <a 
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              textDecoration: 'none',
              background: theme.cardBg, 
              border: `1px solid ${theme.cardBorder}`, 
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
              e.currentTarget.style.borderColor = theme.accentPurple; 
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.background = theme.cardAltBg;
              e.currentTarget.style.boxShadow = darkMode ? '0 8px 24px rgba(91, 63, 255, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.borderColor = theme.cardBorder; 
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.background = theme.cardBg;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h4 style={{ 
              color: theme.textMain, // Dynamically switches partner names color too!
              fontSize: '15px', 
              fontWeight: '600', 
              margin: 0,
              lineHeight: '1.4',
              letterSpacing: '0.3px',
              transition: 'color 0.2s ease'
            }}
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
import React, { useState } from 'react';

function Pillars({ darkMode = true, currentTheme }) {
  // Fallback theme object in case it is rendered independently
  const theme = currentTheme || {
    textMain: darkMode ? '#F3F4F6' : '#1F2937',
    textMuted: darkMode ? '#8E8E9F' : '#4B5563',
    cardBg: darkMode ? '#111116' : '#FFFFFF',
    cardAltBg: darkMode ? '#16161D' : '#F9FAFB',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)',
    accentPurple: '#5B3FFF',
  };

  const pillarData = [
    {
      id: '01',
      title: 'Advanced R&D',
      description: 'Cutting-edge research facilities focused on developing innovative formulations and bio-available compounds.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22h20" />
          <path d="M5 22v-5c0-1.5 1-2.5 2-3.5V4h10v9.5c1 1 2 2 2 3.5v5" />
          <path d="M8 4h8" />
          <path d="M7 14h10" />
        </svg>
      )
    },
    {
      id: '02',
      title: 'Quality Assurance',
      description: 'Rigorous testing protocols and molecular assays ensuring maximum safety, efficacy, and active component purity.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: '03',
      title: 'Global Standards',
      description: 'Compliance with international regulatory standards, WHO-GMP directives, and strict pharmacovigilance guidelines.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      id: '04',
      title: 'Trusted Partners',
      description: 'Building long-term collaborative relations with medical distributors, clinics, and pharmacies globally.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section style={{ padding: '80px 20px 100px 20px', textAlign: 'center', backgroundColor: 'transparent' }}>
      
      {/* 🏷️ BADGE INDICATOR */}
      <div style={{ display: 'inline-block', marginBottom: '16px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '700',
          color: theme.accentPurple,
          backgroundColor: darkMode ? 'rgba(91, 63, 255, 0.08)' : 'rgba(91, 63, 255, 0.08)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '6px 16px',
          borderRadius: '20px',
          border: `1px solid ${theme.accentPurple}26`
        }}>
          Our Pillars
        </span>
      </div>

      {/* 🎯 MAIN HEADERS (Dynamically switches text color based on theme) */}
      <h2 style={{
        fontSize: '34px',
        fontWeight: '700',
        color: theme.textMain,
        margin: '0 0 14px 0',
        letterSpacing: '0.5px',
        transition: 'color 0.3s ease'
      }}>
        Why Choose Eryx Pharma?
      </h2>
      
      <p style={{
        fontSize: '15px',
        color: theme.textMuted,
        maxWidth: '650px',
        margin: '0 auto 60px auto',
        lineHeight: '1.6',
        transition: 'color 0.3s ease'
      }}>
        Our commitment to clinical excellence makes us a preferred choice for healthcare professionals globally.
      </p>

      {/* 📊 CORE GRID SYSTEM */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {pillarData.map((pillar, index) => {
          const isCurrentHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                background: theme.cardBg,
                border: '1px solid',
                borderColor: isCurrentHovered ? theme.accentPurple : theme.cardBorder,
                borderRadius: '12px',
                padding: '40px 30px',
                textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                transform: isCurrentHovered ? 'translateY(-6px)' : 'none',
                boxShadow: isCurrentHovered 
                  ? (darkMode ? '0 12px 30px rgba(91, 63, 255, 0.15)' : '0 12px 30px rgba(91, 63, 255, 0.1)') 
                  : (darkMode ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.04)'),
                overflow: 'hidden'
              }}
            >
              {/* Glowing Top bar accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: theme.accentPurple,
                opacity: isCurrentHovered ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }} />

              {/* [ ID NUMERATION ] */}
              <div style={{
                fontSize: '11px',
                fontFamily: 'monospace',
                fontWeight: '700',
                color: isCurrentHovered ? theme.accentPurple : theme.textMuted,
                letterSpacing: '1px',
                marginBottom: '24px',
                transition: 'color 0.3s ease'
              }}>
                [ {pillar.id} ]
              </div>

              {/* ICON WRAPPER */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: isCurrentHovered ? 'rgba(91, 63, 255, 0.1)' : (darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'),
                border: '1px solid',
                borderColor: isCurrentHovered ? 'rgba(91, 63, 255, 0.2)' : theme.cardBorder,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isCurrentHovered ? theme.accentPurple : theme.textMuted,
                marginBottom: '24px',
                transition: 'all 0.3s ease'
              }}>
                {pillar.icon}
              </div>

              {/* PILLAR TITLE */}
              <h3 style={{
                fontSize: '19px',
                fontWeight: '600',
                color: theme.textMain,
                margin: '0 0 12px 0',
                letterSpacing: '0.3px',
                transition: 'color 0.3s ease'
              }}>
                {pillar.title}
              </h3>

              {/* PILLAR DESCRIPTION */}
              <p style={{
                fontSize: '13.5px',
                color: theme.textMuted,
                lineHeight: '1.6',
                margin: 0,
                transition: 'color 0.3s ease'
              }}>
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Pillars;
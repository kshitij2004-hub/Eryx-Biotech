import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/home/HeroSection';
import ProductiveMovingRibbon from '../components/home/ProductiveMovingRibbon';
import GroupAssociations from '../components/home/GroupAssociations';
import Pillars from '../components/home/Pillars'; 

function Home({ handleNavigation, darkMode = true }) {
  const overviewRef = useRef(null);
  const productsRef = useRef(null);
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const BACKEND_BASE_URL = isLocalhost ? 'http://localhost/eryx-biotech-platform' : `${window.location.protocol}//${window.location.hostname}`;

  const currentTheme = {
    bg: darkMode ? '#0b0b0f' : '#FFFFFF',
    textMain: darkMode ? '#F3F4F6' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? '#121216' : '#FFFFFF',
    cardAltBg: darkMode ? '#12121A' : '#F9FAFB',
    cardDeepBg: darkMode ? '#111116' : '#FFFFFF',
    cardBorder: darkMode ? 'rgba(161, 161, 181, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    cardHoverBorder: '#5B3FFF',
    accentYellow: '#F5C518',
    accentPurple: '#5B3FFF',
  };

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/backend/api/get_products.php`)
      .then((response) => response.json())
      .then((result) => {
        let rawData = [];
        if (result && result.status === 'success' && Array.isArray(result.data)) {
          rawData = result.data;
        } else if (Array.isArray(result)) {
          rawData = result;
        }

        const mappedProducts = rawData.map((item) => ({
          id: item.id,
          name: item.name || 'Unnamed Formulation',
          shortDescription: item.description || 'No composition details provided.', 
          category: item.category || 'General Medicine',
          type: item.type || 'Tablets',                
          packaging: item.packaging || 'Standard Volume',
          isFeatured: parseInt(item.is_featured) === 1    
        }));

        const itemsToDisplay = mappedProducts.filter(p => p.isFeatured);
        if (itemsToDisplay.length > 0) {
          setFeaturedProducts(itemsToDisplay.slice(0, 3));
        } else {
          setFeaturedProducts(mappedProducts.slice(0, 3));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching homepage data from PHP API:', error);
        setLoading(false);
      });
  }, [BACKEND_BASE_URL]);

  const scrollToOverview = () => {
    overviewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.6s ease-out', backgroundColor: currentTheme.bg, color: currentTheme.textMain, minHeight: '100vh', transition: 'background-color 0.3s ease, color 0.3s ease', overflowX: 'hidden' }}>
      
      {/* 🚀 1. HERO SECTION (Unconstrained full-width execution) */}
      <HeroSection 
        onExploreClick={scrollToProducts} 
        onOverviewClick={scrollToOverview}
        handleNavigation={handleNavigation} 
      />

      {/* 🎀 2. PRODUCTIVE MOVING RIBBON */}
      <div style={{ margin: '40px 0' }}>
        <ProductiveMovingRibbon />
      </div>

      {/* 🏷️ THERAPEUTIC CATEGORIES */}
      <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: currentTheme.accentPurple, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
            Formulations Portfolio
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: currentTheme.textMain, margin: '0 0 10px 0' }}>
            Therapeutic Categories & Featured Formulations
          </h2>
          <p style={{ color: currentTheme.textMuted, fontSize: '15px' }}>
            Explore our certified dosage forms and key dynamic medicinal formulations below.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
          {['Capsules', 'Healthcare Supplements', 'Injections', 'Ophthalmic', 'Syrups', 'Tablets'].map((cat) => (
            <div 
              key={cat} 
              onClick={() => navigate('/products')}
              style={{ 
                background: currentTheme.cardBg, 
                border: `1px solid ${currentTheme.cardBorder}`, 
                borderRadius: '50px', 
                padding: '12px 24px', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.borderColor = currentTheme.accentPurple; 
                e.currentTarget.style.background = darkMode ? 'rgba(91, 63, 255, 0.05)' : 'rgba(91, 63, 255, 0.08)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.borderColor = currentTheme.cardBorder; 
                e.currentTarget.style.background = currentTheme.cardBg;
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: '600', color: currentTheme.textMain, letterSpacing: '0.5px' }}>
                {cat.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 3. CORPORATE DESCRIPTION & ACHIEVEMENTS */}
      <div ref={overviewRef}>
        <section style={{ padding: '60px 20px 80px 20px', borderBottom: `1px solid ${currentTheme.cardBorder}`, maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: currentTheme.accentPurple, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Operational Excellence
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: currentTheme.textMain, margin: '0 0 20px 0', lineHeight: '1.2' }}>
                Global Pharmaceutical Infrastructure.
              </h2>
              <p style={{ color: currentTheme.textMuted, fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                Eryx Biotech integrates cutting-edge biochemical engineering with agile logistics. We bridge the gap between complex molecular research and high-volume, compliant distribution.
              </p>
              <p style={{ color: currentTheme.textMuted, fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                Operating across 5 international hubs, we ensure rapid, safe, and transparent supply chains for healthcare providers worldwide.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div style={{ background: currentTheme.cardAltBg, padding: '30px', borderRadius: '6px', border: `1px solid ${currentTheme.cardBorder}` }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: currentTheme.accentYellow, marginBottom: '4px' }}>5</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: currentTheme.textMain, marginBottom: '4px' }}>Regional Hubs</div>
                <div style={{ fontSize: '12px', color: currentTheme.textMuted, lineHeight: '1.4' }}>Operational coverage across key continental supply zones.</div>
              </div>
              <div style={{ background: currentTheme.cardAltBg, padding: '30px', borderRadius: '6px', border: `1px solid ${currentTheme.cardBorder}` }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: currentTheme.accentPurple, marginBottom: '4px' }}>40+</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: currentTheme.textMain, marginBottom: '4px' }}>Unique Formulas</div>
                <div style={{ fontSize: '12px', color: currentTheme.textMuted, lineHeight: '1.4' }}>Diverse medical solutions spanning multiple therapeutic classes.</div>
              </div>
              <div style={{ background: currentTheme.cardAltBg, padding: '30px', borderRadius: '6px', border: `1px solid ${currentTheme.cardBorder}` }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: currentTheme.accentPurple, marginBottom: '4px' }}>ISO</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: currentTheme.textMain, marginBottom: '4px' }}>Certified Quality</div>
                <div style={{ fontSize: '12px', color: currentTheme.textMuted, lineHeight: '1.4' }}>Rigorous adherence to international manufacturing standards.</div>
              </div>
              <div style={{ background: currentTheme.cardAltBg, padding: '30px', borderRadius: '6px', border: `1px solid ${currentTheme.cardBorder}` }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: currentTheme.accentYellow, marginBottom: '4px' }}>24/7</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: currentTheme.textMain, marginBottom: '4px' }}>Logistics Support</div>
                <div style={{ fontSize: '12px', color: currentTheme.textMuted, lineHeight: '1.4' }}>Continuous monitoring and supply chain responsiveness.</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 📦 4. REAL MEDICINE REGISTRY SHOWCASE */}
      <div ref={productsRef}>
        <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', borderBottom: `1px solid ${currentTheme.cardBorder}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: currentTheme.accentPurple, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Formulation Overview
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: currentTheme.textMain, margin: 0 }}>
                Clinical Product Lineup
              </h2>
            </div>
            
            <div 
              onClick={() => navigate('/products')}
              style={{ color: currentTheme.accentYellow, fontSize: '13px', borderBottom: `1px solid ${currentTheme.accentYellow}4D`, paddingBottom: '4px', cursor: 'pointer', fontWeight: '600', letterSpacing: '0.5px' }}
            >
              View Complete Catalogue →
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', background: currentTheme.cardAltBg, border: `1px dashed ${currentTheme.cardBorder}`, borderRadius: '6px', color: currentTheme.textMuted, fontSize: '13px', fontFamily: 'monospace' }}>
              Loading live lineup from repository...
            </div>
          ) : featuredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: currentTheme.cardAltBg, border: `1px dashed ${currentTheme.cardBorder}`, borderRadius: '6px', color: currentTheme.textMuted, fontSize: '13px' }}>
              No dynamic formulations found in the system registry.
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {featuredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ 
                      background: currentTheme.cardDeepBg, 
                      border: `1px solid ${currentTheme.cardBorder}`, 
                      borderRadius: '8px', 
                      overflow: 'hidden', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      transition: 'all 0.25s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: currentTheme.accentPurple, background: darkMode ? 'rgba(91,63,255,0.1)' : 'rgba(91,63,255,0.08)', padding: '4px 10px', borderRadius: '4px', border: `1px solid ${currentTheme.accentPurple}33`, textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {product.category}
                        </span>
                        <span style={{ fontSize: '12px', color: currentTheme.textMuted, fontWeight: '500', fontStyle: 'italic' }}>
                          {product.type}
                        </span>
                      </div>
                      
                      <h4 style={{ fontSize: '22px', fontWeight: '700', color: currentTheme.textMain, margin: '0 0 12px 0', letterSpacing: '0.5px' }}>
                        {product.name}
                      </h4>
                      
                      <p style={{ color: currentTheme.textMuted, fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                        {product.shortDescription}
                      </p>
                    </div>
                    
                    <div style={{ padding: '20px 30px', background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderTop: `1px solid ${currentTheme.cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: currentTheme.textMuted, fontWeight: '500' }}>
                        📦 Composition: {product.packaging}
                      </span>
                      <span style={{ fontSize: '13px', color: currentTheme.accentYellow, fontWeight: '600', cursor: 'pointer' }}>
                        View Details &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '55px' }}>
                <button 
                  onClick={() => navigate('/products')}
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: currentTheme.accentYellow, 
                    border: `1px solid ${currentTheme.accentYellow}`, 
                    padding: '14px 36px', 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    letterSpacing: '1px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    textTransform: 'uppercase'
                  }}
                >
                  view full formulation catalogue
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* 🏢 5. WHO WE ARE */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div style={{ background: currentTheme.cardAltBg, borderRadius: '8px', overflow: 'hidden', height: '400px', border: `1px solid ${currentTheme.cardBorder}` }}>
            <img 
              src="/assets/placeholders/pharma_hero_3.png" 
              alt="Eryx Research Lab" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: currentTheme.accentPurple, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              WHO WE ARE
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: currentTheme.textMain, margin: '0 0 20px 0' }}>
              Dedicated to Your Health & Well-being
            </h2>
            <p style={{ color: currentTheme.textMuted, fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
              Eryx Pharmaceuticals is a name synonymous with quality and trust in the healthcare industry. Our state-of-the-art manufacturing facilities and rigorous research processes ensure that every medicine we produce meets international safety standards.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <div style={{ color: currentTheme.textMain, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: currentTheme.accentPurple }}>✓</span> WHO-GMP Certified
              </div>
              <div style={{ color: currentTheme.textMain, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: currentTheme.accentPurple }}>✓</span> Global Export Reach
              </div>
            </div>

            <button 
              onClick={() => navigate('/about')}
              style={{ 
                background: 'transparent', 
                color: currentTheme.textMain, 
                border: `1px solid ${currentTheme.accentPurple}`, 
                padding: '12px 30px', 
                borderRadius: '4px', 
                fontWeight: '600', 
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontSize: '12px'
              }}
            >
              Read Our Story
            </button>
          </div>
        </div>
      </section>

      {/* 🤝 6. GROUP ASSOCIATIONS SECTION */}
      <section style={{ padding: '60px 0 20px 0' }}>
        <GroupAssociations darkMode={darkMode} currentTheme={currentTheme} />
      </section>

      {/* 🏛️ 7. PILLARS SECTION */}
      <Pillars darkMode={darkMode} currentTheme={currentTheme} />

    </div>
  );
}

export default Home;
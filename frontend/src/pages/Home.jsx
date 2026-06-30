import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroSection from '../components/home/HeroSection';
import ProductiveMovingRibbon from '../components/home/ProductiveMovingRibbon';
import GroupAssociations from '../components/home/GroupAssociations';
import Pillars from '../components/home/Pillars'; 

function Home({ handleNavigation }) {
  const overviewRef = useRef(null);
  const productsRef = useRef(null);
  const navigate = useNavigate();

  // 📦 Local State to host synced records straight from the database
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌐 Anchor path to match your live XAMPP server configurations
  const BACKEND_BASE_URL = 'http://localhost/eryx-biotech-platform';

  // 🚀 FETCH DYNAMIC HOME LINEUP
  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/backend/api/products.php`)
      .then((response) => response.json())
      .then((result) => {
        let rawData = [];
        if (result && result.status === 'success' && Array.isArray(result.data)) {
          rawData = result.data;
        } else if (Array.isArray(result)) {
          rawData = result;
        }

        // Map live properties to match what your UI is listening to
        const mappedProducts = rawData.map((item) => ({
          id: item.id,
          name: item.name || 'Unnamed Formulation',
          shortDescription: item.description || 'No composition details provided.', 
          category: item.category || 'General Medicine',
          type: item.type || 'Tablets',                    
          packaging: item.packaging || 'Standard Volume',
          isFeatured: parseInt(item.is_featured) === 1    
        }));

        // Filter out items checked as featured. Fallback to top 3 if none are set yet.
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
  }, []);

  const scrollToOverview = () => {
    overviewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
      
      {/* 🚀 1. HERO SECTION */}
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
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
            Formulations Portfolio
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#F3F4F6', margin: '0 0 10px 0' }}>
            Therapeutic Categories & Featured Formulations
          </h2>
          <p style={{ color: '#A1A1B5', fontSize: '15px' }}>
            Explore our certified dosage forms and key dynamic medicinal formulations below.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '15px' 
        }}>
          {['Capsules', 'Healthcare Supplements', 'Injections', 'Ophthalmic', 'Syrups', 'Tablets'].map((cat) => (
            <div 
              key={cat} 
              onClick={() => navigate('/products')}
              style={{ 
                background: '#121216', 
                border: '1px solid rgba(161, 161, 181, 0.1)', 
                borderRadius: '50px', 
                padding: '12px 24px', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.borderColor = '#5B3FFF'; 
                e.currentTarget.style.background = 'rgba(91, 63, 255, 0.05)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.borderColor = 'rgba(161, 161, 181, 0.1)'; 
                e.currentTarget.style.background = '#121216';
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F3F4F6', letterSpacing: '0.5px' }}>
                {cat.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 3. CORPORATE DESCRIPTION & ACHIEVEMENTS */}
      <div ref={overviewRef}>
        <section style={{ padding: '60px 0 80px 0', borderBottom: '1px solid rgba(161,161,181,0.08)', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Operational Excellence
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#F3F4F6', margin: '0 0 20px 0', lineHeight: '1.2' }}>
                Global Pharmaceutical Infrastructure.
              </h2>
              <p style={{ color: '#A1A1B5', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                Eryx Biotech integrates cutting-edge biochemical engineering with agile logistics. We bridge the gap between complex molecular research and high-volume, compliant distribution.
              </p>
              <p style={{ color: '#A1A1B5', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                Operating across 5 international hubs, we ensure rapid, safe, and transparent supply chains for healthcare providers worldwide.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: '#12121A', padding: '30px', borderRadius: '6px', border: '1px solid rgba(161,161,181,0.06)' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#F5C518', marginBottom: '4px' }}>5</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#F3F4F6', marginBottom: '4px' }}>Regional Hubs</div>
                <div style={{ fontSize: '12px', color: '#A1A1B5', lineHeight: '1.4' }}>Operational coverage across key continental supply zones.</div>
              </div>
              <div style={{ background: '#12121A', padding: '30px', borderRadius: '6px', border: '1px solid rgba(161,161,181,0.06)' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#5B3FFF', marginBottom: '4px' }}>40+</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#F3F4F6', marginBottom: '4px' }}>Unique Formulas</div>
                <div style={{ fontSize: '12px', color: '#A1A1B5', lineHeight: '1.4' }}>Diverse medical solutions spanning multiple therapeutic classes.</div>
              </div>
              <div style={{ background: '#12121A', padding: '30px', borderRadius: '6px', border: '1px solid rgba(161,161,181,0.06)' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#5B3FFF', marginBottom: '4px' }}>ISO</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#F3F4F6', marginBottom: '4px' }}>Certified Quality</div>
                <div style={{ fontSize: '12px', color: '#A1A1B5', lineHeight: '1.4' }}>Rigorous adherence to international manufacturing standards.</div>
              </div>
              <div style={{ background: '#12121A', padding: '30px', borderRadius: '6px', border: '1px solid rgba(161,161,181,0.06)' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#F5C518', marginBottom: '4px' }}>24/7</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#F3F4F6', marginBottom: '4px' }}>Logistics Support</div>
                <div style={{ fontSize: '12px', color: '#A1A1B5', lineHeight: '1.4' }}>Continuous monitoring and supply chain responsiveness.</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 📦 4. REAL MEDICINE REGISTRY SHOWCASE */}
      <div ref={productsRef}>
        <section style={{ padding: '80px 0', borderBottom: '1px solid rgba(161,161,181,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Formulation Overview
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#F3F4F6', margin: 0 }}>
                Clinical Product Lineup
              </h2>
            </div>
            
            <div 
              onClick={() => navigate('/products')}
              style={{ color: '#F5C518', fontSize: '13px', borderBottom: '1px solid rgba(245,197,24,0.3)', paddingBottom: '4px', cursor: 'pointer', fontWeight: '600', letterSpacing: '0.5px', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#FFF'}
              onMouseLeave={(e) => e.target.style.color = '#F5C518'}
            >
              View Complete Catalogue →
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', background: '#12121A', border: '1px dashed rgba(161,161,181,0.2)', borderRadius: '6px', color: '#A1A1B5', fontSize: '13px', fontFamily: 'monospace' }}>
              Loading live lineup from repository...
            </div>
          ) : featuredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: '#12121A', border: '1px dashed rgba(161,161,181,0.2)', borderRadius: '6px', color: '#A1A1B5', fontSize: '13px' }}>
              No dynamic formulations found in the system registry.
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                {featuredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => navigate(`/products/${product.id}`)}
                    style={{ 
                      background: '#111116', 
                      border: '1px solid rgba(255,255,255,0.05)', 
                      borderRadius: '8px', 
                      overflow: 'hidden', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      transition: 'all 0.25s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.borderColor = '#5B3FFF'; 
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; 
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#5B3FFF', background: 'rgba(91,63,255,0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(91,63,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {product.category}
                        </span>
                        <span style={{ fontSize: '12px', color: '#A1A1B5', fontWeight: '500', fontStyle: 'italic' }}>
                          {product.type}
                        </span>
                      </div>
                      
                      <h4 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 12px 0', letterSpacing: '0.5px' }}>
                        {product.name}
                      </h4>
                      
                      <p style={{ 
                        color: '#A1A1B5', 
                        fontSize: '14px', 
                        lineHeight: '1.6', 
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {product.shortDescription}
                      </p>
                    </div>
                    
                    <div style={{ padding: '20px 30px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#A1A1B5', fontWeight: '500' }}>
                        📦 Composition: {product.packaging}
                      </span>
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${product.id}`);
                        }}
                        style={{ fontSize: '13px', color: '#F5C518', fontWeight: '600', cursor: 'pointer', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.target.style.color = '#FFF'}
                        onMouseLeave={(e) => e.target.style.color = '#F5C518'}
                      >
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
                    color: '#F5C518', 
                    border: '1px solid #F5C518', 
                    padding: '14px 36px', 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    letterSpacing: '1px', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(245, 197, 24, 0.08)';
                    e.target.style.boxShadow = '0 0 15px rgba(245, 197, 24, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  view full formulation catalogue
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* 🏢 5. WHO WE ARE (COMPANY PROFILE) */}
      <section style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px', 
          alignItems: 'center' 
        }}>
          <div style={{ 
            background: '#12121A', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            height: '400px', 
            border: '1px solid rgba(161,161,181,0.1)' 
          }}>
            <img 
              src="/assets/placeholders/pharma_hero_3.png" 
              alt="Eryx Research Lab" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              WHO WE ARE
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#F3F4F6', margin: '0 0 20px 0' }}>
              Dedicated to Your Health & Well-being
            </h2>
            <p style={{ color: '#A1A1B5', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
              Eryx Pharmaceuticals is a name synonymous with quality and trust in the healthcare industry. Our state-of-the-art manufacturing facilities and rigorous research processes ensure that every medicine we produce meets international safety standards.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              <div style={{ color: '#F3F4F6', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#5B3FFF' }}>✓</span> WHO-GMP Certified
              </div>
              <div style={{ color: '#F3F4F6', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#5B3FFF' }}>✓</span> Global Export Reach
              </div>
            </div>

            <button 
              onClick={() => navigate('/about')}
              style={{ 
                background: 'transparent', 
                color: '#FFF', 
                border: '1px solid #5B3FFF', 
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
        <GroupAssociations />
      </section>

      {/* 🏛️ 7. PILLARS SECTION */}
      <Pillars />

    </div>
  );
}

export default Home;
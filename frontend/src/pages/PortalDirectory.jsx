import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PortalDirectory({ darkMode = true }) {
  const navigate = useNavigate();

  // 🌐 Dynamic Environment Network Routing Matrix
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const BASE_URL = isLocalhost ? 'http://localhost/eryx-biotech-platform' : `${window.location.protocol}//${window.location.hostname}`;
  const API_URL = `${BASE_URL}/backend/api`;
  const ASSET_URL = `${BASE_URL}/public`;

  // 🔄 Dynamic Data Storage Nodes
  const [products, setProducts] = useState([]);
  const [team, setTeam] = useState([]);
  const [categories, setCategories] = useState([]);
  const [faqs, setFaqs] = useState([]);
  
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingFaqs, setLoadingFaqs] = useState(true);

  // 🎨 Dynamic Theme Colors (Matches About, Dashboard, and Products pages)
  const currentTheme = {
    wrapperBg: darkMode ? '#08080A' : '#FFFFFF',
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? 'rgba(19, 19, 26, 0.65)' : '#F9FAFB',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    accentYellow: '#F5C518',
    accentPurple: '#5B3FFF',
    badgeBg: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
    badgeText: darkMode ? '#8E8E9F' : '#4B5563',
    dividerColor: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'
  };

  // 🔄 Synchronize All Database Records from PHP Backend Endpoints
  useEffect(() => {
    // 1. Fetch Full Products Database
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/get_products.php`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        const productData = result.status === 'success' && Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : []);
        setProducts(productData);
      } catch (error) {
        console.warn("Falling back to local cache for products:", error);
        const cached = localStorage.getItem('eryx_products');
        if (cached) {
          try { setProducts(JSON.parse(cached)); } catch (e) { console.error(e); }
        }
      } finally {
        setLoadingProducts(false);
      }
    };

    // 2. Fetch Full Corporate Team Roster
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/team.php`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setTeam(result.data);
        } else if (Array.isArray(result)) {
          setTeam(result);
        }
      } catch (error) {
        console.warn("Failed to extract active corporate roster telemetry:", error);
      } finally {
        setLoadingTeam(false);
      }
    };

    // 3. Fetch Categories Database
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories.php`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setCategories(result.data);
        } else if (Array.isArray(result)) {
          setCategories(result);
        }
      } catch (error) {
        console.warn("Categories endpoint not active, parsing from products index.");
      } finally {
        setLoadingCategories(false);
      }
    };

    // 4. Fetch Support / FAQs Telemetry
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_URL}/faqs.php`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setFaqs(result.data);
        } else if (Array.isArray(result)) {
          setFaqs(result);
        }
      } catch (error) {
        console.warn("FAQ endpoint notice:", error);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchProducts();
    fetchTeam();
    fetchCategories();
    fetchFaqs();
  }, [API_URL]);

  // 🧪 Dynamic Segments Derivation
  const dynamicSegments = categories.length > 0 
    ? categories.map(c => c.name) 
    : Array.from(new Set(products.map(p => p.category || p.type || 'General Formulation'))).sort();

  const dynamicDepartments = Array.from(new Set(team.map(m => m.department || 'General Operations'))).sort();

  const getProductCountByCategory = (catName) => {
    const target = catName.toLowerCase().trim();
    return products.filter(p => {
      const field = (p.category || p.type || '').toLowerCase().trim();
      return field === target || field.includes(target) || target.includes(field);
    }).length;
  };

  const getMemberCountByDept = (deptName) => {
    const target = deptName.toLowerCase().trim();
    return team.filter(m => (m.department || 'General Operations').toLowerCase().trim() === target).length;
  };

  const getBadgeColors = (cat) => {
    const clean = cat?.toLowerCase() || '';
    if (clean.includes('tablet') || clean.includes('capsule')) {
      return { bg: 'rgba(245, 197, 24, 0.12)', text: '#F5C518' };
    }
    return { bg: 'rgba(91, 63, 255, 0.15)', text: '#9280FF' };
  };

  // UI Styles Matrix
  const pageStyle = { 
    fontFamily: 'system-ui, -apple-system, sans-serif', 
    width: '100%', 
    padding: '120px max(4%, 20px) 80px max(4%, 20px)', 
    boxSizing: 'border-box', 
    backgroundColor: currentTheme.wrapperBg,
    color: currentTheme.textMuted,
    minHeight: '85vh',
    transition: 'background-color 0.3s ease, color 0.3s ease'
  };
  const headerStyle = { textAlign: 'center', marginBottom: '50px' };
  const mainHeadingStyle = { fontSize: '38px', color: currentTheme.textMain, margin: '0 0 14px 0', fontWeight: '700', letterSpacing: '0.5px', transition: 'color 0.3s ease' };
  const subHeadingStyle = { fontSize: '15px', color: currentTheme.textMuted, maxWidth: '650px', margin: '0 auto', lineHeight: '1.6', transition: 'color 0.3s ease' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%', alignItems: 'start' };
  const cardStyle = { 
    backgroundColor: currentTheme.cardBg, 
    backdropFilter: 'blur(10px)',
    border: `1px solid ${currentTheme.cardBorder}`, 
    borderRadius: '12px', 
    padding: '24px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '28px', 
    transition: 'background-color 0.3s ease, border-color 0.3s ease' 
  };
  const sectionHeaderStyle = { display: 'flex', alignItems: 'center', gap: '10px', color: currentTheme.accentYellow, fontSize: '13px', fontWeight: '700', letterSpacing: '0.8px', borderBottom: `1px solid ${currentTheme.dividerColor}`, paddingBottom: '14px', margin: 0, textTransform: 'uppercase', transition: 'border-color 0.3s ease' };
  const listContainerStyle = { display: 'flex', flexDirection: 'column', gap: '14px' };
  const itemLinkStyle = { display: 'flex', alignItems: 'center', gap: '10px', color: currentTheme.textMuted, fontSize: '14px', fontWeight: '500', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease' };
  const segmentRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: currentTheme.textMuted, cursor: 'pointer', transition: 'all 0.2s ease' };
  const countBadgeStyle = { backgroundColor: currentTheme.badgeBg, color: currentTheme.badgeText, fontSize: '11px', fontWeight: '600', padding: '3px 9px', borderRadius: '20px', border: `1px solid ${currentTheme.cardBorder}`, transition: 'all 0.3s ease' };
  const categoryBadgeStyle = (bg, txt) => ({ backgroundColor: bg, color: txt, fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '8px' });
  const scrollIndexContainer = { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', maxHeight: '480px', overflowY: 'auto', paddingRight: '6px' };

  const handleItemHover = (e, isEnter) => {
    e.currentTarget.style.color = isEnter ? currentTheme.accentYellow : currentTheme.textMuted;
    e.currentTarget.style.transform = isEnter ? 'translateX(4px)' : 'translateX(0)';
  };

  return (
    <div style={pageStyle}>
      {/* HEADER SECTION */}
      <div style={headerStyle}>
        <h1 style={mainHeadingStyle}>Complete Portal Directory</h1>
        <p style={subHeadingStyle}>
          Central navigation mapping for all active database endpoints, system routes, product portfolios, and corporate divisions.
        </p>
      </div>

      {/* 4-COLUMN RESPONSIVE MATRIX */}
      <div style={gridStyle}>
        
        {/* COLUMN 1: SYSTEM PATHWAYS & POLICIES */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>🧭 Core Navigation</h3>
            <div style={{ ...listContainerStyle, marginTop: '16px' }}>
              <div onClick={() => navigate('/')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>🏠 Home / Overview</div>
              <div onClick={() => navigate('/about')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>ℹ️ About Us & Infrastructure</div>
              <div onClick={() => navigate('/products')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>💊 Product Formulations Catalogue</div>
              <div onClick={() => navigate('/safety')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>🛡️ Pharmacovigilance & Safety</div>
              <div onClick={() => navigate('/contact')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>✉️ Customer Support & Inquiry</div>
            </div>
          </div>

          <div>
            <h3 style={sectionHeaderStyle}>⚖️ Legal & Governance Policies</h3>
            <div style={{ ...listContainerStyle, marginTop: '16px' }}>
              <div onClick={() => navigate('/privacy')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>📄 Privacy Policy</div>
              <div onClick={() => navigate('/terms')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>📝 Terms & Conditions</div>
              <div onClick={() => navigate('/refunds')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>🔄 Refund & Cancellation Policy</div>
              <div onClick={() => navigate('/payment')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>💳 Online Payment Terms</div>
              <div onClick={() => navigate('/order-terms')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>📦 Order & Shipping Terms</div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: CATEGORY SEGMENTS & DEPARTMENTS */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>🏷️ Therapeutic Classifications</h3>
            <div style={{ ...listContainerStyle, marginTop: '16px' }}>
              {loadingProducts ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic' }}>Loading categories...</div>
              ) : dynamicSegments.length === 0 ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic' }}>No active segments found.</div>
              ) : (
                dynamicSegments.map((segment) => {
                  const count = getProductCountByCategory(segment);
                  return (
                    <div key={segment} onClick={() => navigate('/products')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={segmentRowStyle}>
                      <span>› {segment}</span>
                      <span style={countBadgeStyle}>{count} {count === 1 ? 'Item' : 'Items'}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div>
            <h3 style={sectionHeaderStyle}>🏢 Corporate Departments</h3>
            <div style={{ ...listContainerStyle, marginTop: '16px' }}>
              {loadingTeam ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic' }}>Loading departments...</div>
              ) : dynamicDepartments.length === 0 ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic' }}>No departments listed.</div>
              ) : (
                dynamicDepartments.map((dept) => {
                  const count = getMemberCountByDept(dept);
                  return (
                    <div key={dept} onClick={() => navigate('/about')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={segmentRowStyle}>
                      <span>› {dept}</span>
                      <span style={countBadgeStyle}>{count} {count === 1 ? 'Member' : 'Members'}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* COLUMN 3: LIVE PRODUCTS DATABASE REGISTRY */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>📑 Formulations Registry ({products.length})</h3>
            <div style={scrollIndexContainer}>
              {loadingProducts ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>Querying formulation database...</div>
              ) : products.length === 0 ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>No formulations found in registry.</div>
              ) : (
                products.map((product) => {
                  const cat = product.category || product.type || 'Formulation';
                  const colors = getBadgeColors(cat);
                  return (
                    <div key={product.id || product._id} style={{ borderBottom: `1px solid ${currentTheme.dividerColor}`, paddingBottom: '14px' }}>
                      <div 
                        onClick={() => navigate('/products')} 
                        style={{ fontWeight: '700', fontSize: '14px', color: currentTheme.textMain, cursor: 'pointer', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.target.style.color = currentTheme.accentYellow}
                        onMouseLeave={(e) => e.target.style.color = currentTheme.textMain}
                      >
                        {product.name?.toUpperCase()}
                      </div>
                      <div style={{ fontSize: '12px', color: currentTheme.textMuted, marginTop: '3px', lineHeight: '1.4' }}>
                        {product.description || product.short_description || 'Active clinical specification listed.'}
                      </div>
                      <div style={categoryBadgeStyle(colors.bg, colors.text)}>
                        {cat.toUpperCase()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* COLUMN 4: FULL CORPORATE TEAM ROSTER */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>👥 Team Directory ({team.length})</h3>
            <div style={scrollIndexContainer}>
              {loadingTeam ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>Querying personnel database...</div>
              ) : team.length === 0 ? (
                <div style={{ fontSize: '13px', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>No administrative profiles registered.</div>
              ) : (
                team.map((member) => (
                  <div key={member.id} style={{ borderBottom: `1px solid ${currentTheme.dividerColor}`, paddingBottom: '14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {member.image_url ? (
                      <img 
                        src={member.image_url.startsWith('http') ? member.image_url : `${ASSET_URL}${member.image_url.startsWith('/') ? '' : '/'}${member.image_url}`} 
                        alt={member.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #5B3FFF', background: currentTheme.wrapperBg }}
                      />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: currentTheme.wrapperBg, border: `1px solid ${currentTheme.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👤</div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div 
                        onClick={() => navigate('/about')} 
                        style={{ fontWeight: '700', fontSize: '13px', color: currentTheme.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}
                        onMouseEnter={(e) => e.target.style.color = currentTheme.accentPurple}
                        onMouseLeave={(e) => e.target.style.color = currentTheme.textMain}
                      >
                        {member.name}
                      </div>
                      <div style={{ fontSize: '11px', color: currentTheme.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                        {member.role?.toUpperCase()}
                      </div>
                      <div style={categoryBadgeStyle(darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)', currentTheme.textMuted)}>
                        {member.department || 'Operations'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PortalDirectory;
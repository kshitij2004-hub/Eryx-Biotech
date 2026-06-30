import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🌐 Centralized Environment Network Routing Matrix
const BASE_URL = 'http://localhost/eryx-biotech-platform';
const API_URL = `${BASE_URL}/backend/api`;
const ASSET_URL = `${BASE_URL}/public`;

function PortalDirectory() {
  const navigate = useNavigate();
  
  // 🔄 Dynamic Data Storage Nodes
  const [products, setProducts] = useState([]);
  const [team, setTeam] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingTeam, setLoadingTeam] = useState(true);

  // 🔄 Synchronize Formulations and Corporate Team Roster from Live Database Nodes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products.php`);
        if (!response.ok) throw new Error(`Network fault status: ${response.status}`);
        const result = await response.json();
        
        // Handle both standard arrays or success payload objects wrapper architectures
        const productData = result.status === 'success' ? result.data : (Array.isArray(result) ? result : []);
        setProducts(productData);
        localStorage.setItem('eryx_products', JSON.stringify(productData));
      } catch (error) {
        console.warn("Failed to extract live products, reverting to local fallback storage node:", error);
        const storedProducts = localStorage.getItem('eryx_products');
        if (storedProducts) {
          try { setProducts(JSON.parse(storedProducts)); } catch (pErr) { console.error(pErr); }
        }
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/team.php`);
        if (!response.ok) throw new Error(`Network fault status: ${response.status}`);
        const result = await response.json();
        if (result.status === 'success') {
          setTeam(result.data);
        }
      } catch (err) {
        console.error("Failed to extract active corporate roster telemetry:", err);
      } finally {
        setLoadingTeam(false);
      }
    };

    fetchProducts();
    fetchTeam();
  }, []);

  // 🧪 1. DYNAMIC SEGMENTS ENGINE: Formulations
  const dynamicSegments = Array.from(
    new Set(
      products.map((product) => {
        const rawGroup = product.category || product.type || 'Uncategorized';
        return rawGroup.charAt(0).toUpperCase() + rawGroup.slice(1).toLowerCase();
      })
    )
  ).sort();

  // 👥 2. DYNAMIC SEGMENTS ENGINE: Team Departments
  const dynamicDepartments = Array.from(
    new Set(
      team.map((member) => {
        const rawDept = member.department || 'General Operations';
        return rawDept.charAt(0).toUpperCase() + rawDept.slice(1).toLowerCase();
      })
    )
  ).sort();

  // 🎯 3. FUZZY COUNTER MATCHING: Products
  const getProductCountByCategory = (segmentName) => {
    const target = segmentName.toLowerCase().trim();
    return products.filter((product) => {
      const currentFields = [
        product.category?.toLowerCase().trim(),
        product.type?.toLowerCase().trim()
      ];
      return currentFields.some(field => {
        if (!field) return false;
        return (
          field === target || 
          field === `${target}s` || 
          `${field}s` === target ||
          field.replace(/s$/, '') === target.replace(/s$/, '')
        );
      });
    }).length;
  };

  // 🎯 4. COUNTER MATCHING: Team Members
  const getMemberCountByDept = (deptName) => {
    const target = deptName.toLowerCase().trim();
    return team.filter((member) => (member.department || 'General Operations').toLowerCase().trim() === target).length;
  };

  // Helper function to match category badge color presets
  const getBadgeColors = (categoryName) => {
    const cleanCat = categoryName?.toLowerCase() || '';
    if (cleanCat.includes('tablet') || cleanCat.includes('syrup')) {
      return { bg: 'rgba(245, 197, 24, 0.12)', text: '#F5C518' };
    }
    return { bg: 'rgba(91, 63, 255, 0.15)', text: '#9280FF' };
  };

  // UI Presentation Styling Blocks
  const pageStyle = { fontFamily: 'system-ui, -apple-system, sans-serif', width: '100%', padding: '20px max(4%, 20px) 60px max(4%, 20px)', boxSizing: 'border-box' };
  const headerStyle = { textAlign: 'center', marginBottom: '50px' };
  const mainHeadingStyle = { fontFamily: '"Playfair Display", Georgia, serif', fontSize: '38px', color: '#FFFFFF', margin: '0 0 14px 0', fontWeight: '600', letterSpacing: '0.5px' };
  const subHeadingStyle = { fontSize: '15px', color: '#8E8E9F', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', width: '100%', alignItems: 'start' };
  const cardStyle = { backgroundColor: '#121216', border: '1px solid rgba(161, 161, 181, 0.1)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' };
  const sectionHeaderStyle = { display: 'flex', alignItems: 'center', gap: '10px', color: '#F5C518', fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px', borderBottom: '1px solid rgba(161, 161, 181, 0.08)', paddingBottom: '14px', margin: 0, textTransform: 'uppercase' };
  const listContainerStyle = { display: 'flex', flexDirection: 'column', gap: '16px' };
  const itemLinkStyle = { display: 'flex', alignItems: 'center', gap: '12px', color: '#A1A1B5', fontSize: '14px', fontWeight: '500', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease' };
  const segmentRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: '500', color: '#A1A1B5', cursor: 'pointer', transition: 'all 0.2s ease' };
  const countBadgeStyle = { backgroundColor: 'rgba(255, 255, 255, 0.03)', color: '#8E8E9F', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(161, 161, 181, 0.1)' };
  const categoryBadgeStyle = (bgColor, textColor) => ({ backgroundColor: bgColor, color: textColor, fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '8px' });
  const scrollIndexContainer = { display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '18px', maxHeight: '500px', overflowY: 'auto', paddingRight: '6px' };

  const handleItemHover = (e, isEnter) => {
    e.currentTarget.style.color = isEnter ? '#F5C518' : '#A1A1B5';
    e.currentTarget.style.transform = isEnter ? 'translateX(4px)' : 'translateX(0)';
  };

  return (
    <div style={pageStyle}>
      {/* HEADER SECTION */}
      <div style={headerStyle}>
        <h1 style={mainHeadingStyle}>Portal Directory</h1>
        <p style={subHeadingStyle}>
          Navigate active clinical drug segments, corporate personnel rosters, and system registry pipelines natively.
        </p>
      </div>

      {/* DYNAMIC RESPONSIVE COLUMN GRID MATRIX */}
      <div style={gridStyle}>
        
        {/* COLUMN 1: SYSTEM PATHWAYS & POLICIES */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>🧭 Main Channels</h3>
            <div style={{ ...listContainerStyle, marginTop: '18px' }}>
              <div onClick={() => navigate('/')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>🏠 Home / Corporate Profile</div>
              <div onClick={() => navigate('/about')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>ℹ️ About Us / Clinical Story</div>
              <div onClick={() => navigate('/products')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>💊 Formulations Index ({products.length})</div>
              <div onClick={() => navigate('/about')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>👥 Corporate Roster ({team.length})</div>
              <div onClick={() => navigate('/safety')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>🛡️ Drug Safety Reporting</div>
              <div onClick={() => navigate('/contact')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>✉️ Contact Support</div>
            </div>
          </div>

          <div>
            <h3 style={sectionHeaderStyle}>⚖️ Corporate Policies</h3>
            <div style={{ ...listContainerStyle, marginTop: '18px' }}>
              <div onClick={() => navigate('/privacy')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>📄 Privacy Policy</div>
              <div onClick={() => navigate('/terms')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>📝 Terms & Conditions</div>
              <div onClick={() => navigate('/refunds')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>🔄 Refund & Cancellation</div>
              <div onClick={() => navigate('/payment')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>💳 Payment Terms</div>
              <div onClick={() => navigate('/order-terms')} onMouseEnter={(e) => handleItemHover(e, true)} onMouseLeave={(e) => handleItemHover(e, false)} style={itemLinkStyle}>📦 Order & Shipping Terms</div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: CATEGORY SEGMENTS MATRIX (PRODUCTS & TEAM) */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>🏷️ Formulation Segments</h3>
            <div style={{ ...listContainerStyle, marginTop: '18px' }}>
              {loadingProducts ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic' }}>Syncing segments...</div>
              ) : dynamicSegments.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic' }}>No formulations found.</div>
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
            <h3 style={sectionHeaderStyle}>🏢 Roster Departments</h3>
            <div style={{ ...listContainerStyle, marginTop: '18px' }}>
              {loadingTeam ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic' }}>Syncing departments...</div>
              ) : dynamicDepartments.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic' }}>No departments tracked.</div>
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

        {/* COLUMN 3: LIVE RECOGNIZED PRODUCTS REGISTRY INDEX */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>📑 Formulations Index ({products.length})</h3>
            <div style={scrollIndexContainer}>
              {loadingProducts ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic', textAlign: 'center' }}>Querying formulation cluster registries...</div>
              ) : products.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic', textAlign: 'center' }}>No formulation entries inside database.</div>
              ) : (
                products.map((product) => {
                  const displayCategory = product.category || product.type || 'UNASSIGNED';
                  const colors = getBadgeColors(displayCategory);
                  return (
                    <div key={product._id || product.id} style={{ borderBottom: '1px solid rgba(161, 161, 181, 0.06)', paddingBottom: '16px' }}>
                      <div onClick={() => navigate('/products')} style={{ fontWeight: '700', fontSize: '14px', color: '#FFFFFF', letterSpacing: '0.5px', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#F5C518'} onMouseLeave={(e) => e.target.style.color = '#FFFFFF'}>
                        {product.name?.toUpperCase()}
                      </div>
                      <div style={{ fontSize: '12px', color: '#8E8E9F', marginTop: '4px', lineHeight: '1.4' }}>
                        {product.description || 'No clinical active specification reported.'}
                      </div>
                      <div style={categoryBadgeStyle(colors.bg, colors.text)}>
                        {displayCategory.toUpperCase()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* COLUMN 4: LIVE RECOGNIZED CORPORATE TEAM ROSTER INDEX */}
        <div style={cardStyle}>
          <div>
            <h3 style={sectionHeaderStyle}>👥 Corporate Roster ({team.length})</h3>
            <div style={scrollIndexContainer}>
              {loadingTeam ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic', textAlign: 'center' }}>Querying corporate directory nodes...</div>
              ) : team.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic', textAlign: 'center' }}>No administrative profiles registered.</div>
              ) : (
                team.map((member) => (
                  <div key={member.id} style={{ borderBottom: '1px solid rgba(161, 161, 181, 0.06)', paddingBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {member.image_url ? (
                      <img 
                        src={member.image_url.startsWith('http') ? member.image_url : `${ASSET_URL}${member.image_url.startsWith('/') ? '' : '/'}${member.image_url}`} 
                        alt={member.name}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #5B3FFF', background: '#08080A' }}
                      />
                    ) : (
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#08080A', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>👤</div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div onClick={() => navigate('/about')} style={{ fontWeight: '700', fontSize: '13px', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#5B3FFF'} onMouseLeave={(e) => e.target.style.color = '#FFFFFF'}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8E8E9F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                        {member.role?.toUpperCase()}
                      </div>
                      <div style={categoryBadgeStyle('rgba(255, 255, 255, 0.04)', '#A1A1B5')}>
                        {member.department || 'General Operations'}
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
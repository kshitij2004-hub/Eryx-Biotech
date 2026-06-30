import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Products() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // 🔄 Two-tier Layered Filtering State
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedType, setSelectedType] = useState('All Types');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // 📦 State to safely house our synced records from the PHP Backend
  const [dynamicProductsList, setDynamicProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌐 Define your XAMPP server origin base path to anchor image streams perfectly
  const BACKEND_BASE_URL = 'http://localhost/eryx-biotech-platform';

  // 🚀 LIVE PHP BACKEND FETCH ENGINE
  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/backend/api/products.php`)
      .then((response) => response.json())
      .then((result) => {
        // Defensive Check: Handle both wrapped response objects and raw flat arrays cleanly
        let rawData = [];
        if (result && result.status === 'success' && Array.isArray(result.data)) {
          rawData = result.data;
        } else if (Array.isArray(result)) {
          rawData = result;
        }

        // Map MySQL column names seamlessly to your existing UI properties
        const mappedProducts = rawData.map((item) => ({
          id: item.id,
          name: item.name || 'Unnamed Formulation',
          shortDescription: item.description || 'No composition details provided.', 
          price: item.price,
          category: item.category || 'General Medicine',
          department: item.category || 'General Medicine', 
          type: item.type || 'Tablets',                    
          image: item.image_path || '',                    
          isFeatured: parseInt(item.is_featured) === 1    
        }));
        
        setDynamicProductsList(mappedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from PHP API:', error);
        setLoading(false);
      });
  }, []);

  // Deep UI/UX Layout System matching mockups
  const pageContainer = { padding: '40px max(5%, 20px)', maxWidth: '1400px', margin: '0 auto', fontFamily: '"Inter", system-ui, sans-serif', backgroundColor: 'transparent', color: '#F3F4F6' };
  const headerSection = { marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '25px' };
  const badgeStyle = { display: 'inline-block', background: 'rgba(91, 63, 255, 0.12)', color: '#5B3FFF', fontWeight: '700', fontSize: '11px', padding: '4px 12px', borderRadius: '50px', letterSpacing: '0.05em', marginBottom: '12px' };
  const titleStyle = { color: '#FFFFFF', fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' };
  const subtitleStyle = { color: '#A1A1B5', fontSize: '15px', margin: 0 };
  
  const contentLayout = { display: 'flex', gap: '35px', alignItems: 'flex-start' };
  
  // Sidebar Styling - Frosted Dark Glass Surface
  const sidebarCard = { width: '280px', flexShrink: 0, border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '24px', backgroundColor: 'rgba(19, 19, 26, 0.65)', backdropFilter: 'blur(10px)', boxShadow: 'none' };
  const filterHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' };
  const sidebarSectionTitle = { fontSize: '11px', fontWeight: '700', color: '#8E8E9F', letterSpacing: '0.06em', margin: '22px 0 10px 0', textTransform: 'uppercase' };
  const searchInputWrapper = { position: 'relative', display: 'flex', alignItems: 'center' };
  const searchInput = { width: '100%', padding: '10px 35px 10px 12px', backgroundColor: '#08080A', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', fontSize: '14px', color: '#FFFFFF', outline: 'none', transition: 'all 0.2s' };
  
  // Dynamic styling for Layer 1: Departments
  const departmentItemStyle = (isActive) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '9px 10px',
    borderRadius: '6px',
    backgroundColor: isActive ? 'rgba(91, 63, 255, 0.12)' : 'transparent',
    color: isActive ? '#FFFFFF' : '#A1A1B5',
    fontWeight: isActive ? '700' : '500',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '4px'
  });

  // Dynamic styling for Layer 2: Nested Types
  const typeItemStyle = (isActive) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '7px 10px 7px 24px', 
    borderRadius: '4px',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    color: isActive ? '#5B3FFF' : '#8E8E9F',
    fontWeight: isActive ? '600' : '400',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '2px'
  });

  // Grid Layout
  const mainContentArea = { flexGrow: 1 };
  const topActionBar = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '14px', color: '#A1A1B5' };
  const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '25px' };
  
  // Card Details
  const cardStyle = { border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(19, 19, 26, 0.65)', backdropFilter: 'blur(8px)', transition: 'all 0.2s ease-in-out', cursor: 'pointer' };
  const cardBadgeContainer = { display: 'flex', gap: '8px', marginBottom: '15px' };
  const cardFeaturedBadge = { background: '#ccc200', color: '#080000', padding: '3px 8px', fontSize: '11px', fontWeight: '700', borderRadius: '4px' };
  const cardCategoryBadge = { border: '1px solid rgba(255, 255, 255, 0.15)', color: '#A1A1B5', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', fontSize: '11px', fontWeight: '600', borderRadius: '12px' };
  
  const imageContainer = { height: '180px', backgroundColor: '#FFFFFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', padding: '10px', overflow: 'hidden' };
  const productTitle = { color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 10px 0', letterSpacing: '0.02em' };
  
  // ✨ FIX 1: Updated with Line Clamp Constraints
  const productDesc = { 
    fontSize: '13.5px', 
    color: '#A1A1B5', 
    lineHeight: '1.5', 
    flexGrow: 1, 
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };
  
  const actionButtonStyle = { 
    marginTop: '20px', 
    padding: '12px', 
    border: '1px solid rgba(255, 255, 255, 0.15)', 
    backgroundColor: 'transparent', 
    color: '#FFFFFF', 
    cursor: 'pointer', 
    borderRadius: '6px', 
    fontWeight: '700', 
    fontSize: '12px',
    letterSpacing: '0.03em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease'
  };

  // 🧬 Advanced Two-Tier Hierarchical Matrix Filtering Logic
  const filteredProducts = dynamicProductsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const productDept = (product.department || product.category || '').toLowerCase().trim();
    const productType = (product.type || '').toLowerCase().trim();

    const matchesDepartment = selectedDepartment === 'All Departments' || productDept === selectedDepartment.toLowerCase().trim();
    const matchesType = selectedType === 'All Types' || productType === selectedType.toLowerCase().trim();
    const matchesFeatured = !featuredOnly || product.isFeatured;

    return matchesSearch && matchesDepartment && matchesType && matchesFeatured;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All Departments');
    setSelectedType('All Types');
    setFeaturedOnly(false);
  };

  return (
    <div style={pageContainer}>
      {/* Dynamic Upper Layout Header */}
      <header style={headerSection}>
        <span style={badgeStyle}>ERYX FORMULATIONS</span>
        <h1 style={titleStyle}>Pharmaceutical Products Catalog</h1>
        <p style={subtitleStyle}>Browse and search through our dynamic clinical and therapeutic catalog.</p>
      </header>

      <div style={contentLayout}>
        {/* Left Sidebar Layout */}
        <aside style={sidebarCard}>
          <div style={filterHeader}>
            <span style={{ fontWeight: '700', fontSize: '14px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📊 FILTERS
            </span>
            <span onClick={resetFilters} style={{ fontSize: '12px', color: '#5B3FFF', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}>
              Clear All
            </span>
          </div>

          <div style={sidebarSectionTitle}>Search Catalog</div>
          <div style={searchInputWrapper}>
            <input 
              type="text" 
              placeholder="Enter formulation name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={searchInput}
            />
            <span style={{ position: 'absolute', right: '12px', color: '#9CA3AF', fontSize: '14px' }}>🔍</span>
          </div>

          {/* LAYER 1: DEPARTMENTS */}
          <div style={sidebarSectionTitle}>Departments</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 15px 0' }}>
            {['All Departments', 'Biologics', 'Solutions', 'Ophthalmic', 'General Medicine'].map((dept) => (
              <li 
                key={dept}
                style={departmentItemStyle(selectedDepartment === dept)}
                onClick={() => {
                  setSelectedDepartment(dept);
                  setSelectedType('All Types'); 
                }}
              >
                <span>{dept}</span>
                <span style={{ fontSize: '11px', opacity: 0.4 }}>{selectedDepartment === dept ? '▼' : '❯'}</span>
              </li>
            ))}
          </ul>

          {/* LAYER 2: DOSAGE FORMS (TYPES) */}
          <div style={sidebarSectionTitle}>Medicine Type</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['All Types', 'Tablets', 'Capsules', 'Drops', 'Injections', 'Syrups'].map((type) => (
              <li 
                key={type}
                style={typeItemStyle(selectedType === type)}
                onClick={() => setSelectedType(type)}
              >
                <span>{type}</span>
                <span style={{ fontSize: '10px', opacity: 0.3 }}>●</span>
              </li>
            ))}
          </ul>

          <div style={{ ...sidebarSectionTitle, marginTop: '25px' }}>Filter Options</div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#A1A1B5', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#5B3FFF' }}
            />
            Featured Formulations Only
          </label>
        </aside>

        {/* Right Main Grid Catalog */}
        <main style={mainContentArea}>
          <div style={topActionBar}>
            <div>Showing <strong style={{ color: '#FFFFFF' }}>{filteredProducts.length}</strong> formulations found</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Sort By: 
              <select style={{ padding: '6px 10px', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', outline: 'none', fontSize: '13px', backgroundColor: '#08080A', color: '#FFFFFF' }}>
                <option style={{ backgroundColor: '#08080A', color: '#FFFFFF' }}>Default Order</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div style={{ color: '#A1A1B5', textAlign: 'center', padding: '40px' }}>Loading live repository data...</div>
          ) : (
            <div style={productGrid}>
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  style={cardStyle}
                  onClick={() => navigate(`/products/${product.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#5B3FFF';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(91, 63, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Micro Badges inside Card */}
                  <div style={cardBadgeContainer}>
                    {product.isFeatured && <span style={cardFeaturedBadge}>FEATURED</span>}
                    <span style={cardCategoryBadge}>{product.category.toUpperCase()}</span>
                    <span style={{...cardCategoryBadge, borderColor: 'rgba(91, 63, 255, 0.3)', color: '#5B3FFF'}}>
                      {product.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Medicine Packaging Image Frame */}
                  {/* ✨ FIX 2: Wrapped properly inside standard bracket layout condition boundaries */}
                  <div style={imageContainer}>
                    {product.image ? (
                      <img 
                        src={product.image.startsWith('http') ? product.image : `${BACKEND_BASE_URL}/public${product.image}`} 
                        alt={product.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        onError={(e) => { 
                          e.target.style.display = 'none'; 
                          e.target.parentNode.innerHTML = `<span style="color: #9CA3AF; font-size: 12px;">📦 [${product.name}]</span>`;
                        }} 
                      />
                    ) : (
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>📦 [{product.name}]</span>
                    )}
                  </div>

                  {/* Typography metadata */}
                  <h3 style={productTitle}>{product.name}</h3>
                  <p style={productDesc}>{product.shortDescription}</p>

                  {/* CTA Action Redirect Link */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      navigate(`/products/${product.id}`);
                    }}
                    style={actionButtonStyle}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#5B3FFF'; e.target.style.borderColor = '#5B3FFF'; e.target.style.color = '#FFF'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)'; e.target.style.color = '#FFFFFF'; }}
                  >
                    VIEW FORMULATION DETAILS <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: '#A1A1B5', border: '1px dashed rgba(255, 255, 255, 0.15)', borderRadius: '8px', marginTop: '20px' }}>
              No formulations found matching the selected filtering matrix.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
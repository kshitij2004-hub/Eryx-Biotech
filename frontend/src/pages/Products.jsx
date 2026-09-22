import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🌐 Centralized Environment Network Routing Matrix (Stable Outside Component)
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BASE_URL = isLocalhost ? 'http://localhost/eryx-biotech-platform' : `${window.location.protocol}//${window.location.hostname}`;
const API_URL = `${BASE_URL}/backend/api`;
const ASSET_URL = `${BASE_URL}/public`;

function Products({ darkMode = true }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // 🔄 Two-tier Layered Filtering & Sorting State
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedType, setSelectedType] = useState('All Types');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Default Order');

  // 📦 State to safely house our synced records from the PHP Backend
  const [dynamicProductsList, setDynamicProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎨 Dynamic Theme Colors
  const currentTheme = {
    wrapperBg: darkMode ? '#08080A' : '#FFFFFF',
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? 'rgba(19, 19, 26, 0.65)' : '#F9FAFB',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    inputBg: darkMode ? '#121216' : '#FFFFFF',
    inputBorder: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    accentPurple: '#5B3FFF',
    accentYellow: '#F5C518'
  };

  // 🚀 LIVE PHP BACKEND FETCH ENGINE WITH CONTENT-TYPE VALIDATION
  useEffect(() => {
    fetch(`${API_URL}/get_products.php`)
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textBody = await response.text();
          throw new Error(`Server returned non-JSON response (${response.status}): ${textBody.substring(0, 100)}...`);
        }
        return response.json();
      })
      .then((result) => {
        let rawData = [];
        if (result && result.status === 'success' && Array.isArray(result.data)) {
          rawData = result.data;
        } else if (Array.isArray(result)) {
          rawData = result;
        }

        const mappedProducts = rawData.map((item) => {
          let rawImg = item.image_url || item.image_path || item.image || '';
          return {
            id: item.id,
            name: item.name || 'Unnamed Formulation',
            shortDescription: item.description || 'No composition details provided.', 
            price: item.price,
            category: item.category || 'General Medicine',
            department: item.category || 'General Medicine', 
            type: item.type || 'Tablets',          
            image: rawImg,                     
            isFeatured: parseInt(item.is_featured) === 1 || item.is_featured === true
          };
        });
        
        setDynamicProductsList(mappedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.warn('Error fetching data from PHP API, deploying system fallbacks:', error);
        const systemFallbackProducts = [
          {
            id: 'fb-p1',
            name: 'Eryxovit Softgels',
            shortDescription: 'Advanced multivitamin and mineral therapeutic formulation engineered for baseline metabolic reinforcement.',
            category: 'General Medicine',
            department: 'General Medicine',
            type: 'Capsules',
            image: '',
            isFeatured: true
          },
          {
            id: 'fb-p2',
            name: 'Ophthacare Sterile Drop Solution',
            shortDescription: 'Premium ophthalmic lubrication vector optimized for environmental micro-particle defense filters.',
            category: 'Ophthalmic',
            department: 'Ophthalmic',
            type: 'Drops',
            image: '',
            isFeatured: false
          }
        ];
        setDynamicProductsList(systemFallbackProducts);
        setLoading(false);
      });
  }, []);

  // Layout styles
  const pageContainer = { 
    padding: '120px max(4%, 20px) 60px max(4%, 20px)', 
    maxWidth: '1400px', 
    margin: '0 auto', 
    fontFamily: '"Inter", system-ui, sans-serif', 
    backgroundColor: currentTheme.wrapperBg, 
    color: currentTheme.textMain, 
    minHeight: '85vh', 
    transition: 'background-color 0.3s ease, color 0.3s ease',
    boxSizing: 'border-box'
  };
  
  const headerSection = { marginBottom: '25px', borderBottom: `1px solid ${currentTheme.cardBorder}`, paddingBottom: '20px' };
  const badgeStyle = { display: 'inline-block', background: 'rgba(91, 63, 255, 0.12)', color: '#5B3FFF', fontWeight: '700', fontSize: '11px', padding: '4px 12px', borderRadius: '50px', letterSpacing: '0.05em', marginBottom: '12px' };
  const titleStyle = { color: currentTheme.textMain, fontSize: '38px', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: '600', margin: '0 0 8px 0', letterSpacing: '0.5px' };
  const subtitleStyle = { color: currentTheme.textMuted, fontSize: '15px', margin: 0 };
  
  const horizontalFilterCard = { 
    width: '100%', 
    border: `1px solid ${currentTheme.cardBorder}`, 
    borderRadius: '12px', 
    padding: '20px 24px', 
    backgroundColor: currentTheme.cardBg, 
    backdropFilter: 'blur(10px)', 
    boxSizing: 'border-box',
    marginBottom: '25px'
  };

  const filterHeaderRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: `1px solid ${currentTheme.cardBorder}`, paddingBottom: '10px' };
  const filterControlsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', alignItems: 'center' };
  const filterGroupStyle = { display: 'flex', flexDirection: 'column', gap: '6px' };
  const filterLabelStyle = { fontSize: '11px', fontWeight: '700', color: currentTheme.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase' };
  const searchInputWrapper = { position: 'relative', display: 'flex', alignItems: 'center' };
  const searchInput = { width: '100%', padding: '9px 35px 9px 12px', backgroundColor: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '6px', fontSize: '13.5px', color: currentTheme.textMain, outline: 'none', boxSizing: 'border-box' };
  const selectDropdownStyle = { width: '100%', padding: '9px 12px', backgroundColor: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '6px', fontSize: '13.5px', color: currentTheme.textMain, outline: 'none', cursor: 'pointer', boxSizing: 'border-box' };
  const topActionBar = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px', fontSize: '14px', color: currentTheme.textMuted };
  const productGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', width: '100%' };
  
  const cardStyle = { 
    border: `1px solid ${currentTheme.cardBorder}`, 
    borderRadius: '12px', 
    padding: '20px', 
    display: 'flex', 
    flexDirection: 'column', 
    backgroundColor: currentTheme.cardBg, 
    backdropFilter: 'blur(8px)', 
    transition: 'all 0.2s ease-in-out', 
    cursor: 'pointer', 
    boxSizing: 'border-box' 
  };
  
  const cardBadgeContainer = { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' };
  const cardFeaturedBadge = { background: '#F5C518', color: '#08080A', padding: '3px 8px', fontSize: '11px', fontWeight: '700', borderRadius: '4px' };
  const cardCategoryBadge = { border: `1px solid ${currentTheme.inputBorder}`, color: currentTheme.textMuted, backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)', padding: '2px 8px', fontSize: '11px', fontWeight: '600', borderRadius: '12px' };
  const imageContainer = { height: '180px', backgroundColor: darkMode ? '#121216' : '#F3F4F6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', padding: '10px', overflow: 'hidden', border: `1px solid ${currentTheme.cardBorder}` };
  const productTitle = { color: currentTheme.textMain, fontSize: '18px', fontWeight: '700', margin: '0 0 10px 0', letterSpacing: '0.02em' };
  
  const productDesc = { 
    fontSize: '13.5px', color: currentTheme.textMuted, lineHeight: '1.5', flexGrow: 1, margin: 0,
    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'
  };
  
  const actionButtonStyle = { 
    marginTop: '20px', padding: '12px', border: `1px solid ${currentTheme.inputBorder}`, backgroundColor: 'transparent', 
    color: currentTheme.textMain, cursor: 'pointer', borderRadius: '6px', fontWeight: '700', fontSize: '12px',
    letterSpacing: '0.03em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease'
  };

  // Filter and Sort Pipeline
  const filteredProducts = dynamicProductsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const productDept = (product.department || product.category || '').toLowerCase().trim();
    const productType = (product.type || '').toLowerCase().trim();

    const matchesDepartment = selectedDepartment === 'All Departments' || productDept === selectedDepartment.toLowerCase().trim();
    const matchesType = selectedType === 'All Types' || productType === selectedType.toLowerCase().trim();
    const matchesFeatured = !featuredOnly || product.isFeatured;

    return matchesSearch && matchesDepartment && matchesType && matchesFeatured;
  }).sort((a, b) => {
    if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
    if (sortBy === 'Name (Z-A)') return b.name.localeCompare(a.name);
    if (sortBy === 'Featured First') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    return 0; // Default Order
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All Departments');
    setSelectedType('All Types');
    setFeaturedOnly(false);
    setSortBy('Default Order');
  };

  return (
    <div style={pageContainer}>
      <header style={headerSection}>
        <span style={badgeStyle}>ERYX FORMULATIONS</span>
        <h1 style={titleStyle}>Pharmaceutical Products Catalog</h1>
        <p style={subtitleStyle}>Browse and search through our dynamic clinical and therapeutic catalog.</p>
      </header>

      {/* 🎛️ Horizontal Top Filter Panel */}
      <div style={horizontalFilterCard}>
        <div style={filterHeaderRow}>
          <span style={{ fontWeight: '700', fontSize: '13px', color: currentTheme.textMain, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
            📊 CATALOG FILTER MATRIX
          </span>
          <span onClick={resetFilters} style={{ fontSize: '12px', color: '#5B3FFF', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}>
            Clear All Filters
          </span>
        </div>

        <div style={filterControlsGrid}>
          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Search Catalog</label>
            <div style={searchInputWrapper}>
              <input 
                type="text" 
                placeholder="Enter formulation name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={searchInput}
              />
              <span style={{ position: 'absolute', right: '12px', color: currentTheme.textMuted, fontSize: '13px' }}>🔍</span>
            </div>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Department</label>
            <select 
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={selectDropdownStyle}
            >
              {['All Departments', 'Biologics', 'Solutions', 'Ophthalmic', 'General Medicine'].map((dept) => (
                <option key={dept} value={dept} style={{ backgroundColor: currentTheme.inputBg, color: currentTheme.textMain }}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div style={filterGroupStyle}>
            <label style={filterLabelStyle}>Medicine Type</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={selectDropdownStyle}
            >
              {['All Types', 'Tablets', 'Capsules', 'Drops', 'Injections', 'Syrups'].map((type) => (
                <option key={type} value={type} style={{ backgroundColor: currentTheme.inputBg, color: currentTheme.textMain }}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div style={{ ...filterGroupStyle, justifyContent: 'flex-end', height: '100%', paddingTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: currentTheme.textMuted, cursor: 'pointer', fontWeight: '500' }}>
              <input 
                type="checkbox" 
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
                style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#5B3FFF' }}
              />
              Featured Formulations Only
            </label>
          </div>
        </div>
      </div>

      {/* Main Grid Content Area */}
      <main style={{ width: '100%' }}>
        <div style={topActionBar}>
          <div>Showing <strong style={{ color: currentTheme.textMain }}>{filteredProducts.length}</strong> formulations found</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Sort By: 
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '6px 10px', border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '6px', outline: 'none', fontSize: '13px', backgroundColor: currentTheme.inputBg, color: currentTheme.textMain }}
            >
              <option value="Default Order">Default Order</option>
              <option value="Name (A-Z)">Name (A-Z)</option>
              <option value="Name (Z-A)">Name (Z-A)</option>
              <option value="Featured First">Featured First</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div style={{ color: currentTheme.textMuted, textAlign: 'center', padding: '40px' }}>Loading live repository data...</div>
        ) : (
          <div style={productGrid}>
            {filteredProducts.map(product => {
              let imgSrc = '';
              if (product.image) {
                if (product.image.startsWith('http') || product.image.startsWith('blob:')) {
                  imgSrc = product.image;
                } else {
                  const cleanPath = product.image.startsWith('/') ? product.image : `/${product.image}`;
                  if (cleanPath.startsWith('/uploads/') && !cleanPath.startsWith('/public/uploads/')) {
                    imgSrc = `${ASSET_URL}${cleanPath}`;
                  } else if (!cleanPath.startsWith('/public/')) {
                    imgSrc = `${ASSET_URL}${cleanPath}`;
                  } else {
                    imgSrc = `${BASE_URL}${cleanPath}`;
                  }
                }
              }

              return (
                <div 
                  key={product.id} 
                  style={cardStyle}
                  onClick={() => navigate(`/products/${product.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#5B3FFF';
                    e.currentTarget.style.boxShadow = darkMode ? '0 8px 24px rgba(91, 63, 255, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = currentTheme.cardBorder;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={cardBadgeContainer}>
                    {product.isFeatured && <span style={cardFeaturedBadge}>FEATURED</span>}
                    <span style={cardCategoryBadge}>{product.category.toUpperCase()}</span>
                    <span style={{...cardCategoryBadge, borderColor: 'rgba(91, 63, 255, 0.3)', color: '#5B3FFF'}}>
                      {product.type.toUpperCase()}
                    </span>
                  </div>

                  <div style={imageContainer}>
                    {imgSrc ? (
                      <img 
                        src={imgSrc} 
                        alt={product.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        onError={(e) => { 
                          const currentSrc = e.target.src;
                          if (!e.target.dataset.retried) {
                            e.target.dataset.retried = "true";
                            if (currentSrc.includes('/public/')) {
                              e.target.src = currentSrc.replace('/public/', '/');
                            } else {
                              e.target.src = `${ASSET_URL}/uploads/${product.image.replace(/^\/+/, '')}`;
                            }
                          } else {
                            e.target.style.display = 'none'; 
                            e.target.parentNode.innerHTML = `<span style="color: ${currentTheme.textMuted}; font-size: 12px;">📦 [${product.name}]</span>`;
                          }
                        }} 
                      />
                    ) : (
                      <span style={{ color: currentTheme.textMuted, fontSize: '12px' }}>📦 [{product.name}]</span>
                    )}
                  </div>

                  <h3 style={productTitle}>{product.name}</h3>
                  <p style={productDesc}>{product.shortDescription}</p>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      navigate(`/products/${product.id}`);
                    }}
                    style={actionButtonStyle}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#5B3FFF'; e.target.style.borderColor = '#5B3FFF'; e.target.style.color = '#FFF'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.borderColor = currentTheme.inputBorder; e.target.style.color = currentTheme.textMain; }}
                  >
                    VIEW FORMULATION DETAILS <span>→</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: currentTheme.textMuted, border: `1px dashed ${currentTheme.inputBorder}`, borderRadius: '12px', marginTop: '20px' }}>
            No formulations found matching the selected filtering matrix.
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;
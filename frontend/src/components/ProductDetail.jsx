import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 🌐 Centralized Environment Network Routing Matrix
const BASE_URL = 'http://localhost/eryx-biotech-platform';
const API_URL = `${BASE_URL}/backend/api`;
const ASSET_URL = `${BASE_URL}/public`;

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // 🔄 Reactive State Containers
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Dynamic Live Database Synchronization Hook
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Query the hybrid PHP script using the targeted URL identifier parameter
        const response = await fetch(`${API_URL}/get_products.php?id=${productId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setProduct(null);
            return;
          }
          throw new Error(`Server returned network context status layer code: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.status === 'success') {
          setProduct(result.data);
        } else {
          throw new Error(result.message || 'Malformed database query token exception.');
        }
      } catch (err) {
        console.error("Database connection failure on look-up layer:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  // Layout Design Styles System (Preserved)
  const pageContainer = { padding: '40px max(5%, 20px)', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Inter", system-ui, sans-serif' };
  const backButton = { display: 'flex', alignItems: 'center', gap: '6px', border: 'none', backgroundColor: 'transparent', color: '#004B87', fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginBottom: '30px', padding: 0 };
  const mainLayout = { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '50px', alignItems: 'start' };
  const imageFrame = { border: '1px solid #E5E7EB', borderRadius: '12px', padding: '40px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' };
  const categoryBadge = { display: 'inline-block', background: '#EBF5FF', color: '#004B87', fontWeight: '700', fontSize: '11px', padding: '4px 14px', borderRadius: '50px', letterSpacing: '0.05em', marginBottom: '16px' };
  const titleStyle = { color: '#003561', fontSize: '36px', fontWeight: '700', margin: '0 0 16px 0', letterSpacing: '-0.02em' };
  const shortDescStyle = { color: '#4B5563', fontSize: '15px', lineHeight: '1.6', margin: '0 0 30px 0' };
  const specsCard = { border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', backgroundColor: '#FFFFFF', marginBottom: '35px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' };
  const specsHeader = { fontSize: '13px', fontWeight: '700', color: '#004B87', letterSpacing: '0.05em', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' };
  const specRow = { marginBottom: '16px' };
  const specLabel = { fontSize: '12px', fontWeight: '700', color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' };
  const specValue = { fontSize: '13.5px', color: '#4B5563', paddingLeft: '18px', lineHeight: '1.5' };
  const sectionHeading = { fontSize: '16px', fontWeight: '700', color: '#003561', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' };
  const sideEffectsBox = { borderLeft: '4px solid #004B87', backgroundColor: '#F0F7FF', padding: '20px', borderRadius: '0 8px 8px 0', margin: '30px 0' };
  const inquiryButton = { backgroundColor: '#004B87', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.03em', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' };

  // 🔁 Render State A: System Thread Initializing
  if (loading) {
    return (
      <div style={{ ...pageContainer, textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: '#003561' }}>Synchronizing Engine Record...</h2>
        <p style={{ color: '#6B7280' }}>Fetching live formulation parameters from data nodes.</p>
      </div>
    );
  }

  // 🔁 Render State B: Network Connection Exceptions
  if (error) {
    return (
      <div style={{ ...pageContainer, textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: '#EF4444' }}>Runtime Link Failure</h2>
        <p style={{ color: '#6B7280', marginBottom: '20px' }}>{error}</p>
        <button onClick={() => navigate('/products')} style={inquiryButton}>Return to Workspace Catalog</button>
      </div>
    );
  }

  // 🔁 Render State C: Invalid Identifiers / No Record Match Found
  if (!product) {
    return (
      <div style={{ ...pageContainer, textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: '#003561' }}>Formulation Not Found</h2>
        <p style={{ color: '#6B7280', marginBottom: '20px' }}>Could not find details for ID: "{productId}"</p>
        <button onClick={() => navigate('/products')} style={inquiryButton}>Back to Products Catalog</button>
      </div>
    );
  }

  // Resolve valid image source matching asset parameters
  const productImageSource = product.image_path || product.image;
  const hasValidImage = productImageSource && !productImageSource.includes('path-to-');

  return (
    <div style={pageContainer}>
      <button style={backButton} onClick={() => navigate('/products')}>
        ← Back to Catalog
      </button>

      <div style={mainLayout}>
        {/* Left Column: Image Area */}
        <div style={imageFrame}>
          {hasValidImage ? (
            <img 
              src={productImageSource.startsWith('http') ? productImageSource : `${ASSET_URL}${productImageSource}`} 
              alt={product.name} 
              style={{ maxWidth: '100%', maxHeight: '450px', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#9CA3AF' }}>
              <span style={{ fontSize: '64px' }}>📦</span>
              <p style={{ margin: '10px 0 0 0', fontSize: '12px' }}>Image Placeholder ({product.name})</p>
            </div>
          )}
        </div>

        {/* Right Column: Information Details */}
        <div>
          <span style={categoryBadge}>{(product.category || product.type || 'General').toUpperCase()}</span>
          <h1 style={titleStyle}>{product.name}</h1>
          <p style={shortDescStyle}>{product.shortDescription || product.description}</p>

          {/* Specifications Table */}
          <div style={specsCard}>
            <div style={specsHeader}>📋 FORMULATION SPECIFICATIONS</div>
            
            <div style={specRow}>
              <div style={specLabel}>🧪 Composition</div>
              <div style={specValue}>
                {product.specifications?.composition || product.composition || product.formula || 'N/A'}
              </div>
            </div>
            
            <div style={specRow}>
              <div style={specLabel}>👁️ Recommended Usage</div>
              <div style={specValue}>{product.specifications?.usage || 'As directed by the Physician.'}</div>
            </div>
            
            <div style={specRow}>
              <div style={{ ...specLabel, marginBottom: 0 }}>📦 Packaging Details</div>
              <div style={specValue}>{product.specifications?.packaging || product.packaging || 'Standard Packaging'}</div>
            </div>
          </div>

          {/* SAFE CHECK: Only renders the Key Benefits section if it exists in the data */}
          {product.benefits && Array.isArray(product.benefits) && product.benefits.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <div style={sectionHeading}>🩺 Uses & Key Benefits</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {product.benefits.map((benefit, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#4B5563', marginBottom: '10px', lineHeight: '1.5' }}>
                    <span style={{ color: '#004B87', fontWeight: 'bold' }}>✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SAFE CHECK: Only renders the Side Effects section if it exists in the data */}
          {product.sideEffects && (
            <div style={sideEffectsBox}>
              <div style={{ ...sectionHeading, color: '#004B87', fontSize: '14px', marginBottom: '8px' }}>
                ⚠️ Clinical Safety & Side Effects
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                {product.sideEffects}
              </p>
            </div>
          )}

          <button 
            style={inquiryButton}
            onClick={() => alert(`Inquiry initiated for ${product.name}.`)}
          >
            📬 SEND FORMULATION INQUIRY
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import ProductsCatalog from './pages/Products';
import ProductDetail from './components/ProductDetail';
import { productsList } from './data/productData';
import './index.css';
import Dashboard from './pages/Dashboard';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import DrugSafety from './pages/DrugSafety';
import Contact from './pages/Contact';
import Auth from './pages/Auth'; 
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PortalDirectory from './pages/PortalDirectory';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import PaymentTerms from './pages/PaymentTerms';
import OrderTerms from './pages/OrderTerms';

import Footer from './components/common/Footer';

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('eryx-app-theme') === 'light';
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('eryx-app-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('eryx-app-theme', 'dark');
    }
  }, [isLightMode]);

  const darkMode = !isLightMode;

  useEffect(() => {
    const fetchPublicRegistry = async () => {
      try {
        const res = await fetch('/backend/api/get_products.php');
        if (res.ok) {
          const result = await res.json();
          if (result.status === 'success' && Array.isArray(result.data)) {
            setProducts(result.data);
          } else if (Array.isArray(result)) {
            setProducts(result);
          }
        }
      } catch (err) {
        setProducts([
          { 
            _id: '1', 
            name: 'ERYXOVIT-I', 
            category: 'Tablets', 
            type: 'Nutritional Ophthalmic', 
            description: 'Advanced AREDS 2 based antioxidant formulation designed to preserve retinal health, supporting macular pigment density and overall visual acuity.', 
            packaging: '10x10 Alu-Alu Blister' 
          },
          { 
            _id: '2', 
            name: 'HYLODIUM', 
            category: 'Ophthalmic Solutions', 
            type: 'Lubricant Eye Drops', 
            description: 'Premium Hydroxypropyl Methylcellulose sterile solution mimicking natural tear film composition to provide immediate, prolonged relief for chronic dry eyes.', 
            packaging: '10ml Sterile Vial' 
          },
          { 
            _id: '3', 
            name: 'ERYXOLUB', 
            category: 'Ophthalmic Solutions', 
            type: 'Premium Eye Lubricant', 
            description: 'Carboxymethylcellulose sodium formula optimized for maximum retention time on the ocular surface, protecting against persistent environmental and digital strain.', 
            packaging: '10ml Comfort Dispenser' 
          }
        ]);
      }
    };
    fetchPublicRegistry();
  }, []);

  const handleNavigation = (targetPath) => {
    navigate(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!localStorage.getItem('eryx_products')) {
    localStorage.setItem('eryx_products', JSON.stringify(productsList));
  }

  return (
    <div className="eryx-app-container" style={{ backgroundColor: darkMode ? '#08080A' : '#FFFFFF', color: darkMode ? '#FFFFFF' : '#1F2937', minHeight: '100vh', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      
      {/* 🌐 GLOBAL STICKY GLASSMORPHISM NAVBAR */}
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: 'auto',
        minHeight: '80px',
        background: darkMode ? 'rgba(19, 19, 26, 0.8)' : 'rgba(255, 255, 255, 0.82)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)', 
        borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`, 
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 max(4%, 20px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          
          <div 
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={() => handleNavigation('/')}
          >
            <img 
              src="/assets/logos/eryx-logo.png" 
              alt="Eryx Corporate Logo" 
              style={{ height: '60px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
          
          <nav style={{ display: 'flex', gap: '24px', fontSize: '13px', fontWeight: '600', alignItems: 'center', flexWrap: 'wrap' }}>
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>HOME</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>ABOUT</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>PRODUCTS</NavLink>
            <NavLink to="/safety" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>DRUG SAFETY</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>CONTACT</NavLink>

            {user && user.role === 'admin' && (
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} style={{ color: '#5B3FFF' }}>
                DASHBOARD
              </NavLink>
            )}

            <button
              onClick={() => setIsLightMode(!isLightMode)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
                backgroundColor: darkMode ? '#121216' : '#F3F4F6',
                color: darkMode ? '#FFFFFF' : '#1F2937',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            >
              {isLightMode ? '🌙 Dark Mode' : '🪻 Light Mode'}
            </button>
            
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderLeft: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, paddingLeft: '20px' }}>
                <NavLink to={user.role === 'admin' ? '/dashboard' : '/safety'} style={{ fontSize: '12px', color: '#5B3FFF', textDecoration: 'none', fontWeight: '600' }}>{user.name}</NavLink>
                <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>LOGOUT</button>
              </div>
            ) : (
              <NavLink to="/login" style={{ background: 'none', border: 'none', color: darkMode ? '#F5C518' : '#D97706', cursor: 'pointer', borderLeft: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`, paddingLeft: '20px', textDecoration: 'none' }}>LOGIN / SIGN UP</NavLink>
            )}
          </nav>
        </div>
      </header>

      {/* 🛒 MAIN CONTENT CONTAINER (Top padding accounts for fixed header) */}
      <main style={{ width: '100%', margin: '0 auto', paddingTop: '80px', flex: 1, minHeight: '75vh', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Home products={products} handleNavigation={handleNavigation} darkMode={darkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/products" element={<Products products={products} darkMode={darkMode} />} />
          <Route path="/products/:productId" element={<ProductDetail darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />
          <Route path="/login" element={<Auth setUser={setUser} darkMode={darkMode} />} />
          <Route path="/safety" element={<DrugSafety user={user} darkMode={darkMode} />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard products={products} darkMode={darkMode} />
            </ProtectedRoute>
          } />

          <Route path="/sitemap" element={<PortalDirectory handleNavigation={handleNavigation} darkMode={darkMode} />} />
          <Route path="/privacy" element={<PrivacyPolicy handleNavigation={handleNavigation} darkMode={darkMode} />} />
          <Route path="/terms" element={<TermsConditions handleNavigation={handleNavigation} darkMode={darkMode} />} />
          <Route path="/refunds" element={<RefundPolicy handleNavigation={handleNavigation} darkMode={darkMode} />} />
          <Route path="/payment" element={<PaymentTerms handleNavigation={handleNavigation} darkMode={darkMode} />} />
          <Route path="/order-terms" element={<OrderTerms handleNavigation={handleNavigation} darkMode={darkMode} />} />
        </Routes>
      </main>

      {/* 🏙️ FIXED GLOBAL FOOTER LAYER */}
      <Footer handleNavigation={handleNavigation} darkMode={darkMode} />
      
    </div>
  );
}

export default App;
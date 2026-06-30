import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, Link, useNavigate } from 'react-router-dom';
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
import PortalDirectory from './pages/PortalDirectory'; // 🧭 Added for HTML Sitemap layout

// 🔒 Dedicated Standalone Legal & Policy View Components
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import PaymentTerms from './pages/PaymentTerms';
import OrderTerms from './pages/OrderTerms';

// 🔌 Global structural components
import Footer from './components/common/Footer';
function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState({ name: 'ERYX-ROOT-99', role: 'admin' });

  useEffect(() => {
    const fetchPublicRegistry = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        // 🧪 Realistic Clinical Product Lineup Fallback Data
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

  const handleNavigation = (targetPage) => {
    if (targetPage === 'safety' && !user) {
      setCurrentPage('login');
    } else if (targetPage === 'dashboard' && user?.role !== 'admin') {
      setCurrentPage('home');
    } else {
      setCurrentPage(targetPage);
    }
    // Automatically smooth scroll to top on page switches
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': 
        return <Home products={products} handleNavigation={handleNavigation} />;
      case 'about': 
        return <About />;
      case 'products': 
        return <Products products={products} />;
      case 'safety': 
        return <DrugSafety user={user} />;
      case 'contact': 
        return <Contact />;
      case 'login': 
        return <Auth setUser={setUser} setCurrentPage={setCurrentPage} />;
      case 'dashboard': 
        return <AdminDashboard products={products} />;
      
      // 🧭 HTML Visual Portal Directory Route
      case 'sitemap':
        return <PortalDirectory handleNavigation={handleNavigation} />;
      
      // 🛡️ Custom Standalone Policy Routes
      case 'privacy':
        return <PrivacyPolicy handleNavigation={handleNavigation} />;
      case 'terms':
        return <TermsConditions handleNavigation={handleNavigation} />;
      case 'refunds':
        return <RefundPolicy handleNavigation={handleNavigation} />;
      case 'payment':
        return <PaymentTerms handleNavigation={handleNavigation} />;
      case 'order-terms':
        return <OrderTerms handleNavigation={handleNavigation} />;

      default: 
        return <Home products={products} handleNavigation={handleNavigation} />;
    }
  };
  if (!localStorage.getItem('eryx_products')) {
    localStorage.setItem('eryx_products', JSON.stringify(productsList));
  }
  return (
    <div className="eryx-app-container" style={{ backgroundColor: '#08080A', color: '#F3F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 🌐 GLOBAL STICKY GLASSMORPHISM NAVBAR */}
      <header style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '80px',
        background: 'rgba(8, 8, 11, 0.75)', 
        backdropFilter: 'blur(12px)', 
        WebkitBackdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(161, 161, 181, 0.1)', 
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* 🏷️ BRAND LOGO IMAGE ANCHOR */}
          <div 
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          >
            <img 
              src="/assets/logos/eryx-logo.png" 
              alt="Eryx Corporate Logo" 
              style={{ height: '70px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
          
          {/* 🧭 NAVIGATION LINKS */}
          <nav style={{ display: 'flex', gap: '30px', fontSize: '13px', fontWeight: '600', alignItems: 'center' }}>
            
  
  {/* The 'end' prop ensures Home only matches exactly "/" */}
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
  
  {user ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '1px solid rgba(161,161,181,0.2)', paddingLeft: '20px' }}>
      <NavLink to={user.role === 'admin' ? '/dashboard' : '/safety'} style={{ fontSize: '12px', color: '#5B3FFF', textDecoration: 'none', fontWeight: '600' }}>{user.name}</NavLink>
      <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>LOGOUT</button>
    </div>
  ) : (
    <NavLink to="/login" style={{ background: 'none', border: 'none', color: '#F5C518', cursor: 'pointer', borderLeft: '1px solid rgba(161,161,181,0.2)', paddingLeft: '20px', textDecoration: 'none' }}>LOGIN / SIGN UP</NavLink>
  )}
</nav>
        </div>
      </header>

      {/* 🛒 MAIN CONTENT CONTAINER */}
      <main style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '120px 20px 60px 20px', flex: 1, minHeight: '75vh' }}>
  <Routes>
  <Route path="/" element={<Home products={products} handleNavigation={handleNavigation} />} />
  <Route path="/about" element={<About />} />
  <Route path="/products" element={<Products products={products} />} />
  <Route path="/products/:productId" element={<ProductDetail />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<Auth setUser={setUser} />} />
  <Route path="/safety" element={<DrugSafety user={user} />} />
  
  
  {/* These are protected: they check for 'user' before showing the page */}

  <Route path="/dashboard" element={
    <ProtectedRoute user={user}>
      <Dashboard products={products} />
    </ProtectedRoute>
  } />

  <Route path="/sitemap" element={<PortalDirectory handleNavigation={handleNavigation} />} />
  <Route path="/privacy" element={<PrivacyPolicy handleNavigation={handleNavigation} />} />
  <Route path="/terms" element={<TermsConditions handleNavigation={handleNavigation} />} />
  <Route path="/refunds" element={<RefundPolicy handleNavigation={handleNavigation} />} />
  <Route path="/payment" element={<PaymentTerms handleNavigation={handleNavigation} />} />
  <Route path="/order-terms" element={<OrderTerms handleNavigation={handleNavigation} />} />
</Routes>
</main>

      {/* 🏙️ RENDER FIXED GLOBAL FOOTER WITH ROUTING PROPS */}
      <Footer handleNavigation={handleNavigation} />
      
    </div>
    
    
  );
}

export default App;
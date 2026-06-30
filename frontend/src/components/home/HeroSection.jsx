import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added React Router Navigation

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // 2. Initialized the navigation hook

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1600', 
      title: 'Innovation in Healthcare',
      subtitle: 'Pioneering research and development for a healthier tomorrow. Global standards in pharmaceutical excellence.',
      btnText: 'EXPLORE PRODUCTS',
      action: () => navigate('/products') // 3. Redirects natively to /products
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1600',
      title: 'Trusted Medical Solutions',
      subtitle: 'Delivering high-quality, WHO-GMP certified medicines across the globe for over two decades.',
      btnText: 'INQUIRE NOW',
      action: () => navigate('/contact') // 3. Redirects natively to /contact
    }
  ];

  // Auto-slide effect every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Styles
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '80vh',
    minHeight: '500px',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const slideStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${slides[currentSlide].image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.8s ease-in-out',
    padding: '0 10%'
  };

  const contentStyle = {
    maxWidth: '650px',
    color: '#FFFFFF',
    animation: 'fadeInUp 1s ease-out'
  };

  const titleStyle = {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: '700',
    marginBottom: '20px',
    lineHeight: '1.2',
    letterSpacing: '-0.5px'
  };

  const subtitleStyle = {
    fontSize: 'clamp(14px, 2vw, 18px)',
    lineHeight: '1.6',
    color: '#E5E7EB',
    marginBottom: '35px',
    fontWeight: '400'
  };

  const buttonStyle = {
    backgroundColor: '#004B87',
    color: '#FFFFFF',
    border: 'none',
    padding: '14px 28px',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '1px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 12px rgba(0, 75, 135, 0.3)'
  };

  const controlsContainer = {
    position: 'absolute',
    bottom: '40px',
    right: '5%',
    display: 'flex',
    gap: '12px',
    zIndex: 10
  };

  const arrowButtonStyle = {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#FFFFFF',
    
    // 🎯 CSS Grid is much more reliable for single-character centering than Flexbox
    display: 'grid',
    placeItems: 'center', 
    
    cursor: 'pointer',
    fontSize: '26px',          // Sized perfectly to balance inside a 44px circle
    padding: '0',              // Completely cleared out asymmetric padding
    margin: '0',               // Clears any browser default margins
    lineHeight: '1',           // Resetting line-height keeps the font box perfectly square
    textAlign: 'center',
    boxSizing: 'border-box',
    
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(4px)'
  };

  return (
    <div style={containerStyle}>
      {/* Dynamic Slide Background & Text */}
      <div style={slideStyle}>
        <div style={contentStyle}>
          <h1 style={titleStyle}>{slides[currentSlide].title}</h1>
          <p style={subtitleStyle}>{slides[currentSlide].subtitle}</p>
          
          <button 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#003561'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#004B87'}
            onClick={() => slides[currentSlide].action()} // 4. Fires the current slide's action
          >
            {slides[currentSlide].btnText}
          </button>
          
        </div>
      </div>

      {/* Floating Manual Slide Switch Controls */}
      <div style={controlsContainer}>
        <button 
          style={arrowButtonStyle} 
          onClick={prevSlide}
          onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'; e.target.style.borderColor = '#FFF'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
        >
          ‹
        </button>
        <button 
          style={arrowButtonStyle} 
          onClick={nextSlide}
          onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'; e.target.style.borderColor = '#FFF'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'rgba(0,0,0,0.2)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)'; }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
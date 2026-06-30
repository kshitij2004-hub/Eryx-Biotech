import React, { useState, useEffect } from 'react';
import msmeImg from '../../public/assets/images/msme-certification.jpg';
import trademarkImg from '../../public/assets/images/trademark-certificate.jpg';

// 🌐 Centralized Environment Network Routing Matrix
const BASE_URL = 'http://localhost/eryx-biotech-platform';
const API_URL = `${BASE_URL}/backend/api`;
const ASSET_URL = `${BASE_URL}/public`;

function About() {
  // 🔄 Dynamic Storage Nodes
  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [activeDeptFilter, setActiveDeptFilter] = useState('All');

  // ✉️ Intake Form State Parameters (Aligned with apply.php configuration)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('Research Associate');
  const [experience, setExperience] = useState('Entry Level (0-2 Yrs)');
  const [coverLetter, setCoverLetter] = useState('');
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔄 Synchronize Team Roster from Live Database Node
  const fetchTeam = async () => {
    try {
      const response = await fetch(`${API_URL}/team.php`);
      if (!response.ok) throw new Error(`Network fault status: ${response.status}`);
      const result = await response.json();
      if (result.status === 'success') {
        setTeam(result.data);
      }
    } catch (err) {
      console.error("Failed to extract active corporate roster:", err);
    } finally {
      setLoadingTeam(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // 🚀 Form Handler: Dispatch Application Telemetry to apply.php
  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !coverLetter) {
      setFormMessage({ type: 'error', text: '⚠️ Please populate all required verification nodes.' });
      return;
    }

    setIsSubmitting(true);
    setFormMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/apply.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          position: position,
          experience: experience,
          cover_letter: coverLetter
        })
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (pErr) {
        throw new Error(`Server returned non-JSON package: ${text.substring(0, 150)}`);
      }

      if (result.status === 'success') {
        setFormMessage({ type: 'success', text: '✅ Profile telemetry successfully recorded into candidate intake register.' });
        setFullName('');
        setEmail('');
        setCoverLetter('');
      } else {
        setFormMessage({ type: 'error', text: `❌ Intake system rejected submission: ${result.message}` });
      }
    } catch (err) {
      console.error(err);
      setFormMessage({ type: 'error', text: `❌ Transmission crash: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🎨 Structural CSS-in-JS Architecture (Aligned with Dashboard Theme Matrix)
  const pageContainer = { padding: '60px max(5%, 20px)', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Inter", sans-serif', color: '#F3F4F6', backgroundColor: 'transparent' };
  const genericCard = { background: 'rgba(19, 19, 26, 0.55)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '30px', backdropFilter: 'blur(12px)' };
  const mainHeader = { fontSize: '40px', fontWeight: '800', color: '#FFF', margin: '0 0 15px 0', letterSpacing: '-0.02em' };
  const inputStyle = { width: '100%', padding: '14px', backgroundColor: '#08080A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '14px', color: '#FFFFFF', marginBottom: '20px', boxSizing: 'border-box', outline: 'none', transition: 'border 0.2s' };
  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#8E8E9F', letterSpacing: '0.06em', marginBottom: '8px', textTransform: 'uppercase' };
  
  // Department filter tags layout matrix
  const filterBadge = (isActive) => ({ padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: isActive ? '1px solid #5B3FFF' : '1px solid rgba(255,255,255,0.08)', backgroundColor: isActive ? '#5B3FFF' : 'rgba(255,255,255,0.02)', color: '#FFF', transition: 'all 0.2s', marginTop: '5px' });

  // Filter calculations based on modern architectural taxonomy 
  const departments = ['All', 'Executive Board', 'Research & Development', 'Infrastructure', 'Drug Safety & Compliance'];
  const filteredTeam = activeDeptFilter === 'All' ? team : team.filter(m => m.department === activeDeptFilter);

  // Core Value Pillars Node Array
  const coreValues = [
    { title: "Quality", desc: "We are committed to maintaining the highest standards of quality in our products, processes, and services, ensuring safety, efficacy, and reliability for patients and healthcare professionals.", icon: "🛡️" },
    { title: "Ethics", desc: "We conduct our business with integrity, transparency, and accountability, adhering to the highest ethical standards in all our interactions.", icon: "⚖️" },
    { title: "Customer Focus", desc: "We place customers and patients at the center of everything we do, striving to understand their needs and deliver value-driven healthcare solutions.", icon: "🎯" },
    { title: "Respect for People", desc: "We foster a culture of mutual respect, teamwork, diversity, and continuous growth, recognizing that our people are the foundation of our success.", icon: "🤝" }
  ];

  return (
    <div style={pageContainer}>
      
      {/* 🚀 SECTION 1: ABOUT US HERO & OPERATIONAL OVERVIEW */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Eryx Biotech Platform // Institutional Portfolio
          </p>
          <h1 style={mainHeader}>About Eryx Biotech</h1>
          <div style={{ width: '50px', height: '2px', backgroundColor: '#5B3FFF', margin: '0 auto 25px auto' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', color: '#FFF', margin: 0, fontWeight: '700', letterSpacing: '-0.01em' }}>
              Corporate Parameter & Scope
            </h3>
            <p style={{ fontSize: '15.5px', color: '#F3F4F6', lineHeight: '1.7', margin: 0, fontWeight: '400' }}>
              Eryx Biotech is a Mumbai-based, quality-driven pharmaceutical company committed to making world-class, affordable medicines accessible to patients. As a forward-looking and fully integrated organization, we possess strong in-house business development capabilities that enable us to identify and capitalize on growth opportunities across diverse therapeutic segments.
            </p>
            <p style={{ fontSize: '14.5px', color: '#A1A1B5', lineHeight: '1.6', margin: 0 }}>
              Our products are manufactured in state-of-the-art WHO-GMP-certified facilities, ensuring the highest standards of quality, safety, and regulatory compliance while maintaining cost competitiveness. Through our unwavering commitment to improving patients' lives, we continue to expand our commercial product portfolio in therapeutic areas where we can leverage our expertise and capabilities.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ ...genericCard, padding: '22px', borderLeft: '4px solid #5B3FFF', background: 'rgba(91, 63, 255, 0.04)' }}>
              <h4 style={{ color: '#FFF', fontSize: '13px', margin: '0 0 8px 0', fontWeight: '700', letterSpacing: '0.05em' }}>WHO-GMP COMPLIANCE</h4>
              <p style={{ color: '#A1A1B5', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
                Operational workflows strictly execute inside certified facilities to safeguard biological parameters and maintain competitive affordability.
              </p>
            </div>
            <div style={{ ...genericCard, padding: '22px', borderLeft: '4px solid #00E5FF', background: 'rgba(0, 229, 255, 0.04)' }}>
              <h4 style={{ color: '#FFF', fontSize: '13px', margin: '0 0 8px 0', fontWeight: '700', letterSpacing: '0.05em' }}>STRATEGIC GROWTH MATRIX</h4>
              <p style={{ color: '#A1A1B5', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
                Our growth strategy focuses on strengthening and expanding the reach of existing products within our portfolio while continuously exploring opportunities to address unmet healthcare needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 👥 SECTION 2: DYNAMIC LIVE TEAM ROSTER GRID (SLOTTED BETWEEN ABOUT & VISION) */}
      <section style={{ marginBottom: '80px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '35px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#FFF', margin: '0 0 5px 0' }}>Professional Roster Node</h2>
            <p style={{ fontSize: '13px', color: '#8E8E9F', margin: 0 }}>Live directory synchronized seamlessly with the administrative storage core.</p>
          </div>
          
          {/* Dynamic Filter Layout Engine */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {departments.map(dept => (
              <button key={dept} style={filterBadge(activeDeptFilter === dept)} onClick={() => setActiveDeptFilter(dept)}>
                {dept.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {loadingTeam ? (
          <p style={{ color: '#8E8E9F', fontStyle: 'italic', textAlign: 'center' }}>Querying live system cluster registries...</p>
        ) : filteredTeam.length === 0 ? (
          <div style={{ padding: '40px', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '13px', textAlign: 'center', color: '#8E8E9F', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '8px' }}>
            No registered profiles align with the selected filtration parameters.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '25px' }}>
            {filteredTeam.map((member) => (
              <div key={member.id} style={{ ...genericCard, padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  {member.image_url ? (
                    <img 
                      src={member.image_url.startsWith('http') ? member.image_url : `${ASSET_URL}${member.image_url.startsWith('/') ? '' : '/'}${member.image_url}`}
                      alt={member.name}
                      style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #5B3FFF', padding: '3px', background: '#08080A' }}
                    />
                  ) : (
                    <div style={{ width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#08080A', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                      👤
                    </div>
                  )}
                  <span style={{ position: 'absolute', bottom: 0, right: 0, background: '#5B3FFF', color: '#FFF', fontSize: '9px', fontWeight: '800', padding: '3px 6px', borderRadius: '6px', letterSpacing: '0.02em' }}>
                    SECURE
                  </span>
                </div>

                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#FFF' }}>{member.name}</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#5B3FFF', fontWeight: '600', letterSpacing: '0.02em' }}>{member.role?.toUpperCase()}</p>
                <span style={{ fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#8E8E9F', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '14px', fontWeight: '700' }}>
                  {member.department || 'General Operations'}
                </span>
                
                <p style={{ margin: 0, fontSize: '13px', color: '#A1A1B5', lineHeight: '1.5', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                  {member.bio || 'Authorized institutional credentials verification status currently active.'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 👁️ SECTION 3: VISION PANEL ARRAY */}
      <section style={{ marginBottom: '80px', ...genericCard, background: 'radial-gradient(ellipse at top right, rgba(91, 63, 255, 0.08), rgba(19, 19, 26, 0.65))', padding: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>GLOBAL BLUEPRINT</span>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#FFF', margin: '8px 0 0 0' }}>Our Institutional Vision</h2>
          </div>
          <div>
            <p style={{ fontSize: '15px', color: '#F3F4F6', lineHeight: '1.7', margin: '0 0 15px 0' }}>
              At Eryx Biotech, our vision is to promote healthier lives through quality, technology, and innovation across the globe. We aspire to be not only among the best pharmaceutical companies but also a recognized leader in the development, manufacturing, and marketing of premium-quality pharmaceutical products.
            </p>
            <p style={{ fontSize: '14px', color: '#A1A1B5', lineHeight: '1.6', margin: 0 }}>
              Driven by excellence and a commitment to healthcare, we aim to establish Eryx Biotech as a trusted and respected brand in India and international markets, delivering innovative and affordable healthcare solutions that improve patients' lives worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 💎 SECTION 4: CORE VALUATIONS INFRASTRUCTURE */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#FFF', margin: '0 0 5px 0' }}>Our Core Values</h2>
          <p style={{ fontSize: '13px', color: '#8E8E9F', margin: 0 }}>Four fundamental pillars guiding every transactional decision and operational action.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {coreValues.map((val, idx) => (
            <div key={idx} style={{ ...genericCard, background: 'rgba(19, 19, 26, 0.45)', padding: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>{val.icon}</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFF', margin: 0 }}>{val.title}</h4>
              <p style={{ fontSize: '13px', color: '#A1A1B5', lineHeight: '1.6', margin: 0 }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⏳ SECTION 5: SYSTEM JOURNEY TIMELINE */}
      <section style={{ marginBottom: '80px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '50px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#FFF', margin: '0 0 5px 0' }}>Our Corporate Journey</h2>
          <p style={{ fontSize: '13px', color: '#8E8E9F', margin: 0 }}>The lineage, progression, and expansion metrics of Eryx Biotech.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ ...genericCard, display: 'grid', gridTemplateColumns: '120px 1fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#5B3FFF', background: 'rgba(91,63,255,0.08)', padding: '6px 12px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(91,63,255,0.15)' }}>
              JAN 2018
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#FFF', margin: '0 0 8px 0' }}>The Mission Conception</h4>
              <p style={{ fontSize: '13.5px', color: '#A1A1B5', lineHeight: '1.6', margin: 0 }}>
                Our mentor embarked on a mission in the pharmaceutical sector by starting a medicine business in Mumbai, driven by a passion for improving healthcare and serving patients with dedication and integrity.
              </p>
            </div>
          </div>

          <div style={{ ...genericCard, display: 'grid', gridTemplateColumns: '120px 1fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#00E5FF', background: 'rgba(0,229,255,0.08)', padding: '6px 12px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(0,229,255,0.15)' }}>
              NOV 2018
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#FFF', margin: '0 0 8px 0' }}>Formal Establishment</h4>
              <p style={{ fontSize: '13.5px', color: '#A1A1B5', lineHeight: '1.6', margin: 0 }}>
                Through perseverance, industry expertise, and a commitment to quality, the business steadily grew from a small enterprise into a trusted name. This vision and experience ultimately led to the formal establishment of Eryx Biotech.
              </p>
            </div>
          </div>

          <div style={{ ...genericCard, display: 'grid', gridTemplateColumns: '120px 1fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFF', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              PRESENT
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#FFF', margin: '0 0 8px 0' }}>Active Operations Scaling</h4>
              <p style={{ fontSize: '13.5px', color: '#A1A1B5', lineHeight: '1.6', margin: 0 }}>
                Today, Eryx Biotech continues to build upon this strong legacy, combining decades of industry knowledge with innovation, quality, and customer-centric values to deliver affordable and high-quality healthcare solutions in India and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ SECTION 6: COMPLIANCE & REGULATORY ARTIFACTS */}
<section style={{ marginBottom: '80px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '50px' }}>
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#FFF', margin: '0 0 5px 0' }}>Regulatory & Compliance Artifacts</h2>
    <p style={{ fontSize: '13px', color: '#8E8E9F', margin: 0 }}>Verified documentation supporting institutional framework operations.</p>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
    
    {/* MSME Card */}
    <div style={{ ...genericCard, display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <div style={{ 
        width: '100%', 
        height: '480px', // 📐 Increased height significantly for crisp legibility
        backgroundColor: '#0A0A0F', 
        borderRadius: '8px', 
        border: '1px solid rgba(255, 255, 255, 0.08)', 
        display: 'flex', 
        alignItems: 'center', 
        justify: 'center', 
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)'
      }}>
        <img 
          src={msmeImg} 
          alt="MSME Certification" 
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', // Keeps text sharp without distortion
            padding: '10px' // Clean edge margins
          }}
        />
        <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', color: '#8E8E9F', fontSize: '13px' }}>📄 MSME CERTIFICATE SLOT</div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFF', margin: '0 0 6px 0' }}>MSME Certification</h4>
        <p style={{ fontSize: '13px', color: '#A1A1B5', margin: 0, lineHeight: '1.4' }}>Registered organizational status validation artifact issued by the ministry.</p>
      </div>
    </div>

    {/* Trademark Registry Card */}
    <div style={{ ...genericCard, display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <div style={{ 
        width: '100%', 
        height: '480px', // 📐 Height matched precisely with the adjacent node
        backgroundColor: '#0A0A0F', 
        borderRadius: '8px', 
        border: '1px solid rgba(255, 255, 255, 0.08)', 
        display: 'flex', 
        alignItems: 'center', 
        justify: 'center', 
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)'
      }}>
        <img 
          src={trademarkImg} 
          alt="Certificate of Trademark Registration" 
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain',
            padding: '10px'
          }}
        />
        <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', color: '#8E8E9F', fontSize: '13px' }}>📄 TRADEMARK REGISTRATION SLOT</div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFF', margin: '0 0 6px 0' }}>Trademark Registration</h4>
        <p style={{ fontSize: '13px', color: '#A1A1B5', margin: 0, lineHeight: '1.4' }}>Official certificate of protection registered under corporate trademark codes for Eryxovit.</p>
      </div>
    </div>

  </div>
</section>

      {/* ✉️ SECTION 7: INTAKE CAREERS FORM MODULE */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '50px', alignItems: 'start', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '50px' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '0.06em', margin: '0 0 8px 0' }}>JOIN THE CLINICAL ARCHITECTURE</p>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#FFF', margin: '0 0 15px 0' }}>Open Application Gateway</h2>
          <p style={{ fontSize: '14px', color: '#A1A1B5', lineHeight: '1.6', margin: '0 0 20px 0' }}>
            We're searching for visionary talent across biochemical engineering, operational infrastructure, and compliance vectors. Submit your pipeline profile telemetry node here.
          </p>
          <div style={{ fontSize: '12px', color: '#8E8E9F', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '15px', borderRadius: '6px' }}>
            ℹ️ Submissions map directly onto internal administrative oversight metrics workflows in real-time.
          </div>
        </div>

        <div style={genericCard}>
          <form onSubmit={handleApplySubmit}>
            {formMessage.text && (
              <div style={{ padding: '12px 16px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px', backgroundColor: formMessage.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', border: formMessage.type === 'success' ? '1px solid #10B981' : '1px solid #EF4444', color: '#FFF' }}>
                {formMessage.text}
              </div>
            )}

            <label style={labelStyle}>Full Legal Identity *</label>
            <input type="text" placeholder="e.g., Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} required />

            <label style={labelStyle}>Digital Communications Address *</label>
            <input type="email" placeholder="e.g., candidate@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Target Assignment Node</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)} style={inputStyle}>
                  <option value="Research Associate">Research Associate</option>
                  <option value="Biotech Engineer">Biotech Engineer</option>
                  <option value="Infrastructure QA">Infrastructure QA</option>
                  <option value="Compliance Specialist">Compliance Specialist</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Experience Metric Tier</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} style={inputStyle}>
                  <option value="Entry Level (0-2 Yrs)">Entry Level (0-2 Yrs)</option>
                  <option value="Mid-Level (3-5 Yrs)">Mid-Level (3-5 Yrs)</option>
                  <option value="Senior Executive (5+ Yrs)">Senior Executive (5+ Yrs)</option>
                </select>
              </div>
            </div>

            <label style={labelStyle}>Covering Statement & Credentials Package *</label>
            <textarea rows="5" placeholder="Outline your technical capabilities, past project deployments, or research background clearances..." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }} required></textarea>

            <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '14px', backgroundColor: '#5B3FFF', border: 'none', color: '#FFF', fontWeight: '700', borderRadius: '6px', cursor: isSubmitting ? 'not-allowed' : 'pointer', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.04em', opacity: isSubmitting ? 0.7 : 1, transition: 'all 0.2s' }}>
              {isSubmitting ? 'Transmitting Node...' : 'Dispatch Application Profile'}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default About;
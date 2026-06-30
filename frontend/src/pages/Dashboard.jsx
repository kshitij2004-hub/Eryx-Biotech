import React, { useState, useEffect } from 'react';

// 🌐 Centralized Environment Network Routing Matrix
const BASE_URL = 'http://localhost/eryx-biotech-platform';
const API_URL = `${BASE_URL}/backend/api`;
const ASSET_URL = `${BASE_URL}/public`;

function Dashboard() {
  // 🎛️ Active Panel Tab State ('products', 'team', or 'applications')
  const [activeTab, setActiveTab] = useState('products');
  const [message, setMessage] = useState('');

  // 🔄 Reactive Registry States (Syncs live items from live database)
  const [products, setProducts] = useState([]);
  const [team, setTeam] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);

  // 🛡️ Pharmacovigilance Registry States
  const [adrReports, setAdrReports] = useState([]);
  const [loadingAdr, setLoadingAdr] = useState(false);

  // 📦 Product Form State Parameters
  const [prodName, setProdName] = useState('');
  const [prodFormula, setProdFormula] = useState(''); 
  const [prodDept, setProdDept] = useState('Ophthalmic');
  const [prodType, setProdType] = useState('Drops');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatured, setProdFeatured] = useState(false);
  
  // Storage for File Processing Engine
  const [prodFile, setProdFile] = useState(null);       
  const [prodPreview, setProdPreview] = useState('');   

  // 👥 Team Form State Parameters
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberDept, setMemberDept] = useState('Executive Board'); 
  const [memberBio, setMemberBio] = useState('');
  const [memberFile, setMemberFile] = useState(null);
  const [memberPreview, setMemberPreview] = useState('');

  // 🔄 Database Synchronizer Functions
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/get_products.php`);
      if (!response.ok) throw new Error(`HTTP network status error code: ${response.status}`);
      const result = await response.json();
      if (result.status === 'success') {
        setProducts(result.data);
      }
    } catch (err) {
      console.error("Error communicating with database products node:", err);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch(`${API_URL}/team.php`);
      if (!response.ok) throw new Error(`HTTP network status error code: ${response.status}`);
      const result = await response.json();
      if (result.status === 'success') {
        setTeam(result.data);
      }
    } catch (err) {
      console.error("Error communicating with database team node:", err);
    }
  };

  // Fetches dynamic applications received via apply.php
  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const response = await fetch(`${API_URL}/get_applications.php`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.status === 'success') {
        setApplications(result.data);
      }
    } catch (err) {
      console.error("Error fetching incoming job matrix applications:", err);
    } finally {
      setLoadingApps(false);
    }
  };

  // Fetches dynamic adverse drug safety reactions submitted via upload_adr.php
  const fetchAdrReports = async () => {
  try {
    const response = await fetch(`${BASE_URL}/backend/api/get_adr_reports.php`);
    const result = await response.json();
    
    if (result.status === "success") {
      // CRITICAL: Set state to result.data, NOT the whole result object!
      setAdrReports(result.data); 
    }
  } catch (error) {
    console.error("Error pulling ADR registries:", error);
  }
};

  // Initial Database pull on mount
  useEffect(() => {
    fetchProducts();
    fetchTeam();
    fetchApplications();
    fetchAdrReports();
  }, []);

  // 🧪 FILE PROCESSING ENGINE (Captures Raw Object and Creates UI Previews)
  const handleImageUpload = (e, setFileState, setPreviewState) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage('⚠️ Asset size exceeds allocation threshold. Please choose an image under 2MB.');
        return;
      }
      setFileState(file);
      setPreviewState(URL.createObjectURL(file)); 
    }
  };

  // 🚀 Action Handler: Add Product to Database
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!prodName || !prodDesc || !prodFormula) {
      setMessage('⚠️ Please provide a formulation name, formula, and brief documentation details.');
      return;
    }

    const formData = new FormData();
    formData.append('name', prodName);
    formData.append('formula', prodFormula);
    formData.append('category', prodDept); 
    formData.append('type', prodType);
    formData.append('description', prodDesc);
    formData.append('is_featured', prodFeatured ? 'true' : 'false');
    if (prodFile) {
      formData.append('image', prodFile);
    }

    try {
      const response = await fetch(`${API_URL}/add_product.php`, {
        method: 'POST',
        body: formData 
      });
      
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 200)}`);
      }

      if (result.status === 'success') {
        setMessage('✅ Dynamic product listing appended successfully to live MySQL database.');
        setProdName('');
        setProdFormula('');
        setProdDept('Ophthalmic');
        setProdType('Drops');
        setProdDesc('');
        setProdFeatured(false);
        setProdFile(null);
        setProdPreview('');
        fetchProducts(); 
      } else {
        setMessage(`❌ Upload Engine rejected input: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Execution Failure: ${err.message}`);
    }
  };

  // 🗑️ Action Handler: Delete Product from Database
  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete the formulation: "${name}"?`)) {
      try {
        const response = await fetch(`${API_URL}/delete_product.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        });
        
        const responseText = await response.text();
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Server execution crash. Details: ${responseText.substring(0, 200)}`);
        }
        
        if (result.status === 'success') {
          setMessage(`🗑️ Formulation "${name}" successfully purged from database matrix.`);
          fetchProducts(); 
        } else {
          setMessage(`❌ Error dropping item: ${result.message}`);
        }
      } catch (err) {
        console.error(err);
        setMessage(`❌ Request failed: ${err.message}`);
      }
    }
  };

  // 🚀 Action Handler: Add Team Member to Database
  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    if (!memberName || !memberRole) {
      setMessage('⚠️ Please provide at least a name and structural corporate role.');
      return;
    }

    const formData = new FormData();
    formData.append('name', memberName);
    formData.append('role', memberRole);
    formData.append('department', memberDept); 
    formData.append('bio', memberBio);
    if (memberFile) {
      formData.append('image', memberFile);
    }

    try {
      const response = await fetch(`${API_URL}/add_team.php`, {
        method: 'POST',
        body: formData
      });
      
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 200)}`);
      }

      if (result.status === 'success') {
        setMessage('✅ Team profile card written successfully to organization database registry.');
        setMemberName('');
        setMemberRole('');
        setMemberDept('Executive Board');
        setMemberBio('');
        setMemberFile(null);
        setMemberPreview('');
        fetchTeam();
      } else {
        setMessage(`❌ Upload Engine rejected input: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Execution Failure: ${err.message}`);
    }
  };

  // 🗑️ Action Handler: Delete Team Member from Database
  const handleDeleteTeamMember = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove executive profile: "${name}"?`)) {
      try {
        const formData = new FormData();
        formData.append('id', id);

        const response = await fetch(`${API_URL}/delete_team.php`, {
          method: 'POST',
          body: formData
        });

        const responseText = await response.text();
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Server execution crash. Details: ${responseText.substring(0, 200)}`);
        }

        if (result.status === 'success') {
          setMessage(`🗑️ Executive profile "${name}" successfully detached from active roster.`);
          fetchTeam();
        } else {
          setMessage(`❌ Error dropping member: ${result.message}`);
        }
      } catch (err) {
        console.error(err);
        setMessage(`❌ Request failed: ${err.message}`);
      }
    }
  };

  // UI/UX Styling Configuration Object (Original Visual Architecture)
  const pageWrapper = { padding: '50px max(5%, 20px)', maxWidth: '1300px', margin: '0 auto', fontFamily: '"Inter", sans-serif', color: '#F3F4F6', backgroundColor: '#040406', minHeight: '100vh' };
  const tabButton = (isActive) => ({ padding: '12px 24px', backgroundColor: isActive ? '#5B3FFF' : 'rgba(255,255,255,0.02)', border: isActive ? '1px solid #5B3FFF' : '1px solid rgba(255,255,255,0.08)', color: '#FFF', fontWeight: '700', fontSize: '13px', letterSpacing: '0.04em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.2s' });
  const inputStyle = { width: '100%', padding: '12px', backgroundColor: '#08080A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', fontSize: '14px', color: '#FFFFFF', marginBottom: '20px', boxSizing: 'border-box', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#8E8E9F', letterSpacing: '0.05em', marginBottom: '8px', textTransform: 'uppercase' };
  const dropzoneContainerStyle = { border: '2px dashed rgba(255, 255, 255, 0.15)', borderRadius: '6px', backgroundColor: '#08080A', padding: '22px', textAlign: 'center', position: 'relative', cursor: 'pointer', marginBottom: '20px' };

  // Registry List Styles
  const registryCardStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', marginBottom: '10px' };
  const deleteBtnStyle = { backgroundColor: 'transparent', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#EF4444', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' };

  return (
    <div style={pageWrapper}>
      <header style={{ marginBottom: '35px' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '0.06em', margin: '0 0 10px 0' }}>SECURE ARCHITECTURE PORTAL // ROOT STATUS</p>
        <h1 style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: '700', margin: 0 }}>System Operations Workspace</h1>
      </header>

      {/* Tab Navigation Hub */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>
        <button style={tabButton(activeTab === 'products')} onClick={() => { setActiveTab('products'); setMessage(''); }}>📦 MANAGE PRODUCTS</button>
        <button style={tabButton(activeTab === 'team')} onClick={() => { setActiveTab('team'); setMessage(''); }}>👥 MANAGE TEAM MEMBERS</button>
        <button style={tabButton(activeTab === 'applications')} onClick={() => { setActiveTab('applications'); setMessage(''); fetchApplications(); fetchAdrReports(); }}>✉️ INTAKE & SYSTEM REGISTRIES</button>
      </div>

      {message && (
        <div style={{ padding: '12px 20px', backgroundColor: 'rgba(91, 63, 255, 0.12)', border: '1px solid #5B3FFF', borderRadius: '6px', fontSize: '14px', marginBottom: '25px', color: '#FFFFFF' }}>
          {message}
        </div>
      )}

      {/* RENDER MODE A & B: TWO COLUMN SPLIT INTERFACE */}
      {activeTab !== 'applications' ? (
        <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
          {/* LEFT COLUMN: Input Control Form Panels */}
          <div style={{ flex: '1', maxWidth: '680px', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '30px', backgroundColor: 'rgba(19, 19, 26, 0.65)', backdropFilter: 'blur(10px)' }}>
            
            {activeTab === 'products' ? (
              /* 📦 PRODUCTS FORM PANEL */
              <form onSubmit={handleAddProduct}>
                <h3 style={{ margin: '0 0 5px 0', color: '#FFF', fontSize: '18px' }}>Register New Formulation</h3>
                <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: '#A1A1B5' }}>Append a therapeutic or physiological medicine record directly to the active filters catalog.</p>

                <label style={labelStyle}>Formulation Name *</label>
                <input type="text" placeholder="e.g., ERYXOLUB" value={prodName} onChange={(e) => setProdName(e.target.value)} style={inputStyle} />

                <label style={labelStyle}>Chemical Formula / Composition *</label>
                <input type="text" placeholder="e.g., C16H13ClN2O" value={prodFormula} onChange={(e) => setProdFormula(e.target.value)} style={inputStyle} />

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Department (Layer 1)</label>
                    <select value={prodDept} onChange={(e) => setProdDept(e.target.value)} style={inputStyle}>
                      <option value="Ophthalmic">Ophthalmic</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Supplements">Supplements</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Medicine Type (Layer 2)</label>
                    <select value={prodType} onChange={(e) => setProdType(e.target.value)} style={inputStyle}>
                      <option value="Drops">Drops</option>
                      <option value="Tablets">Tablets</option>
                      <option value="Capsules">Capsules</option>
                      <option value="Injections">Injections</option>
                      <option value="Syrups">Syrups</option>
                    </select>
                  </div>
                </div>

                <label style={labelStyle}>Formulation Image Asset</label>
                <div style={dropzoneContainerStyle}>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleImageUpload(e, setProdFile, setProdPreview)}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                  />
                  {prodPreview ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                      <img src={prodPreview} alt="Preview" style={{ maxWidth: '65px', maxHeight: '65px', borderRadius: '4px', objectFit: 'contain', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '13px', color: '#5B3FFF', display: 'block', fontWeight: '600' }}>✓ File Uploaded Successfully</span>
                        <span style={{ fontSize: '11px', color: '#8E8E9F' }}>Click or drop to replace image asset</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: '26px', display: 'block', marginBottom: '6px' }}>📤</span>
                      <span style={{ fontSize: '13px', color: '#FFFFFF', display: 'block', fontWeight: '500' }}>Click to upload or drag image here</span>
                      <span style={{ fontSize: '11px', color: '#8E8E9F', display: 'block', marginTop: '2px' }}>Supports PNG, JPEG, JPG (Max 2MB)</span>
                    </div>
                  )}
                </div>

                <label style={labelStyle}>Short Description Details *</label>
                <textarea rows="4" placeholder="Enter formal clinical composition overview..." value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}></textarea>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#A1A1B5', cursor: 'pointer', marginBottom: '20px' }}>
                  <input type="checkbox" checked={prodFeatured} onChange={(e) => setProdFeatured(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#5B3FFF' }} />
                  Promote to Featured Formulations Carousel
                </label>

                <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#5B3FFF', border: 'none', color: '#FFF', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.04em' }}>Publish Dynamic Asset</button>
              </form>
            ) : (
              /* 👥 TEAM FORM PANEL */
              <form onSubmit={handleAddTeamMember}>
                <h3 style={{ margin: '0 0 5px 0', color: '#FFF', fontSize: '18px' }}>Provision Executive Profile</h3>
                <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: '#A1A1B5' }}>Instantly link professional staff members to the primary About page presentation grid.</p>

                <label style={labelStyle}>Full Legal Name *</label>
                <input type="text" placeholder="e.g., Dr. Aris Thorne" value={memberName} onChange={(e) => setMemberName(e.target.value)} style={inputStyle} />

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Corporate Assignment / Role Designation *</label>
                    <input type="text" placeholder="e.g., Chief Medical Officer" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Organisational Department Mapping *</label>
                    <select value={memberDept} onChange={(e) => setMemberDept(e.target.value)} style={inputStyle}>
                      <option value="Executive Board">Executive Board</option>
                      <option value="Research & Development">Research & Development</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Drug Safety & Compliance">Drug Safety & Compliance</option>
                    </select>
                  </div>
                </div>

                <label style={labelStyle}>Avatar Image Source Asset</label>
                <div style={dropzoneContainerStyle}>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleImageUpload(e, setMemberFile, setMemberPreview)}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                  />
                  {memberPreview ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                      <img src={memberPreview} alt="Preview" style={{ maxWidth: '65px', maxHeight: '65px', borderRadius: '4px', objectFit: 'contain', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '13px', color: '#5B3FFF', display: 'block', fontWeight: '600' }}>✓ Profile Image Linked</span>
                        <span style={{ fontSize: '11px', color: '#8E8E9F' }}>Click or drop to replace picture source</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: '26px', display: 'block', marginBottom: '6px' }}>👤</span>
                      <span style={{ fontSize: '13px', color: '#FFFFFF', display: 'block', fontWeight: '500' }}>Click to upload or drag staff avatar</span>
                      <span style={{ fontSize: '11px', color: '#8E8E9F', display: 'block', marginTop: '2px' }}>Supports PNG, JPEG, JPG (Max 2MB)</span>
                    </div>
                  )}
                </div>

                <label style={labelStyle}>Professional Brief / Biography</label>
                <textarea rows="4" placeholder="Document background, clearances, or institutional training details..." value={memberBio} onChange={(e) => setMemberBio(e.target.value)} style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}></textarea>

                <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#5B3FFF', border: 'none', color: '#FFF', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.04em' }}>Provision Team Profile</button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: DYNAMIC LIVE REGISTRY MODERATION FEED */}
          <div style={{ width: '420px', flexShrink: 0 }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#FFF', fontWeight: '600', borderLeft: '3px solid #5B3FFF', paddingLeft: '12px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              {activeTab === 'products' ? '📋 Active Formulations' : '👥 Roster Moderation'} ({activeTab === 'products' ? products.length : team.length})
            </h3>
            <p style={{ fontSize: '13px', color: '#A1A1B5', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              Below are the dynamic elements recorded inside your system runtime container. Purging items here clears them from public layout filters immediately.
            </p>

            <div style={{ maxHeight: '540px', overflowY: 'auto', paddingRight: '5px' }}>
              {activeTab === 'products' ? (
                /* PRODUCTS INVENTORY LIST */
                products.length === 0 ? (
                  <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic', padding: '15px', border: '1px dashed rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    No custom formulations found in storage layer.
                  </div>
                ) : (
                  products.map((prod) => (
                    <div key={prod.id} style={registryCardStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {prod.image_path ? (
                          <img 
                            src={prod.image_path.startsWith('http') ? prod.image_path : `${ASSET_URL}${prod.image_path.startsWith('/') ? '' : '/'}${prod.image_path}`} 
                            alt="" 
                            style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '4px', backgroundColor: '#000' }} 
                          />
                        ) : (
                          <span style={{ fontSize: '20px' }}>📦</span>
                        )}
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>{prod.name}</div>
                          <div style={{ fontSize: '11px', color: '#8E8E9F' }}>{(prod.type || 'Formulation')} · {(prod.category || 'General')}</div>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteProduct(prod.id, prod.name)} 
                        style={deleteBtnStyle}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#EF4444'; e.target.style.color = '#FFF'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#EF4444'; }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )
              ) : (
                /* TEAM ROSTER LIST */
                team.length === 0 ? (
                  <div style={{ fontSize: '13px', color: '#8E8E9F', fontStyle: 'italic', padding: '15px', border: '1px dashed rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    No dynamic administrative profiles logged.
                  </div>
                ) : (
                  team.map((member) => (
                    <div key={member.id} style={registryCardStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {member.image_url ? (
                          <img 
                            src={member.image_url.startsWith('http') ? member.image_url : `${ASSET_URL}${member.image_url.startsWith('/') ? '' : '/'}${member.image_url}`} 
                            alt="" 
                            style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%' }} 
                          />
                        ) : (
                          <span style={{ fontSize: '20px' }}>👤</span>
                        )}
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>{member.name}</div>
                          <div style={{ fontSize: '11px', color: '#8E8E9F' }}>{member.role} <span style={{ color: '#5B3FFF' }}>({member.department || 'Board'})</span></div>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteTeamMember(member.id, member.name)} 
                        style={deleteBtnStyle}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#EF4444'; e.target.style.color = '#FFF'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#EF4444'; }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ✉️ MODE C: FULL WIDTH REGISTRIES VIEWER (JOB APPLICATIONS & DRUG SAFETY FORMS) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* 1. CAREERS INTAKE MODULE */}
          <div style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '30px', backgroundColor: 'rgba(19, 19, 26, 0.65)' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#FFF', fontSize: '18px' }}>Careers Intake Registry Ledger</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: '#A1A1B5' }}>Review live candidate profile data sent from your public frontend open application gateway.</p>

            {loadingApps ? (
              <p style={{ color: '#8E8E9F', fontStyle: 'italic' }}>Interrogating database table packages...</p>
            ) : applications.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#8E8E9F', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                No candidates have submitted profile telemetry to the system yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {applications.map((app) => (
                  <div key={app.id} style={{ background: '#08080A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', color: '#FFF', fontSize: '16px' }}>{app.full_name}</h4>
                        <span style={{ fontSize: '13px', color: '#5B3FFF', fontWeight: '600' }}>{app.position?.toUpperCase()}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', display: 'block', color: '#8E8E9F' }}>Intake Time: {app.submitted_at}</span>
                        <span style={{ fontSize: '11px', color: '#38BDF8', background: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>{app.experience}</span>
                      </div>
                    </div>
                    <label style={{ ...labelStyle, fontSize: '10px', marginBottom: '4px' }}>Secure Contact Routing Node</label>
                    <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#FFF' }}>{app.email}</p>
                    
                    <label style={{ ...labelStyle, fontSize: '10px', marginBottom: '4px' }}>Candidate Cover Statement Packet</label>
                    <p style={{ margin: 0, fontSize: '13px', color: '#A1A1B5', background: '#0F172A', padding: '12px', borderRadius: '4px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{app.cover_letter}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. 🛡️ PHARMACOVIGILANCE / DRUG SAFETY INTAKE MODULE */}
          <div style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '30px', backgroundColor: 'rgba(19, 19, 26, 0.65)' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#FFF', fontSize: '18px' }}>Pharmacovigilance Intake Ledger (ADR)</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: '#A1A1B5' }}>Real-time administrative verification logs for Adverse Drug Reaction (ADR) data telemetry records.</p>

            {loadingAdr ? (
              <p style={{ color: '#8E8E9F', fontStyle: 'italic' }}>Querying live drug safety tracking systems...</p>
            ) : adrReports.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#8E8E9F', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                No active adverse drug reactions reported to system registry nodes.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {adrReports.map((report) => (
                  <div key={report.id} style={{ background: '#08080A', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '4px solid #EF4444', borderRadius: '6px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
                      <div>
                        <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.12)', color: '#EF4444', padding: '3px 8px', borderRadius: '4px', fontWeight: '800', marginRight: '12px', letterSpacing: '0.04em' }}>
                          ADR SIGNAL DETECTED
                        </span>
                        <span style={{ color: '#8E8E9F', fontSize: '13px' }}>Target Compound:</span>{' '}
                        <strong style={{ fontSize: '16px', color: '#FFF', marginLeft: '4px' }}>{report.compound_id}</strong>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', color: '#8E8E9F' }}>
                          {report.created_at ? report.created_at : `Record Token #${report.id}`}
                        </span>
                      </div>
                    </div>

                    <label style={{ ...labelStyle, fontSize: '10px', marginBottom: '4px' }}>Clinical Monitoring Observation Notes</label>
                    <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#A1A1B5', background: '#0F172A', padding: '12px', borderRadius: '4px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {report.observation_notes}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                      <div style={{ fontSize: '13px', color: '#A1A1B5', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        📄 <span style={{ color: '#8E8E9F' }}>Dossier Asset:</span> <span style={{ color: '#FFF', fontWeight: '500' }}>{report.file_name}</span>
                      </div>
                      <a 
                        href={`${BASE_URL}/${report.file_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#FFF', fontSize: '12px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.04)'}
                      >
                        Review PDF Blueprint
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default Dashboard;
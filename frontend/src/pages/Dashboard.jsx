import React, { useState, useEffect } from 'react';

// 🌐 Centralized Environment Network Routing Matrix (Using Clean Relative Path for Production)
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const BASE_URL = isLocalhost 
  ? 'http://localhost/eryx-biotech-platform' 
  : ''; 

const API_URL = `${BASE_URL}/backend/api`;
const ASSET_URL = `${BASE_URL}/public`;

function Dashboard({ darkMode = true }) {
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

  // ✏️ EDITING & MODAL STATES (New addition for updating records)
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProdName, setEditProdName] = useState('');
  const [editProdFormula, setEditProdFormula] = useState('');
  const [editProdDept, setEditProdDept] = useState('Ophthalmic');
  const [editProdType, setEditProdType] = useState('Drops');
  const [editProdDesc, setEditProdDesc] = useState('');
  const [editProdFeatured, setEditProdFeatured] = useState(false);
  const [editProdFile, setEditProdFile] = useState(null);
  const [editProdPreview, setEditProdPreview] = useState('');

  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [editMemberName, setEditMemberName] = useState('');
  const [editMemberRole, setEditMemberRole] = useState('');
  const [editMemberDept, setEditMemberDept] = useState('Executive Board');
  const [editMemberBio, setEditMemberBio] = useState('');
  const [editMemberFile, setEditMemberFile] = useState(null);
  const [editMemberPreview, setEditMemberPreview] = useState('');

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

  // 🎨 Dynamic Theme Colors (Matches Products, About, and Contact pages)
  const currentTheme = {
    wrapperBg: darkMode ? '#08080A' : 'transparent',
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? 'rgba(19, 19, 26, 0.65)' : '#FFFFFF',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    inputBg: darkMode ? '#08080A' : '#FFFFFF',
    inputBorder: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
    subtleBoxBg: darkMode ? '#0F172A' : '#F9FAFB',
    accentPurple: '#5B3FFF'
  };

  // 🔄 Database Synchronizer Functions with Robust Content-Type and Endpoint Parsing Matrix
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/get_products.php`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        cache: 'no-store'
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textBody = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${textBody.substring(0, 100)}...`);
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error status: ${response.status}`);
      }

      if (result.status === 'success' && Array.isArray(result.data)) {
        setProducts(result.data);
      } else if (Array.isArray(result)) {
        setProducts(result);
      } else {
        console.warn("API returned error status or unexpected structure:", result);
        setProducts([]);
      }
    } catch (err) {
      console.error("Error communicating with database products node:", err.message);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch(`${API_URL}/team.php`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        cache: 'no-store'
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textBody = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${textBody.substring(0, 100)}...`);
      }

      if (!response.ok) throw new Error(`HTTP network status error code: ${response.status}`);
      const result = await response.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        setTeam(result.data);
      } else if (Array.isArray(result)) {
        setTeam(result);
      }
    } catch (err) {
      console.error("Error communicating with database team node:", err.message);
    }
  };

  // Fetches dynamic applications received via apply.php
  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const response = await fetch(`${API_URL}/get_applications.php`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        cache: 'no-store'
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textBody = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${textBody.substring(0, 100)}...`);
      }

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const result = await response.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        setApplications(result.data);
      } else if (Array.isArray(result)) {
        setApplications(result);
      }
    } catch (err) {
      console.error("Error fetching incoming job matrix applications:", err.message);
    } finally {
      setLoadingApps(false);
    }
  };

  // Fetches dynamic adverse drug safety reactions submitted via upload_adr.php
  const fetchAdrReports = async () => {
    setLoadingAdr(true);
    try {
      const response = await fetch(`${API_URL}/get_adr_reports.php`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        cache: 'no-store'
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textBody = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${textBody.substring(0, 100)}...`);
      }

      const result = await response.json();
      
      if (result.status === "success" && Array.isArray(result.data)) {
        setAdrReports(result.data); 
      } else if (Array.isArray(result)) {
        setAdrReports(result);
      }
    } catch (error) {
      console.error("Error pulling ADR registries:", error.message);
    } finally {
      setLoadingAdr(false);
    }
  };

  // Initial Database pull on mount
  useEffect(() => {
    fetchProducts();
    fetchTeam();
    fetchApplications();
    fetchAdrReports();
  }, []);

  // 🧪 FILE PROCESSING ENGINE (Captures Raw Object and Creates UI Previews Safely)
  const handleImageUpload = (e, setFileState, setPreviewState, currentPreview) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setMessage('⚠️ Invalid file format. Please upload a PNG, JPEG, or JPG image.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setMessage('⚠️ Asset size exceeds allocation threshold. Please choose an image under 2MB.');
        return;
      }
      if (currentPreview && currentPreview.startsWith('blob:')) {
        URL.revokeObjectURL(currentPreview);
      }
      setFileState(file);
      setPreviewState(URL.createObjectURL(file));
      setMessage('');
    }
  };

  // Helper to safely format asset URLs matching catalog architecture
  const resolveAssetUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
      return path;
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${BASE_URL}${cleanPath}`;
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
        if (prodPreview) URL.revokeObjectURL(prodPreview);
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

  // ✏️ Action Handler: Open Edit Modal for Product
  const openEditProductModal = (prod) => {
    setEditingProduct(prod);
    setEditProdName(prod.name || '');
    setEditProdFormula(prod.formula || '');
    setEditProdDept(prod.category || 'Ophthalmic');
    setEditProdType(prod.type || 'Drops');
    setEditProdDesc(prod.description || '');
    setEditProdFeatured(prod.is_featured === 'true' || prod.is_featured === true || prod.is_featured == 1);
    setEditProdFile(null);
    setEditProdPreview(prod.image_url || prod.image_path || prod.image || '');
  };

  // 🚀 Action Handler: Update Product in Database
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editProdName || !editProdDesc || !editProdFormula) {
      setMessage('⚠️ Please provide a formulation name, formula, and brief documentation details.');
      return;
    }

    const formData = new FormData();
    formData.append('id', editingProduct.id);
    formData.append('name', editProdName);
    formData.append('formula', editProdFormula);
    formData.append('category', editProdDept);
    formData.append('type', editProdType);
    formData.append('description', editProdDesc);
    formData.append('is_featured', editProdFeatured ? 'true' : 'false');
    if (editProdFile) {
      formData.append('image', editProdFile);
    }

    try {
      const response = await fetch(`${API_URL}/update_product.php`, {
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
        setMessage(`✅ Formulation "${editProdName}" successfully updated.`);
        setEditingProduct(null);
        fetchProducts();
      } else {
        setMessage(`❌ Update Engine rejected input: ${result.message}`);
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
        if (memberPreview) URL.revokeObjectURL(memberPreview);
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

  // ✏️ Action Handler: Open Edit Modal for Team Member
  const openEditTeamModal = (member) => {
    setEditingTeamMember(member);
    setEditMemberName(member.name || '');
    setEditMemberRole(member.role || '');
    setEditMemberDept(member.department || 'Executive Board');
    setEditMemberBio(member.bio || '');
    setEditMemberFile(null);
    setEditMemberPreview(member.image_url || '');
  };

  // 🚀 Action Handler: Update Team Member in Database
  const handleUpdateTeamMember = async (e) => {
    e.preventDefault();
    if (!editMemberName || !editMemberRole) {
      setMessage('⚠️ Please provide at least a name and structural corporate role.');
      return;
    }

    const formData = new FormData();
    formData.append('id', editingTeamMember.id);
    formData.append('name', editMemberName);
    formData.append('role', editMemberRole);
    formData.append('department', editMemberDept);
    formData.append('bio', editMemberBio);
    if (editMemberFile) {
      formData.append('image', editMemberFile);
    }

    try {
      const response = await fetch(`${API_URL}/update_team.php`, {
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
        setMessage(`✅ Executive profile "${editMemberName}" successfully updated.`);
        setEditingTeamMember(null);
        fetchTeam();
      } else {
        setMessage(`❌ Update Engine rejected input: ${result.message}`);
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

  // Dynamic Theme-Responsive Styling Objects
  const pageWrapper = { 
    padding: '120px max(5%, 20px) 60px max(5%, 20px)', 
    maxWidth: '1300px', 
    margin: '0 auto', 
    fontFamily: '"Inter", sans-serif', 
    color: currentTheme.textMain, 
    backgroundColor: currentTheme.wrapperBg, 
    minHeight: '100vh',
    transition: 'background-color 0.3s ease, color 0.3s ease' 
  };

  const tabButton = (isActive) => ({ 
    padding: '12px 24px', 
    backgroundColor: isActive ? '#5B3FFF' : (darkMode ? 'rgba(255,255,255,0.02)' : '#F3F4F6'), 
    border: isActive ? '1px solid #5B3FFF' : `1px solid ${currentTheme.cardBorder}`, 
    color: isActive ? '#FFFFFF' : currentTheme.textMain, 
    fontWeight: '700', 
    fontSize: '13px', 
    letterSpacing: '0.04em', 
    cursor: 'pointer', 
    borderRadius: '4px', 
    transition: 'all 0.2s' 
  });

  const inputStyle = { 
    width: '100%', 
    padding: '12px', 
    backgroundColor: currentTheme.inputBg, 
    border: `1px solid ${currentTheme.inputBorder}`, 
    borderRadius: '6px', 
    fontSize: '14px', 
    color: currentTheme.textMain, 
    marginBottom: '20px', 
    boxSizing: 'border-box', 
    outline: 'none' 
  };

  const labelStyle = { 
    display: 'block', 
    fontSize: '11px', 
    fontWeight: '700', 
    color: currentTheme.textMuted, 
    letterSpacing: '0.05em', 
    marginBottom: '8px', 
    textTransform: 'uppercase' 
  };

  const dropzoneContainerStyle = { 
    border: `2px dashed ${currentTheme.inputBorder}`, 
    borderRadius: '6px', 
    backgroundColor: currentTheme.inputBg, 
    padding: '22px', 
    textAlign: 'center', 
    position: 'relative', 
    cursor: 'pointer', 
    marginBottom: '20px' 
  };

  const registryCardStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '12px', 
    backgroundColor: darkMode ? 'rgba(255,255,255,0.02)' : '#F9FAFB', 
    border: `1px solid ${currentTheme.cardBorder}`, 
    borderRadius: '6px', 
    marginBottom: '10px' 
  };

  const actionBtnGroupStyle = {
    display: 'flex',
    gap: '6px',
    alignItems: 'center'
  };

  const editBtnStyle = {
    backgroundColor: 'transparent',
    border: '1px solid rgba(91, 63, 255, 0.4)',
    color: '#5B3FFF',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const deleteBtnStyle = { 
    backgroundColor: 'transparent', 
    border: '1px solid rgba(239, 68, 68, 0.4)', 
    color: '#EF4444', 
    padding: '6px 12px', 
    borderRadius: '4px', 
    fontSize: '12px', 
    fontWeight: '600', 
    cursor: 'pointer', 
    transition: 'all 0.2s' 
  };

  const panelContainerStyle = { 
    flex: '1', 
    minWidth: '300px', 
    maxWidth: '680px', 
    border: `1px solid ${currentTheme.cardBorder}`, 
    borderRadius: '8px', 
    padding: '30px', 
    backgroundColor: currentTheme.cardBg, 
    backdropFilter: 'blur(10px)' 
  };

  return (
    <div style={pageWrapper}>
      <header style={{ marginBottom: '35px' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', color: '#5B3FFF', letterSpacing: '0.06em', margin: '0 0 10px 0' }}>SECURE ARCHITECTURE PORTAL // ROOT STATUS</p>
        <h1 style={{ color: currentTheme.textMain, fontSize: '32px', fontWeight: '700', margin: 0 }}>System Operations Workspace</h1>
      </header>

      {/* Tab Navigation Hub */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', borderBottom: `1px solid ${currentTheme.cardBorder}`, paddingBottom: '15px', flexWrap: 'wrap' }}>
        <button style={tabButton(activeTab === 'products')} onClick={() => { setActiveTab('products'); setMessage(''); }}>📦 MANAGE PRODUCTS</button>
        <button style={tabButton(activeTab === 'team')} onClick={() => { setActiveTab('team'); setMessage(''); }}>👥 MANAGE TEAM MEMBERS</button>
        <button style={tabButton(activeTab === 'applications')} onClick={() => { setActiveTab('applications'); setMessage(''); fetchApplications(); fetchAdrReports(); }}>✉️ INTAKE & SYSTEM REGISTRIES</button>
      </div>

      {message && (
        <div style={{ padding: '12px 20px', backgroundColor: 'rgba(91, 63, 255, 0.12)', border: '1px solid #5B3FFF', borderRadius: '6px', fontSize: '14px', marginBottom: '25px', color: currentTheme.textMain }}>
          {message}
        </div>
      )}

      {/* RENDER MODE A & B: TWO COLUMN SPLIT INTERFACE */}
      {activeTab !== 'applications' ? (
        <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* LEFT COLUMN: Input Control Form Panels */}
          <div style={panelContainerStyle}>
            
            {activeTab === 'products' ? (
              /* 📦 PRODUCTS FORM PANEL */
              <form onSubmit={handleAddProduct}>
                <h3 style={{ margin: '0 0 5px 0', color: currentTheme.textMain, fontSize: '18px' }}>Register New Formulation</h3>
                <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: currentTheme.textMuted }}>Append a therapeutic or physiological medicine record directly to the active filters catalog.</p>

                <label style={labelStyle}>Formulation Name *</label>
                <input type="text" placeholder="e.g., ERYXOLUB" value={prodName} onChange={(e) => setProdName(e.target.value)} style={inputStyle} />

                <label style={labelStyle}>Chemical Formula / Composition *</label>
                <input type="text" placeholder="e.g., C16H13ClN2O" value={prodFormula} onChange={(e) => setProdFormula(e.target.value)} style={inputStyle} />

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <label style={labelStyle}>Department (Layer 1)</label>
                    <select value={prodDept} onChange={(e) => setProdDept(e.target.value)} style={inputStyle}>
                      <option value="Ophthalmic">Ophthalmic</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Supplements">Supplements</option>
                      <option value="Biologics">Biologics</option>
                      <option value="Solutions">Solutions</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: '140px' }}>
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
                    onChange={(e) => handleImageUpload(e, setProdFile, setProdPreview, prodPreview)}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                  />
                  {prodPreview ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                      <img src={prodPreview} alt="Preview" style={{ maxWidth: '65px', maxHeight: '65px', borderRadius: '4px', objectFit: 'contain', border: `1px solid ${currentTheme.inputBorder}` }} />
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '13px', color: '#5B3FFF', display: 'block', fontWeight: '600' }}>✓ File Uploaded Successfully</span>
                        <span style={{ fontSize: '11px', color: currentTheme.textMuted }}>Click or drop to replace image asset</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: '26px', display: 'block', marginBottom: '6px' }}>📤</span>
                      <span style={{ fontSize: '13px', color: currentTheme.textMain, display: 'block', fontWeight: '500' }}>Click to upload or drag image here</span>
                      <span style={{ fontSize: '11px', color: currentTheme.textMuted, display: 'block', marginTop: '2px' }}>Supports PNG, JPEG, JPG (Max 2MB)</span>
                    </div>
                  )}
                </div>

                <label style={labelStyle}>Short Description Details *</label>
                <textarea rows="4" placeholder="Enter formal clinical composition overview..." value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}></textarea>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: currentTheme.textMuted, cursor: 'pointer', marginBottom: '20px' }}>
                  <input type="checkbox" checked={prodFeatured} onChange={(e) => setProdFeatured(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#5B3FFF' }} />
                  Promote to Featured Formulations Carousel
                </label>

                <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#5B3FFF', border: 'none', color: '#FFF', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.04em' }}>Publish Dynamic Asset</button>
              </form>
            ) : (
              /* 👥 TEAM FORM PANEL */
              <form onSubmit={handleAddTeamMember}>
                <h3 style={{ margin: '0 0 5px 0', color: currentTheme.textMain, fontSize: '18px' }}>Provision Executive Profile</h3>
                <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: currentTheme.textMuted }}>Instantly link professional staff members to the primary About page presentation grid.</p>

                <label style={labelStyle}>Full Legal Name *</label>
                <input type="text" placeholder="e.g., Dr. Aris Thorne" value={memberName} onChange={(e) => setMemberName(e.target.value)} style={inputStyle} />

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '140px' }}>
                    <label style={labelStyle}>Corporate Assignment / Role Designation *</label>
                    <input type="text" placeholder="e.g., Chief Medical Officer" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1, minWidth: '140px' }}>
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
                    onChange={(e) => handleImageUpload(e, setMemberFile, setMemberPreview, memberPreview)}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                  />
                  {memberPreview ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                      <img src={memberPreview} alt="Preview" style={{ maxWidth: '65px', maxHeight: '65px', borderRadius: '4px', objectFit: 'contain', border: `1px solid ${currentTheme.inputBorder}` }} />
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '13px', color: '#5B3FFF', display: 'block', fontWeight: '600' }}>✓ Profile Image Linked</span>
                        <span style={{ fontSize: '11px', color: currentTheme.textMuted }}>Click or drop to replace picture source</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: '26px', display: 'block', marginBottom: '6px' }}>👤</span>
                      <span style={{ fontSize: '13px', color: currentTheme.textMain, display: 'block', fontWeight: '500' }}>Click to upload or drag staff avatar</span>
                      <span style={{ fontSize: '11px', color: currentTheme.textMuted, display: 'block', marginTop: '2px' }}>Supports PNG, JPEG, JPG (Max 2MB)</span>
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
          <div style={{ width: '100%', maxWidth: '420px', flexShrink: 0 }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: currentTheme.textMain, fontWeight: '600', borderLeft: '3px solid #5B3FFF', paddingLeft: '12px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              {activeTab === 'products' ? '📋 Active Formulations' : '👥 Roster Moderation'} ({activeTab === 'products' ? products.length : team.length})
            </h3>
            <p style={{ fontSize: '13px', color: currentTheme.textMuted, lineHeight: '1.5', margin: '0 0 20px 0' }}>
              Below are the dynamic elements recorded inside your system runtime container. Modify or purge items to update your public layout views immediately.
            </p>

            <div style={{ maxHeight: '540px', overflowY: 'auto', paddingRight: '5px' }}>
              {activeTab === 'products' ? (
                /* PRODUCTS INVENTORY LIST */
                products.length === 0 ? (
                  <div style={{ fontSize: '13px', color: currentTheme.textMuted, fontStyle: 'italic', padding: '15px', border: `1px dashed ${currentTheme.inputBorder}`, textAlign: 'center' }}>
                    No custom formulations found in storage layer.
                  </div>
                ) : (
                  products.map((prod) => {
                    const imgPath = prod.image_url || prod.image_path || prod.image || '';
                    return (
                      <div key={prod.id} style={registryCardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                          {imgPath ? (
                            <img 
                              src={resolveAssetUrl(imgPath)} 
                              alt="" 
                              style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '4px', backgroundColor: '#000', flexShrink: 0 }}
                              onError={(e) => { e.target.style.display = 'none'; }} 
                            />
                          ) : (
                            <span style={{ fontSize: '20px', flexShrink: 0 }}>📦</span>
                          )}
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: currentTheme.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.name}</div>
                            <div style={{ fontSize: '11px', color: currentTheme.textMuted }}>{(prod.type || 'Formulation')} · {(prod.category || 'General')}</div>
                          </div>
                        </div>
                        <div style={actionBtnGroupStyle}>
                          <button 
                            type="button" 
                            onClick={() => openEditProductModal(prod)} 
                            style={editBtnStyle}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = '#5B3FFF'; e.target.style.color = '#FFF'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#5B3FFF'; }}
                          >
                            Edit
                          </button>
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
                      </div>
                    );
                  })
                )
              ) : (
                /* TEAM ROSTER LIST */
                team.length === 0 ? (
                  <div style={{ fontSize: '13px', color: currentTheme.textMuted, fontStyle: 'italic', padding: '15px', border: `1px dashed ${currentTheme.inputBorder}`, textAlign: 'center' }}>
                    No dynamic administrative profiles logged.
                  </div>
                ) : (
                  team.map((member) => (
                    <div key={member.id} style={registryCardStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                        {member.image_url ? (
                          <img 
                            src={resolveAssetUrl(member.image_url)} 
                            alt="" 
                            style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }}
                            onError={(e) => { e.target.style.display = 'none'; }} 
                          />
                        ) : (
                          <span style={{ fontSize: '20px', flexShrink: 0 }}>👤</span>
                        )}
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '14px', fontWeight: '700', color: currentTheme.textMain, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</div>
                          <div style={{ fontSize: '11px', color: currentTheme.textMuted }}>{member.role} <span style={{ color: '#5B3FFF' }}>({member.department || 'Board'})</span></div>
                        </div>
                      </div>
                      <div style={actionBtnGroupStyle}>
                        <button 
                          type="button" 
                          onClick={() => openEditTeamModal(member)} 
                          style={editBtnStyle}
                          onMouseEnter={(e) => { e.target.style.backgroundColor = '#5B3FFF'; e.target.style.color = '#FFF'; }}
                          onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#5B3FFF'; }}
                        >
                          Edit
                        </button>
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
          <div style={{ border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '8px', padding: '30px', backgroundColor: currentTheme.cardBg }}>
            <h3 style={{ margin: '0 0 5px 0', color: currentTheme.textMain, fontSize: '18px' }}>Careers Intake Registry Ledger</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: currentTheme.textMuted }}>Review live candidate profile data sent from your public frontend open application gateway.</p>

            {loadingApps ? (
              <p style={{ color: currentTheme.textMuted, fontStyle: 'italic' }}>Interrogating database table packages...</p>
            ) : applications.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: currentTheme.textMuted, border: `1px dashed ${currentTheme.inputBorder}`, borderRadius: '6px' }}>
                No candidates have submitted profile telemetry to the system yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {applications.map((app) => (
                  <div key={app.id} style={{ background: currentTheme.inputBg, border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '6px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: `1px solid ${currentTheme.cardBorder}`, paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', color: currentTheme.textMain, fontSize: '16px' }}>{app.full_name}</h4>
                        <span style={{ fontSize: '13px', color: '#5B3FFF', fontWeight: '600' }}>{app.position?.toUpperCase()}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', display: 'block', color: currentTheme.textMuted }}>Intake Time: {app.submitted_at}</span>
                        <span style={{ fontSize: '11px', color: '#38BDF8', background: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>{app.experience}</span>
                      </div>
                    </div>
                    <label style={{ ...labelStyle, fontSize: '10px', marginBottom: '4px' }}>Secure Contact Routing Node</label>
                    <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: currentTheme.textMain }}>{app.email}</p>
                    
                    <label style={{ ...labelStyle, fontSize: '10px', marginBottom: '4px' }}>Candidate Cover Statement Packet</label>
                    <p style={{ margin: 0, fontSize: '13px', color: currentTheme.textMuted, background: currentTheme.subtleBoxBg, padding: '12px', borderRadius: '4px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{app.cover_letter}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. PHARMACOVIGILANCE SAFETY MODULE */}
          <div style={{ border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '8px', padding: '30px', backgroundColor: currentTheme.cardBg }}>
            <h3 style={{ margin: '0 0 5px 0', color: currentTheme.textMain, fontSize: '18px' }}>Adverse Drug Reaction (ADR) Safety Registry</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '13px', color: currentTheme.textMuted }}>Review critical pharmacovigilance reports and safety logs submitted by clinical observers.</p>

            {loadingAdr ? (
              <p style={{ color: currentTheme.textMuted, fontStyle: 'italic' }}>Interrogating compliance safety logs...</p>
            ) : adrReports.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: currentTheme.textMuted, border: `1px dashed ${currentTheme.inputBorder}`, borderRadius: '6px' }}>
                No adverse reaction reports logged in the compliance database.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {adrReports.map((report) => (
                  <div key={report.id} style={{ background: currentTheme.inputBg, border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '6px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: `1px solid ${currentTheme.cardBorder}`, paddingBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', color: currentTheme.textMain, fontSize: '16px' }}>Formulation: {report.product_name}</h4>
                        <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: '600' }}>Severity: {report.severity || 'Standard'}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', display: 'block', color: currentTheme.textMuted }}>Reported: {report.submitted_at || report.created_at}</span>
                      </div>
                    </div>
                    <label style={{ ...labelStyle, fontSize: '10px', marginBottom: '4px' }}>Observer / Reporter Info</label>
                    <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: currentTheme.textMain }}>{report.reporter_name} ({report.reporter_email})</p>
                    
                    <label style={{ ...labelStyle, fontSize: '10px', marginBottom: '4px' }}>Reaction Description / Telemetry</label>
                    <p style={{ margin: 0, fontSize: '13px', color: currentTheme.textMuted, background: currentTheme.subtleBoxBg, padding: '12px', borderRadius: '4px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{report.description || report.reaction_details}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ✏️ EDIT PRODUCT MODAL OVERLAY */}
      {editingProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '8px', padding: '30px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: currentTheme.textMain, fontSize: '18px' }}>Edit Formulation: {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)} style={{ background: 'none', border: 'none', color: currentTheme.textMuted, fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleUpdateProduct}>
              <label style={labelStyle}>Formulation Name *</label>
              <input type="text" value={editProdName} onChange={(e) => setEditProdName(e.target.value)} style={inputStyle} />

              <label style={labelStyle}>Chemical Formula / Composition *</label>
              <input type="text" value={editProdFormula} onChange={(e) => setEditProdFormula(e.target.value)} style={inputStyle} />

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <label style={labelStyle}>Department (Layer 1)</label>
                  <select value={editProdDept} onChange={(e) => setEditProdDept(e.target.value)} style={inputStyle}>
                    <option value="Ophthalmic">Ophthalmic</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Supplements">Supplements</option>
                    <option value="Biologics">Biologics</option>
                    <option value="Solutions">Solutions</option>
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <label style={labelStyle}>Medicine Type (Layer 2)</label>
                  <select value={editProdType} onChange={(e) => setEditProdType(e.target.value)} style={inputStyle}>
                    <option value="Drops">Drops</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Capsules">Capsules</option>
                    <option value="Injections">Injections</option>
                    <option value="Syrups">Syrups</option>
                  </select>
                </div>
              </div>

              <label style={labelStyle}>Update Formulation Image Asset</label>
              <div style={dropzoneContainerStyle}>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleImageUpload(e, setEditProdFile, setEditProdPreview, editProdPreview)}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                />
                {editProdPreview ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <img src={resolveAssetUrl(editProdPreview)} alt="Preview" style={{ maxWidth: '65px', maxHeight: '65px', borderRadius: '4px', objectFit: 'contain', border: `1px solid ${currentTheme.inputBorder}` }} />
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '13px', color: '#5B3FFF', display: 'block', fontWeight: '600' }}>✓ Active Image Linked</span>
                      <span style={{ fontSize: '11px', color: currentTheme.textMuted }}>Click or drop to replace asset</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: '26px', display: 'block', marginBottom: '6px' }}>📤</span>
                    <span style={{ fontSize: '13px', color: currentTheme.textMain, display: 'block', fontWeight: '500' }}>Click to upload or drag replacement image</span>
                  </div>
                )}
              </div>

              <label style={labelStyle}>Short Description Details *</label>
              <textarea rows="4" value={editProdDesc} onChange={(e) => setEditProdDesc(e.target.value)} style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}></textarea>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: currentTheme.textMuted, cursor: 'pointer', marginBottom: '25px' }}>
                <input type="checkbox" checked={editProdFeatured} onChange={(e) => setEditProdFeatured(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#5B3FFF' }} />
                Promote to Featured Formulations Carousel
              </label>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setEditingProduct(null)} style={{ padding: '10px 20px', backgroundColor: 'transparent', border: `1px solid ${currentTheme.inputBorder}`, color: currentTheme.textMain, borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#5B3FFF', border: 'none', color: '#FFF', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✏️ EDIT TEAM MEMBER MODAL OVERLAY */}
      {editingTeamMember && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '8px', padding: '30px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: currentTheme.textMain, fontSize: '18px' }}>Edit Executive Profile: {editingTeamMember.name}</h3>
              <button onClick={() => setEditingTeamMember(null)} style={{ background: 'none', border: 'none', color: currentTheme.textMuted, fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleUpdateTeamMember}>
              <label style={labelStyle}>Full Legal Name *</label>
              <input type="text" value={editMemberName} onChange={(e) => setEditMemberName(e.target.value)} style={inputStyle} />

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <label style={labelStyle}>Corporate Assignment / Role Designation *</label>
                  <input type="text" value={editMemberRole} onChange={(e) => setEditMemberRole(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: '140px' }}>
                  <label style={labelStyle}>Organisational Department Mapping *</label>
                  <select value={editMemberDept} onChange={(e) => setEditMemberDept(e.target.value)} style={inputStyle}>
                    <option value="Executive Board">Executive Board</option>
                    <option value="Research & Development">Research & Development</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Drug Safety & Compliance">Drug Safety & Compliance</option>
                  </select>
                </div>
              </div>

              <label style={labelStyle}>Update Avatar Image Asset</label>
              <div style={dropzoneContainerStyle}>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleImageUpload(e, setEditMemberFile, setEditMemberPreview, editMemberPreview)}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                />
                {editMemberPreview ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <img src={resolveAssetUrl(editMemberPreview)} alt="Preview" style={{ maxWidth: '65px', maxHeight: '65px', borderRadius: '4px', objectFit: 'contain', border: `1px solid ${currentTheme.inputBorder}` }} />
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '13px', color: '#5B3FFF', display: 'block', fontWeight: '600' }}>✓ Active Avatar Linked</span>
                      <span style={{ fontSize: '11px', color: currentTheme.textMuted }}>Click or drop to replace image source</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: '26px', display: 'block', marginBottom: '6px' }}>👤</span>
                    <span style={{ fontSize: '13px', color: currentTheme.textMain, display: 'block', fontWeight: '500' }}>Click to upload or drag replacement avatar</span>
                  </div>
                )}
              </div>

              <label style={labelStyle}>Professional Brief / Biography</label>
              <textarea rows="4" value={editMemberBio} onChange={(e) => setEditMemberBio(e.target.value)} style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}></textarea>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                <button type="button" onClick={() => setEditingTeamMember(null)} style={{ padding: '10px 20px', backgroundColor: 'transparent', border: `1px solid ${currentTheme.inputBorder}`, color: currentTheme.textMain, borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#5B3FFF', border: 'none', color: '#FFF', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
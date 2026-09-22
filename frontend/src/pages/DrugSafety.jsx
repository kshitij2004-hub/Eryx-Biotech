import React, { useState } from 'react';
import { adrFormBase64 } from '../pdfData.js'; 

function DrugSafety({ user, darkMode = true }) {
  const [compoundId, setCompoundId] = useState('');
  const [observation, setObservation] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ loading: false, success: false, error: null });

  // 🎨 Dynamic Theme Colors (Matches About, Dashboard, and Products pages)
  const currentTheme = {
    wrapperBg: darkMode ? '#08080A' : 'transparent',
    textMain: darkMode ? '#FFFFFF' : '#1F2937',
    textMuted: darkMode ? '#A1A1B5' : '#4B5563',
    cardBg: darkMode ? 'rgba(19, 19, 26, 0.65)' : '#FFFFFF',
    cardBorder: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    inputBg: darkMode ? '#08080A' : '#FFFFFF',
    inputBorder: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
    subtleBoxBg: darkMode ? '#0F172A' : '#F9FAFB',
    accentPurple: '#5B3FFF',
    dropzoneBg: darkMode ? (isDragActive ? 'rgba(91, 63, 255, 0.08)' : 'rgba(8, 8, 11, 0.6)') : (isDragActive ? 'rgba(91, 63, 255, 0.04)' : '#F9FAFB')
  };

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const BACKEND_BASE_URL = isLocalhost ? 'http://localhost/eryx-biotech-platform' : `${window.location.protocol}//${window.location.hostname}`;

  const handleDownload = (e) => {
    e.preventDefault();
    const linkSource = `data:application/pdf;base64,${adrFormBase64}`;
    const downloadLink = document.createElement("a");
    const fileName = "ADR REPORTING FORM Eryx.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf');
      if (isPdf) {
        setSelectedFile(file);
        setUploadStatus({ loading: false, success: false, error: null });
      } else {
        setUploadStatus({ loading: false, success: false, error: "Only official PDF documents are accepted." });
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf');
      if (isPdf) {
        setSelectedFile(file);
        setUploadStatus({ loading: false, success: false, error: null });
      } else {
        setUploadStatus({ loading: false, success: false, error: "Only official PDF documents are accepted." });
      }
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    setUploadStatus({ loading: false, success: false, error: null });
    
    const fileInput = document.getElementById('adr-file-input');
    if (fileInput) fileInput.value = '';
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus({ loading: false, success: false, error: "Please attach your completed PDF report form before submission." });
      return;
    }

    setUploadStatus({ loading: true, success: false, error: null });

    const formData = new FormData();
    formData.append('compound_id', compoundId);
    formData.append('observation_notes', observation);
    formData.append('adr_form', selectedFile);
    
    if (user?.id) {
      formData.append('user_id', user.id);
    }

    fetch(`${BACKEND_BASE_URL}/backend/api/upload_adr.php`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned unstable HTTP status code: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          setUploadStatus({ loading: false, success: true, error: null });
          setCompoundId('');
          setObservation('');
          setSelectedFile(null);
          
          const fileInput = document.getElementById('adr-file-input');
          if (fileInput) fileInput.value = '';

          setTimeout(() => setUploadStatus(prev => ({ ...prev, success: false })), 5000);
        } else {
          setUploadStatus({ loading: false, success: false, error: data.message || "Failed to process form." });
        }
      })
      .catch((error) => {
        console.error("Error transmitting pharmacovigilance dossier:", error);
        setUploadStatus({ loading: false, success: false, error: error.message || "Server connection failed." });
      });
  };

  return (
    <div style={{ 
      padding: '40px 0', 
      animation: 'fadeIn 0.6s ease-out', 
      color: currentTheme.textMain, 
      backgroundColor: currentTheme.wrapperBg,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease' 
    }}>

      {/* 📊 GRID MATRIX PANEL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px' }}>
        
        {/* LEFT COLUMN: ACTIVE FORM MODULE */}
        <div style={{ background: currentTheme.cardBg, backdropFilter: 'blur(10px)', padding: '35px', borderRadius: '8px', border: `1px solid ${currentTheme.cardBorder}`, transition: 'background 0.3s, border 0.3s' }}>
          <h3 style={{ fontSize: '20px', color: currentTheme.textMain, margin: '0 0 10px 0' }}>Submit a Safety Report</h3>
          <p style={{ color: currentTheme.textMuted, fontSize: '14px', marginBottom: '25px', lineHeight: '1.5' }}>
            Download the official blueprint layout on the right panel, fill up your metrics case logs, and upload the signed copy down below into our encrypted compliance database.
          </p>

          <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Input 1: Batch Identification */}
            <div>
              <label style={{ display: 'block', color: currentTheme.textMain, fontSize: '12px', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Batch or Compound ID *
              </label>
              <input 
                type="text" 
                placeholder="e.g., Batch-404-Alpha" 
                value={compoundId} 
                onChange={(e) => setCompoundId(e.target.value)}
                required 
                style={{ width: '100%', padding: '12px', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '6px', color: currentTheme.textMain, transition: 'all 0.2s', outline: 'none' }} 
              />
            </div>

            {/* Input 2: Observations / Notes */}
            <div>
              <label style={{ display: 'block', color: currentTheme.textMain, fontSize: '12px', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Observations & Clinical Notes *
              </label>
              <textarea 
                placeholder="Provide short structural summaries regarding product stability variances, chemical tracking logs, or biological conditions..." 
                rows="4" 
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                required 
                style={{ width: '100%', padding: '12px', background: currentTheme.inputBg, border: `1px solid ${currentTheme.inputBorder}`, borderRadius: '6px', color: currentTheme.textMain, lineHeight: '1.5', transition: 'all 0.2s', resize: 'none', outline: 'none', fontFamily: 'inherit' }}
              ></textarea>
            </div>

            {/* Input 3: Interactive File Upload Container Zone */}
            <div>
              <label style={{ display: 'block', color: currentTheme.textMain, fontSize: '12px', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Completed ADR File Attachment (.PDF) *
              </label>
              
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                style={{
                  border: isDragActive ? '2px dashed #5B3FFF' : `2px dashed ${currentTheme.inputBorder}`,
                  backgroundColor: currentTheme.dropzoneBg,
                  borderRadius: '6px',
                  padding: '30px 20px',
                  textAlign: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="file" 
                  id="adr-file-input"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                />
                
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div style={{ fontSize: '26px', marginBottom: '8px' }}>📂</div>
                  <h5 style={{ fontSize: '13px', color: currentTheme.textMain, margin: '0 0 4px 0', fontWeight: '600' }}>
                    {selectedFile ? selectedFile.name : "Drag & Drop Filled PDF Here"}
                  </h5>
                  <p style={{ color: currentTheme.textMuted, fontSize: '11px', margin: '0 0 8px 0' }}>
                    {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "or click this zone to scan files"}
                  </p>

                  {/* Operational UI clear button control */}
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      style={{
                        background: 'rgba(239,83,80,0.1)',
                        border: '1px solid #ef5350',
                        color: '#ef5350',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        zIndex: 4,
                        position: 'relative'
                      }}
                    >
                      ✕ Remove Selection
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION TRANSMIT SUBMIT TRIGGER */}
            <button 
              type="submit" 
              disabled={uploadStatus.loading}
              style={{ 
                background: '#5B3FFF', 
                color: '#FFFFFF', 
                border: 'none', 
                padding: '14px', 
                fontWeight: 'bold', 
                borderRadius: '6px', 
                cursor: uploadStatus.loading ? 'not-allowed' : 'pointer', 
                fontSize: '12px', 
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                opacity: uploadStatus.loading ? 0.7 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {uploadStatus.loading ? "TRANSFERRED ENCRYPTING..." : "SUBMIT COMPLIANCE DOSSIER"}
            </button>
          </form>

          {/* RESPONSE FEEDBACK NOTIFICATION FRAME */}
          {uploadStatus.success && (
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,255,102,0.1)', border: '1px solid #00FF66', color: '#00FF66', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center', fontSize: '13px' }}>
              ✔️ Report & document blueprint submitted successfully to our compliance database.
            </div>
          )}

          {uploadStatus.error && (
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239,83,80,0.1)', border: '1px solid #ef5350', color: '#ef5350', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center', fontSize: '13px' }}>
              ⚠️ Verification Error: {uploadStatus.error}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: REPOSITORY DOWNLOADS & EMBED VIEW */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* COMPLIANCE INFRASTRUCTURE TEXT BOX */}
          <div style={{ background: currentTheme.cardBg, backdropFilter: 'blur(10px)', padding: '35px', borderRadius: '8px', border: `1px solid ${currentTheme.cardBorder}` }}>
            <h3 style={{ fontSize: '20px', color: currentTheme.textMain, margin: '0 0 15px 0' }}>Compliance Standards</h3>
            <p style={{ color: currentTheme.textMuted, fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Our organization maintains rigorous regulatory standards. All submitted documentation is reviewed by our quality control panel to support the ongoing efficacy and safety of our biological products.
            </p>
            
            {/* DIRECT BLUEPRINT ASSET DOWNLOAD COMPONENT VIA MEMORY CLICK */}
            <a 
              href="#download"
              onClick={handleDownload}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'transparent',
                color: '#F5C518',
                border: '1px solid #F5C518',
                padding: '12px 20px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,197,24,0.06)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              📥 Download ADR Form
            </a>
          </div>

          {/* ESCALATION NOTIFICATION BANNER */}
          <div style={{ padding: '20px', borderLeft: '3px solid #F5C518', background: darkMode ? 'rgba(245,197,24,0.03)' : 'rgba(245,197,24,0.08)', borderRadius: '0 8px 8px 0', border: `1px solid ${currentTheme.cardBorder}`, borderLeft: '3px solid #F5C518' }}>
            <h4 style={{ color: currentTheme.textMain, fontSize: '14px', margin: '0 0 5px 0', fontWeight: '600' }}>Urgent Escalation</h4>
            <p style={{ color: currentTheme.textMuted, fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
              If you are reporting a time-critical issue or a significant manufacturing variance, please notify the systems administration desk directly via the main contact hub.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DrugSafety;
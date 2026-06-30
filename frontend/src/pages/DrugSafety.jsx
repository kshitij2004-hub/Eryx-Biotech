import React, { useState } from 'react';
// 1. Importing the compiled text data instead of a loose server file
import { adrFormBase64 } from '../pdfData.js'; 

function DrugSafety({ user }) {
  const [compoundId, setCompoundId] = useState('');
  const [observation, setObservation] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ loading: false, success: false, error: null });

  // 🌐 Anchor paths matching your server configurations
  const BACKEND_BASE_URL = 'http://localhost/eryx-biotech-platform';

  // 🚀 Triggering a raw byte download completely in-memory
  const handleDownload = (e) => {
    e.preventDefault();
    
    // Compiles the file inside the browser sandbox directly to avoid 404 proxy routes
    const linkSource = `data:application/pdf;base64,${adrFormBase64}`;
    const downloadLink = document.createElement("a");
    const fileName = "ADR REPORTING FORM Eryx.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  // Handle Drag Events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Handle Drop Event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setUploadStatus({ loading: false, success: false, error: null });
      } else {
        setUploadStatus({ loading: false, success: false, error: "Only official PDF documents are accepted." });
      }
    }
  };

  // Handle Manual File Selection via Browser File Dialog
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setUploadStatus({ loading: false, success: false, error: null });
      } else {
        setUploadStatus({ loading: false, success: false, error: "Only official PDF documents are accepted." });
      }
    }
  };

  // Clear Currently Attached Document
  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    setUploadStatus({ loading: false, success: false, error: null });
    
    const fileInput = document.getElementById('adr-file-input');
    if (fileInput) fileInput.value = ''; // Reset native input DOM node
  };

  // Handle Form Submission to PHP Backend Script
  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus({ loading: false, success: false, error: "Please attach your completed PDF report form before submission." });
      return;
    }

    setUploadStatus({ loading: true, success: false, error: null });

    // Packing payload structures securely
    const formData = new FormData();
    formData.append('compound_id', compoundId);
    formData.append('observation_notes', observation);
    formData.append('adr_form', selectedFile);
    
    // Binds the active authenticated user context directly to the backend database insert row
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

          // Auto clear success message status notification banner after 5 seconds
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
    <div style={{ padding: '40px 0', animation: 'fadeIn 0.6s ease-out' }}>

      {/* 📊 GRID MATRIX PANEL */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px' }}>
        
        {/* LEFT COLUMN: ACTIVE FORM MODULE */}
        <div style={{ background: '#12121A', padding: '35px', borderRadius: '8px', border: '1px solid rgba(161,161,181,0.1)' }}>
          <h3 style={{ fontSize: '20px', color: '#F3F4F6', margin: '0 0 10px 0' }}>Submit a Safety Report</h3>
          <p style={{ color: '#A1A1B5', fontSize: '14px', marginBottom: '25px', lineHeight: '1.5' }}>
            Download the official blueprint layout on the right panel, fill up your metrics case logs, and upload the signed copy down below into our encrypted compliance database.
          </p>

          <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Input 1: Batch Identification */}
            <div>
              <label style={{ display: 'block', color: '#A1A1B5', fontSize: '12px', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>
                BATCH OR COMPOUND ID
              </label>
              <input 
                type="text" 
                placeholder="e.g., Batch-404-Alpha" 
                value={compoundId} 
                onChange={(e) => setCompoundId(e.target.value)}
                required 
                style={{ width: '100%', padding: '12px', background: '#08080B', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: '#FFF', transition: 'border-color 0.2s' }} 
              />
            </div>

            {/* Input 2: Observations / Notes */}
            <div>
              <label style={{ display: 'block', color: '#A1A1B5', fontSize: '12px', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>
                OBSERVATIONS & CLINICAL NOTES
              </label>
              <textarea 
                placeholder="Provide short structural summaries regarding product stability variances, chemical tracking logs, or biological conditions..." 
                rows="4" 
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                required 
                style={{ width: '100%', padding: '12px', background: '#08080B', border: '1px solid rgba(161,161,181,0.2)', borderRadius: '4px', color: '#FFF', lineHeight: '1.5', transition: 'border-color 0.2s' }}
              ></textarea>
            </div>

            {/* Input 3: Interactive File Upload Container Zone */}
            <div>
              <label style={{ display: 'block', color: '#A1A1B5', fontSize: '12px', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.5px' }}>
                COMPLETED ADR FILE ATTACHMENT (.PDF)
              </label>
              
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                style={{
                  border: isDragActive ? '2px dashed #5B3FFF' : '1px dashed rgba(161,161,181,0.3)',
                  backgroundColor: isDragActive ? 'rgba(91,63,255,0.04)' : 'rgba(8,8,11,0.6)',
                  borderRadius: '4px',
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
                  <h5 style={{ fontSize: '13px', color: '#F3F4F6', margin: '0 0 4px 0', fontWeight: '600' }}>
                    {selectedFile ? selectedFile.name : "Drag & Drop Filled PDF Here"}
                  </h5>
                  <p style={{ color: '#A1A1B5', fontSize: '11px', margin: '0 0 8px 0' }}>
                    {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "or click this zone to scan files"}
                  </p>

                  {/* Operational UI clear button control */}
                  {selectedFile && (
                    <button
                      onClick={handleRemoveFile}
                      style={{
                        background: 'rgba(239,83,80,0.1)',
                        border: '1px solid #ef5350',
                        color: '#ef5350',
                        borderRadius: '3px',
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
                color: '#FFF', 
                border: 'none', 
                padding: '14px', 
                fontWeight: 'bold', 
                borderRadius: '4px', 
                cursor: uploadStatus.loading ? 'not-allowed' : 'pointer', 
                fontSize: '13px', 
                letterSpacing: '0.5px',
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
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,255,102,0.1)', border: '1px solid #00FF66', color: '#00FF66', borderRadius: '4px', fontWeight: 'bold', textAlign: 'center', fontSize: '13px' }}>
              ✔️ Report & document blueprint submitted successfully to our compliance database.
            </div>
          )}

          {uploadStatus.error && (
            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239,83,80,0.1)', border: '1px solid #ef5350', color: '#ef5350', borderRadius: '4px', fontWeight: 'bold', textAlign: 'center', fontSize: '13px' }}>
              ⚠️ Verification Error: {uploadStatus.error}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: REPOSITORY DOWNLOADS & EMBED VIEW */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* COMPLIANCE INFRASTRUCTURE TEXT BOX */}
          <div>
            <h3 style={{ fontSize: '20px', color: '#F3F4F6', margin: '0 0 15px 0' }}>Compliance Standards</h3>
            <p style={{ color: '#A1A1B5', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Our organization maintains rigorous regulatory standards. All submitted documentation is reviewed by our quality control panel to support the ongoing efficacy and safety of our biological products.
            </p>
            
            {/* DIRECT BLUEPRINT ASSET DOWNLOAD COMPONENT VIA MEMORY CLICK */}
            <a 
              href="#"
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
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
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
          <div style={{ padding: '20px', borderLeft: '3px solid #F5C518', background: 'rgba(245,197,24,0.03)' }}>
            <h4 style={{ color: '#F3F4F6', fontSize: '14px', margin: '0 0 5px 0' }}>Urgent Escalation</h4>
            <p style={{ color: '#A1A1B5', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
              If you are reporting a time-critical issue or a significant manufacturing variance, please notify the systems administration desk directly via the main contact hub.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DrugSafety;
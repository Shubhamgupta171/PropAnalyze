import React from 'react';
import { UploadCloud, FileSpreadsheet, AlignLeft, Download, BarChart2 } from 'lucide-react';
import styles from './BulkUploadWidget.module.css';

const BulkUploadWidget = ({ onDataLoad = () => {}, onRunAnalysis = () => {} }) => {
  const [activeTab, setActiveTab] = React.useState('upload');
  const [pastedText, setPastedText] = React.useState('');
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text) => {
    // Simple CSV parser logic
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Attempt to map common headers
    const mapHeader = (h) => {
        if (h.includes('address') || h.includes('street')) return 'name';
        if (h.includes('price')) return 'price';
        if (h.includes('bed')) return 'beds';
        if (h.includes('bath')) return 'baths';
        if (h.includes('sqft') || h.includes('foot')) return 'sqft';
        if (h.includes('rehab')) return 'rehab';
        if (h.includes('city')) return 'city';
        return h;
    };

    const mappedHeaders = headers.map(mapHeader);

    const parsedData = lines.slice(1).map((line, idx) => {
        if (!line.trim()) return null;
        const values = line.split(',');
        const obj = { id: Date.now() + idx }; // Temporary ID
        mappedHeaders.forEach((header, i) => {
            let val = values[i] ? values[i].trim() : '';
            // Basic cleaning
            if (header === 'price' || header === 'rehab' || header === 'sqft') {
                val = val.replace(/[^0-9.]/g, ''); // Remove non-numeric chars
            }
            obj[header] = val;
        });
        return obj;
    }).filter(Boolean);

    onDataLoad(parsedData);
  };

  const handlePasteProcess = () => {
     if (!pastedText) return;
     // Simple parsing for pasted addresses (one per line)
     const lines = pastedText.split('\n');
     const parsedData = lines.map((line, idx) => {
         if (!line.trim()) return null;
         return {
             id: Date.now() + idx,
             name: line.trim(),
             city: 'Unknown', // Placeholder
             price: '0', 
             beds: '0', 
             baths: '0', 
             sqft: '0'
         };
     }).filter(Boolean);
     onDataLoad(parsedData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Analyze Multiple Properties Instantly</h2>
        <p className={styles.subtitle}>
          Upload your property list or paste addresses below to generate comprehensive underwriting reports.
        </p>
      </div>

      <div className={styles.tabs}>
        <div 
            className={`${styles.tab} ${activeTab === 'upload' ? styles.active : ''}`}
            onClick={() => setActiveTab('upload')}
        >
            <FileSpreadsheet size={16} /> Upload CSV / Excel
        </div>
        <div 
            className={`${styles.tab} ${activeTab === 'paste' ? styles.active : ''}`}
            onClick={() => setActiveTab('paste')}
        >
            <AlignLeft size={16} /> Paste Addresses
        </div>
      </div>

      <div className={styles.uploadArea}>
         {activeTab === 'upload' ? (
             <>
                <input 
                    type="file" 
                    accept=".csv,.txt" 
                    ref={fileInputRef} 
                    style={{display: 'none'}} 
                    onChange={handleFileChange}
                />
                <div className={styles.iconCircle}>
                    <UploadCloud size={24} />
                </div>
                <div className={styles.dragText}>Drag & drop your CSV here</div>
                <div className={styles.supportText}>Supports .csv, .txt. Max 500 properties.</div>
                <button className={styles.browseBtn} onClick={() => fileInputRef.current.click()}>Browse Files</button>
             </>
         ) : (
             <textarea 
                placeholder="Paste addresses here, one per line..."
                style={{
                    width: '100%', 
                    height: '100%', 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#fff', 
                    resize: 'none',
                    outline: 'none',
                    padding: '8px'
                }}
                value={pastedText}
                onChange={e => setPastedText(e.target.value)}
                onBlur={handlePasteProcess}
             />
         )}
      </div>

      <div className={styles.footer}>
         <button className={styles.link}>
            <Download size={14} /> Download Sample Template
         </button>
         
         <div style={{display:'flex', alignItems:'center', gap: '16px'}}>
             <span style={{fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.5px'}}>READY TO UNDERWRITE?</span>
             <button className={styles.runBtn} onClick={onRunAnalysis}>
                <BarChart2 size={18} /> Run Analysis
             </button>
         </div>
      </div>
    </div>
  );
};

export default BulkUploadWidget;

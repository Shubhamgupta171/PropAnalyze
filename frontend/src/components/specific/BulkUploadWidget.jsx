import React from 'react';
import { UploadCloud, FileSpreadsheet, AlignLeft, Download, BarChart2 } from 'lucide-react';
import styles from './BulkUploadWidget.module.css';

const BulkUploadWidget = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Analyze Multiple Properties Instantly</h2>
        <p className={styles.subtitle}>
          Upload your property list or paste addresses below to generate comprehensive underwriting reports.
        </p>
      </div>

      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.active}`}>
            <FileSpreadsheet size={16} /> Upload CSV / Excel
        </div>
        <div className={styles.tab}>
            <AlignLeft size={16} /> Paste Addresses
        </div>
      </div>

      <div className={styles.uploadArea}>
         <div className={styles.iconCircle}>
            <UploadCloud size={24} />
         </div>
         <div className={styles.dragText}>Drag & drop your CSV here</div>
         <div className={styles.supportText}>Supports .csv, .xls, .xlsx. Max 500 properties.</div>
         <button className={styles.browseBtn}>Browse Files</button>
      </div>

      <div className={styles.footer}>
         <button className={styles.link}>
            <Download size={14} /> Download Sample Template
         </button>
         
         <div style={{display:'flex', alignItems:'center', gap: '16px'}}>
             <span style={{fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.5px'}}>READY TO UNDERWRITE?</span>
             <button className={styles.runBtn}>
                <BarChart2 size={18} /> Run Analysis
             </button>
         </div>
      </div>
    </div>
  );
};

export default BulkUploadWidget;

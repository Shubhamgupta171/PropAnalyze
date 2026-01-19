import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const Reports = () => {
    const reports = [
        { id: 1, title: 'Portfolio Summary Q4 2024', date: 'Dec 01, 2024', type: 'Portfolio', size: '2.4 MB' },
        { id: 2, title: '123 Maple Ave - Deep Dive', date: 'Nov 28, 2024', type: 'Property Analysis', size: '1.1 MB' },
        { id: 3, title: 'Market Analysis: Austin, TX', date: 'Nov 15, 2024', type: 'Market Research', size: '4.5 MB' },
        { id: 4, title: 'Tax Implications 2024', date: 'Nov 10, 2024', type: 'Tax', size: '0.8 MB' },
    ];

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color:'white' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem' }}>Reports</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {reports.map(report => (
              <div key={report.id} style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
              }}>
                  <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                      <div style={{
                          width: '40px', height: '40px', 
                          backgroundColor: 'rgba(74, 222, 128, 0.1)', 
                          borderRadius: '8px', 
                          display:'flex', alignItems:'center', justifyContent:'center',
                          color: 'var(--primary-green)'
                      }}>
                          <FileText size={20} />
                      </div>
                      <span style={{
                          fontSize: '0.75rem', 
                          padding: '4px 8px', 
                          backgroundColor: '#181a19', 
                          borderRadius: '4px',
                          color: '#9ca3af'
                      }}>{report.type}</span>
                  </div>
                  
                  <div>
                      <h3 style={{fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '4px'}}>{report.title}</h3>
                      <div style={{display:'flex', alignItems:'center', gap: '6px', fontSize: '0.8rem', color: '#6b7280'}}>
                          <Calendar size={14} /> {report.date} • {report.size}
                      </div>
                  </div>

                  <button style={{
                      marginTop: 'auto',
                      width: '100%',
                      padding: '8px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {e.currentTarget.style.borderColor='var(--primary-green)'; e.currentTarget.style.color='white'}}
                  onMouseOut={(e) => {e.currentTarget.style.borderColor='var(--border-color)'; e.currentTarget.style.color='var(--text-secondary)'}}
                  >
                      <Download size={14} /> Download PDF
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Reports;

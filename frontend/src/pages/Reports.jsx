import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Trash2 } from 'lucide-react';
import reportService from '../services/report.service';
import toast from 'react-hot-toast';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await reportService.getReports();
            setReports(response.data.reports);
        } catch (error) {
            console.error('Error fetching reports:', error);
            toast.error('Failed to load reports');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        try {
            await reportService.deleteReport(id);
            toast.success('Report deleted');
            setReports(reports.filter(r => r.id !== id));
        } catch (error) {
            toast.error('Failed to delete report');
        }
    };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color:'white' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem' }}>Reports</h1>

      {loading ? (
        <div style={{color: '#4ade80', textAlign: 'center', padding: '40px'}}>Loading reports from server...</div>
      ) : reports.length === 0 ? (
        <div style={{color: '#9ca3af', textAlign: 'center', padding: '40px'}}>No reports generated yet.</div>
      ) : (
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
                        <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                            <span style={{
                                fontSize: '0.75rem', 
                                padding: '4px 8px', 
                                backgroundColor: '#181a19', 
                                borderRadius: '4px',
                                color: '#9ca3af'
                            }}>{report.status}</span>
                            <button 
                                onClick={() => handleDelete(report.id)}
                                style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', padding:'2px'}}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style={{fontSize: '1rem', fontWeight: 600, color: 'white', marginBottom: '4px'}}>{report.name}</h3>
                        <div style={{display:'flex', alignItems:'center', gap: '6px', fontSize: '0.8rem', color: '#6b7280'}}>
                            <Calendar size={14} /> {new Date(report.created_at).toLocaleDateString()} {report.property_title ? `• ${report.property_title}` : ''}
                        </div>
                    </div>

                    <a 
                        href={report.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
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
                            textDecoration: 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Download size={14} /> View / Download PDF
                    </a>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Reports;

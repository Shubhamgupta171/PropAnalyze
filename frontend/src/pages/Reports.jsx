import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Trash2, AlertCircle, ExternalLink } from 'lucide-react';
import reportService from '../services/report.service';
import toast from 'react-hot-toast';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(null);

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
            toast.success('Report deleted successfully');
            setReports(reports.filter(r => r.id !== id));
        } catch (error) {
            toast.error('Failed to delete report');
        }
    };

    const handleDownload = async (report) => {
        // If file_url exists, just open it
        if (report.file_url) {
            window.open(report.file_url, '_blank');
            return;
        }

        // Otherwise, generate and download
        setDownloading(report.id);
        try {
            const blob = await reportService.downloadReport(report.property_id, report.analysis_id);
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${report.name.replace(/[^a-z0-9]/gi, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            toast.success('Report downloaded successfully');
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Failed to download report');
        } finally {
            setDownloading(null);
        }
    };

    const getStrategyColor = (strategy) => {
        const colors = {
            'Cash': '#10b981',
            'Conventional': '#3b82f6',
            'Seller Finance': '#f59e0b',
            'Long-term': '#8b5cf6',
            'Mid-term': '#ec4899',
            'Short-term': '#06b6d4'
        };
        return colors[strategy] || '#6b7280';
    };

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color:'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Investment Reports</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            View and download your generated property analysis reports
          </p>
        </div>
        <div style={{ 
          backgroundColor: 'rgba(74, 222, 128, 0.1)', 
          padding: '12px 20px', 
          borderRadius: '8px',
          border: '1px solid rgba(74, 222, 128, 0.3)'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '2px' }}>Total Reports</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4ade80' }}>{reports.length}</div>
        </div>
      </div>

      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          color: '#4ade80'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(74, 222, 128, 0.3)',
            borderTop: '3px solid #4ade80',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}></div>
          <div>Loading reports from server...</div>
        </div>
      ) : reports.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <FileText size={48} color="#4ade80" style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: 'white' }}>
            No reports generated yet
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
            Generate your first investment analysis report from the Property Analysis page
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            padding: '12px 16px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <AlertCircle size={16} color="#3b82f6" />
            <span style={{ fontSize: '0.875rem', color: '#93c5fd' }}>
              Tip: Go to any property analysis page and click "Generate Report"
            </span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {reports.map(report => (
                <div key={report.id} style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4ade80';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                    <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                        <div style={{
                            width: '48px', height: '48px', 
                            backgroundColor: 'rgba(74, 222, 128, 0.1)', 
                            borderRadius: '10px', 
                            display:'flex', alignItems:'center', justifyContent:'center',
                            color: 'var(--primary-green)'
                        }}>
                            <FileText size={24} />
                        </div>
                        <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                            {report.strategy && (
                                <span style={{
                                    fontSize: '0.7rem', 
                                    padding: '4px 8px', 
                                    backgroundColor: getStrategyColor(report.strategy) + '20',
                                    border: `1px solid ${getStrategyColor(report.strategy)}40`,
                                    borderRadius: '4px',
                                    color: getStrategyColor(report.strategy),
                                    fontWeight: '600'
                                }}>{report.strategy}</span>
                            )}
                            <span style={{
                                fontSize: '0.7rem', 
                                padding: '4px 8px', 
                                backgroundColor: report.status === 'Ready' ? '#10b98120' : '#f59e0b20', 
                                borderRadius: '4px',
                                color: report.status === 'Ready' ? '#10b981' : '#f59e0b',
                                fontWeight: '600'
                            }}>{report.status}</span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(report.id);
                                }}
                                style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer', padding:'4px'}}
                                title="Delete report"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <h3 style={{fontSize: '1.05rem', fontWeight: 600, color: 'white', marginBottom: '8px', lineHeight: '1.4'}}>
                            {report.name}
                        </h3>
                        {report.property_title && (
                            <div style={{
                                fontSize: '0.85rem', 
                                color: '#9ca3af', 
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <ExternalLink size={12} />
                                {report.property_title}
                            </div>
                        )}
                        <div style={{display:'flex', alignItems:'center', gap: '6px', fontSize: '0.8rem', color: '#6b7280'}}>
                            <Calendar size={14} />
                            {new Date(report.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>

                    <button
                        onClick={() => handleDownload(report)}
                        disabled={downloading === report.id}
                        style={{
                            marginTop: 'auto',
                            width: '100%',
                            padding: '12px',
                            backgroundColor: downloading === report.id ? '#6b7280' : '#4ade80',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#000',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: downloading === report.id ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (downloading !== report.id) {
                                e.currentTarget.style.backgroundColor = '#22c55e';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (downloading !== report.id) {
                                e.currentTarget.style.backgroundColor = '#4ade80';
                            }
                        }}
                    >
                        <Download size={16} />
                        {downloading === report.id ? 'Downloading...' : 'Download PDF Report'}
                    </button>
                </div>
            ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Reports;


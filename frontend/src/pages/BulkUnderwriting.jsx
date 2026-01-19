import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Plus } from 'lucide-react';
import BulkUploadWidget from '../components/specific/BulkUploadWidget';
import CalculationParameters from '../components/specific/CalculationParameters';
import BulkAnalysisTable from '../components/specific/BulkAnalysisTable';

const BulkUnderwriting = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color:'white' }}>
      {/* Page Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Bulk Underwriting</h1>
            <p style={{ color: '#9ca3af' }}>Analyze multiple properties simultaneously. Import your leads, apply your strategy templates.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
             <button 
                onClick={() => navigate('/history')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '0.9rem', backgroundColor:'#181a19', padding:'8px 16px', borderRadius:'999px', border:'1px solid #333', cursor: 'pointer' }}>
                <History size={16} /> History
             </button>
             <button 
                 onClick={() => navigate('/market')}
                 style={{ 
                 backgroundColor: 'var(--primary-green)', 
                 color: '#000', 
                 padding: '10px 20px', 
                 borderRadius: '999px',
                 fontWeight: '600',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '6px',
                 cursor: 'pointer'
             }}>
                 <Plus size={18} /> New Analysis
             </button>
        </div>
      </header>

      {/* Top Split Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 6fr)', gap: '2rem', marginBottom: '2rem' }}>
         <div>
            <div style={{marginBottom:'12px', fontWeight:600, fontSize:'1rem', display:'flex', alignItems:'center', gap:'8px'}}>
                <span style={{color:'var(--primary-green)'}}>📄</span> Data Import
            </div>
            <BulkUploadWidget />
         </div>
         <div>
            <div style={{marginBottom:'12px', fontWeight:600, fontSize:'1rem', display:'flex', alignItems:'center', gap:'8px'}}>
                <span style={{color:'var(--primary-green)'}}>🎛</span> Calculation Parameters
            </div>
            <CalculationParameters />
         </div>
      </div>

      {/* Bottom Table Section */}
      <BulkAnalysisTable />
    </div>
  );
};

export default BulkUnderwriting;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import HistoryStats from '../components/specific/HistoryStats';
import HistoryTable from '../components/specific/HistoryTable';
import styles from '../pages/PropertyAnalysis.module.css'; // Reusing container styles

const History = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-dark)', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Analysis History</h1>
            <p style={{ color: '#9ca3af' }}>Review your past underwriting models and property insights.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
             <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '0.9rem' }}>
                <Download size={16} /> Export CSV
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

      <HistoryStats />
      <HistoryTable />
    </div>
  );
};

export default History;

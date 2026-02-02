import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Plus } from 'lucide-react';
import BulkUploadWidget from '../components/specific/BulkUploadWidget';
import CalculationParameters from '../components/specific/CalculationParameters';
import BulkAnalysisTable from '../components/specific/BulkAnalysisTable';

const BulkUnderwriting = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = React.useState([]);
  const [parameters, setParameters] = React.useState({
      strategy: 'Fix & Flip',
      interestRate: 7.5,
      downPayment: 20,
      rehabBuffer: 10,
      targetCapRate: 6.0
  });

  const handleDataLoad = (data) => {
      // Preserve existing calculation if reapplying data, or just reset?
      // For now, simple set.
      setProperties(data);
  };

  const handleParamsChange = (newParams) => {
      setParameters(newParams);
  };

  const runAnalysis = () => {
      if (properties.length === 0) return;

      const analyzed = properties.map(p => {
          // Parse values safely
          const price = parseFloat(p.price) || 0;
          const arv = parseFloat(p.arv) || (price * 1.3); // Default ARV assumption if missing
          const rehab = parseFloat(p.rehab) || (price * 0.1); // Default Rehab assumption if missing
          
          // Calculation Logic (Simplified Flip)
          const downPaymentPct = parseFloat(parameters.downPayment) / 100;
          const interestRate = parseFloat(parameters.interestRate) / 100;
          
          const loanAmount = price * (1 - downPaymentPct);
          const downPayment = price * downPaymentPct;
          
          // Costs
          const closingCosts = price * 0.03; // 3% buying
          const sellingCosts = arv * 0.06; // 6% selling
          const holdingCosts = loanAmount * interestRate * 0.5; // Assume 6 months holding
          
          const totalCost = price + rehab + closingCosts + sellingCosts + holdingCosts;
          const netProfit = arv - totalCost;
          const totalCashInvested = downPayment + rehab + closingCosts + holdingCosts; // Cash skin in game
          
          const roi = totalCashInvested > 0 ? (netProfit / totalCashInvested) * 100 : 0;

          return {
              ...p,
              // Update/Fill missing values for display
              price: price,
              arv: arv,
              rehab: rehab,
              profit: netProfit > 0 ? `+$${Math.round(netProfit).toLocaleString()}` : `-$${Math.abs(Math.round(netProfit)).toLocaleString()}`,
              roi: (roi > 0 ? '+' : '') + roi.toFixed(1) + '%'
          };
      });

      setProperties(analyzed);
  };

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
            <BulkUploadWidget onDataLoad={handleDataLoad} onRunAnalysis={runAnalysis} />
         </div>
         <div>
            <div style={{marginBottom:'12px', fontWeight:600, fontSize:'1rem', display:'flex', alignItems:'center', gap:'8px'}}>
                <span style={{color:'var(--primary-green)'}}>🎛</span> Calculation Parameters
            </div>
            <CalculationParameters params={parameters} onChange={handleParamsChange} />
         </div>
      </div>

      {/* Bottom Table Section */}
      <BulkAnalysisTable data={properties} />
    </div>
  );
};

export default BulkUnderwriting;

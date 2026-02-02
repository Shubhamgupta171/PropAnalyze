import React from 'react';
import { Settings2, Hammer, Plus } from 'lucide-react';
import styles from './CalculationParameters.module.css';

const CalculationParameters = ({ params = {}, onChange = () => {} }) => {
  const handleChange = (field, value) => {
    onChange({ ...params, [field]: value });
  };

  return (
    <div className={styles.panel}>
      <h3 className={styles.title}>
        <Settings2 size={18} /> Calculation Parameters
      </h3>

      <div style={{fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight: 600}}>Strategy Template</div>
      <div className={styles.strategyGrid}>
        <div 
            className={`${styles.strategyChip} ${params.strategy === 'Fix & Flip' ? styles.active : ''}`}
            onClick={() => handleChange('strategy', 'Fix & Flip')}
        >
            <Hammer size={14} /> Fix & Flip
        </div>
        <div 
            className={`${styles.strategyChip} ${params.strategy === 'Buy & Hold' ? styles.active : ''}`}
            onClick={() => handleChange('strategy', 'Buy & Hold')}
        >
            Buy & Hold
        </div>
        <div 
            className={`${styles.strategyChip} ${params.strategy === 'Seller Finance' ? styles.active : ''}`}
            onClick={() => handleChange('strategy', 'Seller Finance')}
        >
            Seller Finance
        </div>
        <div className={styles.strategyChip} style={{width: '32px', padding: 0, justifyContent: 'center'}}><Plus size={14} /></div>
      </div>

      <div className={styles.inputsGrid}>
         <div className={styles.inputGroup}>
             <label className={styles.label}>Interest Rate (%)</label>
             <input 
                type="number" 
                className={styles.input} 
                value={params.interestRate || ''} 
                onChange={(e) => handleChange('interestRate', e.target.value)}
             />
         </div>
         <div className={styles.inputGroup}>
             <label className={styles.label}>Down Payment (%)</label>
             <input 
                type="number" 
                className={styles.input} 
                value={params.downPayment || ''} 
                onChange={(e) => handleChange('downPayment', e.target.value)}
             />
         </div>
         <div className={styles.inputGroup}>
             <label className={styles.label}>Rehab Buffer (%)</label>
             <input 
                type="number" 
                className={styles.input} 
                value={params.rehabBuffer || ''} 
                onChange={(e) => handleChange('rehabBuffer', e.target.value)}
             />
         </div>
         <div className={styles.inputGroup}>
             <label className={styles.label}>Target Cap Rate (%)</label>
             <input 
                type="number" 
                className={styles.input} 
                value={params.targetCapRate || ''}
                onChange={(e) => handleChange('targetCapRate', e.target.value)}
             />
         </div>
      </div>

      <div className={styles.footer}>
          <span>Settings applied to all rows</span>
          <span className={styles.advancedLink}>Advanced Settings {'>'}</span>
      </div>
    </div>
  );
};

export default CalculationParameters;

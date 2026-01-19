import React from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './AdvancedCalculator.module.css';

const AdvancedCalculator = () => {
  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
         <div className={styles.switchContainer}>
            <div className={`${styles.switchOption} ${styles.active}`}>
                Long-term Rental
            </div>
            <div className={styles.switchOption}>
                Short-term / Airbnb
            </div>
            <div className={styles.switchOption}>
                Fix & Flip
            </div>
         </div>

         <div className={styles.kpiRow}>
            <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Cash-on-Cash</div>
                <div className={`${styles.kpiValue} ${styles.kpiValueGreen}`}>
                    12.4% <ArrowUp size={12} style={{display:'inline'}} />
                </div>
            </div>
            <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Cap Rate</div>
                <div className={styles.kpiValue}>
                    7.1%
                </div>
            </div>
            <div className={styles.kpiCard}>
                <div className={styles.kpiLabel}>Net Cash Flow</div>
                <div className={styles.kpiValue}>
                    $452<span style={{fontSize:'0.8rem', color:'#6b7280', fontWeight:400}}>/mo</span>
                </div>
            </div>
         </div>
      </div>

      <div className={styles.scrollArea}>
         {/* Acquisition Section */}
         <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Acquisition & Rehab</h3>
                <button className={styles.resetBtn}>Reset Defaults</button>
            </div>

            <div className={styles.inputRow}>
                <div className={styles.fieldLabel}>
                    <span>Purchase Price</span>
                </div>
                <div className={styles.inputContainer}>
                    <span style={{color:'#6b7280', marginRight:'4px'}}>$</span>
                    <input type="text" className={styles.inputField} defaultValue="340,000" />
                </div>
                <input type="range" className={styles.slider} />
            </div>

            <div style={{display:'flex', gap:'16px'}}>
                 <div style={{flex:1}}>
                     <div className={styles.fieldLabel}>Closing Costs (2%)</div>
                     <div className={styles.inputContainer}>
                         <span style={{color:'#6b7280', marginRight:'4px'}}>$</span>
                         <input type="text" className={styles.inputField} defaultValue="6,800" />
                     </div>
                 </div>
                 <div style={{flex:1}}>
                     <div className={styles.fieldLabel}>Rehab Budget</div>
                     <div className={styles.inputContainer}>
                         <span style={{color:'#6b7280', marginRight:'4px'}}>$</span>
                         <input type="text" className={styles.inputField} defaultValue="25,000" />
                     </div>
                 </div>
            </div>
            
            <div style={{marginTop: '20px', padding: '12px', backgroundColor: '#181a19', borderRadius: '8px', border:'1px solid #2a2d2c'}}>
                 <div className={styles.fieldLabel}>
                    <span>After Repair Value (ARV)</span>
                 </div>
                 <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize:'1.1rem', fontWeight:600}}>$ 415,000</span>
                    <span style={{fontSize:'0.75rem', color:'#4ade80'}}>+22% lift</span>
                 </div>
            </div>
         </div>

         {/* Expenses Section */}
         <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Income & Expenses</h3>
            </div>
            
            <div className={styles.inputRow}>
                <div className={styles.fieldLabel}>
                    <span>Monthly Rent</span>
                </div>
                <div className={styles.inputContainer} style={{textAlign:'right'}}>
                     <span style={{color:'#6b7280', marginRight:'4px'}}>$</span>
                     <input type="text" className={styles.inputField} defaultValue="2,400" style={{textAlign:'right'}} />
                </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:'4px', color:'#9ca3af'}}>
                <div className={styles.expenseRow}>
                    <span><span className={styles.dot} style={{backgroundColor:'#ef4444'}}></span> Property Taxes</span>
                    <span className={styles.expenseVal}>$450</span>
                </div>
                <div className={styles.expenseRow}>
                    <span><span className={styles.dot} style={{backgroundColor:'#f97316'}}></span> Insurance</span>
                    <span className={styles.expenseVal}>$120</span>
                </div>
                <div className={styles.expenseRow}>
                    <span><span className={styles.dot} style={{backgroundColor:'#eab308'}}></span> CapEx & Maintenance (8%)</span>
                    <span className={styles.expenseVal}>$192</span>
                </div>
                <div className={styles.expenseRow}>
                    <span><span className={styles.dot} style={{backgroundColor:'#3b82f6'}}></span> Vacancy (5%)</span>
                    <span className={styles.expenseVal}>$120</span>
                </div>
            </div>
            
            <div style={{marginTop: '30px'}}>
                <div style={{
                    backgroundColor: '#181a19', 
                    border: '1px solid #2a2d2c', 
                    borderRadius: '12px', 
                    padding: '20px',
                    position: 'relative'
                }}>
                    <div style={{position:'absolute', top:'20px', right:'20px', color:'#4ade80'}}>
                         <div style={{width:'16px', height:'16px', backgroundColor:'#4ade80', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <span style={{color:'black', fontSize:'10px'}}>✓</span>
                         </div>
                    </div>
                    <div style={{fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '4px'}}>Max Allowable Offer</div>
                    <div style={{fontSize: '0.75rem', color: '#9ca3af', marginBottom: '16px'}}>Based on your target 12% CoC Return</div>
                    
                    <div style={{fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1}}>$395,000</div>
                    <div style={{fontSize: '0.8rem', color: '#ef4444', marginTop: '4px'}}>↓ $30k below ask</div>
                </div>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default AdvancedCalculator;

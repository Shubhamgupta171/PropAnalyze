import React, { useState } from 'react';
import { Filter, Wallet, Banknote, Building2, ChevronDown, CheckCircle2 } from 'lucide-react';
import MapBackground from '../components/common/MapBackground';
import AdvancedCalculator from '../components/specific/AdvancedCalculator'; // We will reuse/adapt this
import styles from './PropertyAnalysisRefactor.module.css';

const PropertyAnalysis = () => {
  const [strategy, setStrategy] = useState('long-term');
  const [financingType, setFinancingType] = useState('cash');

  return (
    <div className={styles.container}>
      {/* Top Section: Map */}
      <div className={styles.mapSection}>
          <div style={{position:'absolute', top:'20px', left:'20px', zIndex:10, backgroundColor:'#181a19', padding:'8px 16px', borderRadius:'8px', border:'1px solid #333'}}>
             <h1 style={{color:'white', fontSize:'1.1rem', fontWeight:600}}>123 Maple Ave, Austin TX 78704</h1>
             <div style={{color:'#9ca3af', fontSize:'0.8rem', display:'flex', gap:'12px', marginTop:'4px'}}>
                 <span>4 Bed</span><span>2 Bath</span><span>2,100 Sqft</span>
             </div>
          </div>

          <div className={styles.mapOverlayControls}>
              <div style={{display:'flex', alignItems:'center', gap:'8px', paddingRight:'12px', borderRight:'1px solid #333', marginRight:'4px'}}>
                   <Filter size={14} color="#4ade80" />
                   <span style={{color:'white', fontSize:'0.75rem', fontWeight:600, textTransform:'uppercase'}}>Strategy Filter</span>
              </div>
              <button 
                className={`${styles.strategyBtn} ${strategy === 'long-term' ? styles.active : ''}`}
                onClick={() => setStrategy('long-term')}
              >
                  Long Term
              </button>
              <button 
                className={`${styles.strategyBtn} ${strategy === 'short-term' ? styles.active : ''}`}
                onClick={() => setStrategy('short-term')}
              >
                  Short Term
              </button>
              <button 
                className={`${styles.strategyBtn} ${strategy === 'mid-term' ? styles.active : ''}`}
                onClick={() => setStrategy('mid-term')}
              >
                  Mid Term
              </button>
          </div>
          <MapBackground opacity={0.6} />
      </div>

      {/* Bottom Section: Analysis Panel */}
      <div className={styles.analysisSection}>
          <div className={styles.analysisHeader}>
              <div className={styles.headerTitle}>
                  <div className={styles.accentBar}></div>
                  Underwriting Analysis <span style={{color:'#6b7280', fontWeight:400, marginLeft:'8px'}}>- Long Term Rental</span>
              </div>
              <div className={styles.headerMeta}>
                  <div style={{display:'flex', alignItems:'center', gap:'6px', backgroundColor:'#181a19', padding:'6px 12px', borderRadius:'999px', border:'1px solid #333'}}>
                      <span style={{width:'8px', height:'8px', borderRadius:'50%', backgroundColor:'#4ade80'}}></span>
                      Data updated today
                  </div>
              </div>
          </div>

          <div className={styles.tabsContainer}>
              <button 
                className={`${styles.tabPill} ${financingType === 'cash' ? styles.active : ''}`}
                onClick={() => setFinancingType('cash')}
              >
                  <Wallet size={16} /> Cash
              </button>
              <button 
                className={`${styles.tabPill} ${financingType === 'conventional' ? styles.active : ''}`}
                onClick={() => setFinancingType('conventional')}
              >
                  <Banknote size={16} /> Conventional
              </button>
              <button 
                className={`${styles.tabPill} ${financingType === 'seller-finance' ? styles.active : ''}`}
                onClick={() => setFinancingType('seller-finance')}
              >
                  <Building2 size={16} /> Seller Finance
              </button>
              <button className={styles.tabPill}>
                  Subject-to
              </button>
          </div>

          <div className={styles.dashboardGrid}>
             {/* Left Column: Input Assumptions (Reusing AdvancedCalculator logic but styled flatly here or wrapping it) */}
             <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>
                 <div className={styles.panelTitle}>
                     <Filter size={16} style={{transform: 'rotate(90deg)'}} /> Input Assumptions
                     <span style={{marginLeft:'auto', fontSize:'0.75rem', color:'#4ade80', cursor:'pointer'}}>Reset</span>
                 </div>
                 
                 {/* Manually building the styled inputs to match Image 19 perfectly */}
                 <div>
                     <div style={{fontSize:'0.75rem', color:'#4ade80', marginBottom:'12px', fontWeight:600, borderLeft:'2px solid #4ade80', paddingLeft:'8px'}}>ACQUISITION & REHAB</div>
                     <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
                         <div>
                             <label style={{display:'block', fontSize:'0.75rem', color:'#9ca3af', marginBottom:'6px'}}>Purchase Price</label>
                             <div style={{backgroundColor:'#181a19', border:'1px solid #333', borderRadius:'8px', padding:'10px', color:'white', fontSize:'0.9rem'}}>$ 425,000</div>
                         </div>
                         <div>
                             <label style={{display:'block', fontSize:'0.75rem', color:'#9ca3af', marginBottom:'6px'}}>Rehab Cost</label>
                             <div style={{backgroundColor:'#181a19', border:'1px solid #333', borderRadius:'8px', padding:'10px', color:'white', fontSize:'0.9rem'}}>$ 35,000</div>
                         </div>
                         <div>
                             <label style={{display:'block', fontSize:'0.75rem', color:'#9ca3af', marginBottom:'6px'}}>After Repair Value (ARV)</label>
                             <div style={{backgroundColor:'#181a19', border:'1px solid #333', borderRadius:'8px', padding:'10px', color:'white', fontSize:'0.9rem'}}>$ 510,000</div>
                         </div>
                         <div>
                             <label style={{display:'block', fontSize:'0.75rem', color:'#9ca3af', marginBottom:'6px'}}>Closing Costs</label>
                             <div style={{backgroundColor:'#181a19', border:'1px solid #333', borderRadius:'8px', padding:'10px', color:'white', fontSize:'0.9rem', display:'flex', justifyContent:'space-between'}}>
                                 <span>3.0</span><span>%</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div>
                     <div style={{fontSize:'0.75rem', color:'#4ade80', marginBottom:'12px', fontWeight:600, borderLeft:'2px solid #4ade80', paddingLeft:'8px'}}>LOAN DETAILS</div>
                     <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
                         <div>
                             <label style={{display:'block', fontSize:'0.75rem', color:'#9ca3af', marginBottom:'6px'}}>Down Payment</label>
                             <div style={{backgroundColor:'#181a19', border:'1px solid #333', borderRadius:'8px', padding:'10px', color:'white', fontSize:'0.9rem', display:'flex', justifyContent:'space-between'}}>
                                 <span>20</span><span>%</span>
                             </div>
                         </div>
                         <div>
                             <label style={{display:'block', fontSize:'0.75rem', color:'#9ca3af', marginBottom:'6px'}}>Interest Rate</label>
                             <div style={{backgroundColor:'#181a19', border:'1px solid #333', borderRadius:'8px', padding:'10px', color:'white', fontSize:'0.9rem', display:'flex', justifyContent:'space-between'}}>
                                 <span>7.125</span><span>%</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Right Column: KPIs and Max Offer */}
             <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                 {/* Max Allowable Offer Card */}
                 <div style={{backgroundColor:'#0f1110', border:'1px solid #2a2d2c', borderRadius:'16px', padding:'24px', position:'relative', boxShadow:'inset 0 0 40px rgba(0,0,0,0.5)'}}>
                      <div style={{position:'absolute', top:'20px', right:'20px'}}>
                          <div style={{width:'24px', height:'24px', backgroundColor:'#4ade80', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                             <CheckCircle2 size={14} color="black" />
                          </div>
                      </div>
                      <h3 style={{color:'white', fontSize:'1rem', fontWeight:600, marginBottom:'4px'}}>Max Allowable Offer</h3>
                      <p style={{color:'#9ca3af', fontSize:'0.8rem', marginBottom:'20px'}}>This offer achieves your <span style={{color:'white', fontWeight:600}}>12% CoC</span> target.</p>
                      
                      <div style={{fontSize:'2.5rem', fontWeight:700, color:'white', lineHeight:1, marginBottom:'4px'}}>$395,000</div>
                      <div style={{fontSize:'0.85rem', color:'#ef4444'}}>↓ $30k below ask</div>
                 </div>

                 {/* KPI Row */}
                 <div style={{display:'flex', gap:'16px'}}>
                     <div style={{flex:1, backgroundColor:'#181a19', borderRadius:'16px', padding:'16px', border:'1px solid #2a2d2c'}}>
                         <div style={{fontSize:'0.75rem', color:'#9ca3af', marginBottom:'8px'}}>Net Monthly Cash Flow</div>
                         <div style={{fontSize:'1.5rem', fontWeight:700, color:'#4ade80'}}>+$482<span style={{fontSize:'0.9rem', fontWeight:400, color:'#9ca3af'}}>/mo</span></div>
                         <div style={{marginTop:'8px', display:'inline-block', padding:'4px 8px', backgroundColor:'rgba(74, 222, 128, 0.1)', borderRadius:'4px', color:'#4ade80', fontSize:'0.7rem', fontWeight:600}}>↗ Positive</div>
                     </div>
                     <div style={{flex:1, backgroundColor:'#181a19', borderRadius:'16px', padding:'16px', border:'1px solid #2a2d2c'}}>
                         <div style={{fontSize:'0.75rem', color:'#9ca3af', marginBottom:'8px'}}>Cash-on-Cash</div>
                         <div style={{fontSize:'1.5rem', fontWeight:700, color:'white'}}>9.4%</div>
                         <div style={{height:'4px', width:'100%', backgroundColor:'#333', borderRadius:'2px', marginTop:'12px'}}>
                            <div style={{width:'75%', height:'100%', backgroundColor:'#4ade80', borderRadius:'2px'}}></div>
                         </div>
                     </div>
                     <div style={{flex:1, backgroundColor:'#181a19', borderRadius:'16px', padding:'16px', border:'1px solid #2a2d2c'}}>
                         <div style={{fontSize:'0.75rem', color:'#9ca3af', marginBottom:'8px'}}>Cap Rate</div>
                         <div style={{fontSize:'1.5rem', fontWeight:700, color:'white'}}>6.8%</div>
                         <div style={{height:'4px', width:'100%', backgroundColor:'#333', borderRadius:'2px', marginTop:'12px'}}>
                            <div style={{width:'60%', height:'100%', backgroundColor:'#3b82f6', borderRadius:'2px'}}></div>
                         </div>
                     </div>
                 </div>

                 {/* Financial Breakdown */}
                 <div style={{backgroundColor:'#181a19', borderRadius:'16px', padding:'24px', border:'1px solid #2a2d2c'}}>
                     <h3 style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem', fontWeight:600, color:'white', marginBottom:'20px'}}>
                         <Wallet size={16} /> Financial Breakdown
                     </h3>
                     <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px', fontSize:'0.9rem'}}>
                         <span style={{color:'#9ca3af'}}>Gross Rent</span>
                         <span style={{color:'white'}}>$3,200</span>
                     </div>
                     <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px', fontSize:'0.9rem'}}>
                         <span style={{color:'#9ca3af'}}>Operating Expenses</span>
                         <span style={{color:'#ef4444'}}>($875)</span>
                     </div>
                     <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px', fontSize:'0.9rem', paddingBottom:'20px', borderBottom:'1px solid #333'}}>
                         <span style={{color:'#9ca3af'}}>Mortgage Payment</span>
                         <span style={{color:'#ef4444'}}>($1,843)</span>
                     </div>
                     <div style={{display:'flex', justifyContent:'space-between', fontSize:'1rem', fontWeight:600}}>
                         <span style={{color:'white'}}>NOI (Annual)</span>
                         <span style={{color:'#4ade80'}}>$27,900</span>
                     </div>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default PropertyAnalysis;

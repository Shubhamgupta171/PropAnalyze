import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, FileText, ChevronDown, Info, TrendingUp, DollarSign, Plus, Layers, Download } from 'lucide-react';
import styles from './PropertyAnalysisRefactor.module.css';
import propertyService from '../services/property.service';
import analysisService from '../services/analysis.service';
import portfolioService from '../services/portfolio.service';
import reportService from '../services/report.service';
import toast from 'react-hot-toast';
import _ from 'lodash';


const PropertyAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('');
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [maxOffer, setMaxOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState('Long-term');
  const [targetCoC, setTargetCoC] = useState(12);

  const [assumptions, setAssumptions] = useState({
    purchasePrice: 0,
    rehabCost: 0,
    downPayment: 20,
    interestRate: 6.5,
    monthlyRent: 0
  });

  // Debounced ROI calculation
  const debouncedCalculate = useCallback(
    _.debounce(async (propId, currentAssumptions) => {
      setCalculating(true);
      try {
        const result = await analysisService.getROI(propId, currentAssumptions);
        setAnalysis(result.data.analysis);
      } catch (error) {
        console.error('Error calculating ROI:', error);
      } finally {
        setCalculating(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const initPage = async () => {
      try {
        const propResponse = await propertyService.getPropertyById(id);
        const prop = propResponse.data.property;
        setProperty(prop);
        
        const initialAssumptions = {
          purchasePrice: prop.price,
          rehabCost: 0,
          downPayment: 20,
          interestRate: 6.5,
          monthlyRent: prop.price * 0.008 
        };
        
        setAssumptions(initialAssumptions);
        
        // Initial ROI fetch
        const analysisResult = await analysisService.getROI(id, initialAssumptions);
        setAnalysis(analysisResult.data.analysis);

      } catch (error) {
        console.error('Error initializing page:', error);
        toast.error('Failed to load analysis data');
      } finally {
        setLoading(false);
      }
    };

    initPage();
  }, [id]);

  useEffect(() => {
    if (property && assumptions.purchasePrice > 0) {
      debouncedCalculate(id, assumptions);
    }
  }, [assumptions, id, property, debouncedCalculate]);

  const handleInputChange = (field, value) => {
    setAssumptions(prev => ({
        ...prev,
        [field]: parseFloat(value) || 0
    }));
  };

  const handleCalculateMaxOffer = async () => {
    setCalculating(true);
    try {
      const result = await analysisService.getMaxOffer(id, targetCoC, assumptions);
      setMaxOffer(result.data);
      toast.success(`Max Allowable Offer calculated for ${targetCoC}% CoC`);
    } catch (error) {
      toast.error('Failed to calculate max offer');
    } finally {
      setCalculating(false);
    }
  };

  const handleSaveAnalysis = async () => {
    setCalculating(true);
    try {
      await analysisService.saveAnalysis(id, {
        strategy: activeStrategy,
        metrics: analysis.metrics,
        inputs: assumptions
      });
      toast.success('Analysis saved to history!');
    } catch (error) {
      toast.error('Failed to save analysis');
    } finally {
      setCalculating(false);
    }
  };

  const handleAddToPortfolio = async () => {
    if (!selectedPortfolioId) {
      toast.error('Please select a portfolio');
      return;
    }
    try {
      await portfolioService.addProperty(selectedPortfolioId, id);
      toast.success('Property added to portfolio!');
      setShowPortfolioModal(false);
    } catch (error) {
      toast.error('Failed to add property to portfolio');
    }
  };

  const handleGenerateReport = async () => {
    setCalculating(true);
    try {
      // First, save the analysis to get an analysis ID
      const savedAnalysis = await analysisService.saveAnalysis(id, {
        strategy: activeStrategy,
        metrics: analysis.metrics,
        inputs: assumptions
      });
      
      const analysisId = savedAnalysis.data.analysis.id;
      
      // Generate PDF report
      const result = await reportService.generateReport(id, analysisId);
      
      toast.success('PDF Report generated successfully! View it in the Reports tab.');
      
      // Optional: Navigate to reports page
      // navigate('/reports');
    } catch (error) {
      console.error('Report generation error:', error);
      toast.error(error.response?.data?.message || 'Failed to generate report');
    } finally {
      setCalculating(false);
    }
  };


  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await portfolioService.getPortfolios();
        setPortfolios(response.data.portfolios);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };
    fetchPortfolios();
  }, []);

  if (loading) return <div className={styles.loading}>Loading analysis...</div>;
  if (!property) return <div className={styles.error}>Property not found.</div>;

  const metrics = analysis?.metrics || {};
  const detailedExpenses = metrics.detailedExpenses || {};

  return (
    <div className={styles.container}>
      {/* 1. Map Section */}
      <div className={styles.mapSection}>
        <div className={styles.activeListingBadge}>
          <CheckCircle2 size={16} />
          ACTIVE LISTING
        </div>
        {property?.location?.coordinates ? (
          <iframe 
            className={styles.mapIframe}
            title="Property Location"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.location.coordinates[0]-0.01}%2C${property.location.coordinates[1]-0.01}%2C${property.location.coordinates[0]+0.01}%2C${property.location.coordinates[1]+0.01}&layer=mapnik&marker=${property.location.coordinates[1]}%2C${property.location.coordinates[0]}`}
          ></iframe>
        ) : (
          <div className={styles.mapPlaceholder}>No map available</div>
        )}
      </div>

      <div className={styles.contentWrapper}>
        {/* 2. Property Header */}
        <div className={styles.propertyHeader}>
          <div>
            <h1 className={styles.propertyTitle}>{property?.location?.address || property?.title || 'Address Hidden'}</h1>
            <div className={styles.propertyStats}>
              <span>{property?.beds || 0} Beds</span>
              <span>•</span>
              <span>{property?.baths || 0} Baths</span>
              <span>•</span>
              <span>{(property?.sqft || 0).toLocaleString()} Sqft</span>
              <span>•</span>
              <span>Built {property?.year_built || '2005'}</span>
            </div>
          </div>
          <div style={{display:'flex', gap:'12px'}}>
              <button className={styles.exportBtn} onClick={() => setShowPortfolioModal(true)}>
                <Layers size={18} color="#22c55e" />
                Add to Portfolio
              </button>
              <button className={styles.exportBtn} onClick={handleSaveAnalysis} disabled={calculating}>
                <Plus size={18} color="#22c55e" />
                Save History
              </button>
              <button className={styles.exportBtn} onClick={handleGenerateReport} disabled={calculating}>
                <FileText size={18} color="#22c55e" />
                Generate Report
              </button>
          </div>
        </div>

        {/* Portfolio Modal */}
        {showPortfolioModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#1c1e1d', padding: '32px', borderRadius: '16px',
              width: '100%', maxWidth: '400px', border: '1px solid #333'
            }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'white' }}>Select Portfolio</h2>
              <select 
                value={selectedPortfolioId}
                onChange={(e) => setSelectedPortfolioId(e.target.value)}
                style={{ width: '100%', padding: '12px', backgroundColor: '#0f1110', border: '1px solid #333', borderRadius: '8px', color: 'white', marginBottom: '1.5rem' }}
              >
                <option value="">Select a portfolio...</option>
                {portfolios.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setShowPortfolioModal(false)}
                  style={{ flex: 1, padding: '12px', background: 'none', border: '1px solid #333', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddToPortfolio}
                  style={{ flex: 1, padding: '12px', backgroundColor: 'var(--primary-green)', border: 'none', borderRadius: '8px', color: 'black', fontWeight: '600', cursor: 'pointer' }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Strategy Tabs */}
        <div className={styles.strategyTabs}>
          {['Long-term', 'Mid-term', 'Short-term', 'Section 8', 'Comparable Sales'].map(tab => (
            <button 
              key={tab}
              className={`${styles.strategyTab} ${activeStrategy === tab ? styles.active : ''}`}
              onClick={() => setActiveStrategy(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4. Main Analysis Grid */}
        <div className={styles.analysisGrid}>
          {/* Left: Assumptions */}
          <div className={styles.assumptionsCol}>
            <div className={styles.sectionLabel}>
              EXPENSE ASSUMPTIONS {calculating && <span style={{fontSize:'0.6rem', color:'#4ade80', marginLeft:'8px'}}>CALCULATING...</span>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Purchase Price <Info size={14} color="#94a3b8" /></label>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputPrefix}>$</span>
                    <input 
                        type="number" 
                        value={assumptions.purchasePrice} 
                        onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Rehab Cost <Info size={14} color="#94a3b8" /></label>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputPrefix}>$</span>
                    <input 
                        type="number" 
                        value={assumptions.rehabCost} 
                        onChange={(e) => handleInputChange('rehabCost', e.target.value)}
                        className={styles.input}
                    />
                </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Down Payment</label>
                    <div className={styles.inputWrapper}>
                        <input 
                            type="number" 
                            value={assumptions.downPayment} 
                            onChange={(e) => handleInputChange('downPayment', e.target.value)}
                            className={styles.input}
                        />
                        <span className={styles.inputSuffix}>%</span>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Interest Rate</label>
                    <div className={styles.inputWrapper}>
                        <input 
                            type="number" 
                            value={assumptions.interestRate} 
                            onChange={(e) => handleInputChange('interestRate', e.target.value)}
                            className={styles.input}
                        />
                        <span className={styles.inputSuffix}>%</span>
                    </div>
                </div>
            </div>

            {/* Max Offer Tool */}
            <div style={{marginTop: '30px', padding: '20px', backgroundColor: 'rgba(34, 197, 94, 0.05)', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.2)'}}>
              <div className={styles.sectionLabel} style={{marginBottom: '15px'}}>MAX OFFER CALCULATOR</div>
              <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Target CoC (%)</label>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <div className={styles.inputWrapper} style={{flex: 1}}>
                        <input 
                            type="number" 
                            value={targetCoC} 
                            onChange={(e) => setTargetCoC(parseFloat(e.target.value) || 0)}
                            className={styles.input}
                        />
                        <span className={styles.inputSuffix}>%</span>
                    </div>
                    <button 
                      onClick={handleCalculateMaxOffer}
                      disabled={calculating}
                      style={{backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600}}
                    >
                      Solve
                    </button>
                  </div>
              </div>
              {maxOffer && (
                <div style={{marginTop: '15px', padding: '10px', backgroundColor: 'white', borderRadius: '8px'}}>
                  <div style={{fontSize: '0.75rem', color: '#64748b'}}>To hit {maxOffer.targetCoC}% CoC pay:</div>
                  <div style={{fontSize: '1.2rem', fontWeight: 700, color: '#16a34a'}}>${Math.round(maxOffer.maxAllowableOffer).toLocaleString()}</div>
                  <div style={{fontSize: '0.7rem', color: maxOffer.belowAsk > 0 ? '#16a34a' : '#ef4444'}}>
                    {maxOffer.belowAsk > 0 ? `$${Math.round(maxOffer.belowAsk).toLocaleString()} below asking` : `$${Math.round(Math.abs(maxOffer.belowAsk)).toLocaleString()} above asking`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Projected Returns */}
          <div className={styles.returnsCol}>
            <div className={styles.returnsCard}>
              <div className={styles.returnsHeader}>
                <div>
                    <h2 className={styles.returnsTitle}>Projected Returns</h2>
                    <p className={styles.returnsSubtitle}>Based on {activeStrategy.toLowerCase()} rental strategy</p>
                </div>
                <TrendingUp size={24} color="#22c55e" />
              </div>

              <div className={styles.metricsRow}>
                <div>
                    <div className={styles.metricLabel}>Cash-on-Cash</div>
                    <div className={styles.metricValue} style={{color: (metrics.cashOnCash >= 10) ? '#22c55e' : '#f59e0b'}}>
                      +{metrics.cashOnCash || 0}%
                    </div>
                </div>
                <div>
                    <div className={styles.metricLabel}>Cap Rate</div>
                    <div className={styles.metricValue}>{metrics.capRate || 0}%</div>
                </div>
              </div>

              <div style={{height:'1px', backgroundColor:'#dcfce7', margin:'24px 0'}}></div>

              <div className={styles.chartContainer}>
                <div className={styles.donutWrapper}>
                    {/* SVG Donut Placeholder */}
                    <svg viewBox="0 0 36 36" style={{width:'100%', height:'100%'}}>
                        <path stroke="#e2e8f0" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path 
                          stroke="#22c55e" 
                          strokeWidth="3" 
                          strokeDasharray={`${(metrics.noi / metrics.effectiveGrossIncome) * 100 || 0}, 100`} 
                          fill="none" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                    </svg>
                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', textAlign: 'center'}}>
                      <div style={{fontSize:'0.6rem', color: '#94a3b8'}}>MONTHLY CF</div>
                      <div style={{fontSize:'0.9rem', fontWeight:700}}>${Math.round(metrics.monthlyCashFlow || 0)}</div>
                    </div>
                </div>
                <div className={styles.chartLegend}>
                    <div className={styles.legendItem}>
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <div style={{width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'#22c55e'}}></div>
                            <span>Net Operating Income (Annual)</span>
                        </div>
                        <span style={{fontWeight:700}}>${(metrics.noi || 0).toLocaleString()}</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#94a3b8'}}>
                            <div style={{width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'#e2e8f0'}}></div>
                            <span>Operating Expenses (Annual)</span>
                        </div>
                        <span style={{fontWeight:700, color:'#1e293b'}}>${(metrics.operatingExpenses || 0).toLocaleString()}</span>
                    </div>
                </div>
              </div>

              {/* Detailed Expense Breakdown */}
              <div style={{marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '20px'}}>
                <div style={{fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '12px'}}>EXPENSE BREAKDOWN (CALCULATED)</div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
                    <span>Property Taxes</span>
                    <span>${(detailedExpenses.taxes || 0).toLocaleString()}</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
                    <span>Insurance</span>
                    <span>${(detailedExpenses.insurance || 0).toLocaleString()}</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
                    <span>Management Fee</span>
                    <span>${(detailedExpenses.management || 0).toLocaleString()}</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#16a34a', fontWeight: 600}}>
                    <span>Monthly Mortgage</span>
                    <span>-${(metrics.monthlyMortgage || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalysis;

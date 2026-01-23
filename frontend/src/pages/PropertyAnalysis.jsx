import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, FileText, ChevronDown, Info, TrendingUp } from 'lucide-react';
import styles from './PropertyAnalysisRefactor.module.css';
import propertyService from '../services/property.service';
import toast from 'react-hot-toast';

const PropertyAnalysis = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStrategy, setActiveStrategy] = useState('Long-term');
  const [assumptions, setAssumptions] = useState({
    purchasePrice: 0,
    rehabCost: 25000,
    downPayment: 20,
    interestRate: 6.5
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyService.getPropertyById(id);
        const prop = response.data.property;
        setProperty(prop);
        setAssumptions(prev => ({
            ...prev,
            purchasePrice: prop.price
        }));
      } catch (error) {
        console.error('Error fetching property:', error);
        toast.error('Failed to load property analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (field, value) => {
    setAssumptions(prev => ({
        ...prev,
        [field]: parseFloat(value) || 0
    }));
  };

  if (loading) return <div className={styles.loading}>Loading analysis...</div>;
  if (!property) return <div className={styles.error}>Property not found.</div>;

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
          <button className={styles.exportBtn}>
            <FileText size={18} color="#22c55e" />
            Export PDF
          </button>
        </div>

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
              EXPENSE ASSUMPTIONS
              <span style={{color:'#22c55e', fontSize:'0.7rem', cursor:'pointer'}}>Reset to default</span>
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
                    <span className={styles.inputSuffix}>USD</span>
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
                    <div className={styles.metricValue}>+{property.latest_coc || '12.5'}%</div>
                </div>
                <div>
                    <div className={styles.metricLabel}>Cap Rate</div>
                    <div className={styles.metricValue}>{property.latest_cap_rate || '7.2'}%</div>
                </div>
              </div>

              <div style={{height:'1px', backgroundColor:'#dcfce7', margin:'24px 0'}}></div>

              <div className={styles.chartContainer}>
                <div className={styles.donutWrapper}>
                    {/* SVG Donut Placeholder */}
                    <svg viewBox="0 0 36 36" style={{width:'100%', height:'100%'}}>
                        <path stroke="#e2e8f0" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path stroke="#22c55e" strokeWidth="3" strokeDasharray="75, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', fontSize:'0.7rem', fontWeight:700}}>NOI</div>
                </div>
                <div className={styles.chartLegend}>
                    <div className={styles.legendItem}>
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                            <div style={{width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'#22c55e'}}></div>
                            <span>Net Operating Income</span>
                        </div>
                        <span style={{fontWeight:700}}>${(property.price * 0.05).toLocaleString()}</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#94a3b8'}}>
                            <div style={{width:'10px', height:'10px', borderRadius:'50%', backgroundColor:'#e2e8f0'}}></div>
                            <span>Operating Expenses</span>
                        </div>
                        <span style={{fontWeight:700, color:'#1e293b'}}>${(property.price * 0.02).toLocaleString()}</span>
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

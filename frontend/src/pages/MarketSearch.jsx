import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, ArrowRight, Heart } from 'lucide-react';
import MapBackground from '../components/common/MapBackground';
import styles from './MarketSearch.module.css';
import ImageWithFallback from '../components/common/ImageWithFallback';
import propertyService from '../services/property.service';
import toast from 'react-hot-toast';

const MarketSearch = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minBeds: ''
  });

  const fetchProperties = async (params = {}) => {
    setLoading(true);
    try {
      // Build advanced query params
      const apiParams = { ...params };
      if (filters.minPrice) apiParams['minPrice'] = filters.minPrice;
      if (filters.maxPrice) apiParams['maxPrice'] = filters.maxPrice;
      if (filters.minBeds) apiParams['minBeds'] = filters.minBeds;
      if (searchQuery) apiParams['search'] = searchQuery;
      if (priceFilter) apiParams['sort'] = priceFilter;

      const response = await propertyService.getAllProperties(apiParams);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const fetchNearby = async () => {
    setLoading(true);
    try {
      // Using San Francisco center as default for "Search this area"
      const response = await propertyService.getPropertiesWithin(10, '37.7849,-122.3994', 'mi');
      setProperties(response.data.properties);
      toast.success(`Found ${response.results} properties nearby`);
    } catch (error) {
      console.error('Error fetching nearby properties:', error);
      toast.error('Geospatial search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchProperties();
    }
  };

  const handlePriceSort = () => {
    const newSort = priceFilter === 'price' ? '-price' : 'price';
    setPriceFilter(newSort);
    // Directly fetch with new sort to ensure immediate feedback
    fetchProperties({ sort: newSort });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setShowAdvanced(false);
    fetchProperties();
  };

  // Simple mapping for San Francisco pins on the fake map
  // Map area is roughly 37.7 - 37.8 Lat, -122.5 - -122.35 Lng
  const renderPins = () => {
    return properties.map(p => {
      const coords = p.location?.coordinates;
      if (!coords || !Array.isArray(coords)) return null;
      
      const lng = coords[0];
      const lat = coords[1];
      
      // Calculate % position (normalized)
      const left = ((lng - (-122.5)) / ( -122.35 - (-122.5))) * 100;
      const top = ((lat - 37.8) / (37.7 - 37.8)) * 100;

      if (left < 0 || left > 100 || top < 0 || top > 100) return null;

      return (
        <div 
          key={p.id} 
          className={styles.mapPinContainer}
          style={{ left: `${left}%`, top: `${top}%` }}
        >
          <div className={styles.mapPin}>
            <MapPin size={16} fill="#4ade80" color="#000" />
            <div className={styles.pinPrice}>${Math.round(p.price / 1000)}k</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.pageContainer}>
      {/* Left: Map Area with Overlay Search */}
      <div className={styles.mapArea}>
         <div className={styles.searchBarOverlay}>
            <Search size={20} style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af'}} />
            <input 
              type="text" 
              placeholder="Search by title (Press Enter)..." 
              className={styles.searchInput} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div style={{display:'flex', gap:'8px'}}>
                 <button className={styles.filterBtn} onClick={fetchNearby}>Search Here</button>
                 <button className={`${styles.filterBtn} ${showAdvanced ? styles.activeFilter : ''}`} onClick={() => setShowAdvanced(!showAdvanced)}>
                    <SlidersHorizontal size={14} /> Filters
                 </button>
            </div>

            {showAdvanced && (
                <div className={styles.advancedFiltersPanel}>
                   <form onSubmit={applyFilters}>
                      <div className={styles.filterGroup}>
                         <label>Min Price</label>
                         <input type="number" value={filters.minPrice} onChange={e => setFilters({...filters, minPrice: e.target.value})} placeholder="$" />
                      </div>
                      <div className={styles.filterGroup}>
                         <label>Max Price</label>
                         <input type="number" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: e.target.value})} placeholder="$" />
                      </div>
                      <div className={styles.filterGroup}>
                         <label>Min Beds</label>
                         <input type="number" value={filters.minBeds} onChange={e => setFilters({...filters, minBeds: e.target.value})} placeholder="3" />
                      </div>
                      <button type="submit" className={styles.applyBtn}>Apply Filters</button>
                   </form>
                </div>
            )}
         </div>
         
         <MapBackground opacity={0.5}>
              {renderPins()}
         </MapBackground>
      </div>

      {/* Right: Results Sidebar */}
      <div className={styles.resultsSidebar}>
          <div className={styles.sidebarHeader}>
             <div className={styles.headerRow}>
                <span className={styles.sidebarTitle}>Homes For Sale</span>
                <span className={styles.resultsCount}>{properties.length} Listings</span>
             </div>
             {/* Simple filters row */}
             <div style={{display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'4px'}}>
                 <button 
                  className={styles.filterBtn} 
                  style={{fontSize:'0.75rem', padding:'4px 10px', backgroundColor: priceFilter ? '#4ade80' : '', color: priceFilter ? 'black' : ''}}
                  onClick={handlePriceSort}
                 >
                   Price {priceFilter === 'price' ? '↑' : priceFilter === '-price' ? '↓' : ''}
                 </button>
                 <button className={styles.filterBtn} style={{fontSize:'0.75rem', padding:'4px 10px'}} onClick={() => { setFilters({...filters, minBeds: 3}); fetchProperties(); }}>3+ Beds</button>
                 <button className={styles.filterBtn} style={{fontSize:'0.75rem', padding:'4px 10px'}} onClick={() => { setFilters({minPrice:'', maxPrice:'', minBeds:''}); setSearchQuery(''); fetchProperties({}); }}>Reset</button>
             </div>
          </div>

          <div className={styles.scrollArea}>
             {loading ? (
                <div style={{color: '#4ade80', textAlign: 'center', padding: '40px'}}>Loading listings from server...</div>
             ) : properties.length === 0 ? (
                <div style={{color: '#9ca3af', textAlign: 'center', padding: '40px'}}>No properties found in the database.</div>
             ) : (
                properties.map(item => (
                    <div key={item.id} className={styles.propertyCard}>
                        <div className={styles.cardImage}>
                            <ImageWithFallback 
                                src={item.images && item.images[0]} 
                                alt={item.title} 
                                category="house" 
                                style={{width:'100%', height:'100%', objectFit:'cover'}} 
                            />
                            <div className={styles.badges}>
                                {item.latest_cap_rate && <span className={`${styles.badge} ${styles.badgeGreen}`}>{item.latest_cap_rate}% Cap</span>}
                                {item.latest_coc && <span className={styles.badge}>{item.latest_coc}% COC</span>}
                                {item.is_fixer_upper && <span className={`${styles.badge} ${styles.badgeGreen}`}>Fixer Upper</span>}
                            </div>
                            <Heart size={20} style={{position: 'absolute', top: '10px', right: '10px', color: 'white'}} />
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>${(item.price * 1).toLocaleString()}</span>
                                <span style={{fontSize:'0.75rem', color: '#9ca3af'}}>MLS #{item.mls_number || 'N/A'}</span>
                            </div>
                            <span className={styles.address}>{item.location?.address || 'Address Hidden'}</span>
                            <div className={styles.metaRow}>
                                <span>{item.beds} <span style={{color: '#6b7280'}}>beds</span></span>
                                <span>{item.baths} <span style={{color: '#6b7280'}}>baths</span></span>
                                <span>{item.sqft} <span style={{color: '#6b7280'}}>sqft</span></span>
                            </div>
                            <div className={styles.footerRow}>
                                <div>
                                    <span className={styles.estRentLabel}>Asset Class</span>
                                    <span className={styles.estRent}>{item.asset_class || 'Residential'}</span>
                                </div>
                                <Link to={`/analysis/${item.id}`} className={styles.analyzeLink} style={{textDecoration:'none'}}>
                                    Analyze <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
             )}
          </div>
      </div>
    </div>
  );
};

export default MarketSearch;

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import styles from './MapHeader.module.css';

const MapHeader = ({ filters = {}, onFilterChange = () => {} }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  // Update local search if parent filters change externally
  useEffect(() => {
    setLocalSearch(filters.search || '');
  }, [filters.search]);

  const togglePopup = (popupName) => {
    if (activePopup === popupName) {
      setActivePopup(null);
    } else {
      setActivePopup(popupName);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      onFilterChange({ search: localSearch });
    }
  };

  const handleApply = (newValues) => {
    onFilterChange(newValues);
    setActivePopup(null);
  };

  // Popup Styles
  const popupStyle = {
    position: 'absolute',
    top: '100%',
    marginTop: '8px',
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '12px',
    padding: '16px',
    minWidth: '200px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const inputStyle = {
    backgroundColor: '#111827',
    border: '1px solid #374151',
    color: 'white',
    padding: '8px',
    borderRadius: '6px',
    width: '100%',
    fontSize: '0.9rem'
  };

  const labelStyle = {
    fontSize: '0.75rem',
    color: '#9ca3af',
    marginBottom: '4px',
    display: 'block'
  };

  const btnStyle = {
    backgroundColor: '#4ade80',
    color: '#000',
    border: 'none',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginTop: '4px'
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.searchBar}>
        <div className={styles.menuIcon} style={{ padding: '8px', cursor: 'pointer', color: '#9ca3af' }}>
             <SlidersHorizontal size={18} />
        </div>
        <input 
            type="text" 
            placeholder="San Francisco, CA" 
            className={styles.searchInput}
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleSearchSubmit}
            style={{ 
                flex: 1, 
                background: 'transparent', 
                border: 'none', 
                color: 'white', 
                padding: '8px 12px',
                fontSize: '0.9rem',
                outline: 'none'
            }}
        />
        <div 
            className={styles.searchAction} 
            onClick={() => onFilterChange({ search: localSearch })}
            style={{ 
                backgroundColor: '#4ade80', 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                marginRight: '2px'
            }}
        >
            <Search size={16} color="black" />
        </div>
      </div>

      <div className={styles.filtersRow} style={{ display: 'flex', gap: '8px', pointerEvents: 'auto', position: 'relative' }}>
        
        {/* Price Filter */}
        <div style={{ position: 'relative' }}>
            <button 
                className={`${styles.filterPill} ${filters.minPrice || filters.maxPrice ? styles.active : ''}`} 
                onClick={() => togglePopup('price')}
                style={{ backgroundColor: filters.minPrice || filters.maxPrice ? '#4ade80' : '#1f2221', color: filters.minPrice || filters.maxPrice ? 'black' : 'white' }}
            >
              Price {filters.minPrice || filters.maxPrice ? '' : <ChevronDown size={14} />}
            </button>
            {activePopup === 'price' && (
                <div style={popupStyle}>
                    <div>
                        <label style={labelStyle}>Min Price</label>
                        <input 
                            type="number" 
                            placeholder="Any" 
                            style={inputStyle}
                            defaultValue={filters.minPrice}
                            id="minPriceInput"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Max Price</label>
                        <input 
                            type="number" 
                            placeholder="Any" 
                            style={inputStyle}
                            defaultValue={filters.maxPrice}
                            id="maxPriceInput"
                        />
                    </div>
                    <button 
                        style={btnStyle}
                        onClick={() => handleApply({
                            minPrice: document.getElementById('minPriceInput').value,
                            maxPrice: document.getElementById('maxPriceInput').value
                        })}
                    >Apply</button>
                </div>
            )}
        </div>

        {/* Beds Filter */}
        <div style={{ position: 'relative' }}>
            <button 
                className={`${styles.filterPill} ${filters.minBeds ? styles.active : ''}`}
                onClick={() => togglePopup('beds')}
                style={{ backgroundColor: filters.minBeds ? '#4ade80' : '#1f2221', color: filters.minBeds ? 'black' : 'white' }}
            >
              {filters.minBeds ? `${filters.minBeds}+ Beds` : 'Beds'}
            </button>
            {activePopup === 'beds' && (
                <div style={popupStyle}>
                    <label style={labelStyle}>Minimum Bedrooms</label>
                     <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                        {[0, 1, 2, 3, 4, 5].map(num => (
                            <button
                                key={num}
                                onClick={() => handleApply({ minBeds: num === 0 ? '' : num })}
                                style={{
                                    ...inputStyle, 
                                    width: 'auto', 
                                    flex: 1, 
                                    backgroundColor: filters.minBeds == num ? '#4ade80' : '#111827',
                                    color: filters.minBeds == num ? 'black' : 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {num === 0 ? 'Any' : `${num}+`}
                            </button>
                        ))}
                     </div>
                </div>
            )}
        </div>

        {/* Baths Filter */}
        <div style={{ position: 'relative' }}>
            <button 
                className={`${styles.filterPill} ${filters.minBaths ? styles.active : ''}`}
                onClick={() => togglePopup('baths')}
                style={{ backgroundColor: filters.minBaths ? '#4ade80' : '#1f2221', color: filters.minBaths ? 'black' : 'white' }}
            >
              {filters.minBaths ? `${filters.minBaths}+ Baths` : 'Baths'}
            </button>
            {activePopup === 'baths' && (
                <div style={popupStyle}>
                    <label style={labelStyle}>Minimum Bathrooms</label>
                     <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                        {[0, 1, 2, 3, 4].map(num => (
                            <button
                                key={num}
                                onClick={() => handleApply({ minBaths: num === 0 ? '' : num })}
                                style={{
                                    ...inputStyle, 
                                    width: 'auto', 
                                    flex: 1, 
                                    backgroundColor: filters.minBaths == num ? '#4ade80' : '#111827',
                                    color: filters.minBaths == num ? 'black' : 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {num === 0 ? 'Any' : `${num}+`}
                            </button>
                        ))}
                     </div>
                </div>
            )}
        </div>

        {/* Home Type Filter */}
        <div style={{ position: 'relative' }}>
            <button 
                className={`${styles.filterPill} ${filters.category ? styles.active : ''}`}
                onClick={() => togglePopup('type')}
                style={{ backgroundColor: filters.category ? '#4ade80' : '#1f2221', color: filters.category ? 'black' : 'white' }}
            >
              {filters.category ? filters.category : 'Home Type'}
            </button>
            {activePopup === 'type' && (
                <div style={popupStyle}>
                    <label style={labelStyle}>Property Type</label>
                     <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                        {['Any', 'Single Family', 'Multi Family', 'Condo', 'Townhouse', 'Apartment', 'Commercial'].map(type => (
                            <button
                                key={type}
                                onClick={() => handleApply({ category: type === 'Any' ? '' : type })}
                                style={{
                                    ...inputStyle, 
                                    textAlign: 'left',
                                    border: 'none',
                                    backgroundColor: filters.category === (type === 'Any' ? '' : type) ? '#374151' : 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                {type}
                            </button>
                        ))}
                     </div>
                </div>
            )}
        </div>

        {/* Reset / More */}
        {(filters.minPrice || filters.maxPrice || filters.minBeds || filters.minBaths || filters.category) && (
            <button 
                className={styles.filterPill} 
                onClick={() => onFilterChange({ minPrice: '', maxPrice: '', minBeds: '', minBaths: '', category: '' })}
                style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}
            >
                Reset
            </button>
        )}
      </div>
    </div>
  );
};

export default MapHeader;

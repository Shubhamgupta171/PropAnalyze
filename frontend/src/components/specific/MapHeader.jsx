import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import styles from './MapHeader.module.css';

const MapHeader = () => {
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
            defaultValue="San Francisco, CA"
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
        <div className={styles.searchAction} style={{ 
            backgroundColor: '#4ade80', 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            marginRight: '2px'
        }}>
            <Search size={16} color="black" />
        </div>
      </div>

      <div className={styles.filtersRow} style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
        <button className={`${styles.filterPill} ${styles.active}`} style={{ backgroundColor: '#4ade80', color: 'black', border: 'none', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          Price <ChevronDown size={14} />
        </button>
        <button className={styles.filterPill} style={{ backgroundColor: '#1f2221', color: 'white', border: '1px solid #333', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem' }}>
          Beds
        </button>
        <button className={styles.filterPill} style={{ backgroundColor: '#1f2221', color: 'white', border: '1px solid #333', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem' }}>
          Baths
        </button>
        <button className={styles.filterPill} style={{ backgroundColor: '#1f2221', color: 'white', border: '1px solid #333', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem' }}>
          Home Type
        </button>
        <button className={styles.filterPill} style={{ backgroundColor: '#1f2221', color: 'white', border: '1px solid #333', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          More <SlidersHorizontal size={14} />
        </button>
      </div>
    </div>
  );
};

export default MapHeader;

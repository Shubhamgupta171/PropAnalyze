import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import styles from './MapHeader.module.css';

const MapHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.searchBar}>
        <div className={styles.menuIcon}>
             {/* Burger icon if needed, but sidebar is permanent. Maybe just search icon */}
             <div className={styles.searchIconWrapper}><Search size={18} /></div>
        </div>
        <input 
            type="text" 
            placeholder="San Francisco, CA" 
            className={styles.searchInput}
            defaultValue="San Francisco, CA"
        />
        <div className={styles.searchAction}>
            <Search size={18} />
        </div>
      </div>

      <div className={styles.filtersRow}>
        <button className={`${styles.filterPill} ${styles.active}`}>
          Price <ChevronDown size={14} />
        </button>
        <button className={styles.filterPill}>
          Beds
        </button>
        <button className={styles.filterPill}>
          Baths
        </button>
        <button className={styles.filterPill}>
          Home Type
        </button>
        <button className={styles.filterPill}>
          More <SlidersHorizontal size={14} />
        </button>
      </div>
    </div>
  );
};

export default MapHeader;

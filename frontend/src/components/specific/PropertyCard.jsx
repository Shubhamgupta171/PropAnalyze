import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BedDouble, Bath, Square } from 'lucide-react';
import styles from './PropertyCard.module.css';

const PropertyCard = ({ property }) => {
  return (
    <div className={styles.cardContainer}>
       <div className={styles.imageSection}>
            <div className={styles.badge}>Active 2d</div>
            <img 
                src="https://images.unsplash.com/photo-1600596542815-2495db9b639e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Property" 
                className={styles.image}
            />
       </div>
       
       <div className={styles.infoSection}>
            <div className={styles.priceRow}>
                <span className={styles.price}>$450,000</span>
                <div className={styles.capRate}>
                    <TrendingUp size={12} />
                    8.5% Cap
                </div>
            </div>
            
            <div className={styles.address}>123 Main St, San Francisco</div>
            
            <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                    <BedDouble size={14} />
                    <span>3</span>
                </div>
                <div className={styles.divider}>|</div>
                <div className={styles.metaItem}>
                    <Bath size={14} />
                    <span>2</span>
                </div>
                <div className={styles.divider}>|</div>
                <div className={styles.metaItem}>
                    <Square size={14} />
                    <span>1,850</span>
                </div>
            </div>

            <Link to="/analysis" className={styles.analyzeButton}>
                Analyze Deal <ArrowRight size={16} />
            </Link>
       </div>
       
       <div className={styles.pointer}></div>
    </div>
  );
};

export default PropertyCard;

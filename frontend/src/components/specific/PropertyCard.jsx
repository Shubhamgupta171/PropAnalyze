import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BedDouble, Bath, Square } from 'lucide-react';
import styles from './PropertyCard.module.css';
import ImageWithFallback from '../common/ImageWithFallback';

const PropertyCard = ({ property }) => {
  return (
    <div className={styles.cardContainer}>
       <div className={styles.imageSection}>
            <div className={styles.badge}>Active 2d</div>
            <ImageWithFallback 
                src={property?.img} 
                alt="Property" 
                category="house"
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

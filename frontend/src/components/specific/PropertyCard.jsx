import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BedDouble, Bath, Square, Heart } from 'lucide-react';
import styles from './PropertyCard.module.css';
import ImageWithFallback from '../common/ImageWithFallback';

const PropertyCard = ({ property }) => {
  return (
    <div className={styles.cardContainer} onClick={(e) => e.stopPropagation()}>
       <div className={styles.imageSection}>
            <div className={styles.badge}>Active 2d</div>
            <div className={styles.favoriteBtn}>
                <Heart size={16} color="white" />
            </div>
            <ImageWithFallback 
                src={property?.images?.[0] || property?.img} 
                alt="Property" 
                category="house"
                className={styles.image}
            />
       </div>
       
       <div className={styles.infoSection}>
            <div className={styles.priceRow}>
                <span className={styles.price}>${(property?.price * 1 || 0).toLocaleString()}</span>
                <div className={styles.capRate}>
                    <TrendingUp size={12} />
                    {property?.latest_cap_rate || '0'}% Cap
                </div>
            </div>
            
            <div className={styles.address}>{property?.location?.address || 'Address Hidden'}</div>
            
            <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                    <BedDouble size={14} />
                    <span>{property?.beds || 0} Beds</span>
                </div>
                <div className={styles.metaItem}>
                    <Bath size={14} />
                    <span>{property?.baths || 0} Baths</span>
                </div>
                <div className={styles.metaItem}>
                    <Square size={14} />
                    <span>{(property?.sqft || 0).toLocaleString()} sqft</span>
                </div>
            </div>

            <Link to={`/analysis/${property?.id}`} className={styles.analyzeButton}>
                Analyze Deal <ArrowRight size={16} />
            </Link>
       </div>
    </div>
  );
};

export default PropertyCard;

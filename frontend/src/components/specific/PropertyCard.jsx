import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BedDouble, Bath, Square, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './PropertyCard.module.css';
import ImageWithFallback from '../common/ImageWithFallback';
import toast from 'react-hot-toast';

const PropertyCard = ({ property }) => {
  const { user, togglePropertyFavorite } = useAuth();

  // Handle case where property might be incomplete or favorites array is missing
  const isFavorite = user?.favorites?.some(id => String(id) === String(property?.id));

  const handleFavoriteClick = async (e) => {
      e.stopPropagation();
      if (!user) {
          toast.error('Please login to save favorites');
          return;
      }
      await togglePropertyFavorite(property.id);
      if (!isFavorite) {
          toast.success('Property saved!');
      } else {
          toast.success('Removed from favorites');
      }
  };

  return (
    <div className={styles.cardContainer} onClick={(e) => e.stopPropagation()}>
       <div className={styles.imageSection}>
            <div className={styles.badge}>{(property?.status || 'Active').charAt(0).toUpperCase() + (property?.status || 'Active').slice(1)}</div>
            <div className={styles.favoriteBtn} onClick={handleFavoriteClick} style={{cursor: 'pointer'}}>
                <Heart 
                    size={16} 
                    color={isFavorite ? "#ef4444" : "white"} 
                    fill={isFavorite ? "#ef4444" : "none"} 
                />
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import styles from './MarketSearch.module.css'; // Reuse styles or create specific
import ImageWithFallback from '../components/common/ImageWithFallback';
import propertyService from '../services/property.service';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Favorites = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState(null);
  
  const { user, togglePropertyFavorite } = useAuth();

  const fetchFavorites = async () => {
    if (!user || !user.favorites || user.favorites.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    try {
      const ids = user.favorites.join(',');
      const params = { ids };
      if (priceFilter) params.sort = priceFilter;
      
      const response = await propertyService.getAllProperties(params);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = async (e, propertyId) => {
      e.preventDefault();
      await togglePropertyFavorite(propertyId);
      // Refresh list to remove the un-favorited item
      // We can optimistic update here for speed, but re-fetching ensures consistency
      // or filter local state:
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      toast.success('Removed from favorites');
  };

  useEffect(() => {
    fetchFavorites();
  }, [user?.favorites, priceFilter]); // Refetch if user favorites change or sort changes

  const handlePriceSort = () => {
    const newSort = priceFilter === 'price' ? '-price' : 'price';
    setPriceFilter(newSort);
  };

  return (
    <div className={styles.pageContainer} style={{flexDirection: 'column', height: 'auto', minHeight:'100vh', padding: '2rem'}}>
      <div style={{marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '1.75rem', fontWeight: 'bold', color: 'white'}}>My Favorites</h1>
            <p style={{color: '#9ca3af'}}>Your curated list of properties.</p>
          </div>
          <div>
            <button 
                className={styles.filterBtn} 
                style={{
                    fontSize:'0.9rem', 
                    padding:'8px 16px', 
                    backgroundColor: priceFilter ? '#4ade80' : '', 
                    color: priceFilter ? 'black' : ''
                }}
                onClick={handlePriceSort}
            >
                Price {priceFilter === 'price' ? '↑' : priceFilter === '-price' ? '↓' : ''}
            </button>
          </div>
      </div>

      <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px',
          width: '100%'
      }}>
          {loading ? (
            <div style={{color: '#4ade80', gridColumn: '1/-1', textAlign: 'center', padding: '40px'}}>Loading favorites...</div>
          ) : properties.length === 0 ? (
            <div style={{color: '#9ca3af', gridColumn: '1/-1', textAlign: 'center', padding: '80px', border: '1px dashed #333', borderRadius: '16px'}}>
                <h2>No favorites yet</h2>
                <p>Browse the map or market to add properties to your list.</p>
                <Link to="/market" style={{color: '#4ade80', marginTop: '16px', display: 'inline-block'}}>Browse Market</Link>
            </div>
          ) : (
            properties.map(item => (
                <div key={item.id} className={styles.propertyCard} style={{height: 'auto'}}>
                    <div className={styles.cardImage} style={{height: '200px'}}>
                        <ImageWithFallback 
                            src={item.images && item.images[0]} 
                            alt={item.title} 
                            category="house" 
                            style={{width:'100%', height:'100%', objectFit:'cover'}} 
                        />
                        <div className={styles.badges}>
                            {item.latest_cap_rate && <span className={`${styles.badge} ${styles.badgeGreen}`}>{item.latest_cap_rate}% Cap</span>}
                        </div>
                        <Heart 
                            size={20} 
                            onClick={(e) => handleFavoriteClick(e, item.id)}
                            style={{
                                position: 'absolute', 
                                top: '10px', 
                                right: '10px', 
                                color: '#ef4444', 
                                cursor: 'pointer',
                                zIndex: 10
                            }} 
                            fill="#ef4444"
                        />
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
  );
};

export default Favorites;

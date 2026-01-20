import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, ArrowRight, Heart } from 'lucide-react';
import MapBackground from '../components/common/MapBackground';
import styles from './MarketSearch.module.css';
import ImageWithFallback from '../components/common/ImageWithFallback';

const MarketSearch = () => {
  const properties = [
    { id: 1, price: '$450,000', address: '123 Investment Way, New York, NY 10001', beds: 3, baths: 2, sqft: '1,850', rent: '$2,400', cap: '8.2% Cap Rate', coc: '12% COC', img: 'https://images.unsplash.com/photo-1600596542815-2495db9b639e?w=600' },
    { id: 2, price: '$320,000', address: '894 Fixer Ln, Brooklyn, NY 11201', beds: 2, baths: 1, sqft: '1,200', rent: '$1,800', badge: 'Fixer Upper', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
    { id: 3, price: '$550,000', address: '442 Oak Lane, Queens, NY 11101', beds: 4, baths: 2.5, sqft: '2,200', rent: '$3,100', cap: '7.5% Cap', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600' },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Left: Map Area with Overlay Search */}
      <div className={styles.mapArea}>
         <div className={styles.searchBarOverlay}>
            <Search size={20} style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af'}} />
            <input type="text" placeholder="New York, NY" className={styles.searchInput} />
            <div style={{display:'flex', gap:'8px'}}>
                 <button className={styles.filterBtn}>Saved</button>
                 <button className={styles.filterBtn}>Alerts</button>
            </div>
         </div>
         
         <MapBackground opacity={0.5}>
             {/* Mock Pins */}
             <div style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', display:'flex', flexDirection:'column', alignItems:'center'}}>
                 <div style={{backgroundColor: '#181a19', padding: '8px', borderRadius: '8px', marginBottom: '8px', width: '200px'}}>
                     <ImageWithFallback src={properties[0].img} category="house" style={{width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '4px'}} />
                     <div style={{fontSize: '0.9rem', fontWeight: 600}}>$450,000</div>
                     <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#4ade80'}}>
                         <span>Est. Rent</span>
                         <span>$2,400/mo</span>
                     </div>
                 </div>
                 <div style={{width: '16px', height: '16px', backgroundColor: '#4ade80', borderRadius: '50%', border: '3px solid rgba(74, 222, 128, 0.3)'}}></div>
             </div>
         </MapBackground>
      </div>

      {/* Right: Results Sidebar */}
      <div className={styles.resultsSidebar}>
          <div className={styles.sidebarHeader}>
             <div className={styles.headerRow}>
                <span className={styles.sidebarTitle}>Homes For Sale</span>
                <span className={styles.resultsCount}>142 Listings</span>
             </div>
             {/* Simple filters row */}
             <div style={{display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'4px'}}>
                 <button className={styles.filterBtn} style={{fontSize:'0.75rem', padding:'4px 10px'}}>Price</button>
                 <button className={styles.filterBtn} style={{fontSize:'0.75rem', padding:'4px 10px'}}>Beds</button>
                 <button className={styles.filterBtn} style={{fontSize:'0.75rem', padding:'4px 10px'}}>Baths</button>
                 <button className={styles.filterBtn} style={{fontSize:'0.75rem', padding:'4px 10px'}}><SlidersHorizontal size={12}/> More</button>
             </div>
          </div>

          <div className={styles.scrollArea}>
             {properties.map(item => (
                 <div key={item.id} className={styles.propertyCard}>
                     <div className={styles.cardImage}>
                         <ImageWithFallback src={item.img} alt="Home" category="house" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                         <div className={styles.badges}>
                             {item.cap && <span className={`${styles.badge} ${styles.badgeGreen}`}>{item.cap}</span>}
                             {item.coc && <span className={styles.badge}>{item.coc}</span>}
                             {item.badge && <span className={`${styles.badge} ${styles.badgeGreen}`}>{item.badge}</span>}
                         </div>
                         <Heart size={20} style={{position: 'absolute', top: '10px', right: '10px', color: 'white'}} />
                     </div>
                     <div className={styles.cardContent}>
                         <div className={styles.priceRow}>
                             <span className={styles.price}>{item.price}</span>
                             <span style={{fontSize:'0.75rem', color: '#9ca3af'}}>MLS #82312</span>
                         </div>
                         <span className={styles.address}>{item.address}</span>
                         <div className={styles.metaRow}>
                             <span>{item.beds} <span style={{color: '#6b7280'}}>beds</span></span>
                             <span>{item.baths} <span style={{color: '#6b7280'}}>baths</span></span>
                             <span>{item.sqft} <span style={{color: '#6b7280'}}>sqft</span></span>
                         </div>
                         <div className={styles.footerRow}>
                             <div>
                                 <span className={styles.estRentLabel}>Est. Rent</span>
                                 <span className={styles.estRent}>{item.rent}<span style={{color:'#6b7280', fontWeight: 400}}>/mo</span></span>
                             </div>
                             <Link to="/analysis" className={styles.analyzeLink} style={{textDecoration:'none'}}>
                                 Analyze <ArrowRight size={14} />
                             </Link>
                         </div>
                     </div>
                 </div>
             ))}
          </div>
      </div>
    </div>
  );
};

export default MarketSearch;

import React from 'react';
import { ChevronDown, ArrowUpRight, FileText, Send } from 'lucide-react';
import styles from './HistoryTable.module.css';
import ImageWithFallback from '../common/ImageWithFallback';

const HistoryTable = () => {
    const data = [
        { id: 1, img: 'https://images.unsplash.com/photo-1600596542815-2495db9b639e?w=100', address: '123 Maple Ave', city: 'Austin, TX 78701', price: '$450,000', cap: '7.2%', coc: '12.5%', status: 'Complete', lastEdited: '2 hours ago', action: 'Reopen', capClass: styles.capHigh },
        { id: 2, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100', address: '808 Pine Street', city: 'Seattle, WA 98101', price: '$825,000', cap: '5.4%', coc: '4.2%', status: 'Draft', lastEdited: '1 day ago', action: 'Resume', capClass: styles.capMid },
        { id: 3, img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100', address: '442 Oak Lane', city: 'Dallas, TX 75201', price: '$315,000', cap: '8.1%', coc: '14.2%', status: 'Offer Sent', lastEdited: '3 days ago', action: 'View', capClass: styles.capHigh },
        { id: 4, img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100', address: '9920 Sunset Blvd', city: 'Los Angeles, CA 90069', price: '$620,000', cap: '6.0%', coc: '8.5%', status: 'Complete', lastEdited: '1 week ago', action: 'Reopen', capClass: styles.capHigh },
        { id: 5, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=100', address: '772 Willow Creek', city: 'Denver, CO 80202', price: '$540,000', cap: '5.9%', coc: '7.1%', status: 'Draft', lastEdited: '2 weeks ago', action: 'Resume', capClass: styles.capMid },
    ];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filtersBar}>
        <div className={styles.filterGroup}>
             <button className={`${styles.filterBtn} ${styles.active}`}>All Properties <ChevronDown size={14} /></button>
             <button className={styles.filterBtn}><ArrowUpRight size={14} /> High Cap Rate {`>`} 6%)</button>
             <button className={styles.filterBtn}><FileText size={14} /> Drafts</button>
             <button className={styles.filterBtn}><Send size={14} /> Offers Sent</button>
        </div>
        <div style={{fontSize: '0.8rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px'}}>
            Sort by: <span style={{color: '#fff', fontWeight: '500'}}>Date Modified</span> <ChevronDown size={14} />
        </div>
      </div>

      <table className={styles.table}>
        <thead>
            <tr>
                <th className={styles.th}>IMAGE</th>
                <th className={styles.th}>PROPERTY ADDRESS</th>
                <th className={styles.th}>PRICE</th>
                <th className={styles.th}>CAP RATE</th>
                <th className={styles.th}>CASH-ON-CASH</th>
                <th className={styles.th}>STATUS</th>
                <th className={styles.th}>LAST EDITED</th>
                <th className={styles.th}>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => (
                <tr key={item.id} className={styles.tr}>
                    <td className={styles.td}>
                        <ImageWithFallback src={item.img} alt="Prop" category="house" className={styles.propertyImg} />
                    </td>
                    <td className={styles.td}>
                        <div className={styles.propertyText}>
                            <span className={styles.address}>{item.address}</span>
                            <span className={styles.city}>{item.city}</span>
                        </div>
                    </td>
                    <td className={styles.td}>{item.price}</td>
                    <td className={styles.td}><span className={item.capClass}>{item.cap}</span></td>
                    <td className={styles.td}>{item.coc}</td>
                    <td className={styles.td}>
                         <div className={styles.statusIndicator}>
                             <div className={`${styles.dot} ${item.status === 'Complete' || item.status === 'Offer Sent' ? styles.dotComplete : styles.dotDraft}`}></div>
                             {item.status}
                         </div>
                    </td>
                    <td className={styles.td}>{item.lastEdited}</td>
                    <td className={styles.td}>
                        <button className={styles.actionBtn}>{item.action}</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      
      <div className={styles.pagination}>
          <span style={{marginRight: 'auto', fontSize: '0.8rem', color: '#9ca3af', alignSelf: 'center'}}>Showing 1-5 of 24 results</span>
          <button className={styles.pageBtn}>Previous</button>
          <button className={styles.pageBtn}>Next</button>
      </div>
    </div>
  );
};

export default HistoryTable;

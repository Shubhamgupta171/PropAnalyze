import React from 'react';
import { Filter, Download, MoreHorizontal } from 'lucide-react';
import styles from './BulkAnalysisTable.module.css';

const BulkAnalysisTable = () => {
  const data = [
      { id: 1, name: '1240 Maple Drive', city: 'Austin, TX 78702', price: '$325,000', beds: 3, baths: 2, sqft: '1,850', rehab: '$45,000', arv: '$480,000', roi: '+24.5%', profit: '+$92,500' },
      { id: 2, name: '8802 Oak Street', city: 'Round Rock, TX 78664', price: '$410,000', beds: 4, baths: 3, sqft: '2,400', rehab: '$60,000', arv: '$485,000', roi: '-3.2%', profit: '-$15,000' },
      { id: 3, name: '5501 Willow Creek', city: 'Austin, TX 78741', price: '$285,000', beds: 3, baths: 1.5, sqft: '1,200', rehab: '$35,000', arv: '$380,000', roi: '+14.2%', profit: '+$48,000' },
      { id: 4, name: '1922 Riverside Dr', city: 'Austin, TX 78704', price: '$550,000', beds: 2, baths: 2, sqft: '1,100', rehab: '$15,000', arv: '$620,000', roi: '+5.1%', profit: '+$22,000' },
      { id: 5, name: '404 Elm Street', city: 'Georgetown, TX 78626', price: '$210,000', beds: 3, baths: 1, sqft: '1,400', rehab: '$55,000', arv: '$340,000', roi: '+21.8%', profit: '+$65,000' },
  ];

  return (
    <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
            <input type="text" placeholder="Search by address, city or zip..." className={styles.searchBar} />
            <div className={styles.tableActions}>
                <button className={styles.actionBtn}><Filter size={14} /> Filters</button>
                <button className={styles.actionBtn}>Positive ROI</button>
                <button className={styles.actionBtn}>Negative ROI</button>
                <button className={styles.actionBtn}><Download size={14} /> Export</button>
            </div>
        </div>

      <table className={styles.table}>
        <thead>
            <tr>
                <th className={styles.th}>PROPERTY</th>
                <th className={styles.th}>LIST PRICE</th>
                <th className={styles.th}>BEDS</th>
                <th className={styles.th}>BATHS</th>
                <th className={styles.th}>SQFT</th>
                <th className={styles.th}>EST. REHAB</th>
                <th className={styles.th}>ARV</th>
                <th className={styles.th}>PROJ. ROI</th>
                <th className={styles.th}>NET PROFIT</th>
                <th className={styles.th}>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {data.map(item => {
                const isPositive = item.roi.startsWith('+');
                return (
                    <tr key={item.id} className={styles.tr}>
                        <td className={styles.td}>
                            <span className={styles.propName}>{item.name}</span>
                            <span className={styles.propAddr}>{item.city}</span>
                        </td>
                        <td className={styles.td}>{item.price}</td>
                        <td className={styles.td}>{item.beds}</td>
                        <td className={styles.td}>{item.baths}</td>
                        <td className={styles.td}>{item.sqft}</td>
                        <td className={styles.td}>{item.rehab}</td>
                        <td className={styles.td}>{item.arv}</td>
                        <td className={styles.td}>
                             <span className={isPositive ? styles.roiPositive : styles.roiNegative}>{item.roi}</span>
                        </td>
                        <td className={styles.td}>
                             <span className={isPositive ? styles.profitPositive : styles.profitNegative}>{item.profit}</span>
                        </td>
                        <td className={styles.td} style={{textAlign:'center'}}>
                            <MoreHorizontal size={16} style={{cursor:'pointer'}} />
                        </td>
                    </tr>
                );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default BulkAnalysisTable;

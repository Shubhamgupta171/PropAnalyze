import React from 'react';
import { Filter, Download, MoreHorizontal } from 'lucide-react';
import styles from './BulkAnalysisTable.module.css';

const BulkAnalysisTable = ({ data = [] }) => {
  const [filterType, setFilterType] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredData = data.filter(item => {
      // 1. Search Filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (item.name && item.name.toLowerCase().includes(searchLower)) ||
        (item.city && item.city.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;

      // 2. ROI Filter
      if (filterType === 'positive') {
          return item.roi && item.roi.startsWith('+');
      }
      if (filterType === 'negative') {
          return item.roi && item.roi.startsWith('-');
      }
      return true;
  });

  const exportCSV = () => {
    const headers = ['Property', 'City', 'Price', 'Beds', 'Baths', 'Sqft', 'Rehab', 'ARV', 'ROI', 'Profit'];
    const csvContent = [
        headers.join(','),
        ...filteredData.map(item => [
            `"${item.name || ''}"`,
            `"${item.city || ''}"`,
            item.price,
            item.beds,
            item.baths,
            item.sqft,
            item.rehab,
            item.arv,
            item.roi,
            item.profit
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'analysis_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
            <input 
                type="text" 
                placeholder="Search by address, city..." 
                className={styles.searchBar} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.tableActions}>
                <button 
                    className={`${styles.actionBtn} ${filterType === 'all' ? styles.active : ''}`}
                    onClick={() => setFilterType('all')}
                >
                    <Filter size={14} /> All
                </button>
                <button 
                    className={`${styles.actionBtn} ${filterType === 'positive' ? styles.active : ''}`}
                    onClick={() => setFilterType('positive')}
                    style={{color: filterType === 'positive' ? '#4ade80' : ''}}
                >
                    Positive ROI
                </button>
                <button 
                    className={`${styles.actionBtn} ${filterType === 'negative' ? styles.active : ''}`}
                    onClick={() => setFilterType('negative')}
                    style={{color: filterType === 'negative' ? '#ef4444' : ''}}
                >
                    Negative ROI
                </button>
                <button className={styles.actionBtn} onClick={exportCSV}><Download size={14} /> Export</button>
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
            {filteredData.length > 0 ? filteredData.map(item => {
                const isPositive = item.roi && item.roi.startsWith('+');
                return (
                    <tr key={item.id} className={styles.tr}>
                        <td className={styles.td}>
                            <span className={styles.propName}>{item.name || 'Unknown Address'}</span>
                            <span className={styles.propAddr}>{item.city || ''}</span>
                        </td>
                        <td className={styles.td}>{typeof item.price === 'number' ? item.price.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}) : item.price}</td>
                        <td className={styles.td}>{item.beds}</td>
                        <td className={styles.td}>{item.baths}</td>
                        <td className={styles.td}>{item.sqft}</td>
                        <td className={styles.td}>{typeof item.rehab === 'number' ? item.rehab.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}) : item.rehab}</td>
                        <td className={styles.td}>{typeof item.arv === 'number' ? item.arv.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}) : item.arv}</td>
                        <td className={styles.td}>
                             <span className={isPositive ? styles.roiPositive : styles.roiNegative}>
                                {item.roi || '-'}
                             </span>
                        </td>
                        <td className={styles.td}>
                             <span className={isPositive ? styles.profitPositive : styles.profitNegative}>
                                {item.profit || '-'}
                             </span>
                        </td>
                        <td className={styles.td} style={{textAlign:'center'}}>
                            <MoreHorizontal size={16} style={{cursor:'pointer'}} />
                        </td>
                    </tr>
                );
            }) : (
                <tr>
                    <td colSpan="10" style={{textAlign: 'center', padding: '32px', color: '#9ca3af'}}>
                        No data found. Upload a CSV or paste addresses to begin.
                    </td>
                </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default BulkAnalysisTable;

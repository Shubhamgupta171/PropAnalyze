import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowUpRight, FileText, Send, Trash2 } from 'lucide-react';
import styles from './HistoryTable.module.css';
import ImageWithFallback from '../common/ImageWithFallback';
import analysisService from '../../services/analysis.service';
import toast from 'react-hot-toast';

const HistoryTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await analysisService.getHistory();
            setData(response.data.history);
        } catch (error) {
            console.error('Error fetching history:', error);
            toast.error('Failed to load analysis history');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this analysis?')) return;
        try {
            await analysisService.deleteAnalysis(id);
            toast.success('Analysis deleted');
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            toast.error('Failed to delete analysis');
        }
    };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filtersBar}>
        <div className={styles.filterGroup}>
             <button className={`${styles.filterBtn} ${styles.active}`}>All Properties <ChevronDown size={14} /></button>
             <button className={styles.filterBtn}><ArrowUpRight size={14} /> High CoC {`>`} 10%)</button>
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
                <th className={styles.th}>TITLE / STRATEGY</th>
                <th className={styles.th}>PURCHASE PRICE</th>
                <th className={styles.th}>CAP RATE</th>
                <th className={styles.th}>CASH-ON-CASH</th>
                <th className={styles.th}>STATUS</th>
                <th className={styles.th}>LAST EDITED</th>
                <th className={styles.th}>ACTION</th>
            </tr>
        </thead>
        <tbody>
            {loading ? (
                <tr><td colSpan="8" style={{textAlign:'center', padding:'40px', color:'#4ade80'}}>Loading history...</td></tr>
            ) : data.length === 0 ? (
                <tr><td colSpan="8" style={{textAlign:'center', padding:'40px', color:'#9ca3af'}}>No past analyses found.</td></tr>
            ) : (
                data.map(item => (
                    <tr key={item.id} className={styles.tr}>
                        <td className={styles.td}>
                            <ImageWithFallback src={item.img} alt="Prop" category="house" className={styles.propertyImg} />
                        </td>
                        <td className={styles.td}>
                            <div className={styles.propertyText}>
                                <span className={styles.address}>{item.property_title}</span>
                                <span className={styles.city}>{item.strategy} Strategy</span>
                            </div>
                        </td>
                        <td className={styles.td}>${(item.inputs.purchasePrice || 0).toLocaleString()}</td>
                        <td className={styles.td}>
                            <span className={item.metrics.capRate >= 6 ? styles.capHigh : styles.capMid}>
                                {item.metrics.capRate}%
                            </span>
                        </td>
                        <td className={styles.td}>{item.metrics.cashOnCash}%</td>
                        <td className={styles.td}>
                            <div className={styles.statusIndicator}>
                                <div className={`${styles.dot} ${styles.dotComplete}`}></div>
                                {item.status}
                            </div>
                        </td>
                        <td className={styles.td}>{new Date(item.updated_at).toLocaleDateString()}</td>
                        <td className={styles.td}>
                            <div style={{display:'flex', gap:'8px'}}>
                                <button className={styles.actionBtn}>Open</button>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    style={{background:'none', border:'none', color:'#ef4444', cursor:'pointer'}}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
      </table>
      
      <div className={styles.pagination}>
          <span style={{marginRight: 'auto', fontSize: '0.8rem', color: '#9ca3af', alignSelf: 'center'}}>
              Showing {data.length} results
          </span>
      </div>
    </div>
  );
};

export default HistoryTable;

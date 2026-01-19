import React from 'react';
import { Home, Percent, DollarSign, Send } from 'lucide-react';
import styles from './HistoryStats.module.css';

const HistoryStats = () => {
  return (
    <div className={styles.statsContainer}>
      {/* Card 1 */}
      <div className={styles.statCard}>
        <div className={styles.header}>
            <Home size={16} className={styles.icon} /> Properties Analyzed
        </div>
        <div className={styles.valueRow}>
            <span className={styles.value}>24</span>
            <span className={styles.subValue}>+2 this week</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className={styles.statCard}>
        <div className={styles.header}>
             <Percent size={16} className={styles.icon} /> Avg. Cap Rate
        </div>
        <div className={styles.valueRow}>
            <span className={styles.value}>6.8%</span>
            <span className={styles.subValue}>+0.2%</span>
        </div>
      </div>

       {/* Card 3 */}
       <div className={styles.statCard}>
        <div className={styles.header}>
             <DollarSign size={16} className={styles.icon} /> Total Value
        </div>
        <div className={styles.valueRow}>
            <span className={styles.value}>$12.5M</span>
            <span className={styles.subValue}>+$1.2M</span>
        </div>
      </div>

       {/* Card 4 */}
       <div className={styles.statCard}>
        <div className={styles.header}>
             <Send size={16} className={styles.icon} /> Offers Sent
        </div>
        <div className={styles.valueRow}>
            <span className={styles.value}>3</span>
            <span className={styles.subValue}>+1 pending</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryStats;

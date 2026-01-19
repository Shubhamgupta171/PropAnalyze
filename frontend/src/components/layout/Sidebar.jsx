import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, History, Layers, Settings, LogOut, CheckSquare, Search, BarChart3 } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className="logo-icon-wrapper">
            <BarChart3 className={styles.logoIcon} />
        </div>
        <div>
            <div className={styles.logoText}>PropAnalyze</div>
            <div className={styles.logoSubtext}>INVESTOR PLATFORM</div>
        </div>
      </div>

      <div className={styles.navGroup}>
        <NavLink to="/market" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
           <Search size={20} />
           <span>Market Search</span>
        </NavLink>
        <NavLink 
          to="/map" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Map size={20} />
          <span>Map View</span>
        </NavLink>

        <NavLink 
          to="/history" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <History size={20} />
          <span>History</span>
        </NavLink>

        <NavLink 
          to="/bulk" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Layers size={20} />
          <span>Bulk Underwriting</span>
          <span className={styles.proBadge}>PRO</span>
        </NavLink>

        <NavLink 
          to="/reports" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <CheckSquare size={20} />
          <span>Reports</span>
        </NavLink>
      </div>

      <div className={styles.bottomSection}>
        <NavLink to="/settings" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        
        <NavLink to="/login" className={styles.navItem}>
          <LogOut size={20} />
          <span>Log Out</span>
        </NavLink>

        <div className={styles.userProfile}>
          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d" 
            alt="User" 
            className={styles.avatar} 
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Alex Morgan</span>
            <span className={styles.userPlan}>Premium Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

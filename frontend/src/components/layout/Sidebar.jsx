import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, History, Layers, Settings, LogOut, CheckSquare, Search, BarChart3 } from 'lucide-react';
import styles from './Sidebar.module.css';
import { useAuth } from '../../context/AuthContext';
import ImageWithFallback from '../common/ImageWithFallback';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

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
        
        <button onClick={handleLogout} className={styles.navItem} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '12px 16px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>

        <div className={styles.userProfile}>
          <ImageWithFallback 
            src={user?.photo} 
            alt="User" 
            category="avatar"
            className={styles.avatar} 
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name || 'User'}</span>
            <span className={styles.userPlan}>{user?.plan || 'Free'} Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, History, Layers, Settings, LogOut, CheckSquare, Search, BarChart3, Heart } from 'lucide-react';
import styles from './Sidebar.module.css';
import { useAuth } from '../../context/AuthContext';

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
        <div className={styles.logoIconWrapper}>
            <BarChart3 className={styles.logoIcon} size={24} color="#4ade80" />
        </div>
        <div className={styles.logoText}>InvestMap</div>
      </div>

      <div className={styles.navGroup}>
        <NavLink 
          to="/map" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Map size={20} />
          <span>Map View</span>
        </NavLink>

        <NavLink 
          to="/bulk" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Layers size={20} />
          <span>Bulk Underwriting</span>
        </NavLink>

        <NavLink 
          to="/history" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <History size={20} />
          <span>History</span>
        </NavLink>

        <NavLink 
          to="/favorites" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Heart size={20} />
          <span>Favorites</span>
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className={styles.bottomSection}>
        <button onClick={handleLogout} className={styles.navItem} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af' }}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

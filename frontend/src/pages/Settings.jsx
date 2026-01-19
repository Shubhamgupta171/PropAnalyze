import React from 'react';
import { User, CreditCard, Bell, Shield, Mail } from 'lucide-react';
import styles from './Settings.module.css';

const Settings = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.cgrid}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
            <div className={`${styles.menuItem} ${styles.active}`}>
                <User size={18} /> Profile
            </div>
            <div className={styles.menuItem}>
                <CreditCard size={18} /> Billing & Plan
            </div>
            <div className={styles.menuItem}>
                <Bell size={18} /> Notifications
            </div>
            <div className={styles.menuItem}>
                <Shield size={18} /> Security
            </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Profile Information</h2>
                <p className={styles.sectionDesc}>Manage your public profile and account details.</p>
            </div>

            <div className={styles.formGroup}>
                <div style={{display:'flex', gap: '20px', alignItems:'center', marginBottom: '24px'}}>
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className={styles.avatarLarge} alt="Profile" />
                    <div>
                        <button className={styles.btnSecondary}>Change Avatar</button>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>First Name</label>
                        <input type="text" defaultValue="Alex" />
                    </div>
                    <div className={styles.field}>
                        <label>Last Name</label>
                        <input type="text" defaultValue="Morgan" />
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Email Address</label>
                    <div style={{position:'relative'}}>
                         <Mail size={16} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#6b7280'}} />
                         <input type="email" defaultValue="alex.morgan@example.com" style={{paddingLeft:'36px'}} />
                    </div>
                </div>

                 <div className={styles.field}>
                    <label>Bio</label>
                    <textarea rows="4" defaultValue="Real estate investor based in Austin, TX. Focusing on Fix & Flip and long-term rentals."></textarea>
                </div>

                <div style={{marginTop: '24px', display:'flex', justifyContent:'flex-end'}}>
                    <button className={styles.btnPrimary}>Save Changes</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

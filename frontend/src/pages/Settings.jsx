import React, { useState, useRef } from 'react';
import { User, CreditCard, Bell, Shield, Mail } from 'lucide-react';
import styles from './Settings.module.css';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateMe } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    countryCode: user?.countryCode || '+1',
    title: user?.title || 'Investor',
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (photo) data.append('photo', photo);

    try {
      await updateMe(data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

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
                    <ImageWithFallback 
                        src={photo ? URL.createObjectURL(photo) : user?.photo} 
                        category="avatar" 
                        className={styles.avatarLarge} 
                        alt="Profile" 
                    />
                    <div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handlePhotoChange}
                            accept="image/*"
                        />
                        <button 
                            className={styles.btnSecondary}
                            onClick={() => fileInputRef.current.click()}
                        >
                            Change Avatar
                        </button>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Title</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title} 
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Phone</label>
                        <input 
                            type="text" 
                            name="phone"
                            value={formData.phone} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Country Code</label>
                        <input 
                            type="text" 
                            name="countryCode"
                            value={formData.countryCode} 
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Email Address</label>
                    <div style={{position:'relative'}}>
                         <Mail size={16} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#6b7280'}} />
                         <input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            style={{paddingLeft:'36px'}} 
                            onChange={handleChange}
                         />
                    </div>
                </div>

                <div style={{marginTop: '24px', display:'flex', justifyContent:'flex-end'}}>
                    <button 
                        className={styles.btnPrimary} 
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, BarChart3, Loader2, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const countryCodes = [
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
];

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      if (error.includes('already exists')) {
        toast.error(
          (t) => (
            <span>
              {error}
              <button 
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate('/login');
                }}
                style={{
                  marginLeft: '10px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                Sign In
              </button>
            </span>
          ),
          { duration: 6000 }
        );
      } else {
        toast.error(error);
      }
    }
  }, [error, navigate]);

  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  }, [password]);

  const strengthColor = useMemo(() => {
    if (passwordStrength <= 25) return '#ef4444';
    if (passwordStrength <= 50) return '#f59e0b';
    if (passwordStrength <= 75) return '#fbbf24';
    return '#4ade80';
  }, [passwordStrength]);

  const strengthLabel = useMemo(() => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 25) return 'Very Weak';
    if (passwordStrength <= 50) return 'Weak';
    if (passwordStrength <= 75) return 'Medium';
    return 'Strong';
  }, [passwordStrength]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (passwordStrength < 50) {
      return toast.error('Please choose a stronger password');
    }
    try {
      await signup({ name, email, password, phone, countryCode });
      toast.success('Account created successfully!');
      navigate('/map');
    } catch (err) {
      // Error handled by useEffect
    }
  };

  return (
    <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f1110',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(74, 222, 128, 0.1) 0%, transparent 40%)',
        padding: '40px 20px'
    }}>
      <div style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#141615',
          borderRadius: '24px',
          border: '1px solid #222',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
      }}>
        <div style={{padding: '40px 40px 32px 40px', textAlign: 'center', borderBottom: '1px solid #1f2937'}}>
             <div style={{
                 width: '56px', height: '56px', 
                 backgroundColor: '#4ade80', 
                 borderRadius: '16px', 
                 display:'flex', alignItems:'center', justifyContent:'center',
                 margin: '0 auto 16px auto',
                 boxShadow: '0 0 25px rgba(74, 222, 128, 0.4)'
             }}>
                <BarChart3 size={28} color="#000" />
             </div>
             <h1 style={{fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '8px', letterSpacing: '-0.025em'}}>Create your account</h1>
             <p style={{color: '#9ca3af', fontSize: '1rem'}}>Start your property analysis journey today.</p>
        </div>

        <div style={{padding: '32px 40px 40px 40px'}}>
          <form onSubmit={handleSignup} style={{display:'flex', flexDirection: 'column', gap: '24px'}}>
              
              {/* Personal Info Row */}
              <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
                    <label style={{fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="John Doe"
                      style={{
                        backgroundColor: '#1c1e1d',
                        border: '1px solid #333',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'all 0.2s'
                    }} />
                </div>
                <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
                    <label style={{fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@email.com"
                      style={{
                        backgroundColor: '#1c1e1d',
                        border: '1px solid #333',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        outline: 'none'
                    }} />
                </div>
              </div>

              {/* Phone Row */}
              <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Phone Number</label>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <select 
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        backgroundColor: '#1c1e1d',
                        border: '1px solid #333',
                        padding: '12px',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        outline: 'none',
                        flex: '0 0 100px',
                        cursor: 'pointer'
                      }}
                    >
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.flag} {item.code}
                        </option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="123-456-7890"
                      style={{
                        backgroundColor: '#1c1e1d',
                        border: '1px solid #333',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        outline: 'none',
                        flex: 1
                    }} />
                  </div>
              </div>

              {/* Password Group */}
              <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start'}}>
                <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
                    <label style={{fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        style={{
                          width: '100%',
                          backgroundColor: '#1c1e1d',
                          border: '1px solid #333',
                          padding: '12px 14px',
                          paddingRight: '44px',
                          borderRadius: '10px',
                          color: 'white',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                      }} />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#6b7280',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {password && (
                      <div style={{ marginTop: '4px' }}>
                        <div style={{ 
                          height: '4px', 
                          width: '100%', 
                          backgroundColor: '#222', 
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${passwordStrength}%`, 
                            backgroundColor: strengthColor,
                            transition: 'all 0.3s ease-in-out'
                          }} />
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          marginTop: '4px',
                          fontSize: '0.7rem',
                          color: strengthColor,
                          fontWeight: 600
                        }}>
                          <span>{strengthLabel}</span>
                          <span style={{ color: '#6b7280' }}>{passwordStrength}%</span>
                        </div>
                      </div>
                    )}
                </div>

                <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
                    <label style={{fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Confirm</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        style={{
                          width: '100%',
                          backgroundColor: '#1c1e1d',
                          border: '1px solid #333',
                          padding: '12px 14px',
                          paddingRight: '44px',
                          borderRadius: '10px',
                          color: 'white',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                      }} />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#6b7280',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: '0.7rem', marginTop: '4px' }}>
                        <AlertCircle size={14} />
                        <span>No match</span>
                      </div>
                    )}
                    {confirmPassword && password === confirmPassword && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4ade80', fontSize: '0.7rem', marginTop: '4px' }}>
                        <Check size={14} />
                        <span>Match!</span>
                      </div>
                    )}
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                  backgroundColor: '#4ade80',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '16px',
                  borderRadius: '12px',
                  marginTop: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 10px 15px -3px rgba(74, 222, 128, 0.3)'
              }}>
                  {loading ? <Loader2 className="animate-spin" size={24} /> : (
                    <>Create Account <ArrowRight size={20} /></>
                  )}
              </button>
          </form>

          <div style={{marginTop: '32px', textAlign: 'center', fontSize: '0.95rem', color: '#9ca3af'}}>
              Already have an account? <Link to="/login" style={{color: '#4ade80', fontWeight: 600, textDecoration: 'none'}}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

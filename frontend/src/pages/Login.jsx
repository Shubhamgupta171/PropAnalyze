import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart3, Loader2, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/map');
    } catch (err) {
      // Error is handled by useEffect
    }
  };

  return (
    <div style={{
        height: '100vh',
        backgroundColor: '#0f1110',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(74, 222, 128, 0.1) 0%, transparent 40%)'
    }}>
      <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px'
      }}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
             <div style={{
                 width: '48px', height: '48px', 
                 backgroundColor: '#4ade80', 
                 borderRadius: '12px', 
                 display:'flex', alignItems:'center', justifyContent:'center',
                 margin: '0 auto 16px auto',
                 boxShadow: '0 0 20px rgba(74, 222, 128, 0.4)'
             }}>
                <BarChart3 size={24} color="#000" />
             </div>
             <h1 style={{fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '8px'}}>Welcome Back</h1>
             <p style={{color: '#9ca3af'}}>Sign in to your account to continue analysis.</p>
        </div>

        <form onSubmit={handleLogin} style={{display:'flex', flexDirection: 'column', gap: '20px'}}>
            <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
                <label style={{fontSize: '0.85rem', color: '#e5e7eb'}}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  style={{
                    backgroundColor: '#181a19',
                    border: '1px solid #333',
                    padding: '12px',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                }} />
            </div>

            <div style={{display:'flex', flexDirection:'column', gap: '8px'}}>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <label style={{fontSize: '0.85rem', color: '#e5e7eb'}}>Password</label>
                    <a href="#" style={{fontSize: '0.8rem', color: '#4ade80'}}>Forgot password?</a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      backgroundColor: '#181a19',
                      border: '1px solid #333',
                      padding: '12px',
                      paddingRight: '45px',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem',
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
                      color: '#9ca3af',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
            </div>

            <button type="submit" disabled={loading} style={{
                backgroundColor: '#4ade80',
                color: '#000',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '14px',
                borderRadius: '8px',
                marginTop: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                opacity: loading ? 0.7 : 1
            }}>
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Sign In <ArrowRight size={18} /></>
                )}
            </button>
        </form>

        <div style={{marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: '#9ca3af'}}>
            Don't have an account? <Link to="/signup" style={{color: '#4ade80', fontWeight: 500}}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

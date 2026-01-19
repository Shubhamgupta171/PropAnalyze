import React from 'react';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/map');
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
                <input type="email" defaultValue="demo@example.com" style={{
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
                <input type="password" defaultValue="password" style={{
                    backgroundColor: '#181a19',
                    border: '1px solid #333',
                    padding: '12px',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                }} />
            </div>

            <button type="submit" style={{
                backgroundColor: '#4ade80',
                color: '#000',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '14px',
                borderRadius: '8px',
                marginTop: '10px',
                cursor: 'pointer',
                transition: 'transform 0.1s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                Sign In <ArrowRight size={18} />
            </button>
        </form>

        <div style={{marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: '#9ca3af'}}>
            Don't have an account? <a href="#" style={{color: '#4ade80', fontWeight: 500}}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

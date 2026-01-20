import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import BulkUnderwriting from './pages/BulkUnderwriting';
import MarketSearch from './pages/MarketSearch';
import PropertyAnalysis from './pages/PropertyAnalysis';
import History from './pages/History';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{
        height: '100vh',
        backgroundColor: '#0f1110',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#4ade80'
      }}>
        Loading...
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/map" replace />} />
            <Route path="map" element={<Dashboard />} />
            <Route path="bulk" element={<BulkUnderwriting />} />
            <Route path="market" element={<MarketSearch />} />
            <Route path="analysis" element={<PropertyAnalysis />} />
            <Route path="history" element={<History />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/map" replace />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;

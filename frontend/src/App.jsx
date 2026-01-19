import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import BulkUnderwriting from './pages/BulkUnderwriting';
import MarketSearch from './pages/MarketSearch';
import PropertyAnalysis from './pages/PropertyAnalysis';
import History from './pages/History';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<MainLayout />}>
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
    </Router>
  );
}

export default App;

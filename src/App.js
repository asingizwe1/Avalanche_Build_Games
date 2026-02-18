import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import Dashboard from './components/Dashboard';
import LearningModules from './components/LearningModules';
import RocketScienceLab from './components/RocketScienceLab';
import SolarSystemExplorer from './components/SolarSystemExplorer';
import Profile from './components/Profile';
import AdminPanel from './components/admin/AdminPanel';
import PageNotFound from './pages/PageNotFound';
import AuthWrapper from './components/AuthWrapper';
import AdminAuthWrapper from './components/admin/AdminAuthWrapper';
import RocketsModule from './components/RocketsModule';
import FastTypingGame from './components/FastTypeGame';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* OTP Verification */}
          <Route path="/verify-otp" element={<VerifyOTP />} />
          
          {/* Authenticated User Routes */}
          <Route element={<AuthWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<LearningModules />} />
            <Route path="/rocket-lab" element={<RocketScienceLab />} />
            <Route path="/learn/solar-system" element={<SolarSystemExplorer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/learn/rockets" element={<RocketsModule />} />
            <Route path="/games/fast-typing-game" element={<FastTypingGame />} />
            <Route path="/learn/profile" element={<Profile />} />
          </Route>
          
          {/* Admin Routes */}
          <Route element={<AdminAuthWrapper />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Handling */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// DFMApp.js - MAIN APP (Wraps both screens)
import React, { useState, useEffect } from 'react';
import HomeScreen from './HomeScreen';
import CounterScreen from './CounterScreen';

const DFMApp = () => {
  const [sessions, setSessions] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' or 'counter'

  // ✅ FIXED: localStorage (WEB)
  const loadSessions = () => {
    try {
      const data = localStorage.getItem('sessions');
      if (data) {
        const parsed = JSON.parse(data);
        return parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      return [];
    } catch {
      return [];
    }
  };

  const saveSession = (newSession) => {
    try {
      const existing = localStorage.getItem('sessions');
      const sessions = existing ? JSON.parse(existing) : [];
      sessions.push(newSession);
      localStorage.setItem('sessions', JSON.stringify(sessions));
      // Auto-refresh HomeScreen
      setSessions(loadSessions());
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  // Load on startup
  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {currentScreen === 'home' ? (
        <HomeScreen 
          sessions={sessions} 
          onStartCounter={() => setCurrentScreen('counter')}
        />
      ) : (
        <CounterScreen 
          onSaveSession={saveSession}
          onBack={() => setCurrentScreen('home')}
        />
      )}
    </div>
  );
};

export default DFMApp;

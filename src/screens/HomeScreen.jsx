import React, { useState, useEffect } from 'react';

const HomeScreen = () => {
  const [sessions, setSessions] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  // ✅ FIXED: Load + Sort with error handling
  const loadSessions = () => {
    try {
      const savedSessions = localStorage.getItem('sessions');
      let parsedSessions = savedSessions ? JSON.parse(savedSessions) : [];
      parsedSessions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setSessions(parsedSessions);
    } catch (error) {
      console.error('Load failed:', error);
      setSessions([]);
    }
  };

  // ✅ FIXED: Refresh function for buttons
  const refreshSessions = () => {
    loadSessions();
  };

  // ✅ FIXED: Auto-refresh every 2s + load on startup
  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      padding: 20,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '25px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header - DFM Kick Counter */}
        <div style={{
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          padding: '30px',
          position: 'relative'
        }}>
          <div style={{ 
            textAlign: 'left',
            paddingLeft: '20px',
            paddingRight: '80px'
          }}>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '32px', 
              color: '#333', 
              fontWeight: 'bold' 
            }}>
              ⚽ DFM Kick Counter
            </h1>
            <p style={{ 
              margin: 0, 
              color: '#666', 
              fontSize: '16px' 
            }}>
              Tracking baby's 10 movements daily
            </p>
          </div>
          
          {/* ✅ FIXED: i Button - NOW WORKS */}
          <div style={{
            position: 'absolute',
            top: '38px',
            right: '18px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
            zIndex: 10
          }} onClick={() => setShowInfo(true)}>
            <span style={{ fontSize: '18px' }}>ℹ️</span>
          </div>
        </div>

        {/* Sessions List */}
        <div style={{ padding: '30px', minHeight: '400px' }}>
          {sessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚽</div>
              <h3>No sessions yet</h3>
              <p>Start your first kick count today!</p>
            </div>
          ) : (
            sessions.map((session, index) => (
              <div key={session.date} style={{
                background: index % 2 === 0 ? '#f8f9ff' : '#fff5f8',
                padding: '25px',
                marginBottom: '15px',
                borderRadius: '20px',
                borderLeft: '5px solid #4CAF50'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                  {new Date(session.date).toLocaleString('en-IN')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '18px', color: '#4CAF50', fontWeight: '600' }}>
                  <span>⏱️ {session.timeTaken} minutes</span>
                  <span style={{ background: '#4CAF50', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px' }}>
                    ✅ 10/10 Kicks
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Buttons */}
        <div style={{ padding: '0 30px 30px', textAlign: 'center', display: 'flex', gap: '15px', flexDirection: 'column' }}>
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', border: 'none', padding: '18px 40px',
            borderRadius: '30px', fontSize: '18px', fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
            cursor: 'pointer'
          }}>
            ➕ Start New Kick Count
          </button>
          {/* ✅ FIXED: Refresh button - NOW WORKS */}
          <button 
            onClick={refreshSessions}
            style={{
              background: '#4CAF50',
              color: 'white', 
              border: 'none', 
              padding: '12px 24px',
              borderRadius: '20px', 
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh List ({sessions.length} sessions)
          </button>
        </div>

        {/* ✅ FIXED: COMPLETE Info Modal */}
        {showInfo && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'flex-end'
          }} onClick={() => setShowInfo(false)}>
            <div style={{
              width: '100%', maxWidth: '500px', background: 'white',
              borderTopLeftRadius: '25px', borderTopRightRadius: '25px',
              maxHeight: '70%', overflow: 'auto',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.2)'
            }} onClick={e => e.stopPropagation()}>
              {/* Drag Handle */}
              <div style={{
                height: '4px', width: '40px', backgroundColor: '#ddd', 
                borderRadius: '2px', margin: '20px auto'
              }}></div>
              
              <div style={{ padding: '0 30px 30px' }}>
                <h2 style={{ 
                  textAlign: 'center', 
                  color: '#333', 
                  marginBottom: '20px',
                  fontSize: '24px'
                }}>
                  ⚽ How to Count DFM Kicks
                </h2>
                
                <div style={{ lineHeight: '1.6', color: '#555', fontSize: '16px' }}>
                  <div style={{
                    background: '#f0f8ff',
                    padding: '20px',
                    borderRadius: '15px',
                    borderLeft: '4px solid #4CAF50',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>📋 Instructions:</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>✅ Start after meals (breakfast, lunch, dinner)</li>
                      <li>⏰ Lie down or sit quietly</li>
                      <li>⚽ Count ALL movements (kicks, rolls, flutters)</li>
                      <li>🎯 Stop at 10 movements</li>
                      <li>💾 Save the time it took</li>
                    </ul>
                  </div>
                  
                  <div style={{
                    background: '#fff3cd',
                    padding: '20px',
                    borderRadius: '15px',
                    borderLeft: '4px solid #ffc107',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#856404' }}>⚠️ When to Worry:</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>❌ Less than 10 kicks in 2 hours</li>
                      <li>❌ Sudden change in pattern</li>
                      <li>❌ Weaker movements</li>
                      <li>🚨 <strong>Call doctor immediately!</strong></li>
                    </ul>
                  </div>
                  
                  <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
                    Track daily at same time to know your baby's pattern! ⚽💕
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;

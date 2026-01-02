import React, { useState, useEffect } from 'react';

const CounterScreen = () => {
  const [seconds, setSeconds] = useState(0);
  const [kicks, setKicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning && kicks < 10) {
      const id = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isRunning, seconds, kicks]);

  const handleSave = () => {
    const newSession = {
      id: Date.now(),
      date: new Date().toISOString(),
      duration: formatTime(seconds)
    };
    const existing = JSON.parse(localStorage.getItem('sessions') || '[]');
    const updated = [newSession, ...existing];
    localStorage.setItem('sessions', JSON.stringify(updated));
    alert(`✅ Saved! ${newSession.duration} for 10 kicks`);
    setSeconds(0);
    setKicks(0);
    setIsRunning(false);
  };

  const handleBack = () => {
    setSeconds(0);
    setKicks(0);
    setIsRunning(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      padding: 20
    }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '25px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333', marginBottom: 10 }}>👶 Fetal Kicks</h1>
        <p style={{ color: '#666', marginBottom: 30 }}>Count 10 movements</p>
        
        <div style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: '#ff6b6b',
          marginBottom: 30,
          fontFamily: 'monospace'
        }}>
          {formatTime(seconds)}
        </div>
        
        <div style={{
          background: '#f0f0f0',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: 30
        }}>
          <div style={{ fontSize: '36px', color: '#4CAF50' }}>
            {kicks}/10 Kicks
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!isRunning ? (
            <button onClick={() => setIsRunning(true)} style={{
              background: '#4CAF50', color: 'white', border: 'none',
              padding: '15px 30px', borderRadius: '25px', fontSize: '18px', fontWeight: 'bold'
            }}>
              ▶️ Start Timer
            </button>
          ) : (
            <>
              <button onClick={() => setIsRunning(false)} style={{
                background: '#ff9800', color: 'white', border: 'none',
                padding: '15px 20px', borderRadius: '25px', fontSize: '16px'
              }}>
                ⏸️ Pause
              </button>
              <button onClick={handleBack} style={{
                background: '#f44336', color: 'white', border: 'none',
                padding: '15px 20px', borderRadius: '25px', fontSize: '16px'
              }}>
                ⏹️ Reset
              </button>
            </>
          )}
        </div>

        {kicks < 10 && (
          <button onClick={() => setKicks(kicks + 1)} style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', border: 'none', padding: '25px 50px',
            borderRadius: '50px', fontSize: '24px', fontWeight: 'bold',
            marginTop: '20px', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}>
            👶 +1 Kick Detected
          </button>
        )}

        {kicks === 10 && (
          <div style={{ marginTop: '30px' }}>
            <div style={{ background: '#4CAF50', color: 'white', padding: '15px 30px', 
              borderRadius: '25px', marginBottom: '20px', fontSize: '18px' }}>
              ✅ Great! 10 kicks completed!
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={handleSave} style={{
                background: '#4CAF50', color: 'white', border: 'none',
                padding: '15px 25px', borderRadius: '25px', fontSize: '16px', fontWeight: 'bold'
              }}>
                💾 Save Session
              </button>
              <button onClick={handleBack} style={{
                background: '#f44336', color: 'white', border: 'none',
                padding: '15px 25px', borderRadius: '25px', fontSize: '16px'
              }}>
                ← Back Without Saving
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounterScreen;

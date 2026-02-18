import React, { useState, useEffect } from 'react';
import '../styles/RocketSimulator.css';

const RocketSimulator = () => {
  const [altitude, setAltitude] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [throttle, setThrottle] = useState(50);
  const [angle, setAngle] = useState(90);
  const [stage, setStage] = useState(1);

  const launchRocket = () => {
    setIsLaunching(true);
    setIsLaunched(true);
  };

  const resetSimulation = () => {
    setAltitude(0);
    setVelocity(0);
    setFuel(100);
    setIsLaunching(false);
    setIsLaunched(false);
    setThrottle(50);
    setAngle(90);
    setStage(1);
  };

  useEffect(() => {
    let simulationInterval;
    
    if (isLaunching && fuel > 0) {
      simulationInterval = setInterval(() => {
        setAltitude(prev => {
          const newAlt = prev + velocity / 10;
          return newAlt >= 100 ? 100 : newAlt;
        });
        
        setVelocity(prev => {
          const thrust = throttle / 10;
          const gravity = 0.2;
          const drag = prev > 0 ? prev / 100 : 0;
          return prev + (thrust - gravity - drag);
        });
        
        setFuel(prev => {
          const newFuel = prev - throttle / 50;
          if (newFuel <= 0) {
            setIsLaunching(false);
            return 0;
          }
          return newFuel;
        });
        
        // Stage separation simulation
        if (altitude >= 30 && stage === 1) {
          setStage(2);
          setFuel(100); // Refuel for second stage
        }
        
      }, 100);
    }
    
    return () => clearInterval(simulationInterval);
  }, [isLaunching, fuel, throttle, velocity, altitude, stage]);

  return (
    <div className="rocket-simulator">
      <h2>Rocket Launch Simulator</h2>
      
      <div className="simulator-display">
        <div className="sky">
          <div 
            className="rocket"
            style={{
              bottom: `${altitude}%`,
              transform: `rotate(${90 - angle}deg)`
            }}
          >
            {stage === 1 ? '🚀' : '🚀'}
            <div className="exhaust" style={{ opacity: isLaunching ? 1 : 0 }}></div>
          </div>
          {stage === 1 && altitude >= 30 && (
            <div 
              className="stage-separation"
              style={{ bottom: `${altitude - 5}%` }}
            >
              Stage 1 Separated
            </div>
          )}
          <div className="ground"></div>
        </div>
        
        <div className="instrument-panel">
          <div className="instrument">
            <h3>Altitude</h3>
            <div className="gauge">
              <div className="gauge-fill" style={{ height: `${altitude}%` }}></div>
              <span>{Math.round(altitude * 10)} km</span>
            </div>
          </div>
          
          <div className="instrument">
            <h3>Velocity</h3>
            <div className="gauge">
              <div className="gauge-fill" style={{ height: `${Math.min(100, velocity * 5)}%` }}></div>
              <span>{Math.round(velocity * 100)} m/s</span>
            </div>
          </div>
          
          <div className="instrument">
            <h3>Fuel</h3>
            <div className="gauge">
              <div className="gauge-fill" style={{ height: `${fuel}%` }}></div>
              <span>{Math.round(fuel)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="simulator-controls">
        <div className="control-group">
          <label>Throttle: {throttle}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={throttle}
            onChange={(e) => setThrottle(parseInt(e.target.value))}
            disabled={!isLaunched || fuel <= 0}
          />
        </div>
        
        <div className="control-group">
          <label>Angle: {angle}°</label>
          <input
            type="range"
            min="45"
            max="135"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            disabled={!isLaunched}
          />
        </div>
        
        <div className="control-buttons">
          {!isLaunched ? (
            <button className="launch-button" onClick={launchRocket}>
              Launch Rocket
            </button>
          ) : (
            <button className="reset-button" onClick={resetSimulation}>
              Reset Simulation
            </button>
          )}
        </div>
      </div>
      
      <div className="stage-indicator">
        Current Stage: {stage}
      </div>
      
      {altitude >= 100 && (
        <div className="success-message">
          🎉 Mission Successful! Rocket reached orbit!
        </div>
      )}
      
      {fuel <= 0 && altitude < 100 && (
        <div className="failure-message">
          ❌ Mission Failed: Out of fuel before reaching orbit
        </div>
      )}
    </div>
  );
};

export default RocketSimulator;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // We'll create this CSS file next
import axios from 'axios';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const rocketRef = useRef(null);
  const exhaustRef = useRef(null);

  // Africa's Talking API configuration
  const AT_API_KEY = process.env.REACT_APP_AT_API_KEY;
  const AT_USERNAME = process.env.REACT_APP_AT_USERNAME;

  useEffect(() => {
    // Initialize starfield animation
    createStarfield();
    
    // Rocket idle animation
    const rocket = rocketRef.current;
    if (rocket) {
      rocket.style.animation = 'hover 2s ease-in-out infinite alternate';
    }
    
    // Exhaust pulse animation
    const exhaust = exhaustRef.current;
    if (exhaust) {
      exhaust.style.animation = 'pulse 1.5s ease-in-out infinite';
    }
  }, []);

  const createStarfield = () => {
    const starfield = document.querySelector('.starfield');
    if (!starfield) return;

    // Clear existing stars
    starfield.innerHTML = '';

    // Create 100 stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random positioning
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 3;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random twinkle delay
      star.style.animationDelay = `${Math.random() * 5}s`;
      
      starfield.appendChild(star);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!phone) {
      setError('Please enter your phone number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Trigger rocket launch animation
      launchRocket();
      
      // Send OTP via Africa's Talking API
      const response = await axios.post(
        'https://api.africastalking.com/version1/messaging',
        {
          username: AT_USERNAME,
          to: phone,
          message: `Your AstroLearn Africa OTP is: ${generateOTP()}`,
          from: 'ASTROLEARN'
        },
        {
          headers: {
            apiKey: AT_API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      // After animation completes (3 seconds), navigate to OTP verification
      setTimeout(() => {
        navigate('/verify-otp', { state: { phone } });
      }, 3000);
      
    } catch (err) {
      console.error('OTP send failed:', err);
      setError('Failed to send OTP. Please try again.');
      resetRocket();
      setIsSubmitting(false);
    }
  };

  const generateOTP = () => {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
  };

  const launchRocket = () => {
    const rocket = rocketRef.current;
    const exhaust = exhaustRef.current;
    
    if (rocket && exhaust) {
      // Start launch sequence
      rocket.style.animation = 'launch 2.5s forwards';
      exhaust.style.animation = 'exhaust-blast 2.5s forwards';
      
      // Add smoke trail
      createSmokeTrail();
    }
  };

  const resetRocket = () => {
    const rocket = rocketRef.current;
    const exhaust = exhaustRef.current;
    
    if (rocket && exhaust) {
      rocket.style.animation = 'hover 2s ease-in-out infinite alternate';
      exhaust.style.animation = 'pulse 1.5s ease-in-out infinite';
    }
  };

  const createSmokeTrail = () => {
    const launchPad = document.querySelector('.launch-platform');
    if (!launchPad) return;
    
    for (let i = 0; i < 20; i++) {
      const smoke = document.createElement('div');
      smoke.className = 'smoke';
      
      // Random positioning at base
      smoke.style.left = `${50 + (Math.random() * 10 - 5)}%`;
      
      // Random animation duration and delay
      const duration = 1 + Math.random() * 2;
      const delay = Math.random() * 1.5;
      
      smoke.style.animation = `smoke-rise ${duration}s ease-out ${delay}s forwards`;
      
      launchPad.appendChild(smoke);
    }
  };

  return (
    <div className="login-container">
      <div className="starfield"></div>
      
      <div className="rocket-animation">
        <div className="launch-platform"></div>
        <div className="rocket" ref={rocketRef}></div>
        <div className="exhaust" ref={exhaustRef}></div>
      </div>
      
      <div className="auth-form">
        <div className="form-toggle">
          <button 
            className={!isRegistering ? 'active' : ''}
            onClick={() => setIsRegistering(false)}
          >
            Login
          </button>
          <button 
            className={isRegistering ? 'active' : ''}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 700 000000"
              pattern="^\+[0-9]{1,3}[0-9]{4,14}$"
              required
            />
            <div className="input-underline"></div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="launch-button"
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting ? 
                (isRegistering ? 'Launching Account...' : 'Initiating Launch...') : 
                (isRegistering ? 'Begin Space Mission' : 'Initiate Launch Sequence')}
            </span>
            <svg viewBox="0 0 24 24">
              <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
            </svg>
          </button>
        </form>
        
        {/* <div className="social-login">
          <p>Or connect via starlink:</p>
          <div className="social-icons">
            <button className="google-auth">
              <svg viewBox="0 0 24 24">...</svg>
            </button>
            <button className="github-auth">
              <svg viewBox="0 0 24 24">...</svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
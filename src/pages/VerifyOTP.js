import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/verifyOTP.css'; // We'll create this CSS next
import axios from 'axios';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phone, setPhone] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  // Africa's Talking API configuration
  const AT_API_KEY = process.env.REACT_APP_AT_API_KEY;
  const AT_USERNAME = process.env.REACT_APP_AT_USERNAME;

  useEffect(() => {
    // Get phone number from navigation state
    if (location.state?.phone) {
      setPhone(location.state.phone);
    } else {
      // If no phone number, redirect back
      navigate('/login');
    }

    // Start countdown for resend OTP
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location, navigate]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow digits
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d{6}$/.test(pasteData)) {
      const pasteOtp = pasteData.split('');
      const newOtp = [...otp];
      
      for (let i = 0; i < 6; i++) {
        if (pasteOtp[i]) {
          newOtp[i] = pasteOtp[i];
        }
      }
      
      setOtp(newOtp);
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the full 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // In a real app, you would verify with your backend
      // This is a mock verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Successful verification
      navigate('/dashboard');
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError('Invalid OTP. Please try again.');
      setIsVerifying(false);
    }
  };

  const resendOtp = async () => {
    setResendDisabled(true);
    setCountdown(30);
    setError('');

    try {
      // Send OTP via Africa's Talking API
      await axios.post(
        'https://api.africastalking.com/version1/messaging',
        {
          username: AT_USERNAME,
          to: phone,
          message: `Your new AstroLearn Africa OTP is: ${generateOTP()}`,
          from: 'ASTROLEARN'
        },
        {
          headers: {
            apiKey: AT_API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      // Start countdown again
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Resend OTP failed:', err);
      setError('Failed to resend OTP. Please try again.');
      setResendDisabled(false);
    }
  };

  const generateOTP = () => {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
  };

  return (
    <div className="otp-container">
      <div className="starfield"></div>
      
      <div className="space-station">
        <div className="station-core"></div>
        <div className="solar-panel left"></div>
        <div className="solar-panel right"></div>
        <div className="antenna"></div>
        <div className="communication-dish"></div>
      </div>
      
      <div className="otp-form">
        <h2>Secure Docking Procedure</h2>
        <p className="instruction-text">
          Authentication code transmitted to <span className="phone-number">{phone}</span>
        </p>
        
        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={error && !digit ? 'error' : ''}
              disabled={isVerifying}
            />
          ))}
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="otp-actions">
          <button 
            className="resend-button"
            onClick={resendOtp}
            disabled={resendDisabled || isVerifying}
          >
            {resendDisabled ? `Retransmit in ${countdown}s` : 'Retransmit Code'}
            <svg viewBox="0 0 24 24">
              <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
            </svg>
          </button>
          
          <button 
            className="verify-button"
            onClick={verifyOtp}
            disabled={isVerifying || otp.join('').length !== 6}
          >
            {isVerifying ? 'Verifying...' : 'Confirm Identity'}
            <svg viewBox="0 0 24 24">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
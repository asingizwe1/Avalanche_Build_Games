import React from 'react';
import '../styles/ProgressRing.css';

const ProgressRing = ({ progress, color, label, onClick }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-container" onClick={onClick}>
      <svg className="progress-ring" width="120" height="120">
        <circle
          className="progress-ring-circle-bg"
          stroke={color + '30'}
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className="progress-ring-circle"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>
      <div className="progress-text" style={{ color }}>
        {progress}%
      </div>
      <div className="progress-label">{label}</div>
    </div>
  );
};

export default ProgressRing;
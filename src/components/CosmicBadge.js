import React from 'react';
import '../styles/CosmicBadge.css';

const CosmicBadge = ({ name, icon, earnedDate }) => {
  return (
    <div className="cosmic-badge">
      <div className="badge-icon">{icon}</div>
      <div className="badge-details">
        <h3>{name}</h3>
        <p>Earned: {new Date(earnedDate).toLocaleDateString()}</p>
      </div>
      <div className="badge-glow"></div>
    </div>
  );
};

export default CosmicBadge;
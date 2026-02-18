import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/GameCard.css';

const GameCard = ({ title, icon, description, progress, onClick }) => {
  return (
    <div className="game-card" onClick={onClick}>
      <div className="game-icon">{icon}</div>
      <div className="game-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="game-progress">
        <CircularProgressbar
          value={progress}
          styles={buildStyles({
            pathColor: `rgba(110, 58, 255, ${progress / 100})`,
            trailColor: 'rgba(255, 255, 255, 0.1)',
            pathTransitionDuration: 1,
          })}
        />
        <span>{progress}%</span>
      </div>
      <div className="game-glow"></div>
    </div>
  );
};

export default GameCard;
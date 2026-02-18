import React from 'react';
import '../styles/QuickAccessMenu.css';

const QuickAccessMenu = ({ onSelect }) => {
  const quickActions = [
    { id: 'rocket-lab', icon: '🚀', label: 'Rocket Lab' },
    { id: 'solar-system', icon: '🪐', label: 'Solar System' },
    { id: 'profile', icon: '👨‍🚀', label: 'My Profile' }
  ];

  return (
    <div className="quick-access-grid">
      {quickActions.map(action => (
        <button 
          key={action.id}
          className="quick-action"
          onClick={() => onSelect(action.id)}
        >
          <span className="action-icon">{action.icon}</span>
          <span className="action-label">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickAccessMenu;
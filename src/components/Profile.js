import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import ProgressRing from './ProgressRing'
import CosmicBadge from './CosmicBadge';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'Cosmic Explorer',
    joinDate: '2025-05-15',
    level: 12,
    xp: 1850,
    nextLevelXp: 2500,
    region: 'East Africa',
    achievements: [
      { id: 1, name: 'Launch Pad', icon: '🚀', earned: '2025-05-28' },
      { id: 2, name: 'Star Gazer', icon: '✨', earned: '2025-05-25' },
      { id: 3, name: 'Orbit Master', icon: '🛰️', earned: '2025-05-20' },
      { id: 4, name: 'Rocket Scientist', icon: '🧪', earned: '2025-06-02' }
    ],
    progress: {
      aerospace: 72,
      rockets: 45,
      solarSystem: 88
    },
    recentActivity: [
      { id: 1, action: 'Completed Rocket Propulsion lesson', time: '2 hours ago' },
      { id: 2, action: 'Earned Orbit Master badge', time: '1 day ago' },
      { id: 3, action: 'Scored 90% on Solar System quiz', time: '2 days ago' }
    ]
  });

  const [editMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState(userData.name);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    if (editMode) {
      setUserData({ ...userData, name: tempName });
    }
    setEditMode(!editMode);
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'rocket-lab':
        navigate('/rocket-lab');
        break;
      case 'solar-system':
        navigate('/solar-system');
        break;
      default:
        break;
    }
  };

  const xpPercentage = Math.floor((userData.xp / userData.nextLevelXp) * 100);

  return (
    <div className="profile-container">
      {/* Space Background */}
      <div className="space-bg">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-container">
            <div className="avatar-profile">👨‍🚀</div>
            <div className="level-badge">Level {userData.level}</div>
          </div>
          
          <div className="profile-info">
            {editMode ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="name-input"
              />
            ) : (
              <h1>{userData.name}</h1>
            )}
            <p className="join-date">Joined {new Date(userData.joinDate).toLocaleDateString()}</p>
            <p className="region">{userData.region}</p>
          </div>
          
          <button 
            className={`edit-button ${editMode ? 'save' : ''}`}
            onClick={handleEditProfile}
          >
            {editMode ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        {/* XP Progress */}
        <div className="xp-progress">
          <h2>Mission Progress</h2>
          <div className="progress-container">
            <div className="xp-bar">
              <div 
                className="xp-fill"
                style={{ width: `${xpPercentage}%` }}
              ></div>
              <div className="xp-text">
                {userData.xp} / {userData.nextLevelXp} XP
              </div>
            </div>
            <div className="level-up">Level {userData.level + 1} in {userData.nextLevelXp - userData.xp} XP</div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="learning-progress">
          <h2>Learning Journey</h2>
          <div className="progress-rings">
            <div className="stat-box">
              <div className="stat-label">Aerospace</div>
              <div className="stat-value">{userData.progress.aerospace}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Rocket Science</div>
              <div className="stat-value">{userData.progress.rockets}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Solar System</div>
              <div className="stat-value">{userData.progress.solarSystem}</div>
            </div>


          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-section">
          <h2>Cosmic Achievements</h2>
          <div className="badges-grid">
            {userData.achievements.map(badge => (
              <CosmicBadge 
                key={badge.id}
                name={badge.name}
                icon={badge.icon}
                earnedDate={badge.earned}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h2>Mission Log</h2>
          <div className="activity-list">
            {userData.recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-details">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
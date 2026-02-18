import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="starfield"></div>
      <div className="astronaut"></div>
      <div className="content">
        <h1>404: Lost in Space</h1>
        <p>The page you're looking for doesn't exist in our galaxy.</p>
        <button onClick={() => navigate('/login')} className="home-button">
          Return to Home Base
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
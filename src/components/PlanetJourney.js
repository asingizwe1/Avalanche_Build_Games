// JourneyGame.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlanetJourney from '../components/PlanetJourney';
const JourneyGame = () => {
    const navigate = useNavigate();

    return (
        <PlanetJourney onReachPluto={() => navigate('/dashboard')} />
    );
};

export default JourneyGame;
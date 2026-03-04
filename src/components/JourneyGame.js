import React, { useState, useEffect, useRef } from 'react';
import QuizComponent from './QuizComponent';
import '../styles/JourneyGame.css';

const planets = [
    { name: 'Mars', distance: 100 },
    { name: 'Jupiter', distance: 200 },
    { name: 'Saturn', distance: 300 },
    { name: 'Uranus', distance: 400 },
    { name: 'Neptune', distance: 500 },
    { name: 'Pluto', distance: 600, isFinal: true },
];

const JourneyGame = () => {
    const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
    const [fuel, setFuel] = useState(100);
    const [position, setPosition] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [rocketLeft, setRocketLeft] = useState(50);
    const rocketRef = useRef(null);

    const currentPlanet = planets[currentPlanetIndex];

    useEffect(() => {
        if (position >= currentPlanet.distance) {
            setShowQuiz(true);
        }
    }, [position, currentPlanet.distance]);

    const handleKeyPress = (e) => {
        if (fuel <= 0 || showQuiz) return;

        if (e.key === 'ArrowRight') {
            setPosition(prev => Math.min(prev + 10, currentPlanet.distance));
            setFuel(prev => Math.max(prev - 2, 0));
            setRocketLeft(prev => Math.min(prev + 2, 90));
        } else if (e.key === 'ArrowLeft') {
            setPosition(prev => Math.max(prev - 10, 0));
            setFuel(prev => Math.max(prev - 1, 0));
            setRocketLeft(prev => Math.max(prev - 2, 10));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [fuel, showQuiz]);

    const handleQuizComplete = () => {
        if (currentPlanet.isFinal) {
            alert('Mission Complete! 🎉');
        } else {
            setCurrentPlanetIndex(prev => prev + 1);
            setPosition(0);
            setFuel(100);
            setRocketLeft(50);
            setShowQuiz(false);
        }
    };

    return (
        <div className="journey-container">
            <h2>Journey to {currentPlanet.name}</h2>
            <p>Fuel: {fuel}%</p>
            <p>Position: {position} / {currentPlanet.distance}</p>

            <div className="space-area">
                <div
                    ref={rocketRef}
                    className="rocket-sprite"
                    style={{ left: `${rocketLeft}%` }}
                >
                    <span role="img" aria-label="rocket">🚀</span>
                </div>

                <div className="planet-checkpoint">
                    <span role="img" aria-label="planet">🪐</span> {currentPlanet.name}
                </div>
            </div>

            {showQuiz && (
                <div className="quiz-popup">
                    <QuizComponent onComplete={handleQuizComplete} planet={currentPlanet.name} />
                </div>
            )}
        </div>
    );
};

export default JourneyGame;

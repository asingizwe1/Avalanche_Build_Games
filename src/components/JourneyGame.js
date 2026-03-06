// 🚀 Galactic Voyage Game
import React, { useState, useEffect } from 'react';
import QuizComponent from './QuizComponent'; // Make sure this is shared or embedded
import '../styles/JourneyGame.css';

const planets = [
    { name: 'Mars', distance: 100 },
    { name: 'Jupiter', distance: 200 },
    { name: 'Saturn', distance: 300 },
    { name: 'Uranus', distance: 400 },
    { name: 'Neptune', distance: 500 },
    { name: 'Pluto', distance: 600, isFinal: true },
];

const PlanetJourney = ({ onReachPluto }) => {
    const [position, setPosition] = useState(0);
    const [fuel, setFuel] = useState(100);
    const [quizMode, setQuizMode] = useState(false);
    const [currentPlanet, setCurrentPlanet] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleKeyPress = (e) => {
        if (quizMode || gameOver) return;

        if (fuel <= 0) {
            setGameOver(true);
            return;
        }

        let newPosition = position;

        if (e.key === 'ArrowLeft') {
            newPosition = Math.max(0, position - 10);
        } else if (e.key === 'ArrowRight') {
            newPosition = Math.min(planets[currentPlanet].distance, position + 10);
        } else {
            return;
        }

        setFuel((f) => f - 2);
        setPosition(newPosition);

        if (newPosition >= planets[currentPlanet].distance - 5) {
            setQuizMode(true);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [position, fuel, quizMode]);

    const handleQuizSuccess = () => {
        const nextPlanet = currentPlanet + 1;
        if (planets[nextPlanet]) {
            setCurrentPlanet(nextPlanet);
            setFuel(100);
            setQuizMode(false);
        } else {
            onReachPluto();
        }
    };

    return (
        <div className="planet-journey">
            <h2>Journey to {planets[currentPlanet].name}</h2>
            <div className="hud">
                <p>Fuel: {fuel}%</p>
                <p>Position: {position} / {planets[currentPlanet].distance}</p>
            </div>
            <div className="space-area">
                <div className="rocket-container" style={{ bottom: `${position}px` }}>
                    <img src="/rocket.png" alt="rocket" className="rocket-sprite" />
                    {fuel > 0 && <div className="flame-animation" />}
                </div>
                <div className="planet-label">
                    🪐 {planets[currentPlanet].name}
                </div>
            </div>

            {quizMode && (
                <QuizComponent
                    questions={[
                        {
                            question: "Which planet has the largest moon in the solar system?",
                            options: ["Earth", "Jupiter", "Saturn", "Neptune"],
                            correctAnswer: 1,
                        }
                    ]}
                    onComplete={handleQuizSuccess}
                />
            )}

            {gameOver && <div className="game-over">Game Over — Out of fuel!</div>}
        </div>
    );
};

export default PlanetJourney;

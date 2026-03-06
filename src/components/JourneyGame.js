import React, { useState, useEffect, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import RocketModel from './RocketModel';
import QuizComponent from './QuizComponent';
import '../styles/JourneyGame.css';
import { OrbitControls, Stars, Text } from '@react-three/drei';


const PlanetJourney = ({ onReachPluto }) => {
    const [position, setPosition] = useState(0);
    const [fuel, setFuel] = useState(100);
    const [quizMode, setQuizMode] = useState(false);
    const [currentPlanet, setCurrentPlanet] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const planets = [
        { name: 'Mars', distance: 100 },
        { name: 'Jupiter', distance: 200 },
        { name: 'Saturn', distance: 300 },
        { name: 'Uranus', distance: 400 },
        { name: 'Neptune', distance: 500 },
        { name: 'Pluto', distance: 600, isFinal: true },
    ];
    const CameraRig = ({ targetX }) => {
        const { camera } = useThree();
        useFrame(() => {
            camera.position.x += (targetX - camera.position.x) * 0.1;
            camera.lookAt(targetX, 0, 0);
        });
        return null;
    };
    const handleKeyPress = useCallback((e) => {
        if (quizMode || gameOver) return;
        if (fuel <= 0) {
            setGameOver(true);
            return;
        }

        if (e.key === 'ArrowLeft') setPosition((p) => p - 1);
        if (e.key === 'ArrowRight') setPosition((p) => p + 1);

        setFuel((f) => f - 1);
        if (position >= planets[currentPlanet].distance) {
            setQuizMode(true);
        }
    }, [quizMode, gameOver, fuel, position, currentPlanet, planets]);

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
            setQuizCompleted(true);

            setTimeout(() => {
                setQuizCompleted(false);
            }, 2000);
            // setShowQuizPopup(false);
        } else {
            onReachPluto();
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]); // not [position, quizMode...]

    const PlanetMesh = ({ name, distance, color }) => (
        <mesh position={[distance, 0, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial emissive={color} emissiveIntensity={0.8} />
            <Text
                position={[0, 1, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {name}
            </Text>
        </mesh>
    );


    return (
        <div className="planet-journey">
            <h2>Journey to {planets[currentPlanet].name}</h2>
            <div className="hud">
                <div>
                    <p>Fuel</p>
                    <div className="fuel-bar-container">
                        <div className="fuel-bar" style={{ width: `${fuel}%` }}></div>
                    </div>
                </div>
                <div>
                    <p>Progress</p>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${Math.min((position / planets[currentPlanet].distance) * 100, 100)}%`
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {quizCompleted && (
                <div className="quiz-success-msg">
                    ✅ Correct! +100 Fuel
                </div>
            )}

            <div className="space-area-3d">
                <Canvas camera={{ position: [0, 2, 40] }}>
                    <CameraRig targetX={position} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 5, 2]} />
                    <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
                    {planets.map((p, i) => (
                        <PlanetMesh
                            key={p.name}
                            name={p.name}
                            distance={p.distance}
                            color={i % 2 === 0 ? '#0ff' : '#f39c12'}
                        />
                    ))}
                    <RocketModel position={[position, 0, 0]} scale={0.5} />                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>

            {quizMode && (
                <div className="quiz-popup">
                    <QuizComponent
                        questions={[{
                            question: "Which planet has the largest moon in the solar system?",
                            options: ["Earth", "Jupiter", "Saturn", "Neptune"],
                            correctAnswer: 1,
                        }]}
                        onComplete={handleQuizSuccess}
                    />
                </div>
            )}

            {gameOver && <div className="game-over">Game Over — Out of fuel!</div>}
        </div>
    );
};

export default PlanetJourney;

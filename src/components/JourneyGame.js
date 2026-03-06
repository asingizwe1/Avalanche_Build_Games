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
    const [xp, setXp] = useState(0);
    const [points, setPoints] = useState(0);
    const [questions] = useState([
        {
            planet: 'Mars',
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
            correctAnswer: 1,
        },
        {
            planet: 'Jupiter',
            question: 'Which planet has the strongest gravity?',
            options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
            correctAnswer: 2,
        },
        {
            planet: 'Saturn',
            question: 'Which planet is famous for its rings?',
            options: ['Mars', 'Jupiter', 'Saturn', 'Uranus'],
            correctAnswer: 2,
        },
        {
            planet: 'Uranus',
            question: 'Which planet rotates on its side?',
            options: ['Venus', 'Uranus', 'Neptune', 'Pluto'],
            correctAnswer: 1,
        },
        {
            planet: 'Neptune',
            question: 'Which planet is farthest from the Sun (not dwarf)?',
            options: ['Uranus', 'Saturn', 'Neptune', 'Jupiter'],
            correctAnswer: 2,
        },
        {
            planet: 'Pluto',
            question: 'What is Pluto classified as?',
            options: ['Planet', 'Moon', 'Asteroid', 'Dwarf planet'],
            correctAnswer: 3,
        },
    ]);
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
            const smoothFactor = 0.1;
            camera.position.x += (targetX - camera.position.x) * smoothFactor;
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

        if (e.key === 'ArrowLeft') setPosition((p) => p - 5);
        if (e.key === 'ArrowRight') setPosition((p) => p + 5);

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
        setXp((prevXp) => prevXp + 50); // award XP
        setPoints((prevPoints) => prevPoints + 100); // award points
        const nextPlanet = currentPlanet + 1;

        if (planets[nextPlanet]) {
            setCurrentPlanet(nextPlanet);
            setFuel(100);
            setQuizMode(false);
            setQuizCompleted(true);
            setTimeout(() => setQuizCompleted(false), 2000);
        } else {
            onReachPluto();
            console.log('Final XP:', xp, 'Points:', points); // hook for onchain
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]); // not [position, quizMode...]

    const PlanetMesh = ({ name, distance, color }) => (
        <mesh position={[distance, 0, 0]}>
            <sphereGeometry args={[0.8, 32, 32]} />            <meshStandardMaterial emissive={color} emissiveIntensity={0.8} />
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
                <div className="stat-info">
                    <p>XP: {xp}</p>
                    <p>Points: {points}</p>
                </div>
            </div>

            {quizCompleted && (
                <div className="quiz-success-msg">
                    ✅ Correct! +100 Fuel
                </div>
            )}

            <div className="space-area-3d">
                <Canvas camera={{ position: [-30, 10, 50], fov: 45 }}>                    <CameraRig targetX={position} />
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
                    <RocketModel position={[position, 0, 0]} />                  <OrbitControls enableZoom={false} />
                </Canvas>
            </div>

            {quizMode && (
                <div className="quiz-popup">
                    <QuizComponent
                        questions={[questions.find(q => q.planet === planets[currentPlanet].name)]}
                        onComplete={handleQuizSuccess}
                    />
                </div>
            )}

            {gameOver && <div className="game-over">Game Over — Out of fuel!</div>}
        </div>
    );
};

export default PlanetJourney;

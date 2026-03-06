// CosmicQuizGame.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import '../styles/CosmicQuizGame.css';
import { setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const planetQuestions = [
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
        planet: 'Venus',
        question: 'Which planet has a day longer than its year?',
        options: ['Earth', 'Venus', 'Mars', 'Neptune'],
        correctAnswer: 1,
    },
    {
        planet: 'Saturn',
        question: 'Which planet has the most visible rings?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Mars'],
        correctAnswer: 1,
    },
    // Add more planets and questions as needed
];

const CosmicQuizGame = () => {
    const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [xp, setXp] = useState(0);
    const [points, setPoints] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const userId = 'cosmokid';
    const navigate = useNavigate();
    const currentQuestion = planetQuestions[currentPlanetIndex];

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'leaderboard', userId), (snapshot) => {
            if (snapshot.exists()) {
                setHighScore(snapshot.data().points || 0);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleAnswer = async (index) => {
        setSelectedOption(index);

        const isCorrect = index === currentQuestion.correctAnswer;
        const gainedXp = isCorrect ? 50 : 0;
        const gainedPoints = isCorrect ? 100 : 0;

        const newXp = xp + gainedXp;
        const newPoints = points + gainedPoints;

        setXp(newXp);
        setPoints(newPoints);

        setTimeout(async () => {
            if (currentPlanetIndex < planetQuestions.length - 1) {
                setCurrentPlanetIndex(currentPlanetIndex + 1);
                setSelectedOption(null);
            } else {
                setQuizCompleted(true);

                await setDoc(
                    doc(db, 'leaderboard', userId),
                    {
                        points: newPoints,
                        xp: newXp,
                        updated: new Date().toISOString(),
                    },
                    { merge: true }
                );
            }
        }, 1500);
    };
    return (
        <div className="cosmic-quiz-container">
            {/* All content inside */}
            <div className="stars"></div>
            <div className="twinkling"></div>

            <div className="quiz-header">
                <h1>Cosmic Quiz Challenge</h1>
                <p>Answer correctly to fuel your interplanetary journey!</p>
            </div>

            {!quizCompleted ? (
                <div className="quiz-card">
                    <h2>{currentQuestion.planet}</h2>
                    <p className="question">{currentQuestion.question}</p>

                    <div className="options">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={idx}
                                className={`option-btn ${selectedOption === idx
                                    ? idx === currentQuestion.correctAnswer
                                        ? 'correct'
                                        : 'incorrect'
                                    : ''
                                    }`}
                                onClick={() => handleAnswer(idx)}
                                disabled={selectedOption !== null}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    {/* ✅ Feedback Message */}
                    {selectedOption !== null && !quizCompleted && (
                        <p
                            style={{
                                marginTop: '1rem',
                                color:
                                    selectedOption === currentQuestion.correctAnswer
                                        ? '#00f0ff'
                                        : '#ff6b35',
                            }}
                        >
                            {selectedOption === currentQuestion.correctAnswer
                                ? 'Correct!'
                                : 'Oops! That was wrong.'}
                        </p>
                    )}
                </div>
            ) : (
                <div className="result-card">
                    <h2>Quiz Complete</h2>
                    <p>Total XP: {xp}</p>
                    <p>Total Points: {points}</p>
                    <p>High Score: {highScore}</p>
                    <button
                        className="option-btn"
                        style={{ marginTop: '1.5rem', padding: '0.75rem 2rem' }}
                        onClick={() => navigate('/dashboard')}
                    >
                        Return to Dashboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default CosmicQuizGame;

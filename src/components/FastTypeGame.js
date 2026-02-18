// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase'; // make sure this is correctly set up
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import '../styles/FastTypingGame.css';

// const aerospaceWords = [
//   'thrust', 'gravity', 'orbit', 'booster', 'capsule', 'delta-v',
//   'payload', 'propellant', 'gimbal', 'oxidizer', 'nozzle', 'launchpad',
//   'liftoff', 'trajectory', 'staging', 'thruster', 'aerodynamics', 'vacuum',
//   'module', 'cosmonaut', 'apogee', 'reentry', 'turbopump', 'burnout'
// ];

// const FastTypingGame = () => {
//   const [word, setWord] = useState('');
//   const [input, setInput] = useState('');
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [score, setScore] = useState(0);
//   const [gameActive, setGameActive] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [highScore, setHighScore] = useState(0);
//   const inputRef = useRef();
//   const navigate = useNavigate();

//   // Initialize game
//   useEffect(() => {
//     if (!gameActive) return;
    
//     setWord(getRandomWord());
//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           endGame();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [gameActive]);

//   const getRandomWord = () => {
//     return aerospaceWords[Math.floor(Math.random() * aerospaceWords.length)];
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInput(value);
    
//     if (value.trim().toLowerCase() === word.toLowerCase()) {
//       // Correct word typed
//       setScore(prev => prev + 1);
//       setInput('');
//       setWord(getRandomWord());
//       animateSuccess();
//     }
//   };

//   const startGame = () => {
//     setScore(0);
//     setTimeLeft(30);
//     setInput('');
//     setGameActive(true);
//     setShowResult(false);
//     setTimeout(() => inputRef.current.focus(), 100);
//   };

//   const endGame = () => {
//     setGameActive(false);
//     setShowResult(true);
//     if (score > highScore) {
//       setHighScore(score);
//     }
//   };

//   const animateSuccess = () => {
//     const inputElement = inputRef.current;
//     inputElement.classList.add('success-animation');
//     setTimeout(() => {
//       inputElement.classList.remove('success-animation');
//     }, 300);
//   };

//   const wpm = Math.round((score / (30 - timeLeft || 1)) * 60);

//   return (
//     <div className="typing-game-container">
//       <div className="stars"></div>
//       <div className="twinkling"></div>
      
//       <div className="game-header">
//         <h1>AstroType Challenge</h1>
//         <p>Type aerospace terms as fast as rockets launch!</p>
//       </div>
      
//       <div className="game-display">
//         <div className="word-display">
//           {word.split('').map((letter, index) => (
//             <span 
//               key={index}
//               className={
//                 input.length > index 
//                   ? input[index].toLowerCase() === letter.toLowerCase()
//                     ? 'correct'
//                     : 'incorrect'
//                   : ''
//               }
//             >
//               {letter}
//             </span>
//           ))}
//         </div>
        
//         <input
//           ref={inputRef}
//           type="text"
//           value={input}
//           onChange={handleChange}
//           disabled={!gameActive || timeLeft === 0}
//           placeholder={gameActive ? "Type here..." : "Press Start"}
//           className={gameActive ? 'active-input' : ''}
//         />
//       </div>
      
//       <div className="game-stats">
//         <div className="stat-box">
//           <div className="stat-label">Time</div>
//           <div className="stat-value">{timeLeft}s</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">Score</div>
//           <div className="stat-value">{score}</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">High Score</div>
//           <div className="stat-value">{highScore}</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">WPM</div>
//           <div className="stat-value">{wpm}</div>
//         </div>
//       </div>
      
//       <button 
//         className={`start-button ${gameActive ? 'active' : ''}`}
//         onClick={startGame}
//       >
//         {gameActive ? 'Restart' : 'Launch Game'}
//       </button>
//       <button onClick={() => navigate('/dashboard')} className="home-button">
//           Return to Home Base
//         </button>
      
//       {showResult && (
//         <div className="result-overlay">
//           <div className="result-card">
//             <div className="result-header">
//               <h2>Mission Report</h2>
//               <div className="rocket-icon">🚀</div>
//             </div>
            
//             <div className="result-stats">
//               <div className="result-stat">
//                 <span className="stat-name">Final Score</span>
//                 <span className="stat-value">{score}</span>
//               </div>
//               <div className="result-stat">
//                 <span className="stat-name">Words Per Minute</span>
//                 <span className="stat-value">{wpm}</span>
//               </div>
//               <div className="result-stat">
//                 <span className="stat-name">High Score</span>
//                 <span className="stat-value">{highScore}</span>
//               </div>
//             </div>
            
//             <div className="result-message">
//               {score >= highScore && highScore > 0 ? (
//                 <p className="new-record">New Record! 🎉</p>
//               ) : (
//                 <p>Keep practicing astronaut!</p>
//               )}
//             </div>
            
//             <button 
//               className="close-result"
//               onClick={() => setShowResult(false)}
//             >
//               Continue Mission
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FastTypingGame;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import '../styles/FastTypingGame.css';

// const aerospaceWords = [
//   'thrust', 'gravity', 'orbit', 'booster', 'capsule', 'delta-v',
//   'payload', 'propellant', 'gimbal', 'oxidizer', 'nozzle', 'launchpad',
//   'liftoff', 'trajectory', 'staging', 'thruster', 'aerodynamics', 'vacuum',
//   'module', 'cosmonaut', 'apogee', 'reentry', 'turbopump', 'burnout'
// ];

// const FastTypingGame = () => {
//   const [word, setWord] = useState('');
//   const [input, setInput] = useState('');
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [score, setScore] = useState(0);
//   const [gameActive, setGameActive] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [highScore, setHighScore] = useState(0);
//   const inputRef = useRef();
//   const navigate = useNavigate();

//   // Fetch high score from Firestore on mount
//   useEffect(() => {
//     const fetchHighScore = async () => {
//       try {
//         const docRef = doc(db, 'leaderboard', 'cosmokid'); // Replace with user ID if needed
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setHighScore(docSnap.data().points || 0);
//         }
//       } catch (error) {
//         console.error("Error fetching high score:", error);
//       }
//     };

//     fetchHighScore();
//   }, []);

//   // Start game and timer
//   useEffect(() => {
//     if (!gameActive) return;

//     setWord(getRandomWord());
//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           endGame();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [gameActive]);

//   const getRandomWord = () => {
//     return aerospaceWords[Math.floor(Math.random() * aerospaceWords.length)];
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInput(value);

//     if (value.trim().toLowerCase() === word.toLowerCase()) {
//       setScore(prev => prev + 1);
//       setInput('');
//       setWord(getRandomWord());
//       animateSuccess();
//     }
//   };

//   const startGame = () => {
//     setScore(0);
//     setTimeLeft(30);
//     setInput('');
//     setGameActive(true);
//     setShowResult(false);
//     setTimeout(() => inputRef.current.focus(), 100);
//   };

//   const endGame = async () => {
//     setGameActive(false);
//     setShowResult(true);

//     if (score > highScore) {
//       setHighScore(score);
//       try {
//         const docRef = doc(db, 'leaderboard', 'cosmokid'); // Replace with user ID if using auth
//         await setDoc(docRef, {
//           // name: 'cosmokid', // Optional: replace with real user name
//           points: score,
//           // avatar: '🚀' // Optional
//         });
//       } catch (error) {
//         console.error("Error updating high score:", error);
//       }
//     }
//   };

//   const animateSuccess = () => {
//     const inputElement = inputRef.current;
//     inputElement.classList.add('success-animation');
//     setTimeout(() => {
//       inputElement.classList.remove('success-animation');
//     }, 300);
//   };

//   const wpm = Math.round((score / (30 - timeLeft || 1)) * 60);

//   return (
//     <div className="typing-game-container">
//       <div className="stars"></div>
//       <div className="twinkling"></div>

//       <div className="game-header">
//         <h1>AstroType Challenge</h1>
//         <p>Type aerospace terms as fast as rockets launch!</p>
//       </div>

//       <div className="game-display">
//         <div className="word-display">
//           {word.split('').map((letter, index) => (
//             <span 
//               key={index}
//               className={
//                 input.length > index 
//                   ? input[index].toLowerCase() === letter.toLowerCase()
//                     ? 'correct'
//                     : 'incorrect'
//                   : ''
//               }
//             >
//               {letter}
//             </span>
//           ))}
//         </div>

//         <input
//           ref={inputRef}
//           type="text"
//           value={input}
//           onChange={handleChange}
//           disabled={!gameActive || timeLeft === 0}
//           placeholder={gameActive ? "Type here..." : "Press Start"}
//           className={gameActive ? 'active-input' : ''}
//         />
//       </div>

//       <div className="game-stats">
//         <div className="stat-box">
//           <div className="stat-label">Time</div>
//           <div className="stat-value">{timeLeft}s</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">Score</div>
//           <div className="stat-value">{score}</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">High Score</div>
//           <div className="stat-value">{highScore}</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">WPM</div>
//           <div className="stat-value">{wpm}</div>
//         </div>
//       </div>

//       <button 
//         className={`start-button ${gameActive ? 'active' : ''}`}
//         onClick={startGame}
//       >
//         {gameActive ? 'Restart' : 'Launch Game'}
//       </button>
      
//       <button onClick={() => navigate('/dashboard')} className="home-button">
//         Return to Home Base
//       </button>

//       {showResult && (
//         <div className="result-overlay">
//           <div className="result-card">
//             <div className="result-header">
//               <h2>Mission Report</h2>
//               <div className="rocket-icon">🚀</div>
//             </div>

//             <div className="result-stats">
//               <div className="result-stat">
//                 <span className="stat-name">Final Score</span>
//                 <span className="stat-value">{score}</span>
//               </div>
//               <div className="result-stat">
//                 <span className="stat-name">Words Per Minute</span>
//                 <span className="stat-value">{wpm}</span>
//               </div>
//               <div className="result-stat">
//                 <span className="stat-name">High Score</span>
//                 <span className="stat-value">{highScore}</span>
//               </div>
//             </div>

//             <div className="result-message">
//               {score >= highScore && highScore > 0 ? (
//                 <p className="new-record">New Record! 🎉</p>
//               ) : (
//                 <p>Keep practicing astronaut!</p>
//               )}
//             </div>

//             <button 
//               className="close-result"
//               onClick={() => setShowResult(false)}
//             >
//               Continue Mission
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FastTypingGame;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase';
// import { doc, onSnapshot, setDoc } from 'firebase/firestore';
// import '../styles/FastTypingGame.css';
// import { updateDoc } from 'firebase/firestore';


// const aerospaceWords = [
//   'thrust', 'gravity', 'orbit', 'booster', 'capsule', 'delta-v',
//   'payload', 'propellant', 'gimbal', 'oxidizer', 'nozzle', 'launchpad',
//   'liftoff', 'trajectory', 'staging', 'thruster', 'aerodynamics', 'vacuum',
//   'module', 'cosmonaut', 'apogee', 'reentry', 'turbopump', 'burnout'
// ];

// const FastTypingGame = () => {
//   const [word, setWord] = useState('');
//   const [input, setInput] = useState('');
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [score, setScore] = useState(0);
//   const [gameActive, setGameActive] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [highScore, setHighScore] = useState(0);
//   const inputRef = useRef();
//   const navigate = useNavigate();

//   // Real-time Firestore listener for high score
//   useEffect(() => {
//     const docRef = doc(db, 'leaderboard', 'cosmokid'); // Replace 'player1' with dynamic ID if needed
//     const unsubscribe = onSnapshot(docRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.data();
//         setHighScore(data.points || 0);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Start game logic
//   useEffect(() => {
//     if (!gameActive) return;

//     setWord(getRandomWord());
//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           endGame();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [gameActive]);

//   const getRandomWord = () => {
//     return aerospaceWords[Math.floor(Math.random() * aerospaceWords.length)];
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInput(value);

//     if (value.trim().toLowerCase() === word.toLowerCase()) {
//       setScore(prev => prev + 1);
//       setInput('');
//       setWord(getRandomWord());
//       animateSuccess();
//     }
//   };

//   const startGame = () => {
//     setScore(0);
//     setTimeLeft(30);
//     setInput('');
//     setGameActive(true);
//     setShowResult(false);
//     setTimeout(() => inputRef.current.focus(), 100);
//   };

//   const endGame = async () => {
//     setGameActive(false);
//     setShowResult(true);

//    if (score > highScore) {
//   try {
//     const docRef = doc(db, 'leaderboard', 'cosmokid'); // same doc you listen to
//     await updateDoc(docRef, {
//       points: score
//     });
//   } catch (error) {
//     console.error("Error updating high score:", error);
//   }
// }

//   };

//   const animateSuccess = () => {
//     const inputElement = inputRef.current;
//     inputElement.classList.add('success-animation');
//     setTimeout(() => {
//       inputElement.classList.remove('success-animation');
//     }, 300);
//   };

//   const wpm = Math.round((score / (30 - timeLeft || 1)) * 60);

//   return (
//     <div className="typing-game-container">
//       <div className="stars"></div>
//       <div className="twinkling"></div>

//       <div className="game-header">
//         <h1>AstroType Challenge</h1>
//         <p>Type aerospace terms as fast as rockets launch!</p>
//       </div>

//       <div className="game-display">
//         <div className="word-display">
//           {word.split('').map((letter, index) => (
//             <span 
//               key={index}
//               className={
//                 input.length > index 
//                   ? input[index].toLowerCase() === letter.toLowerCase()
//                     ? 'correct'
//                     : 'incorrect'
//                   : ''
//               }
//             >
//               {letter}
//             </span>
//           ))}
//         </div>

//         <input
//           ref={inputRef}
//           type="text"
//           value={input}
//           onChange={handleChange}
//           disabled={!gameActive || timeLeft === 0}
//           placeholder={gameActive ? "Type here..." : "Press Start"}
//           className={gameActive ? 'active-input' : ''}
//         />
//       </div>

//       <div className="game-stats">
//         <div className="stat-box">
//           <div className="stat-label">Time</div>
//           <div className="stat-value">{timeLeft}s</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">Score</div>
//           <div className="stat-value">{score}</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">High Score</div>
//           <div className="stat-value">{highScore}</div>
//         </div>
//         <div className="stat-box">
//           <div className="stat-label">WPM</div>
//           <div className="stat-value">{wpm}</div>
//         </div>
//       </div>

//       <button 
//         className={`start-button ${gameActive ? 'active' : ''}`}
//         onClick={startGame}
//       >
//         {gameActive ? 'Restart' : 'Launch Game'}
//       </button>
      
//       <button onClick={() => navigate('/dashboard')} className="home-button">
//         Return to Home Base
//       </button>

//       {showResult && (
//         <div className="result-overlay">
//           <div className="result-card">
//             <div className="result-header">
//               <h2>Mission Report</h2>
//               <div className="rocket-icon">🚀</div>
//             </div>

//             <div className="result-stats">
//               <div className="result-stat">
//                 <span className="stat-name">Final Score</span>
//                 <span className="stat-value">{score}</span>
//               </div>
//               <div className="result-stat">
//                 <span className="stat-name">Words Per Minute</span>
//                 <span className="stat-value">{wpm}</span>
//               </div>
//               <div className="result-stat">
//                 <span className="stat-name">High Score</span>
//                 <span className="stat-value">{highScore}</span>
//               </div>
//             </div>

//             <div className="result-message">
//               {score >= highScore && highScore > 0 ? (
//                 <p className="new-record">New Record! 🎉</p>
//               ) : (
//                 <p>Keep practicing astronaut!</p>
//               )}
//             </div>

//             <button 
//               className="close-result"
//               onClick={() => setShowResult(false)}
//             >
//               Continue Mission
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FastTypingGame;




import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import '../styles/FastTypingGame.css';

const aerospaceWords = [
  'thrust', 'gravity', 'orbit', 'booster', 'capsule', 'delta-v',
  'payload', 'propellant', 'gimbal', 'oxidizer', 'nozzle', 'launchpad',
  'liftoff', 'trajectory', 'staging', 'thruster', 'aerodynamics', 'vacuum',
  'module', 'cosmonaut', 'apogee', 'reentry', 'turbopump', 'burnout'
];

const FastTypingGame = () => {
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [userId, setUserId] = useState(null); // Add user ID state
  const inputRef = useRef();
  const navigate = useNavigate();

  // Initialize user ID (replace with your auth logic)
  useEffect(() => {
    // In a real app, you'd get this from your auth system
    const fakeUserId = 'cosmokid'; // Replace with actual user ID
    setUserId(fakeUserId);
  }, []);

  // Real-time Firestore listener for high score
  useEffect(() => {
    if (!userId) return; // Don't run until we have a user ID

    const docRef = doc(db, 'leaderboard', userId);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setHighScore(data.points || 0);
      } else {
        // Initialize if document doesn't exist
        updateDoc(docRef, { points: 0 })
          .then(() => setHighScore(0))
          .catch(console.error);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Start game logic
  useEffect(() => {
    if (!gameActive) return;

    setWord(getRandomWord());
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  const getRandomWord = () => {
    return aerospaceWords[Math.floor(Math.random() * aerospaceWords.length)];
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim().toLowerCase() === word.toLowerCase()) {
      setScore(prev => prev + 1);
      setInput('');
      setWord(getRandomWord());
      animateSuccess();
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setInput('');
    setGameActive(true);
    setShowResult(false);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const endGame = async () => {
    setGameActive(false);
    setShowResult(true);
        await updateDoc(doc(db, 'leaderboard', userId), {
          points: score,
          lastUpdated: new Date().toISOString()
        });
        // No need to setHighScore here - the snapshot listener will update it
     
 
  };

  const animateSuccess = () => {
    const inputElement = inputRef.current;
    inputElement.classList.add('success-animation');
    setTimeout(() => {
      inputElement.classList.remove('success-animation');
    }, 300);
  };

  const wpm = Math.round((score / (30 - timeLeft || 1)) * 60);

  return (
    <div className="typing-game-container">
      <div className="stars"></div>
      <div className="twinkling"></div>

      <div className="game-header">
        <h1>AstroType Challenge</h1>
        <p>Type aerospace terms as fast as rockets launch!</p>
      </div>

      <div className="game-display">
        <div className="word-display">
          {word.split('').map((letter, index) => (
            <span 
              key={index}
              className={
                input.length > index 
                  ? input[index].toLowerCase() === letter.toLowerCase()
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }
            >
              {letter}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          disabled={!gameActive || timeLeft === 0}
          placeholder={gameActive ? "Type here..." : "Press Start"}
          className={gameActive ? 'active-input' : ''}
        />
      </div>

      <div className="game-stats">
        <div className="stat-box">
          <div className="stat-label">Time</div>
          <div className="stat-value">{timeLeft}s</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Score</div>
          <div className="stat-value">{score}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">High Score</div>
          <div className="stat-value">{highScore}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">WPM</div>
          <div className="stat-value">{wpm}</div>
        </div>
      </div>

      <button 
        className={`start-button ${gameActive ? 'active' : ''}`}
        onClick={startGame}
      >
        {gameActive ? 'Restart' : 'Launch Game'}
      </button>
      
      <button onClick={() => navigate('/dashboard')} className="home-button">
        Return to Home Base
      </button>

      {showResult && (
        <div className="result-overlay">
          <div className="result-card">
            <div className="result-header">
              <h2>Mission Report</h2>
              <div className="rocket-icon">🚀</div>
            </div>

            <div className="result-stats">
              <div className="result-stat">
                <span className="stat-name">Final Score</span>
                <span className="stat-value">{score}</span>
              </div>
              <div className="result-stat">
                <span className="stat-name">Words Per Minute</span>
                <span className="stat-value">{wpm}</span>
              </div>
              <div className="result-stat">
                <span className="stat-name">High Score</span>
                <span className="stat-value">{highScore}</span>
              </div>
            </div>

            <div className="result-message">
              {score >= highScore && highScore > 0 ? (
                <p className="new-record">New Record! 🎉</p>
              ) : (
                <p>Keep practicing astronaut!</p>
              )}
            </div>

            <button 
              className="close-result"
              onClick={() => setShowResult(false)}
            >
              Continue Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FastTypingGame;

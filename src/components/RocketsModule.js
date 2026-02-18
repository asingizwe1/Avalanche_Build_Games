import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import QuizComponent from '../components/QuizComponent';
import AIChatWidget from '../components/AIChatWidget';
import RocketSimulator from '../components/RocketSimulator';
import '../styles/RocketsModule.css';

const RocketsModule = () => {
  const [activeTab, setActiveTab] = useState('lessons');
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const navigate = useNavigate();

  const lessons = [
    {
      id: 'intro',
      title: 'Introduction to Rocket Science',
      content: (
        <div className="lesson-content">
          <h3>What Makes Rockets Fly?</h3>
          <p>Rockets work on the principle of Newton's Third Law: for every action, there is an equal and opposite reaction.</p>
          
          <div className="interactive-demo">
            <ReactPlayer 
              url="https://www.youtube.com/watch?v=1yBwWLunlOM" 
              width="100%"
              height="400px"
              controls
            />
          </div>
          
          <h4>Key Components:</h4>
          <div className="rocket-model">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <RocketModel />
              <OrbitControls />
            </Canvas>
          </div>
          
          <ul className="component-list">
            <li><strong>Payload:</strong> The spacecraft or satellite being launched</li>
            <li><strong>Guidance System:</strong> Controls the rocket's flight path</li>
            <li><strong>Propulsion System:</strong> Engines and fuel that provide thrust</li>
            <li><strong>Structural System:</strong> The frame and outer shell</li>
          </ul>
        </div>
      )
    },
    {
      id: 'propulsion',
      title: 'Rocket Propulsion Systems',
      content: (
        <div className="lesson-content">
          <h3>How Rocket Engines Work</h3>
          <p>Rocket engines combine fuel and oxidizer to create hot gases that expand and are ejected at high speed.</p>
          
          <div className="animation-container">
            <RocketEngineAnimation />
          </div>
          
          <h4>Types of Rocket Propulsion:</h4>
          <div className="propulsion-types">
            <div className="propulsion-card">
              <h5>Chemical Rockets</h5>
              <p>Use chemical reactions to produce thrust (most common type)</p>
            </div>
            <div className="propulsion-card">
              <h5>Electric Propulsion</h5>
              <p>Uses electrical energy to accelerate propellant</p>
            </div>
            <div className="propulsion-card">
              <h5>Nuclear Thermal</h5>
              <p>Uses nuclear reactions to heat propellant</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'staging',
      title: 'Rocket Staging',
      content: (
        <div className="lesson-content">
          <h3>Why Rockets Have Stages</h3>
          <p>Staging allows rockets to shed weight as they ascend, becoming more efficient.</p>
          
          <div className="staging-animation">
            <RocketStagingAnimation />
          </div>
          
          <h4>Common Staging Configurations:</h4>
          <div className="staging-types">
            <div className="stage-card">
              <h5>Single Stage</h5>
              <p>Simple design but limited payload capacity</p>
            </div>
            <div className="stage-card">
              <h5>Two Stage</h5>
              <p>Most common for orbital launches</p>
            </div>
            <div className="stage-card">
              <h5>Three Stage</h5>
              <p>Used for heavy payloads or high orbits</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'water-rockets',
      title: 'Water Bottle Rockets',
      content: (
        <div className="lesson-content">
          <h3>DIY Rocket Science</h3>
          <p>Water bottle rockets demonstrate basic rocket principles using water and compressed air.</p>
          
          <div className="interactive-simulator">
            <button 
              className="simulator-button"
              onClick={() => setShowSimulator(true)}
            >
              Launch Water Rocket Simulator
            </button>
          </div>
          
          <h4>How to Build Your Own:</h4>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <p>Use a 2-liter plastic bottle as the rocket body</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Add fins for stability (cardboard or plastic)</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Create a nose cone for aerodynamics</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <p>Fill 1/3 with water and pressurize with air pump</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const quizzes = {
    intro: {
      questions: [
        {
          question: "What principle explains how rockets work?",
          options: [
            "Bernoulli's Principle",
            "Newton's Third Law",
            "Pascal's Law",
            "Archimedes' Principle"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of these is NOT a main rocket component?",
          options: [
            "Payload",
            "Guidance System",
            "Structural System",
            "Cooling Vanes"
          ],
          correctAnswer: 3
        }
      ]
    },
    propulsion: {
      questions: [
        {
          question: "What do rocket engines combine to create thrust?",
          options: [
            "Fuel and oxidizer",
            "Water and air",
            "Electricity and magnets",
            "Solar energy and wind"
          ],
          correctAnswer: 0
        },
        {
          question: "Which propulsion system is most common?",
          options: [
            "Chemical rockets",
            "Electric propulsion",
            "Nuclear thermal",
            "Solar sails"
          ],
          correctAnswer: 0
        }
      ]
    }
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      setProgress(Math.min(100, progress + 25));
    }
  };

  return (
    <div className="rockets-module-container">
      {/* 3D Space Background */}
      <div className="space-bg"></div>
      
      <div className="module-header">
        <h1>Rocket Science</h1>
        <p>Explore the fundamentals of space propulsion and rocket technology</p>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <span>{progress}% Complete</span>
        </div>
      </div>
      
      <div className="module-nav">
        <button 
          className={activeTab === 'lessons' ? 'active' : ''}
          onClick={() => setActiveTab('lessons')}
        >
          Lessons
        </button>
        <button 
          className={activeTab === 'simulator' ? 'active' : ''}
          onClick={() => setActiveTab('simulator')}
        >
          Simulator
        </button>
        <button 
          className={activeTab === 'resources' ? 'active' : ''}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </div>
      
      <div className="module-content">
        {activeTab === 'lessons' && (
          <div className="lessons-container">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="lesson-card">
                <h2>{lesson.title}</h2>
                {lesson.content}
                <div className="lesson-actions">
                  {quizzes[lesson.id] && (
                    <button 
                      className="quiz-button"
                      onClick={() => setShowQuiz(lesson.id)}
                    >
                      Take Quiz
                    </button>
                  )}
                  <button 
                    className="complete-button"
                    onClick={() => completeLesson(lesson.id)}
                    disabled={completedLessons.includes(lesson.id)}
                  >
                    {completedLessons.includes(lesson.id) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'simulator' && (
          <div className="simulator-container">
            <RocketSimulator />
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div className="resources-container">
            <h2>Additional Resources</h2>
            <div className="resource-cards">
              <div className="resource-card">
                <h3>NASA Rocketry Guides</h3>
                <p>Official NASA educational materials on rocketry</p>
                <a href="https://www.nasa.gov/stem" target="_blank" rel="noopener noreferrer">Visit</a>
              </div>
              <div className="resource-card">
                <h3>Rocket Equations</h3>
                <p>Interactive Tsiolkovsky rocket equation calculator</p>
                <a href="#rocket-equation" onClick={() => navigate('/tools/rocket-equation')}>Open Tool</a>
              </div>
              <div className="resource-card">
                <h3>Rocket History</h3>
                <p>Timeline of important developments in rocketry</p>
                <a href="#history" onClick={() => navigate('/history/rockets')}>Explore</a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quiz Modal */}
      {showQuiz && (
        <div className="quiz-modal">
          <div className="quiz-modal-content">
            <button 
              className="close-quiz"
              onClick={() => setShowQuiz(false)}
            >
              ×
            </button>
            <QuizComponent 
              questions={quizzes[showQuiz].questions}
              onComplete={() => {
                setShowQuiz(false);
                completeLesson(showQuiz);
              }}
            />
          </div>
        </div>
      )}
      
      {/* Water Rocket Simulator */}
      {showSimulator && (
        <div className="simulator-modal">
          <div className="simulator-modal-content">
            <button 
              className="close-simulator"
              onClick={() => setShowSimulator(false)}
            >
              ×
            </button>
            <WaterRocketSimulator />
          </div>
        </div>
      )}
      
      {/* AI Chat Widget */}
      <AIChatWidget 
        topic="rocket science"
        position="bottom-right"
      />
    </div>
  );
};

// 3D Rocket Model Component
function RocketModel() {
  const { scene } = useGLTF('/rocket.glb');
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
}

// Animation Components would be implemented similarly
function RocketEngineAnimation() {
  return (
    <div className="engine-animation">
      {/* SVG or Canvas animation would go here */}
      <svg viewBox="0 0 200 100">
        {/* Animation paths for rocket engine */}
      </svg>
    </div>
  );
}

function RocketStagingAnimation() {
  return (
    <div className="staging-animation">
      {/* Animation of rocket stages separating */}
    </div>
  );
}

function WaterRocketSimulator() {
  const [pressure, setPressure] = useState(30);
  const [waterLevel, setWaterLevel] = useState(33);
  const [isFlying, setIsFlying] = useState(false);
  
  const launchRocket = () => {
    setIsFlying(true);
    // Simulation logic would go here
  };
  
  return (
    <div className="water-rocket-simulator">
      <h3>Water Rocket Simulator</h3>
      <div className="simulator-controls">
        <div className="control-group">
          <label>Pressure (psi): {pressure}</label>
          <input 
            type="range" 
            min="20" 
            max="80" 
            value={pressure}
            onChange={(e) => setPressure(e.target.value)}
          />
        </div>
        <div className="control-group">
          <label>Water Level (%): {waterLevel}</label>
          <input 
            type="range" 
            min="10" 
            max="50" 
            value={waterLevel}
            onChange={(e) => setWaterLevel(e.target.value)}
          />
        </div>
        <button 
          className="launch-button"
          onClick={launchRocket}
          disabled={isFlying}
        >
          {isFlying ? 'In Flight!' : 'Launch Rocket'}
        </button>
      </div>
      <div className="simulator-visual">
        {/* Animation of water rocket would go here */}
      </div>
    </div>
  );
}

export default RocketsModule;
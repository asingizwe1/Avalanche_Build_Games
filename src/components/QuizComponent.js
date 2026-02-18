import React, { useState } from 'react';
import '../styles/QuizComponent.css';

const QuizComponent = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    if (!answered) {
      setSelectedAnswer(answerIndex);
      setAnswered(true);
      
      if (answerIndex === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  if (showResult) {
    return (
      <div className="quiz-result">
        <h2>Quiz Complete!</h2>
        <p>Your score: {score} out of {questions.length}</p>
        <div className="result-message">
          {score === questions.length ? (
            <div className="perfect-score">
              <span>🚀 Perfect! You're a rocket science expert!</span>
            </div>
          ) : score >= questions.length / 2 ? (
            <div className="good-score">
              <span>👍 Good job! Keep learning!</span>
            </div>
          ) : (
            <div className="improve-score">
              <span>📚 Review the material and try again!</span>
            </div>
          )}
        </div>
        <div className="quiz-actions">
          <button onClick={resetQuiz}>Retake Quiz</button>
          <button onClick={onComplete}>Continue Learning</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      <h3 className="quiz-question">
        {questions[currentQuestion].question}
      </h3>
      <div className="quiz-options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`quiz-option ${
              selectedAnswer === index ? 'selected' : ''
            } ${
              answered && index === questions[currentQuestion].correctAnswer 
                ? 'correct' 
                : ''
            } ${
              answered && 
              selectedAnswer === index && 
              selectedAnswer !== questions[currentQuestion].correctAnswer 
                ? 'incorrect' 
                : ''
            }`}
            onClick={() => handleAnswerSelect(index)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className="quiz-feedback">
          {selectedAnswer === questions[currentQuestion].correctAnswer ? (
            <div className="correct-feedback">
              ✅ Correct! {questions[currentQuestion].explanation || ''}
            </div>
          ) : (
            <div className="incorrect-feedback">
              ❌ The correct answer is: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
            </div>
          )}
          <button 
            className="next-question"
            onClick={handleNextQuestion}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
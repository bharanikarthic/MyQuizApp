import React, { useState, useEffect } from 'react';
import Result from './new';
import './App.css';

const Quiz = () => {
  const questionsData = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Rome'],
      answer: 'Paris',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter'],
      answer: 'Mars',
    },
    {
      id: 3,
      question: 'Which is the largest ocean in the world?',
      options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean'],
      
      answer: 'Pacific Ocean',
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(questionsData);
  const [userData, setUserData] = useState(questionsData.map((question) => ({ ...question, isSelected: null })));
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); // 5 minutes in seconds

  const handleOptionChange = (event) => {
    const updatedUserData = [...userData];
    updatedUserData[currentQuestion].isSelected = event.target.value;
    setUserData(updatedUserData);
  };

  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    calculateScore();
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    userData.forEach((question) => {
      if (question.isSelected === question.answer) {
        score++;
      }
    });
    setQuizScore(score);
  };

  useEffect(() => {
    let interval;

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      handleSubmit(); // Automatically submit when time runs out
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  return (
    <div className='App' >
      <h1>Your test completed successfully</h1>
      {!showResults ? (
        <form onSubmit={handleSubmit}>
          <h2>Question {currentQuestion + 1}:</h2>
          <p>{questions[currentQuestion].question}</p>
          {questions[currentQuestion].options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`q${currentQuestion}-${index}`}
                name={`q${currentQuestion}`}
                value={option}
                checked={userData[currentQuestion].isSelected === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={`q${currentQuestion}-${index}`}>{option}</label>
            </div>
          ))}
          <br />
          {currentQuestion > 0 && <button type="button" onClick={prevQuestion}>Previous</button>}
          {currentQuestion < questions.length - 1 && <button type="button" onClick={nextQuestion}>Next</button>}
          {currentQuestion === questions.length - 1 && <button type="submit">Submit</button>}
          <p>Time Remaining: {timeRemaining} seconds</p>
        </form>
      ) : (
        <div>
          <p>Quiz Score: {quizScore} / {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;

import React, { useState, useEffect } from 'react';
import Question from './Question';
import ViolationPopup from './ViolationPopup';
import questionsData from './questions.json';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    JSON.parse(localStorage.getItem('quizUserAnswers')) || {}
  );
  const [showResult, setShowResult] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [showViolationPopup, setShowViolationPopup] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setViolationCount(prevCount => prevCount + 1);
        setShowViolationPopup(true);
      }
    };

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setShowViolationPopup(true);
      } else {
        setShowViolationPopup(false);
      }
    };

    const saveUserAnswers = () => {
      localStorage.setItem('quizUserAnswers', JSON.stringify(userAnswers));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    window.addEventListener('beforeunload', saveUserAnswers);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      window.removeEventListener('beforeunload', saveUserAnswers);
    };
  }, [userAnswers]);

  const handleAnswerSelect = (selectedOption) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const calculateMarks = () => {
    let marks = 0;
    questionsData.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        marks++;
      }
    });
    return marks;
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
    localStorage.removeItem('quizUserAnswers');
  };

  return (
    <div>
      {!showResult && currentQuestionIndex > 0 && (
        <button onClick={handlePreviousQuestion}>Previous</button>
      )}
      {!showResult && (
        <Question
          question={questionsData[currentQuestionIndex].question}
          options={questionsData[currentQuestionIndex].options}
          onSelect={handleAnswerSelect}
          selectedOption={userAnswers[currentQuestionIndex]}
        />
      )}
      {!showResult && currentQuestionIndex < questionsData.length - 1 && (
        <button onClick={handleNextQuestion}>Next</button>
      )}
      {showResult && (
        <div>
          <h2>Quiz Completed</h2>
          <p>Marks: {calculateMarks()}</p>
        </div>
      )}
      {!showResult && (
        <button onClick={handleFinishQuiz}>Finish Quiz</button>
      )}
      {showViolationPopup && <ViolationPopup count={violationCount} />}
    </div>
  );
};

export default Quiz;

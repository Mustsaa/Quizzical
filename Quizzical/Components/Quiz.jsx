import React, { useState } from 'react';

export default function Quiz({ questions }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));

  const handleSelect = (questionIndex, optionIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const checkAnswers = () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, questionIndex) => {
      if (answer === 0) { // since option1 is the correct answer in the data format
        newScore += 1;
      }
    });
    setScore(newScore);
    setResult(true);
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setResult(false);
    setSelectedAnswers(Array(questions.length).fill(null));
  };

  if (result) {
    return (
      <div className="container">
        <h1>Quiz Completed</h1>
        <p>Your Score: {score} / {questions.length}</p>
        <button onClick={resetQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="container">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h2>{questionIndex + 1}. {question.question}</h2>
          <ul>
            {[question.option1, question.option2, question.option3, question.option4].map((option, optionIndex) => (
              <li key={optionIndex}>
                <button
                  className={selectedAnswers[questionIndex] === optionIndex ? 'selected' : ''}
                  onClick={() => handleSelect(questionIndex, optionIndex)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
      <button onClick={checkAnswers}>Check answers</button>
    </div>
  );
}

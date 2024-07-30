import React, { useState, useEffect } from 'react'
import Quiz from './Components/Quiz'

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);

  const decodeHTML = (html) => {
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.results.map((question) => ({
          question: decodeHTML(question.question),
          option1: decodeHTML(question.correct_answer),
          option2: decodeHTML(question.incorrect_answers[0]),
          option3: decodeHTML(question.incorrect_answers[1]),
          option4: decodeHTML(question.incorrect_answers[2]),
          ans: 1 // since option1 is the correct answer
        }));
        setQuestions(formattedData);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching the quiz data:', error));
  }, []);

  const handleStart = () => {
    setStart(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {start ? (
        <Quiz questions={questions} />
      ) : (
        <div className="start-screen">
          <h1>Quizzical</h1>
          <button onClick={handleStart}>Start Quiz</button>
        </div>
      )}
    </div>
  );
}

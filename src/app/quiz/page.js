"use client";

import { useEffect, useState } from "react";
import { loadCSV } from "../../data/csvLoader";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await loadCSV("/datasets/quiz_questions.csv");
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadQuestions();
  }, []);

  if (questions.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Skill Assessment Quiz</h1>
        <p>Loading questions...</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [question.question_id]: option,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Skill Assessment Quiz</h1>

      <h2>
        Question {currentQuestion + 1} of {questions.length}
      </h2>

      <p>
        <strong>{question.question}</strong>
      </p>

      <button onClick={() => handleAnswer("A")}>
        {question.option_a}
      </button>

      <br />
      <br />

      <button onClick={() => handleAnswer("B")}>
        {question.option_b}
      </button>

      <br />
      <br />

      <button onClick={() => handleAnswer("C")}>
        {question.option_c}
      </button>

      <br />
      <br />

      <button onClick={() => handleAnswer("D")}>
        {question.option_d}
      </button>

      <br />
      <br />

      <p>
        Selected Answer:{" "}
        {answers[question.question_id] || "None"}
      </p>

      <button
        onClick={previousQuestion}
        disabled={currentQuestion === 0}
      >
        Previous
      </button>

      {"  "}

      <button
        onClick={nextQuestion}
        disabled={
          currentQuestion === questions.length - 1
        }
      >
        Next
      </button>
    </div>
  );
}
"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ResultsPage() {
  const [results, setResults] =
    useState(null);

  useEffect(() => {
    const savedResults =
      localStorage.getItem(
        "quizResults"
      );

    if (savedResults) {
      setResults(
        JSON.parse(savedResults)
      );
    }
  }, []);

  if (!results) {
    return (
      <div
        style={{
          padding: "20px",
        }}
      >
        <h1>
          No Results Found
        </h1>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Quiz Results
      </h1>

      <h2>
        Skill Scores
      </h2>

      <pre>
        {JSON.stringify(
          results.skillScores,
          null,
          2
        )}
      </pre>

      <h2>
        Weak Skills
      </h2>

      <pre>
        {JSON.stringify(
          results.weakSkills,
          null,
          2
        )}
      </pre>
    </div>
  );
}
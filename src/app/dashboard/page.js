"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const savedResults =
      localStorage.getItem("quizResults");

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
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h1>Learning Dashboard</h1>

        <p>No quiz results found.</p>
      </div>
    );
  }

  const totalSteps =
    results.learningPath?.length || 0;

  const completedSteps = 0;

  const progress =
    totalSteps === 0
      ? 0
      : Math.round(
          (completedSteps /
            totalSteps) *
            100
        );

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow:
      "0px 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  };

  const statCard = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow:
      "0px 2px 10px rgba(0,0,0,0.1)",
    flex: 1,
    textAlign: "center",
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        AI Personalized Learning Dashboard
      </h1>

      {/* Statistics */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <div style={statCard}>
          <h2>
            {results.learningPath?.length || 0}
          </h2>

          <p>
            Learning Steps
          </p>
        </div>

        <div style={statCard}>
          <h2>
            {results.recommendedCourses
              ?.length || 0}
          </h2>

          <p>
            Courses
          </p>
        </div>

        <div style={statCard}>
          <h2>
            {results.recommendedResources
              ?.length || 0}
          </h2>

          <p>
            Resources
          </p>
        </div>

        <div style={statCard}>
          <h2>
            {results.weakSkills
              ?.length || 0}
          </h2>

          <p>
            Weak Skills
          </p>
        </div>
      </div>

      {/* Career */}

      <div style={cardStyle}>
        <h2>
          Recommended Career
        </h2>

        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {results
            .recommendedCareers?.[0]
            ?.career_name ||
            "Not Available"}
        </p>
      </div>

      {/* Progress */}

      <div style={cardStyle}>
        <h2>
          Progress Tracker
        </h2>

        <p>
          Total Steps:
          {" "}
          {totalSteps}
        </p>

        <p>
          Completed:
          {" "}
          {completedSteps}
        </p>

        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor:
              "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor:
                "#4CAF50",
            }}
          />
        </div>

        <p>
          {progress}% Complete
        </p>
      </div>

      {/* Learning Path */}

      <div style={cardStyle}>
        <h2>
          Learning Path
        </h2>

        <ol>
          {results.learningPath?.map(
            (
              step,
              index
            ) => (
              <li
                key={index}
                style={{
                  marginBottom:
                    "10px",
                }}
              >
                {step}
              </li>
            )
          )}
        </ol>
      </div>

      {/* Weak Skills */}

      <div style={cardStyle}>
        <h2>
          Weak Skills
        </h2>

        <ul>
          {results.weakSkills?.map(
            (
              skill,
              index
            ) => (
              <li key={index}>
                Skill ID:
                {" "}
                {skill}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Courses */}

      <div style={cardStyle}>
        <h2>
          Recommended Courses
        </h2>

        <ul>
          {results.recommendedCourses
            ?.slice(0, 10)
            .map(
              (
                course,
                index
              ) => (
                <li key={index}>
                  {
                    course.course_name
                  }
                </li>
              )
            )}
        </ul>
      </div>

      {/* Resources */}

      <div style={cardStyle}>
        <h2>
          Recommended Resources
        </h2>

        <ul>
          {results.recommendedResources
            ?.slice(0, 10)
            .map(
              (
                resource,
                index
              ) => (
                <li key={index}>
                  {
                    resource.title
                  }
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
}
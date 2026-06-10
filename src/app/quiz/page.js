"use client";

import { useEffect, useState } from "react";

import { loadCSV } from "../../data/csvLoader";

import {
  calculateSkillScores,
  convertToPercentages,
  getWeakSkills,
} from "../../services/quizService";

import {
  recommendCourses,
} from "../../services/recommendationEngine";

import {
  recommendCareers,
} from "../../services/careerRecommendationEngine";

import {
  recommendResources,
} from "../../services/resourceEngine";

import {
  generateLearningPath,
} from "../../services/learningPathGenerator";

import { useRouter } from "next/navigation";


export default function QuizPage() {
  // =========================
  // DATASETS
  // =========================

  const [questions, setQuestions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [careerPaths, setCareerPaths] = useState([]);
  const [resources, setResources] = useState([]);

  // =========================
  // QUIZ STATE
  // =========================

  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // =========================
  // RESULTS
  // =========================

  const [skillScores, setSkillScores] = useState({});
  const [weakSkills, setWeakSkills] = useState([]);

  const [recommendedCourses, setRecommendedCourses] =
    useState([]);

  const [recommendedCareers, setRecommendedCareers] =
    useState([]);

  const [recommendedResources, setRecommendedResources] =
    useState([]);

  const [skills, setSkills] = useState([]);

const [prerequisites, setPrerequisites] =
  useState([]);

const [learningPath, setLearningPath] =
  useState([]);

const [selectedCareer, setSelectedCareer] =
  useState(null);

  const [quizSubmitted, setQuizSubmitted] =
    useState(false);

  // =========================
  // LOAD DATASETS
  // =========================

  useEffect(() => {
    async function loadData() {
      try {
        const questionData = await loadCSV(
          "/datasets/quiz_questions.csv"
        );

        const courseData = await loadCSV(
          "/datasets/courses.csv"
        );

        const careerData = await loadCSV(
          "/datasets/career_paths.csv"
        );

        const resourceData = await loadCSV(
          "/datasets/learning_resources.csv"
        );
        const skillData = await loadCSV(
  "/datasets/skills.csv"
);

const prerequisiteData =
  await loadCSV(
    "/datasets/skill_prerequisites.csv"
  );

        setQuestions(questionData);
        setCourses(courseData);
        setCareerPaths(careerData);
        setResources(resourceData);
        
        setSkills(skillData);

        setPrerequisites(
        prerequisiteData
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (questions.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Skill Assessment Quiz</h1>
        <p>Loading Questions...</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  // =========================
  // ANSWER HANDLER
  // =========================

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [question.question_id]: option,
    });
  };

  // =========================
  // NAVIGATION
  // =========================

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

  // =========================
  // SUBMIT QUIZ
  // =========================

  const submitQuiz = () => {
    const scores =
      calculateSkillScores(
        questions,
        answers
      );

    const percentages =
      convertToPercentages(scores);

    const weak =
      getWeakSkills(percentages);

    const courseRecommendations =
      recommendCourses(
        weak,
        courses
      );

    const resourceRecommendations =
      recommendResources(
        weak,
        resources
      );

    const strongSkills =
      Object.entries(percentages)
        .filter(
          ([_, score]) =>
            score >= 70
        )
        .map(([skillId]) => skillId);

    const careers =
      recommendCareers(
        strongSkills,
        careerPaths
      );

    setSkillScores(percentages);

    setWeakSkills(weak);

    setRecommendedCourses(
      courseRecommendations
    );

    setRecommendedResources(
      resourceRecommendations
    );

    setRecommendedCareers(
      careers.slice(0, 5)
    );

     
     if (careers.length > 0) {
  const bestCareer = careers[0];

  const path =
    generateLearningPath(
      bestCareer,
      skills,
      prerequisites
    );

  setSelectedCareer(
    bestCareer
  );

  setLearningPath(path);
}
    const resultData = {
  skillScores: percentages,
  weakSkills: weak,
  recommendedCourses:
    courseRecommendations,
  recommendedResources:
    resourceRecommendations,
  recommendedCareers:
    careers.slice(0, 5),
  learningPath,
};

localStorage.setItem(
  "quizResults",
  JSON.stringify(resultData)
);
    setQuizSubmitted(true);

    console.log(percentages);
    console.log(weak);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Skill Assessment Quiz</h1>

      <h2>
        Question {currentQuestion + 1}
        {" / "}
        {questions.length}
      </h2>

      <p>
        <strong>
          {question.question}
        </strong>
      </p>

      <button
        onClick={() =>
          handleAnswer("A")
        }
      >
        {question.option_a}
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          handleAnswer("B")
        }
      >
        {question.option_b}
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          handleAnswer("C")
        }
      >
        {question.option_c}
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          handleAnswer("D")
        }
      >
        {question.option_d}
      </button>

      <br />
      <br />

      <p>
        Selected Answer:
        {" "}
        {answers[
          question.question_id
        ] || "None"}
      </p>

      <button
        onClick={previousQuestion}
        disabled={
          currentQuestion === 0
        }
      >
        Previous
      </button>

      {" "}

      {currentQuestion <
      questions.length - 1 ? (
        <button
          onClick={nextQuestion}
        >
          Next
        </button>
      ) : (
        <button
          onClick={submitQuiz}
        >
          Submit Quiz
        </button>
      )}

      {quizSubmitted && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border:
              "1px solid #ccc",
          }}
        >
          <h2>Quiz Results</h2>

          <h3>Skill Scores</h3>

          <pre>
            {JSON.stringify(
              skillScores,
              null,
              2
            )}
          </pre>

          <h3>Weak Skills</h3>

          <pre>
            {JSON.stringify(
              weakSkills,
              null,
              2
            )}
          </pre>

          <h3>
            Recommended Courses
          </h3>

          <ul>
            {recommendedCourses
              .slice(0, 10)
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

          <h3>
            Recommended Resources
          </h3>

          <ul>
            {recommendedResources
              .slice(0, 10)
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

  <h3>
  Recommended Careers
</h3>

<ul>
  {recommendedCareers.map(
    (
      career,
      index
    ) => (
      <li key={index}>
        {career.career_name}
        {" - "}
        {career.matchScore}
        %
      </li>
    )
  )}
</ul>

<h3>
  Selected Career
</h3>

<p>
  {selectedCareer
    ? selectedCareer.career_name
    : "Not Available"}
</p>

<h3>
  Learning Path
</h3>

<ol>
  {learningPath.map(
    (step, index) => (
      <li key={index}>
        {step}
      </li>
    )
  )}

</ol>
   </div>
      )}
    </div>
  );
}



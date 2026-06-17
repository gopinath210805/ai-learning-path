"use client";

import { useEffect, useMemo, useState } from "react";
import SkillChart from "../../components/SkillChart";
import CareerChart from "../../components/CareerChart";

const SKILL_NAMES = {
  1: "Java",
  2: "Python",
  3: "JavaScript",
  4: "React",
  5: "Node.js",
  6: "SQL",
  7: "Data Structures",
  8: "Algorithms",
  9: "Machine Learning",
  10: "Cloud Computing",
};

export default function DashboardPage() {
  const [results, setResults] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedResults = localStorage.getItem("quizResults");
      const savedProgress = localStorage.getItem("completedSteps");

      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          if (Array.isArray(parsed)) {
            setCompletedSteps(parsed);
          } else if (typeof parsed === "number") {
            setCompletedSteps([parsed]);
          } else {
            setCompletedSteps([]);
          }
        } catch {
          setCompletedSteps([]);
        }
      }

      if (savedResults) {
        setResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleStep = (step) => {
    const updatedSteps = completedSteps.includes(step)
      ? completedSteps.filter((item) => item !== step)
      : [...completedSteps, step];

    setCompletedSteps(updatedSteps);
    localStorage.setItem("completedSteps", JSON.stringify(updatedSteps));
  };

  const completedCount = completedSteps.length;

  const dashboardData = useMemo(() => {
    if (!results) return null;

    const learningSteps = results.learningPath?.length || 0;
    const courses = results.recommendedCourses?.length || 0;
    const resources = results.recommendedResources?.length || 0;
    const progress =
      learningSteps === 0
        ? 0
        : Math.round((completedCount / learningSteps) * 100);

    const skillChartData = Object.entries(results.skillScores || {}).map(
      ([skill, score]) => ({
        skill: SKILL_NAMES[skill] || `Skill ${skill}`,
        score,
      })
    );

    const careerChartData =
      results.recommendedCareers?.map((career) => ({
        career: career.career_name,
        score: Number(career.matchScore),
      })) || [];

    const averageSkillScore =
      skillChartData.length > 0
        ? Math.round(
            skillChartData.reduce((sum, item) => sum + item.score, 0) /
              skillChartData.length
          )
        : 0;

    return {
      learningSteps,
      courses,
      resources,
      progress,
      skillChartData,
      careerChartData,
      averageSkillScore,
    };
  }, [results, completedCount]);

  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return "N/A";
    }

    if (typeof value === "string" || typeof value === "number") {
      return value;
    }

    if (typeof value === "object") {
      return (
        value.title || value.name || value.course_name || JSON.stringify(value)
      );
    }

    return String(value);
  };

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  if (!results || !dashboardData) {
    return (
      <main className="p-6">
        <h1 className="mb-4 text-2xl font-semibold">Learning Dashboard</h1>
        <p className="text-gray-600">No quiz results found.</p>
      </main>
    );
  }

  const isComplete = dashboardData.progress === 100 && dashboardData.learningSteps > 0;

  const downloadCertificate = () => {
    const certification = {
      name: results?.recommendedCareers?.[0]?.career_name || "Learning Path",
      date: new Date().toLocaleDateString(),
      skillsLearned: results?.learningPath || [],
      completionDate: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(certification, null, 2);
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(dataStr));
    element.setAttribute("download", `certificate-${Date.now()}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-semibold">
        AI Personalized Learning Dashboard
      </h1>

      <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Learning Steps" value={dashboardData.learningSteps} />
        <StatCard title="Courses" value={dashboardData.courses} />
        <StatCard title="Resources" value={dashboardData.resources} />
        <StatCard
          title="Avg Skill Score"
          value={`${dashboardData.averageSkillScore}%`}
        />
      </section>

      <section className="mb-8 rounded-xl bg-white p-6 shadow">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Learning Progress</h2>
          <div className="flex items-center gap-2">
            {isComplete && <span className="text-2xl">🎉</span>}
            <span className={`font-bold ${isComplete ? "text-green-600" : "text-gray-900"}`}>
              {dashboardData.progress}%
            </span>
          </div>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full transition-all duration-500 ${
              isComplete ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${dashboardData.progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-600">
          {completedCount} of {dashboardData.learningSteps} steps completed
        </p>

        {isComplete && (
          <button
            onClick={downloadCertificate}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
          >
            📜 Download Certificate
          </button>
        )}
      </section>

      <section className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-semibold">Skill Analysis</h2>
        <SkillChart data={dashboardData.skillChartData} />
      </section>

      <section className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-semibold">
          Career Match Analytics
        </h2>
        <CareerChart data={dashboardData.careerChartData} />
      </section>

      <section className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-semibold">☑ Interactive Learning Path</h2>

        <div className="space-y-3">
          {results.learningPath?.map((step, index) => {
            const isCompleted = completedSteps.includes(step);
            return (
              <div
                key={index}
                className={`flex items-start gap-3 rounded-lg border-2 p-4 transition ${
                  isCompleted
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleStep(step)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />

                <div className="flex-1">
                  <div className={`font-semibold ${isCompleted ? "text-green-700" : "text-gray-900"}`}>
                    Step {index + 1}: {renderValue(step)}
                  </div>
                  {isCompleted && (
                    <div className="mt-1 text-sm text-green-600">✓ Completed</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-semibold">🃏 Recommended Courses</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.recommendedCourses?.map((course, index) => (
            <div
              key={course.course_id || index}
              className="rounded-lg border-2 border-gray-200 p-5 hover:shadow-lg hover:border-blue-400 transition transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900 flex-1">
                  {course.course_name || "Untitled Course"}
                </h3>
                <span className="text-2xl">📚</span>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <p className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {course.difficulty || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Duration:</strong> {course.duration_hours || 0} hrs
                </p>
                <p className="text-gray-600">
                  <strong>Rating:</strong> ⭐ {course.rating || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {results.recommendedResources?.length > 0 && (
        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-semibold">🃏 Resource Library</h2>

          <div className="grid gap-3 md:grid-cols-2">
            {results.recommendedResources.map((resource, index) => (
              <div
                key={index}
                className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4 hover:shadow-md hover:border-orange-400 transition"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">📖</span>
                  <p className="flex-1 text-gray-900 font-medium">
                    {typeof resource === "object" ? renderValue(resource) : resource}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

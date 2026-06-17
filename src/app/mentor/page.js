"use client";

import { useEffect, useRef, useState } from "react";

function getLocalMentorResponse(question, userLearningPath, recommendedCareer) {
  const q = question.toLowerCase();
  const careerLine = recommendedCareer ? `\n\nRecommended Career: ${recommendedCareer}` : "";

  if (
    q.includes("frontend") ||
    q.includes("react") ||
    q.includes("html") ||
    q.includes("css") ||
    q.includes("javascript")
  ) {
    return `Great question! For frontend development: Start with HTML & CSS fundamentals (2-3 weeks), then move to JavaScript (3-4 weeks). Once comfortable, dive into React (4-6 weeks). Build projects at each stage:\n\n1. HTML/CSS: Create a portfolio website\n2. JavaScript: Build a todo app or calculator\n3. React: Create a weather app or movie search app\n\nConsistent practice is key! Aim for 2-3 hours daily.`;
  }

  if (
    q.includes("backend") ||
    q.includes("python") ||
    q.includes("java") ||
    q.includes("node") ||
    q.includes("api")
  ) {
    return `Backend development requires strong fundamentals! Here's a roadmap:\n\n1. Programming Language (4-6 weeks): Python, Java, or Node.js\n2. Databases (2-3 weeks): Learn SQL and understand relational databases\n3. APIs & REST (2-3 weeks): Understand HTTP, REST principles\n4. Frameworks (4-6 weeks): Express, Django, Spring Boot\n\nPractice by building: Blog API → E-commerce backend → Social media clone`;
  }

  if (
    q.includes("data science") ||
    q.includes("data analytics") ||
    q.includes("machine learning") ||
    q.includes("python") ||
    q.includes("sql")
  ) {
    return `Data science journey:\n\n1. Python Fundamentals (3-4 weeks)\n2. Data Analysis: Pandas, NumPy (2-3 weeks)\n3. Data Visualization: Matplotlib, Seaborn (1-2 weeks)\n4. SQL & Databases (2-3 weeks)\n5. Statistics & ML: Scikit-learn basics (4-6 weeks)\n\nBuild projects: Stock analysis → Housing price prediction → Customer segmentation\n\nEstimated time: 4-5 months of consistent study.`;
  }

  if (
    q.includes("how long") ||
    q.includes("time") ||
    q.includes("how fast") ||
    q.includes("progress") ||
    q.includes("weeks") ||
    q.includes("months")
  ) {
    if (userLearningPath.length > 0) {
      return `Based on your personalized learning path (${userLearningPath.join(" → ")}), here's the timeline:\n\nYour Estimated Timeline:\n- Foundation phase: 4-6 weeks\n- Intermediate phase: 6-8 weeks\n- Project building: 4-6 weeks\n\nTotal: 3-5 months of dedicated learning (15-20 hours/week)\n\nTips for faster progress:\n✓ Code every single day\n✓ Build projects, don't just watch tutorials\n✓ Join communities (dev.to, Stack Overflow)\n✓ Find a study partner for accountability${careerLine}`;
    }

    return `Most people can learn programming fundamentals in:\n\n- Basics: 2-3 months (30-60 hours)\n- Intermediate: 3-4 months additional\n- Advanced: 6+ months\n\nThe key factor is consistency - 1 hour daily is better than 10 hours once a week!`;
  }

  if (
    q.includes("career") ||
    q.includes("job") ||
    q.includes("salary") ||
    q.includes("opportunity")
  ) {
    return `Career path advice:\n\nEntry-Level Opportunities (0-1 year experience):\n- Junior Developer roles\n- Internships\n- Freelance projects\n- Open source contributions\n\nSkills that matter:\n✓ Problem-solving ability\n✓ Portfolio with real projects\n✓ Communication skills\n✓ Willingness to learn\n\nBuilding your portfolio:\n1. Create 3-5 solid projects\n2. Host on GitHub with good documentation\n3. Deploy live projects (Vercel, Netlify)\n4. Write about your learning journey\n\nMost employers value demonstrated skills over years of experience early on!`;
  }

  if (
    q.includes("stuck") ||
    q.includes("difficult") ||
    q.includes("hard") ||
    q.includes("frustrated") ||
    q.includes("motivation") ||
    q.includes("overwhelmed")
  ) {
    return `It's completely normal to feel stuck - every developer goes through this! Here's what helps:\n\nWhen you're stuck:\n1. Take a break (15 min walk, stretch)\n2. Explain the problem out loud\n3. Look at documentation or tutorials\n4. Break the problem into smaller steps\n5. Ask for help in communities\n\nStaying motivated:\n✓ Celebrate small wins\n✓ Build things you're excited about\n✓ Connect with other learners\n✓ Remember why you started\n✓ Set realistic milestones\n\nThe struggle is part of learning - you're building muscle memory and problem-solving skills!`;
  }

  if (
    q.includes("how to learn") ||
    q.includes("study tips") ||
    q.includes("best way") ||
    q.includes("approach") ||
    q.includes("method")
  ) {
    return `Effective learning strategies:\n\nThe Learning Cycle:\n1. Learn by watching/reading (20%)\n2. Engage by coding along (30%)\n3. Practice by building projects (50%)\n\nTechniques that work:\n✓ Active recall: Try coding without looking at notes\n✓ Spaced repetition: Review old projects weekly\n✓ Project-based learning: Build as you learn\n✓ Teaching others: Explain concepts to friends\n✓ Deliberate practice: Work on your weak areas\n\nAvoid tutorial hell - build real projects early and often!`;
  }

  if (userLearningPath.length > 0) {
    return `That's a great question! Based on your learning path (${userLearningPath.join(" → ")}), here's my advice:\n\nCurrent Focus Areas:\n${userLearningPath.map((skill, index) => `${index + 1}. Master ${skill} with 2-3 real projects`).join("\n")}\n\nKey Principles:\n- Build projects at every stage\n- Practice consistently (daily)\n- Focus on understanding, not memorizing\n- Review and refactor old code\n\nYour personalized path is designed to build strong fundamentals first, then progressively advance. Stick with it!${careerLine}`;
  }

  return `Great question! Here's my general advice:\n\nFor any tech skill:\n1. Foundation First: Understand core concepts deeply\n2. Practice Daily: Even 30 minutes beats occasional long sessions\n3. Build Projects: Apply what you learn to real problems\n4. Join Community: Connect with other learners\n5. Iterate: Review, refactor, and improve your code${careerLine}\n\nWhat specific skill are you focusing on? I can give more tailored advice!`;
}

export default function MentorPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLearningPath, setUserLearningPath] = useState([]);
  const [skillScores, setSkillScores] = useState({});
  const [recommendedCareer, setRecommendedCareer] = useState("");
  const [hasQuizProfile, setHasQuizProfile] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const historyLoadedRef = useRef(false);

  useEffect(() => {
    const loadLearningPath = () => {
      try {
        const savedResults = localStorage.getItem("quizResults");
        if (!savedResults) {
          return;
        }

        const results = JSON.parse(savedResults);
        const loadedLearningPath = Array.isArray(results.learningPath) ? results.learningPath : [];
        const loadedSkillScores = results.skillScores && typeof results.skillScores === "object" ? results.skillScores : {};
        const loadedRecommendedCareer = Array.isArray(results.recommendedCareers) && results.recommendedCareers.length > 0
          ? String(results.recommendedCareers[0]?.career_name || "")
          : "";

        setUserLearningPath(loadedLearningPath);
        setSkillScores(loadedSkillScores);
        setRecommendedCareer(
          loadedRecommendedCareer
        );
        setHasQuizProfile(
          loadedLearningPath.length > 0 ||
            Object.keys(loadedSkillScores).length > 0 ||
            Boolean(loadedRecommendedCareer)
        );
      } catch (error) {
        console.error("Error loading learning path:", error);
        setHasQuizProfile(false);
      }
    };

    const frameId = window.requestAnimationFrame(loadLearningPath);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const savedHistory = localStorage.getItem("mentorChatHistory");
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            setChatHistory(parsedHistory);
          }
        }
      } catch (error) {
        console.error("Error loading mentor chat history:", error);
      } finally {
        historyLoadedRef.current = true;
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!historyLoadedRef.current) {
      return;
    }

    localStorage.setItem("mentorChatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const askMentor = async () => {
    if (!question.trim()) {
      setAnswer("Please ask me a question about your learning journey!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          skillScores,
          learningPath: userLearningPath,
          recommendedCareer,
          chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Mentor API failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data?.answer) {
        setAnswer(data.answer);
        setChatHistory((currentHistory) => [
          ...currentHistory,
          { role: "user", content: question },
          { role: "assistant", content: data.answer },
        ]);
        setQuestion("");
        return;
      }

      throw new Error("Mentor API returned an empty answer.");
    } catch (error) {
      console.error("Gemini request failed, using local fallback:", error);
      const fallbackAnswer = getLocalMentorResponse(question, userLearningPath, recommendedCareer);
      setAnswer(fallbackAnswer);
      setChatHistory((currentHistory) => [
        ...currentHistory,
        { role: "user", content: question },
        { role: "assistant", content: fallbackAnswer },
      ]);
      setQuestion("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="mb-2 text-3xl font-semibold">🤖 AI Learning Mentor</h1>
      <p className="mb-6 text-gray-600">Personalized guidance for your learning journey</p>

      <div className="rounded-lg bg-white p-6 shadow">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Ask me anything about learning, career growth, or your skill development:
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., 'How should I learn React?', 'How long will this take?', 'What if I'm stuck?'"
          className="h-32 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={askMentor}
          disabled={loading}
          className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask Mentor"}
        </button>

        {!hasQuizProfile && (
          <p className="mt-3 text-sm text-amber-700">
            No saved quiz profile found yet. Take the quiz first to get personalized mentor answers.
          </p>
        )}
      </div>

      {chatHistory.length > 0 && (
        <section className="mt-8 rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Conversation History</h2>
            <button
              type="button"
              onClick={() => {
                setChatHistory([]);
                setAnswer("");
                localStorage.removeItem("mentorChatHistory");
              }}
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Clear History
            </button>
          </div>

          <div className="space-y-3">
            {chatHistory.slice(-6).map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-50 text-blue-950"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
                  {message.role === "user" ? "You" : "Mentor"}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {answer && (
        <div className="mt-8 rounded-lg border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">💡 Mentor Response</h2>
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {answer}
          </p>
        </div>
      )}
    </main>
  );
}

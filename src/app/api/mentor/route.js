import OpenAI from "openai";

function formatSkillScores(skillScores) {
  if (!skillScores || typeof skillScores !== "object") {
    return "No skill scores provided.";
  }

  const entries = Object.entries(skillScores);
  if (entries.length === 0) {
    return "No skill scores provided.";
  }

  return entries.map(([skill, score]) => `${skill}: ${score}%`).join(" | ");
}

function formatChatHistory(chatHistory) {
  if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
    return "No previous conversation.";
  }

  return chatHistory
    .slice(-6)
    .map((message) => {
      const role = message?.role === "assistant" ? "Assistant" : "User";
      const content = String(message?.content || "").trim();
      return `${role}: ${content}`;
    })
    .join("\n");
}

function getFallbackMentorResponse(question, learningPath, recommendedCareer) {
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
    if (learningPath.length > 0) {
      return `Based on your personalized learning path (${learningPath.join(" → ")}), here's the timeline:\n\nYour Estimated Timeline:\n- Foundation phase: 4-6 weeks\n- Intermediate phase: 6-8 weeks\n- Project building: 4-6 weeks\n\nTotal: 3-5 months of dedicated learning (15-20 hours/week)\n\nTips for faster progress:\n✓ Code every single day\n✓ Build projects, don't just watch tutorials\n✓ Join communities (dev.to, Stack Overflow)\n✓ Find a study partner for accountability`;
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

  if (learningPath.length > 0) {
    return `That's a great question! Based on your learning path (${learningPath.join(" → ")}), here's my advice:\n\nCurrent Focus Areas:\n${learningPath.map((skill, index) => `${index + 1}. Master ${skill} with 2-3 real projects`).join("\n")}\n\nKey Principles:\n- Build projects at every stage\n- Practice consistently (daily)\n- Focus on understanding, not memorizing\n- Review and refactor old code\n\nYour personalized path is designed to build strong fundamentals first, then progressively advance. Stick with it!${careerLine}`;
  }

  return `Great question! Here's my general advice:\n\nFor any tech skill:\n1. Foundation First: Understand core concepts deeply\n2. Practice Daily: Even 30 minutes beats occasional long sessions\n3. Build Projects: Apply what you learn to real problems\n4. Join Community: Connect with other learners\n5. Iterate: Review, refactor, and improve your code${careerLine}\n\nWhat specific skill are you focusing on? I can give more tailored advice!`;
}

export async function POST(request) {
  let question = "";
  let learningPath = [];
  let recommendedCareer = "";
  let skillScores = {};
  let chatHistory = [];

  try {
    const body = await request.json();
    question = String(body?.question || "").trim();
    learningPath = Array.isArray(body?.learningPath)
      ? body.learningPath
      : [];
    recommendedCareer = String(body?.recommendedCareer || "").trim();
    skillScores = body?.skillScores && typeof body.skillScores === "object"
      ? body.skillScores
      : {};
    chatHistory = Array.isArray(body?.chatHistory) ? body.chatHistory : [];

    if (!question) {
      return Response.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return Response.json({
        answer: getFallbackMentorResponse(question, learningPath, recommendedCareer),
        source: "fallback",
      });
    }

    const prompt = [
      "You are an AI learning mentor for a personalized learning platform.",
      "Give concise, practical, encouraging answers.",
      "When relevant, include a learning sequence, project idea, and estimated time.",
      "Use the user's quiz results to personalize the answer.",
      `User learning path: ${learningPath.length > 0 ? learningPath.join(" -> ") : "not provided"}`,
      `Recommended career: ${recommendedCareer || "not provided"}`,
      `Skill scores: ${formatSkillScores(skillScores)}`,
      `Recent conversation:\n${formatChatHistory(chatHistory)}`,
      `User question: ${question}`,
      "Respond in plain text with short paragraphs or bullets when helpful.",
    ].join("\n\n");

    const client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Learning Path",
      },
    });

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return Response.json({
        answer: getFallbackMentorResponse(question, learningPath, recommendedCareer),
        source: "fallback",
      });
    }

    return Response.json({ answer, source: "openrouter" });
  } catch (error) {
    return Response.json({
      answer: getFallbackMentorResponse(question, learningPath, recommendedCareer),
      source: "fallback",
      warning: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

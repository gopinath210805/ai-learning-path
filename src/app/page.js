"use client";

import { useEffect, useState } from "react";
import { loadCSV } from "../data/csvLoader";

export default function Home() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await loadCSV("/datasets/skills.csv");
        setSkills(data);
        console.log("Skills Loaded:", data);
      } catch (error) {
        console.error(error);
      }
    }

    loadSkills();
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>AI Personalized Learning Path</h1>

      <h2>Total Skills: {skills.length}</h2>

      <ul>
        {skills.slice(0, 10).map((skill) => (
          <li key={skill.skill_id}>
            {skill.skill_name} ({skill.category})
          </li>
        ))}
      </ul>
    </main>
  );
}
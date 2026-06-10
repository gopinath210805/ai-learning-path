export function generateLearningPath(
  career,
  skills,
  prerequisites
) {
  const requiredSkills =
    career.required_skills.split(";");

  const path = [];

  requiredSkills.forEach((skillName) => {
    const skill = skills.find(
      (s) =>
        s.skill_name.trim() === skillName.trim()
    );

    if (!skill) return;

    const prereqs = prerequisites.filter(
      (p) =>
        Number(p.skill_id) ===
        Number(skill.skill_id)
    );

    prereqs.forEach((p) => {
      const prereqSkill = skills.find(
        (s) =>
          Number(s.skill_id) ===
          Number(p.prerequisite_skill_id)
      );

      if (
        prereqSkill &&
        !path.includes(prereqSkill.skill_name)
      ) {
        path.push(prereqSkill.skill_name);
      }
    });

    if (!path.includes(skill.skill_name)) {
      path.push(skill.skill_name);
    }
  });

  return path;
}
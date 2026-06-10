export function recommendCareers(
  userSkills,
  careerPaths
) {
  return careerPaths
    .map((career) => {
      const requiredSkills =
        career.required_skills
          .split(";")
          .map((skill) => skill.trim());

      const matchedSkills =
        requiredSkills.filter((skill) =>
          userSkills.includes(skill)
        );

      const matchScore = Math.round(
        (matchedSkills.length /
          requiredSkills.length) *
          100
      );

      return {
        ...career,
        matchScore,
      };
    })
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );
}
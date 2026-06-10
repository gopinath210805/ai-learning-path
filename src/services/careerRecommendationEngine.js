export function recommendCareers(
  userSkills,
  careers
) {
  return careers
    .map((career) => {
      const required =
        career.required_skills.split(";");

      const matches = required.filter(
        (skill) => userSkills.includes(skill)
      ).length;

      const score =
        (matches / required.length) * 100;

      return {
        ...career,
        matchScore: Math.round(score),
      };
    })
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );
}
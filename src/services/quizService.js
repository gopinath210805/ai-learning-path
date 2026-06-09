export function calculateSkillScores(questions, answers) {
  const skillScores = {};

  questions.forEach((question) => {
    const userAnswer = answers[question.question_id];

    if (!skillScores[question.skill_id]) {
      skillScores[question.skill_id] = {
        correct: 0,
        total: 0,
      };
    }

    skillScores[question.skill_id].total++;

    if (userAnswer === question.correct_answer) {
      skillScores[question.skill_id].correct++;
    }
  });

  return skillScores;
}

export function convertToPercentages(skillScores) {
  const result = {};

  Object.keys(skillScores).forEach((skillId) => {
    const score = skillScores[skillId];

    result[skillId] = Math.round(
      (score.correct / score.total) * 100
    );
  });

  return result;
}
export function getWeakSkills(skillPercentages) {
  return Object.entries(skillPercentages)
    .filter(([_, score]) => score < 70)
    .map(([skillId]) => Number(skillId));
}
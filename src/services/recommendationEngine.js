export function recommendCourses(
  weakSkillIds,
  courses
) {
  return courses.filter((course) =>
    weakSkillIds.includes(
      Number(course.skill_id)
    )
  );
}
export function recommendResources(
  weakSkillIds,
  resources
) {
  return resources.filter(
    (resource) =>
      weakSkillIds.includes(
        Number(resource.skill_id)
      )
  );
}
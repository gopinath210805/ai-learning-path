export interface Skill {
  skill_id: number;
  skill_name: string;
  category: string;
  level: string;
  description: string;
}

export interface Course {
  course_id: number;
  course_name: string;
  skill_id: number;
  difficulty: string;
  duration_hours: number;
  rating: number;
}

export interface CareerPath {
  career_id: number;
  career_name: string;
  required_skills: string;
  description: string;
  difficulty: string;
  estimated_months: number;
}
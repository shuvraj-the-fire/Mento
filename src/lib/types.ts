export type SkillData = {
  skill: string;
  students: number;
};

export type PlacementTrendData = {
  month: string;
  placements: number;
};

export type DepartmentInsightData = {
  department: string;
  placed: number;
  fill: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
};

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Student' | 'Coordinator';
    status: 'Active' | 'Inactive' | 'Pending';
    lastLogin: string;
};

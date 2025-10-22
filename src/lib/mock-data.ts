import type { SkillData, PlacementTrendData, DepartmentInsightData, Job, User } from './types';

export const mockSkillData: SkillData[] = [
  { skill: 'Python', students: 120 },
  { skill: 'React', students: 98 },
  { skill: 'Node.js', students: 86 },
  { skill: 'Data Analysis', students: 135 },
  { skill: 'UI/UX Design', students: 72 },
  { skill: 'Cloud (AWS)', students: 65 },
];

export const mockPlacementTrendData: PlacementTrendData[] = [
  { month: 'Jan', placements: 20 },
  { month: 'Feb', placements: 25 },
  { month: 'Mar', placements: 45 },
  { month: 'Apr', placements: 60 },
  { month: 'May', placements: 55 },
  { month: 'Jun', placements: 75 },
];

export const mockDepartmentInsightData: DepartmentInsightData[] = [
  { department: 'CompSci', placed: 150, fill: 'hsl(var(--chart-1))' },
  { department: 'Mechanical', placed: 90, fill: 'hsl(var(--chart-2))' },
  { department: 'Electronics', placed: 110, fill: 'hsl(var(--chart-3))' },
  { department: 'Civil', placed: 75, fill: 'hsl(var(--chart-4))' },
  { department: 'Biotech', placed: 40, fill: 'hsl(var(--chart-5))' },
];

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer Intern',
    company: 'Innovate Inc.',
    location: 'Remote',
    description: 'We are seeking a Frontend Developer Intern to join our dynamic team. You will work with React, Next.js, and Tailwind CSS to build beautiful and responsive user interfaces. A passion for clean code and user experience is a must. You will collaborate with designers and backend engineers to deliver high-quality features.',
    tags: ['React', 'Next.js', 'Internship'],
  },
  {
    id: 'job-2',
    title: 'Data Science Intern',
    company: 'DataDriven Co.',
    location: 'New York, NY',
    description: 'This internship focuses on data analysis, machine learning model creation, and data visualization. The ideal candidate has experience with Python (Pandas, Scikit-learn) and SQL. You will work on real-world datasets to extract meaningful insights and contribute to our core product.',
    tags: ['Data Science', 'Python', 'Machine Learning'],
  },
  {
    id: 'job-3',
    title: 'UX/UI Design Intern',
    company: 'Creative Solutions',
    location: 'San Francisco, CA',
    description: 'Join our design team to create intuitive and engaging user experiences. You will be involved in the entire design process, from user research and wireframing to prototyping and high-fidelity mockups. Proficiency in Figma or Sketch is required. A portfolio showcasing your work is a plus.',
    tags: ['UX', 'UI', 'Figma'],
  },
  {
    id: 'job-4',
    title: 'Backend Engineer (Node.js)',
    company: 'ScaleFast',
    location: 'Remote',
    description: 'We are looking for a Backend Engineer to help build and maintain our scalable microservices architecture. You will be working with Node.js, TypeScript, Docker, and Kubernetes. Experience with RESTful APIs and database management (PostgreSQL) is essential. Join us to build the backbone of our platform.',
    tags: ['Backend', 'Node.js', 'TypeScript'],
  },
];

export const mockStudentProfile = {
  name: "Alex Doe",
  summary: "A motivated and detail-oriented Computer Science student with a passion for frontend development and user experience design. Proficient in React, TypeScript, and modern web technologies. Eager to apply academic knowledge and hands-on project experience to a challenging internship role. Strong problem-solving skills and a collaborative mindset, with a portfolio of projects demonstrating creative solutions and technical abilities.",
  skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Node.js", "Figma", "Git"],
  interests: ["Web Development", "UI/UX", "Open Source", "Creative Coding", "Photography"],
  experience: [
    {
      role: "Web Dev Team Lead",
      organization: "University Coding Club",
      duration: "2023 - Present",
      description: "Led a team of 5 students to build and maintain the club's official website using Next.js and Vercel."
    },
    {
      role: "Freelance Web Designer",
      organization: "Self-employed",
      duration: "2022 - 2023",
      description: "Designed and developed websites for local businesses, focusing on responsive design and SEO."
    }
  ]
};

export const mockUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Ravi Sharma',
    email: 'ravi.sharma@example.com',
    role: 'Student',
    status: 'Active',
    lastLogin: '2024-07-20T10:00:00Z',
  },
  {
    id: 'usr-2',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    role: 'Student',
    status: 'Active',
    lastLogin: '2024-07-20T11:30:00Z',
  },
  {
    id: 'usr-3',
    name: 'Amit Singh',
    email: 'amit.singh@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-07-21T09:00:00Z',
  },
  {
    id: 'usr-4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    role: 'Student',
    status: 'Inactive',
    lastLogin: '2024-06-15T14:00:00Z',
  },
  {
    id: 'usr-5',
    name: 'Vikram Kumar',
    email: 'vikram.kumar@example.com',
    role: 'Coordinator',
    status: 'Active',
    lastLogin: '2024-07-21T08:45:00Z',
  },
];

export type ProjectFile = {
  url: string;
  fileName: string;
  fileType: string;
  size: number;
};

export type Project = {
  id: string;

  title: string;
  description: string;
  goal?: string;
  context?: string;

  technologies: string[];
  roles: string[];

  images: ProjectFile[];
  documents: ProjectFile[];

  startDate?: string;
  endDate?: string;

  teamSize?: number;

  projectType: string;

  schools: string[];
  companies: string[];

  city?: string;
  country?: string;

  githubUrl?: string;
  demoUrl?: string;

  isPublished: boolean;
  isFeatured: boolean;
  displayOrder: number;

  createdAt?: string;
  updatedAt?: string;
};

export type ProjectForm = {
  title: string;
  goal: string;
  description: string;
  context: string;

  projectType: string;

  city: string;
  country: string;

  startDate: string;
  endDate: string;

  teamSize: string;

  githubUrl: string;
  demoUrl: string;

  isPublished: boolean;
  isFeatured: boolean;

  displayOrder: string;
};
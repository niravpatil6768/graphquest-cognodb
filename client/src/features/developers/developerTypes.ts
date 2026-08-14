export interface Developer {
    id: string;
    name: string;
    title: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
}

export interface DeveloperDetails extends Developer {
    skills: string[];
    projects: Project[];
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
import { Project as PrismaProject } from "@prisma/client";

export type Project = PrismaProject;

export enum ProjectStatus {
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  PENDING = "Pending",
}

export interface ProjectFormData {
  name: string;
  client: string;
  description: string;
  value: string;
  status: string;
  progress: number;
  dueDate: string;
}

export interface ProjectPageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

export interface ProjectListPageProps {
  status?: ProjectStatus;
}

export interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface ProjectFormProps {
  projectId?: string;
  initialData?: Partial<ProjectFormData>;
  submitLabel?: string;
}

interface ProjectsResponse {
  success: boolean;
  projects: Project[];
  error?: string;
}

interface ProjectResponse {
  success: boolean;
  project: Project;
  error?: string;
}

interface ApiErrorResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

/* =========================
   Handle API Response
========================= */

async function handleApiResponse<T>(response: Response): Promise<T> {
  let data: T | ApiErrorResponse;

  try {
    data = await response.json();
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    const errorData = data as ApiErrorResponse;

    switch (response.status) {
      case 400:
        throw new Error(errorData.error || errorData.message || "Invalid request.");
      case 404:
        throw new Error(errorData.error || errorData.message || "Project not found.");
      case 500:
        throw new Error(errorData.error || errorData.message || "Internal server error. Please try again later.");
      default:
        throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}.`);
    }
  }

  return data as T;
}

/* =========================
   Fetch All Projects
========================= */
export async function fetchProjects(status?: ProjectStatus): Promise<Project[]> {
  const url = status ? `/api/projects?status=${encodeURIComponent(status)}` : "/api/projects";
  const response = await fetch(url);

  console.log("HTTP status:", response.status);
  console.log("Fetching projects with status:", status);
  console.log("URL:", url);

  const data = await handleApiResponse<ProjectsResponse>(response);

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch projects.");
  }

  return data.projects;
}

export async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`/api/projects/${encodeURIComponent(id)}`);

  console.log("HTTP status:", response.status);

  const data = await handleApiResponse<ProjectResponse>(response);

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch project.");
  }

  return data.project;
}

export async function createProject(project: ProjectFormData): Promise<Project> {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  console.log("HTTP status:", response.status);

  const data = await handleApiResponse<ProjectResponse>(response);

  if (!data.success) {
    throw new Error(data.error || "Failed to create project.");
  }

  return data.project;
}

export async function updateProject(id: string, project: ProjectFormData): Promise<Project> {
  const updatedProject = {
    ...project,
    status: project.progress === 100 ? ProjectStatus.COMPLETED : project.status,
    progress: project.status === ProjectStatus.COMPLETED ? 100 : project.progress,
  };

  const response = await fetch(`/api/projects/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProject),
  });

  console.log("HTTP status:", response.status);

  const data = await handleApiResponse<ProjectResponse>(response);

  if (!data.success) {
    throw new Error(data.error || "Failed to update project.");
  }

  return data.project;
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`/api/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  console.log("HTTP status:", response.status);

  const data = await handleApiResponse<{ success: boolean; error?: string }>(response);

  if (!data.success) {
    throw new Error(data.error || "Failed to delete project.");
  }
}

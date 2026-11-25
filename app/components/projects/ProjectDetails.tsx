"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/app/styles/projectForm.css";
import "@/app/styles/project.css";
import { ProjectDetailsProps, ProjectFormData, fetchProject, ProjectStatus } from "@/app/lib/projects/project";

export default function ProjectDetails({ projectId, initialData }: ProjectDetailsProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(!!projectId);
  const [error, setError] = useState("");

  const [projectData, setProjectData] = useState<ProjectFormData>({
    name: initialData?.name ?? "",
    client: initialData?.client ?? "",
    description: initialData?.description ?? "",
    value: initialData?.value ?? "",
    status: initialData?.status ?? ProjectStatus.PENDING,
    progress: initialData?.progress ?? 0,
    dueDate: initialData?.dueDate ?? "",
  });

  useEffect(() => {
    if (!projectId) return;

    const id = projectId;

    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const project = await fetchProject(id);

        if (!project) {
          setError("Project not found or you do not have access to it.");
          return;
        }

        setProjectData({
          name: project.name ?? "",
          client: project.client ?? "",
          description: project.description ?? "",
          value: String(project.value ?? ""),
          status: Object.values(ProjectStatus).includes(project.status as ProjectStatus)
            ? (project.status as ProjectStatus)
            : ProjectStatus.PENDING,
          progress: project.progress ?? 0,
          dueDate: project.dueDate ?? "",
        });
      } catch (error) {
        console.error("Load project error:", error);

        const message = error instanceof Error ? error.message : "Failed to load project.";

        setError(message === "Project not found" ? "Project not found or you do not have access to it." : message);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="project-form">
        <p className="text-gray-400">Loading project...</p>
      </div>
    );
  }

  if (error && projectId && !projectData.name) {
    return (
      <div className="project-form">
        <p className="text-red-400">{error}</p>

        <button type="button" onClick={() => router.push("/projects")} className="cancel-button mt-4">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-form">
      <div className="form-grid">
        <div>
          <label className="form-label">Project Name</label>
        </div>

        <div>
          <label className="form-data-label">{projectData.name}</label>
        </div>

        <div>
          <label className="form-label">Client</label>
        </div>
        <div>
          <label className="form-data-label">{projectData.client}</label>
        </div>

        <div>
          <label className="form-label">Project Value</label>
        </div>
        <div>
          <label className="form-data-label">
            {projectData.value ? `$${Number(projectData.value).toLocaleString()}` : ""}
          </label>
        </div>

        <div>
          <label className="form-label">Due Date</label>
        </div>
        <div>
          <label className="form-data-label">
            {projectData.dueDate
              ? new Intl.DateTimeFormat("en-GB").format(new Date(projectData.dueDate))
              : "No due date"}
          </label>
        </div>

        <div>
          <label className="form-label">Status</label>
        </div>
        <div>
          <label className="form-data-label">{projectData.status}</label>
        </div>

        <div>
          <label className="form-label">Description</label>
        </div>
        <div>
          <label className="form-data-label">{projectData.description}</label>
        </div>

        <div>
          <label className="form-label">Progress (%)</label>
        </div>
        <div>
          <label className="form-data-label">
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${projectData.progress}%` }} />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

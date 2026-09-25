"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/app/styles/projectForm.css";
import { ProjectFormData, ProjectFormProps, updateProject, createProject, fetchProject } from "@/app/lib/project";

export default function ProjectForm({ projectId, initialData, submitLabel = "Create Project" }: ProjectFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(!!projectId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProjectFormData>({
    name: initialData?.name ?? "",
    client: initialData?.client ?? "",
    description: initialData?.description ?? "",
    value: initialData?.value ?? "",
    status: initialData?.status ?? "Pending",
    progress: initialData?.progress ?? 0,
    dueDate: initialData?.dueDate ?? "",
  });

  // Load project when editing
  useEffect(() => {
    if (!projectId) return;
    const id = projectId;

    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const project = await fetchProject(id);

        setForm({
          name: project.name ?? "",
          client: project.client ?? "",
          description: project.description ?? "",
          value: String(project.value ?? ""),
          status: project.status ?? "Pending",
          progress: project.progress ?? 0,
          dueDate: project.dueDate ?? "",
        });
      } catch (error) {
        console.error("Load project error:", error);

        setError(error instanceof Error ? error.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: name === "progress" ? Number(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (projectId) {
        const project = await updateProject(projectId, form);
        console.log("Project updated:", project);
      } else {
        const project = await createProject(form);
        console.log("Project created:", project);
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error(projectId ? "Update project error:" : "Create project error:", error);

      setError(
        error instanceof Error ? error.message : projectId ? "Failed to update project" : "Failed to create project"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="project-form">
        <p className="text-gray-400">Loading project...</p>
      </div>
    );
  }

  if (error && projectId && !form.name) {
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
    <form onSubmit={handleSubmit} className="project-form">
      {error && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400">{error}</div>}

      <div className="form-grid">
        <div>
          <label className="form-label">Project Name</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Website redesign"
          />
        </div>

        <div>
          <label className="form-label">Client</label>

          <input
            name="client"
            value={form.client}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="ABC Company"
          />
        </div>

        <div>
          <label className="form-label">Project Value</label>

          <input
            type="number"
            name="value"
            value={form.value}
            onChange={handleChange}
            className="form-input"
            placeholder="5000"
          />
        </div>
        <div>
          <label className="form-label">Due Date</label>

          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="form-input" />
        </div>

        <div>
          <label className="form-label">Progress (%)</label>

          <input
            type="number"
            name="progress"
            min="0"
            max="100"
            value={form.progress}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Status</label>

          <select name="status" value={form.status} onChange={handleChange} className="form-select">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="description-group">
        <label className="form-label">Description</label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="form-textarea"
          placeholder="Describe the project..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => router.push("/projects")} className="cancel-button" disabled={saving}>
          Cancel
        </button>

        <button type="submit" className="submit-button" disabled={saving}>
          {saving ? "Updating..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

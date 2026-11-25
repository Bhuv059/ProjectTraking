"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/app/styles/projectForm.css";
import {
  ProjectFormData,
  ProjectFormProps,
  updateProject,
  createProject,
  fetchProject,
  ProjectStatus,
  ProjectDetailsProps,
} from "@/app/lib/projects/project";
import { toast } from "react-toast";

interface FormErrors {
  name?: string;
  client?: string;
  value?: string;
  progress?: string;
  status?: string;
  dueDate?: string;
}

export default function ProjectForm({ projectId, initialData, submitLabel = "Create Project" }: ProjectFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(!!projectId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<ProjectFormData>({
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

        setForm({
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : name === "status" ? (value as ProjectStatus) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setError("");
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Project name is required.";
    }

    if (!form.client.trim()) {
      newErrors.client = "Client name is required.";
    }

    if (!form.value.trim()) {
      newErrors.value = "Project value is required.";
    } else if (Number(form.value) < 0) {
      newErrors.value = "Project value cannot be negative.";
    }

    if (form.progress < 0 || form.progress > 100) {
      newErrors.progress = "Progress must be between 0 and 100.";
    }

    if (!form.status) {
      newErrors.status = "Please select a project status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (projectId) {
        await updateProject(projectId, form);

        toast.success("Project updated successfully!");
      } else {
        await createProject(form);

        toast.success("Project created successfully!");
      }

      setTimeout(() => {
        router.push("/projects");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(projectId ? "Update project error:" : "Create project error:", error);

      setError(
        error instanceof Error ? error.message : projectId ? "Failed to update project." : "Failed to create project."
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
    <form onSubmit={handleSubmit} className="project-form" noValidate>
      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        <div>
          <label className="form-label">
            Project Name <span className="required">*</span>
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? "form-input-error" : ""}`}
            placeholder="Website redesign"
            disabled={saving}
          />

          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        <div>
          <label className="form-label">
            Client <span className="required">*</span>
          </label>

          <input
            name="client"
            value={form.client}
            onChange={handleChange}
            className={`form-input ${errors.client ? "form-input-error" : ""}`}
            placeholder="ABC Company"
            disabled={saving}
          />

          {errors.client && <p className="field-error">{errors.client}</p>}
        </div>

        <div>
          <label className="form-label">
            Project Value <span className="required">*</span>
          </label>

          <input
            type="number"
            name="value"
            min="0"
            step="0.01"
            value={form.value}
            onChange={handleChange}
            className={`form-input ${errors.value ? "form-input-error" : ""}`}
            placeholder="5000"
            disabled={saving}
          />

          {errors.value && <p className="field-error">{errors.value}</p>}
        </div>

        <div>
          <label className="form-label">Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="form-input"
            disabled={saving}
          />
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
            className={`form-input ${errors.progress ? "form-input-error" : ""}`}
            disabled={saving}
          />

          {errors.progress && <p className="field-error">{errors.progress}</p>}
        </div>

        <div>
          <label className="form-label">
            Status <span className="required">*</span>
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`form-select ${errors.status ? "form-input-error" : ""}`}
            disabled={saving}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {errors.status && <p className="field-error">{errors.status}</p>}
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
          disabled={saving}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={() => router.push("/projects")} className="cancel-button" disabled={saving}>
          Cancel
        </button>

        <button type="submit" className="submit-button" disabled={saving}>
          {saving ? (projectId ? "Updating..." : "Creating...") : submitLabel}
        </button>
      </div>
    </form>
  );
}

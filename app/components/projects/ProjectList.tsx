"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { fetchProjects, ProjectListPageProps } from "@/app/lib/project";

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
  value: number;
}

export default function ProjectList({ status }: ProjectListPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const projFilter = status ? status : undefined;

  useEffect(() => {
    async function getAllProjects() {
      try {
        setLoading(true);
        setError("");

        setProjects(await fetchProjects(projFilter));
      } catch (error) {
        console.error("project list error: ", error);

        setError(error instanceof Error ? error.message : "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }

    getAllProjects();
  }, [projFilter]);

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="projects-error">{error}</div>;
  }

  if (projects.length === 0) {
    return <div className="projects-empty">No projects found</div>;
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          client={project.client}
          status={project.status}
          progress={project.progress}
          value={`€${project.value.toLocaleString()}`}
        />
      ))}
    </div>
  );
}

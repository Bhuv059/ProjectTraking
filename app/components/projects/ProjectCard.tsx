"use client";

import Link from "next/link";

interface ProjectCardProps {
  name: string;
  id: string;
  client: string;
  status: string;
  progress: number;
  value: string;
  due: string | null;
}

export default function ProjectCard({ name, id, client, status, progress, value, due }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="project-card">
      <div className="project-card-wrapper">
        <div className="project-header">
          <div>
            <h2 className="project-title">{name}</h2>

            <p className="project-client">{client}</p>
          </div>

          <span className="project-status">{status}</span>
        </div>

        <div className="progress-header">
          <span className="progress-label">Progress</span>

          <span className="progress-value">{progress}%</span>
        </div>

        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="project-footer">
          <span className="project-value">{value}</span>
          <span className="project-value">{due}</span>
        </div>
      </div>
    </Link>
  );
}

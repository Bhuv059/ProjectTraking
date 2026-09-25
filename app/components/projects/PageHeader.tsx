"use client";

import Link from "next/link";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">Projects</h1>
        <p className="page-description">Manage and track all your projects.</p>
      </div>
      <Link href="/projects/new" className="add-project-button">
        + Add Project
      </Link>
    </div>
  );
}

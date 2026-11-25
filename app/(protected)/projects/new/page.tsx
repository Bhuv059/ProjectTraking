"use client";

import { useState } from "react";
import ProjectForm from "@/app/components/projects/ProjectForm";

export default function NewProjectPage() {
  const [form, setForm] = useState({
    name: "",
    client: "",
    description: "",
    value: "",
    status: "Pending",
    progress: 0,
    dueDate: "",
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Project</h1>
          <p className="page-description">Create a new project and start tracking your work.</p>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}

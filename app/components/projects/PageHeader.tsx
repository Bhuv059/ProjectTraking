"use client";
import { FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeader() {
  const router = useRouter();
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">Projects</h1>
        <p className="page-description">Manage and track all your projects.</p>
      </div>

      <button
        type="button"
        onClick={() => {
          router.push("/projects/new");
        }}
        className="project-add-button"
      >
        <FilePlus className="lucid-icon" />
      </button>
    </div>
  );
}

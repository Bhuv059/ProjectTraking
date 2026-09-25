"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteProject } from "@/app/lib/project";
import Dialog from "@/app/components/ui/Dialog";
import "../../styles/deleteProjectButton.css";

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);
      setError("");

      await deleteProject(projectId);

      setShowDialog(false);

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error("Delete project error:", error);

      setError(error instanceof Error ? error.message : "Failed to delete project.");

      setDeleting(false);
    }
  }

  return (
    <div className="flex justify-items-end  delete-project-button">
      <button type="button" onClick={() => setShowDialog(true)} className="delete-button">
        Delete
      </button>

      <Dialog
        open={showDialog}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onClose={() => {
          if (!deleting) {
            setShowDialog(false);
          }
        }}
      >
        {error && <p className="delete-error">{error}</p>}

        <div className="dialog-actions">
          <button
            type="button"
            onClick={() => setShowDialog(false)}
            disabled={deleting}
            className="dialog-cancel-button"
          >
            Cancel
          </button>

          <button type="button" onClick={handleDelete} disabled={deleting} className="dialog-delete-button ">
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Dialog>
    </div>
  );
}

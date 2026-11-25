"use client";

import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

interface EditProjectButtonProps {
  projectId: string;
}

export default function EditProjectButton({ projectId }: EditProjectButtonProps) {
  const router = useRouter();

  return (
    <div className="flex   justify-items-end">
      <button type="button" onClick={() => router.push(`/projects/edit/${projectId}`)} className="project-edit-button">
        <Edit className="lucid-icon" />
      </button>
    </div>
  );
}

import DeleteProjectButton from "@/app/components/projects/DeleteProjectButton";
import ProjectForm from "@/app/components/projects/ProjectForm";
import { EditProjectPageProps } from "@/app/lib/projects/project";

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  return (
    <div>
      <div className="flex justify-between ">
        <div className="page-header">
          <div>
            <h1 className="page-title">Edit Project</h1>
            <p className="page-description">Update your project details.</p>
          </div>
        </div>
      </div>

      <ProjectForm projectId={id} submitLabel="Update Project" />
    </div>
  );
}

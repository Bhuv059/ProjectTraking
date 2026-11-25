import DeleteProjectButton from "@/app/components/projects/DeleteProjectButton";
import EditProjectButton from "@/app/components/projects/EditProjectButton";
import ProjectDetails from "@/app/components/projects/ProjectDetails";
import { EditProjectPageProps } from "@/app/lib/projects/project";
import "@/app/styles/project.css";

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  return (
    <div>
      <div className="flex justify-between ">
        <div className="page-header">
          <div>
            <h1 className="page-title">Project Details</h1>
            <p className="page-description"> View your project details.</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <EditProjectButton projectId={id} />
          <DeleteProjectButton projectId={id} />
        </div>
      </div>

      <ProjectDetails projectId={id} />
    </div>
  );
}

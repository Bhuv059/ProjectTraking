import ProjectList from "../components/projects/ProjectList";
import ProjectFilters from "../components/projects/ProjectFilters";
import PageHeader from "../components/projects/PageHeader";
import "@/app/styles/project.css";
import { ProjectStatus, ProjectPageProps } from "@/app/lib/project";

export default async function ProjectsPage({ searchParams }: ProjectPageProps) {
  const { status } = await searchParams;
  const projectStatus = Object.values(ProjectStatus).includes(status as ProjectStatus)
    ? (status as ProjectStatus)
    : undefined;

  return (
    <div>
      <PageHeader />
      <ProjectFilters />
      <ProjectList status={projectStatus} />
    </div>
  );
}

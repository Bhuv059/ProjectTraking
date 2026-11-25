import ProjectList from "@/app/components/projects/ProjectList";
import ProjectFilters from "@/app/components/projects/ProjectFilters";
import PageHeader from "@/app/components/projects/PageHeader";
import "@/app/styles/project.css";

export default async function ProjectsPage() {
  return (
    <div>
      <PageHeader />
      <ProjectFilters />
      <ProjectList />
    </div>
  );
}

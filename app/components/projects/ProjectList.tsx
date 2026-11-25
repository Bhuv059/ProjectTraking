"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";
import { fetchProjects, Project, ProjectStatus } from "@/app/lib/projects/project";
import Link from "next/link";

export default function ProjectList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get("status");
  const searchParam = searchParams.get("search");

  const status = statusParam || undefined;
  const search = searchParam || undefined;
  const pageParam = searchParams.get("page");
  const parsedPage = Number(pageParam);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const [projects, setProjects] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getAllProjects() {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching:", {
          status,
          search,
          page,
        });

        const data = await fetchProjects(status as ProjectStatus | undefined, search, page);

        console.log("Results:", data);

        setProjects(data.projects);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("project list error:", error);

        setError(error instanceof Error ? error.message : "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    }

    getAllProjects();
  }, [status, search, page]);

  function goToPage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.push(`/projects?${params.toString()}`);
  }

  function getPageNumbers(currentPage: number, totalPages: number) {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 2) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }
  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="projects-error">{error}</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="projects-empty">
        <div className="projects-empty-icon">+</div>

        <h2 className="projects-empty-title">
          {search ? `No projects found for "${search}"` : status ? `No ${status} projects` : "No projects yet"}
        </h2>

        <p className="projects-empty-text">
          {search
            ? "Try a different search term."
            : status
              ? `You don't have any projects with the ${status} status.`
              : "Create your first project to start tracking your work."}
        </p>

        <Link href="/projects/new" className="projects-empty-button">
          Add Project
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            client={project.client}
            status={project.status}
            progress={project.progress}
            value={`€${project.value.toLocaleString()}`}
            due={project.dueDate}
          />
        ))}
      </div>

      <div className="projects-pagination">
        <div className="pagination-pages">
          {getPageNumbers(page, totalPages).map((pageNumber, index) => {
            if (pageNumber === "...") {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  …
                </span>
              );
            }

            return (
              <button
                key={pageNumber}
                type="button"
                className={`pagination-page ${page === pageNumber ? "pagination-page-active" : ""}`}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

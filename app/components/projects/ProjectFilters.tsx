"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = ["All", "In Progress", "Completed", "Pending"];

export default function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("status") || "All";

  function handleFilterChange(filter: string) {
    if (filter === "All") {
      router.push("/projects");
      return;
    }

    router.push(`/projects?status=${encodeURIComponent(filter)}`);
  }

  return (
    <div className="project-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterChange(filter)}
          className={
            activeFilter === filter ? "filter-button filter-button-active" : "filter-button filter-button-inactive"
          }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

"use client";

import { ProjectStatus } from "@/app/lib/projects/project";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, SearchX } from "lucide-react";

const filters = ["All", ProjectStatus.IN_PROGRESS, ProjectStatus.COMPLETED, ProjectStatus.PENDING];

export default function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("status") || "All";
  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);

  function handleFilterChange(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    const pageParam = params.get("page");
    if (pageParam) params.delete("page");

    if (filter === "All") {
      params.delete("status");
    } else {
      params.set("status", filter);
    }

    const querystring = params.toString();

    router.push(querystring ? `/projects?${querystring}` : "/projects");
  }

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) params.set("search", search.trim());
    else params.delete("search");

    const querystring = params.toString();

    router.push(querystring ? `/projects?${querystring}` : "/projects");
  }

  function handleClearSearch() {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    const queryString = params.toString();
    router.push(queryString ? `/projects?${queryString}` : "/projects");
  }

  return (
    <div>
      <div className="project-search">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search projects..."
          className="project-search-input"
        />
        <button type="button" onClick={handleSearch} className="project-search-button">
          <Search className="lucid-icon" />
        </button>
        {currentSearch && (
          <button type="button" onClick={handleClearSearch} className="project-search-clear">
            <SearchX className="text-white" />
          </button>
        )}
      </div>

      <div className="project-filters">
        {filters.map((filter) => (
          <button
            type="button"
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
    </div>
  );
}

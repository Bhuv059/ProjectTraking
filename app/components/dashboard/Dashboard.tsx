import "@/app/styles/dashboard.css";
import { prisma } from "@/app/lib/prisma";
import { loggedInUser } from "@/app/lib/projects/auth";
import { ProjectStatus } from "@/app/lib/projects/project";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { user, response } = await loggedInUser();

  if (response || !user) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
  });

  const totalProjects = projects.length;

  const inProgress = projects.filter((project) => project.status === ProjectStatus.IN_PROGRESS).length;

  const pending = projects.filter((project) => project.status === ProjectStatus.PENDING).length;

  const completed = projects.filter((project) => project.status === ProjectStatus.COMPLETED).length;

  const totalValue = projects.reduce((total, project) => total + project.value, 0);

  const pendingPercent = totalProjects > 0 ? (pending / totalProjects) * 100 : 0;

  const inProgressPercent = totalProjects > 0 ? (inProgress / totalProjects) * 100 : 0;

  const pendingEnd = pendingPercent;
  const inProgressEnd = pendingEnd + inProgressPercent;

  const chartBackground =
    totalProjects > 0
      ? `conic-gradient(
          #f59e0b 0% ${pendingEnd}%,
          #8b5cf6 ${pendingEnd}% ${inProgressEnd}%,
          #10b981 ${inProgressEnd}% 100%
        )`
      : "#374151";

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-description">Manage your projects and track your progress.</p>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total</p>
            <p className="stat-value">{totalProjects}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Pending</p>
            <p className="stat-value">{pending}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">In progress</p>
            <p className="stat-value">{inProgress}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Completed</p>
            <p className="stat-value">{completed}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Completed projects</p>
            <p className="stat-value">
              {completed}/{totalProjects}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Completion rate</p>
            <p className="stat-value">{totalProjects > 0 ? ((completed / totalProjects) * 100).toFixed(1) : 0}%</p>
          </div>
        </div>

        <div className="stat-card project-chart-card">
          <p className="stat-label">Project Status</p>

          <div className="chart-content">
            <div className="donut-chart" style={{ background: chartBackground }}>
              <div className="donut-hole" />

              <div className="donut-center">
                <span className="donut-total">{totalProjects}</span>
                <span className="donut-label">Projects</span>
              </div>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot pending-dot" />
                <span>Pending</span>
                <strong>{pending}</strong>
              </div>

              <div className="legend-item">
                <span className="legend-dot progress-dot" />
                <span>In Progress</span>
                <strong>{inProgress}</strong>
              </div>

              <div className="legend-item">
                <span className="legend-dot completed-dot" />
                <span>Completed</span>
                <strong>{completed}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <p className="stat-label">Total Project Value</p>
          <p className="stat-value">€{totalValue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

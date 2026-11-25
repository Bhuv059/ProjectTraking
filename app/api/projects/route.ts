import { prisma } from "@/app/lib/prisma";
import { loggedInUser } from "@/app/lib/projects/auth";
import { PROJECTS_PER_PAGE } from "@/app/lib/projects/project";

export async function GET(request: Request) {
  try {
    const { user, response } = await loggedInUser();
    if (response) return response;

    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const pageParam = Number(searchParams.get("page") || 1);
    const page = Math.max(1, pageParam);

    const where = {
      userId: user.id,
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { client: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    };

    //Get total number of matching projects
    const totalProjects = await prisma.project.count({ where });
    const totalPages = Math.max(1, Math.ceil(totalProjects / PROJECTS_PER_PAGE));

    //prevent requesting a page that doesnt exist
    const currentPage = Math.min(page, totalPages);

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PROJECTS_PER_PAGE,
      take: PROJECTS_PER_PAGE,
    });
    return Response.json(
      {
        success: true,
        projects,
        pagination: { currentPage, totalPages, totalProjects, projectsPerPage: PROJECTS_PER_PAGE },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/projects error:", error);

    return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { user, response } = await loggedInUser();
    if (response) return response;

    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        name: body.name,
        client: body.client,
        description: body.description || null,
        value: Number(body.value),
        status: body.status,
        progress: Number(body.progress ?? 0),
        dueDate: body.dueDate || null,

        userId: user.id,
      },
    });

    return Response.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);

    return Response.json({ error: "Failed to create project" }, { status: 500 });
  }
}

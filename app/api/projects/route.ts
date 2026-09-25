import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const projects = await prisma.project.findMany({
      where: status
        ? {
            status,
          }
        : undefined,

      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(
      {
        success: true,
        projects,
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
      },
    });

    return Response.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);

    return Response.json({ error: "Failed to create project" }, { status: 500 });
  }
}

import { prisma } from "@/app/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    console.log("GET single project:", id);

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);

    return Response.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

// UPDATE project
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const body = await request.json();

    let status = body.status;
    let progress = Number(body.progress ?? 0);

    // Keep status and progress synchronized
    if (status === "Completed") {
      progress = 100;
    }

    if (progress === 100) {
      status = "Completed";
    }

    const project = await prisma.project.update({
      where: {
        id,
      },
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

    return Response.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);

    return Response.json({ error: "Failed to update project" }, { status: 500 });
  }
}

/* =========================
   Delete Project
========================= */

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({
      where: { id },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);

    return Response.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

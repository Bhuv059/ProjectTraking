import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany();

  return Response.json({
    success: true,
    count: projects.length,
    projects,
  });
}

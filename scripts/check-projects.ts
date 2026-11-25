import { prisma } from "@/app/lib/prisma";

async function main() {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  for (const project of projects) {
    console.log("--------------------------------");
    console.log("Project ID:", project.id);
    console.log("Project:", project.name);
    console.log("Client:", project.client);
    console.log("User ID:", project.userId);
    console.log("User:", project.user?.name);
    console.log("Email:", project.user?.email);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

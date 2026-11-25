import { prisma } from "@/app/lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
    },
  });

  console.log(JSON.stringify(users, null, 2));

  for (const user of users) {
    console.log("--------------------------------");
    console.log("ID:", user.id);
    console.log("Name:", user.name);
    console.log("Email:", user.email);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

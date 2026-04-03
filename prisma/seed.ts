import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Add users here to assign roles.
 * Running `npm run seed` will upsert these users with their specified roles.
 */
const SEED_USERS: { email: string; role: Role; name?: string }[] = [
  // Example entries - replace with actual dev emails:
  { email: "admin@example.com", role: "SUPER_ADMIN", name: "Admin User" },
  // { email: "reviewer@example.com", role: "REVIEWER", name: "Reviewer User" },
  // { email: "ambassador@example.com", role: "AMBASSADOR", name: "Ambassador User" },
];

async function main() {
  console.log("Seeding users with roles...\n");

  for (const user of SEED_USERS) {
    const result = await prisma.user.upsert({
      where: { email: user.email },
      update: { role: user.role },
      create: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
    console.log(`  ${result.email} -> ${result.role}`);
  }

  console.log(`\nSeeded ${SEED_USERS.length} user(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

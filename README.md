# BSL Platform

## How to Seed Roles

To assign roles to users for testing RBAC/admin features:

1. Edit `prisma/seed.ts` and add user emails with their roles:
   ```ts
   const SEED_USERS = [
     { email: "your-email@gmail.com", role: "SUPER_ADMIN", name: "Your Name" },
     { email: "reviewer@example.com", role: "REVIEWER" },
     { email: "ambassador@example.com", role: "AMBASSADOR" },
   ];
   ```

2. Run the seed script:
   ```bash
   npm run seed
   ```

The script uses upsert, so it's safe to re-run. Users will get their roles updated when they log in with Google.
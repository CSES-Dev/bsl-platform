This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Install the dependencies from npm:

```bash
npm run i
```

### Update your .env file.

Copy paste the .env.example file and rename it to .env and update it with the values supplied by your EM. The `DATABASE_URL` expects a MongoDB connection string (for example, an Atlas `mongodb` URL). This project now uses Mongoose for data access, so no Prisma commands are required.

### Run the development server:

```bash
npm run dev
```

## Code Quality and Linting

This project uses ESLint and Prettier to ensure code quality and consistent formatting.

### Linting Check

To manually check for linting errors, run:

```bash
npm run lint-check
```

### Auto-fix Linting Errors

To automatically fix linting errors, run

```bash
npm run lint-fix
```

### Prettier Formatting

To format your code with Prettier, run

```bash
npx prettier --write .
```

## Committing and Pushing

On commit, linting checks are automatically run to ensure code quality. Fix any errors manually or using the above commands, then stage those changes to proceed.

On push, a secret scan is triggered to ensure no sensitive data is accidentally pushed.

## Running Tests

To run Playwright tests, run

```bash
npm run test
```

## Deployment

This project is [deployed](https://nextjs-boilerplate-nu-six-50.vercel.app/) via Vercel. The demo page can be found at '/demo'.

Any changes to the 'main' branch will trigger Playwright tests and auto-deployment to Vercel.

## Contributing Guidelines

Branching + PR Guidelines (Work in Progress)

## Documentation

Link to Documentation (Work in Progress)

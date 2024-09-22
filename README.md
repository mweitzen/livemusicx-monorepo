# Live Music X Monorepo

This monorepo houses the codebase for the My Music App, a platform for live music event discovery, management, and community engagement.

## Structure

- `apps/`

  - `web-app`: Next.js frontend application for users
  - `web-admin`: Next.js admin panel (optional)
  - `mobile-app`: React Native mobile application
  - `mobile-admin`: React Native admin app (optional)
  - `demo-app`: Vite app for showcasing features or experiments

- `apis/`

  - `api-v2`: NestJS backend API (version 2)

- `libs/`

  - `content`: Shared content (e.g., markdown, static data)
  - `data`: Data fetching and management logic
  - `constants`: Global constants and configuration

- `packages/`

  - `api`: API client for interacting with the backend
  - `db`: Prisma setup and database interactions
  - `auth`: NextAuth.js authentication logic
  - `trpc`: tRPC setup
  - `ui`: Shared UI components
  - `utils`: General utility functions
  - `validators`: Input validation and sanitization

- `tooling/`
  - `tailwind`: Tailwind CSS configuration
  - `typescript`: TypeScript configuration
  - `eslint`: ESLint configuration

## Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development servers:**

   ```bash
   # Run all apps and the API concurrently
   pnpm run dev

   # Run a specific app or the API
   pnpm run dev:web-app
   pnpm run dev:api-v2
   ```

3. **Build for production:**

   ```bash
   pnpm run build
   ```

## Additional Notes

- This monorepo uses pnpm as the package manager and Turborepo for task orchestration.
- Shared UI components are built using Shadcn UI.
- Prisma is used for database interactions with PostgreSQL.
- Authentication is handled by NextAuth.js.
- tRPC is used for type-safe API communication.

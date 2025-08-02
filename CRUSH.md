# CRUSH.md

## Build/Lint/Test Commands

- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Develop:** `npm run dev`
- **Test:** This project does not have a dedicated testing framework configured. If unit/integration tests are added in the future, please update this section with the relevant commands.

## Code Style Guidelines (TypeScript/React)

- **Imports:**
  - Use absolute imports for `src/` modules (e.g., `import { Button } from "@/components/ui/button";`).
  - Use relative imports for sibling or child components within the same directory.
  - Group imports: React/Next.js, external libraries, internal components, then utilities/types.
- **Formatting:** Adhere to Prettier/ESLint defaults (configured via `package.json` `lint` script).
- **Types:**
  - Use TypeScript consistently for all components, services, and utilities.
  - Define interfaces or types for complex data structures (e.g., product, brand, category).
- **Naming Conventions:**
  - **Files:** `PascalCase` for React components (e.g., `ProductCard.tsx`), `camelCase` for utilities/services (e.g., `productService.ts`).
  - **Components:** `PascalCase` (e.g., `ProductCard`).
  - **Functions/Variables:** `camelCase`.
  - **Interfaces/Types:** `PascalCase` (e.g., `Product`, `Category`).
- **Error Handling:**
  - Implement robust error handling in API routes and service functions.
  - Use `try...catch` blocks for asynchronous operations and external API calls.
  - Provide meaningful error messages to the frontend.
- **Component Structure:**
  - Keep components small and focused on a single responsibility.
  - Separate UI components (`src/components/ui`) from feature-specific components (`src/components`).
  - Use `props` for data passing, avoiding direct state manipulation of child components.
- **API Endpoints:**
  - Follow RESTful principles for API design (as observed in `src/app/api`).
  - Use clear and descriptive endpoint paths (e.g., `/api/products`, `/api/categories/[id]`).
- **Database (Prisma):**
  - Schema defined in `prisma/schema.prisma`.
  - Use Prisma Client for all database interactions (`src/lib/prisma.ts`).

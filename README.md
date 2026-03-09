# Webapp Template

A full-stack webapp template using a pnpm monorepo.

## Stack

- **Frontend** (`packages/web`): React, Vite, Tailwind CSS v4, DaisyUI v5, AsterUI, TanStack Query, React Router, Jotai
- **Backend** (`packages/api`): Hono, PetraDB (in-memory SQL), Drizzle ORM, cookie-based JWT sessions
- **Monorepo**: pnpm workspaces with Hono RPC for end-to-end type safety

## Getting Started

```bash
pnpm install
pnpm dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` to the backend on port 3000.

## Login

The seed creates one user: **admin** (any password works — password verification is a TODO).

## Structure

```
packages/
  api/
    src/
      db/           # Schema, seed, Drizzle setup
      routes/       # Hono route handlers
      app.ts        # Hono app (exports AppType for RPC)
      server.ts     # Entry point
      session.ts    # Cookie-based JWT session
  web/
    src/
      api.ts        # Hono RPC client (type-safe)
      useAuth.ts    # Auth hook (TanStack Query)
      App.tsx        # Routes with ProtectedRoute/GuestRoute
      LoginPage.tsx  # AsterUI login form
      HomePage.tsx   # Authenticated home page
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both frontend and backend |
| `pnpm dev:web` | Frontend only |
| `pnpm dev:api` | Backend only |
| `pnpm build` | Build all packages |

# Project Layout

```text
open-changelog/
├── frontend/             React, Vite, TypeScript, and frontend npm package
│   ├── src/              Public site, admin UI, APIs, components, and styles
│   ├── package.json      Frontend scripts and dependencies
│   └── vite.config.ts    Development proxy and frontend build configuration
├── backend/              Lightweight Node service
│   ├── server/           Admin API, authentication, and PocketBase proxy
│   ├── data/             Local page configuration (runtime data)
│   └── package.json      Backend start script
├── deploy/               Docker and host-Nginx deployment templates
├── docs/                 Product, backend, deployment, and layout documentation
├── .env                  Local/private runtime configuration
├── .env.example          Environment template
└── run.sh                Docker Compose convenience command
```

Generated folders, including `frontend/node_modules/` and `frontend/dist/`, are ignored by Git.

## Local Commands

```bash
cd frontend && npm run dev
cd backend && npm run start
```

## Docker

Run Docker Compose from the repository root:

```bash
docker compose --env-file .env -f deploy/docker/docker-compose.yml up -d --build
```

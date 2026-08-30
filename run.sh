#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [[ "${1:-}" == "local" ]]; then
  if [[ ! -d frontend/node_modules ]]; then
    echo "Install frontend dependencies first: cd frontend && npm install"
    exit 1
  fi

  (cd backend && npm run start) &
  BACKEND_PID=$!
  trap "kill $BACKEND_PID 2>/dev/null || true" EXIT INT TERM
  echo "Backend started at http://localhost:8787"
  echo "Frontend will print its local URL below (Vite chooses an available port)."
  cd frontend
  npm run dev -- --host 0.0.0.0
fi

COMPOSE=(docker compose --env-file .env -f deploy/docker/docker-compose.yml)
if ! docker compose version >/dev/null 2>&1; then
  COMPOSE=(sudo docker compose --env-file .env -f deploy/docker/docker-compose.yml)
fi

"${COMPOSE[@]}" up -d --build --force-recreate

PORT=$(awk -F= "/^OPEN_CHANGELOG_PORT=/{print $2}" .env)
PORT=${PORT:-8080}
echo "What's New is running at http://localhost:${PORT}"

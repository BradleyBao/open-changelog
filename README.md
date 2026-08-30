# What's New

A lightweight, self-hosted changelog with public release pages and an admin interface.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

In a second terminal:

```bash
cd backend
npm run start
```

See [project layout](docs/PROJECT_LAYOUT.md), [admin and backend setup](docs/ADMIN_AND_BACKEND.md), and the [project specification](docs/PROJECT_SPEC.md).
The Docker backend defaults to the OpenChangeLog example collection at https://api.tianyibrad.com/api/collections/OpenChangeLog/records. Set DEFAULT_CHANGELOG_API_URL in .env to use another collection. The named open-changelog-data volume preserves existing page settings, so an already-initialized installation keeps its current API until you edit the page in Admin.

## GitHub Container Registry

Every push to `main` (including a merged pull request) publishes two images to GitHub Container Registry: `ghcr.io/bradleybao/whats-new:latest` and `ghcr.io/bradleybao/whats-new-backend:latest`. The same commit SHA is also published as an immutable tag.

After the first successful workflow run, set `ADMIN_PASSWORD` and the optional port settings in `.env`, then pull and run the published release:

```bash
docker compose --env-file .env -f deploy/docker/docker-compose.ghcr.yml pull
docker compose --env-file .env -f deploy/docker/docker-compose.ghcr.yml up -d
```

To update an existing installation after a later merge, repeat those commands. The registry package must be public for anonymous pulls. If it remains private, authenticate first with `docker login ghcr.io` using a GitHub personal access token that has `read:packages`.


## Docker

You can use the following docker compose as example:

```yml
services:
  app:
    image: ghcr.io/bradleybao/whats-new:${OPEN_CHANGELOG_TAG:-latest}
    depends_on:
      - backend
    ports:
      - "${OPEN_CHANGELOG_HOST:-0.0.0.0}:${OPEN_CHANGELOG_PORT:-8080}:80"
    restart: unless-stopped

  backend:
    image: ghcr.io/bradleybao/whats-new-backend:${OPEN_CHANGELOG_TAG:-latest}
    environment:
      PORT: "8787"
      DEFAULT_CHANGELOG_API_URL: ${DEFAULT_CHANGELOG_API_URL:-https://api.tianyibrad.com/api/collections/OpenChangeLog/records}
      ADMIN_PASSWORD: ${ADMIN_PASSWORD:?Set ADMIN_PASSWORD in .env}
    volumes:
      - open-changelog-data:/app/data
    restart: unless-stopped

volumes:
  open-changelog-data:

```

Edit `.env` and set at least a strong `ADMIN_PASSWORD`. Then start the service:

```bash
docker compose pull
docker compose up -d
```

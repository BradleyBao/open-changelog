# OpenChangeLog

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
The Docker backend defaults to the OpenChangeLog collection at https://api.tianyibrad.com/api/collections/OpenChangeLog/records. Set DEFAULT_CHANGELOG_API_URL in .env to use another collection. The named open-changelog-data volume preserves existing page settings, so an already-initialized installation keeps its current API until you edit the page in Admin.

## GitHub Container Registry

Every push to `main` (including a merged pull request) publishes two images to GitHub Container Registry: `ghcr.io/bradleybao/open-changelog:latest` and `ghcr.io/bradleybao/open-changelog-backend:latest`. The same commit SHA is also published as an immutable tag.

After the first successful workflow run, set `ADMIN_PASSWORD` and the optional port settings in `.env`, then pull and run the published release:

```bash
docker compose --env-file .env -f deploy/docker/docker-compose.ghcr.yml pull
docker compose --env-file .env -f deploy/docker/docker-compose.ghcr.yml up -d
```

To update an existing installation after a later merge, repeat those commands. The registry package must be public for anonymous pulls. If it remains private, authenticate first with `docker login ghcr.io` using a GitHub personal access token that has `read:packages`.

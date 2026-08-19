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

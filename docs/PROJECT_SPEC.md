# What's New

> **Everything you ship, beautifully documented.**

Shiplog is an open-source, self-hosted product changelog platform. It allows developers, indie hackers, startups, open-source projects, and small teams to create, manage, and publish beautiful product updates without relying on a third-party SaaS.

The primary purpose of Shiplog is simple:

> **Give every software project its own beautiful, self-hosted "What's New" page.**

Shiplog is not intended to be a Wiki, project-management system, or Git replacement. Its primary responsibility is to manage and present product updates.

---

# 1. Product Vision

Modern software projects continuously release new features, improvements, bug fixes, and other changes. However, the communication of these changes is often fragmented across GitHub Releases, commit histories, Discord messages, blog posts, or manually maintained `CHANGELOG.md` files.

Shiplog provides a dedicated place for these updates.

A typical Shiplog deployment should allow a project owner to create:

```text
https://updates.example.com
```

and provide a polished public page such as:

```text
Product Updates

v1.5.0
A faster way to manage your projects

✨ New
- New project dashboard

⚡ Improvements
- Faster loading

🐛 Fixes
- Fixed notification issue


v1.4.0
Introducing team workspaces
...
```

The system should be easy enough for an individual developer to deploy and powerful enough for a small SaaS or open-source project to use in production.

---

# 2. Core Principles

Shiplog follows several principles.

## 2.1 Self-hosted First

Users should be able to run Shiplog on their own:

* VPS
* Dedicated server
* Home server
* NAS
* Proxmox
* Cloud VM

No mandatory external SaaS service should be required.

The basic deployment should be possible with Docker.

---

## 2.2 API First

The frontend must not directly depend on internal database implementation details.

The architecture should have a clear API boundary:

```text
Frontend
   |
   | HTTP API
   v
Backend
   |
   v
Database
```

This allows future integrations and alternative frontends.

---

## 2.3 Backend Simplicity

The first backend implementation will use PocketBase.

PocketBase provides:

* SQLite database
* REST API
* Authentication
* File storage
* Admin UI
* Realtime capabilities

Shiplog should use PocketBase as its default backend without unnecessarily recreating functionality already provided by PocketBase.

---

## 2.4 Beautiful but Minimal

Shiplog should prioritize:

* Typography
* Readability
* Whitespace
* Clear hierarchy
* Fast loading
* Responsive design

The UI should feel closer to modern SaaS products such as Linear, Vercel, Stripe, or GitHub than to a traditional CMS.

The product should not become visually complicated merely because it supports many features.

---

## 2.5 Integrations Are Optional

GitHub, n8n, AI, Wiki.js, Discord, Slack, etc. are integrations.

They are not core dependencies.

The basic product must work without them.

---

# 3. Target Users

Shiplog primarily targets:

### Individual Developers

A developer building:

* SaaS
* Mobile application
* Desktop application
* Open-source project
* Developer tool

can deploy Shiplog and publish updates.

### Small Teams

Teams can use Shiplog as their public product-update center.

### Open-source Projects

Projects can expose a polished changelog independently from GitHub.

### Self-hosting Enthusiasts

Users who prefer to control their infrastructure and data can deploy Shiplog themselves.

---

# 4. MVP Scope

The first version must remain deliberately small.

The MVP consists of:

```text
Authentication
Project Settings
Releases
Update Items
Categories
Markdown
Images
Public Changelog
Search
Dark Mode
RSS / Atom
REST API
```

The MVP does NOT require:

```text
GitHub integration
n8n integration
AI generation
Wiki.js integration
Discord integration
Slack integration
Multi-tenant SaaS infrastructure
Advanced analytics
Comments
Roadmaps
Subscriptions
Billing
```

These are future features.

---

# 5. Core Concepts

Shiplog has three primary concepts:

```text
Project
   |
   └── Release
          |
          ├── Update
          ├── Update
          └── Update
```

## Project

A Project represents a product using Shiplog.

Example:

```text
Project:
Acme

URL:
https://updates.acme.com
```

A Project contains global settings such as:

* Name
* Description
* Logo
* Website
* Theme
* Accent color
* Social links
* SEO settings

---

# 6. Release

A Release represents a version or major update.

Example:

```text
v1.5.0
A faster way to manage your projects
August 18, 2026
```

A Release contains:

* Version
* Title
* Slug
* Description
* Publication date
* Status
* Cover image
* Update items
* Tags

Possible statuses:

```text
draft
published
archived
```

Only published releases are visible on the public website.

---

# 7. Update Item

An Update Item represents one individual change inside a Release.

Example:

```text
✨ New project dashboard

A redesigned dashboard makes it easier
to understand what's happening across projects.
```

Each item has:

* Title
* Description
* Category
* Optional image
* Optional external URL
* Optional GitHub reference

Categories initially include:

```text
feature
improvement
fix
breaking
security
announcement
```

The system should allow custom categories in the future.

---

# 8. Tags

Tags allow releases and updates to be categorized further.

Examples:

```text
AI
Dashboard
Mobile
API
Performance
Security
```

Tags are primarily for filtering and discovery.

---

# 9. Public Website

The public website is the most important part of Shiplog.

The default route should be:

```text
/
```

or:

```text
/updates
```

depending on deployment configuration.

The homepage should display recent published releases.

Example:

```text
Acme

Product Updates

New features, improvements, and fixes.

──────────────────────────────────────

Aug 18, 2026

v1.5.0
A faster way to manage your projects

✨ New
New project dashboard

⚡ Improvements
Faster loading

🐛 Fixes
Fixed notification issue

──────────────────────────────────────

Aug 4, 2026

v1.4.0
Introducing team workspaces
```

---

# 10. Release Detail Page

Each release should have a dedicated URL.

Example:

```text
/releases/v1-5-0
```

or:

```text
/updates/v1-5-0
```

The URL structure should be configurable.

The release page contains:

```text
Version
Title
Publication date
Description
Update items
Images
Tags
Related links
```

---

# 11. Search

The public website should support searching historical updates.

Example:

```text
Search updates...

dashboard
API
performance
mobile
```

Search should initially operate on:

* Release title
* Release description
* Update title
* Update description
* Tags

Advanced full-text search can be introduced later.

---

# 12. RSS / Atom

Shiplog should expose an RSS or Atom feed.

Example:

```text
/feed.xml
```

The feed should contain:

* Release title
* Release URL
* Publication date
* Summary
* Update content

This allows users to subscribe to product updates using standard feed readers.

---

# 13. Admin Interface

The first version can rely heavily on PocketBase's existing Admin UI.

Shiplog should not immediately build a complete custom CMS.

The administrator should be able to:

```text
Login
  |
  ├── Create Release
  ├── Edit Release
  ├── Publish Release
  ├── Create Update
  ├── Upload Images
  └── Manage Settings
```

A custom admin dashboard can be introduced later if the default PocketBase UI becomes insufficient.

---

# 14. Database Model

The initial database should conceptually contain:

```text
projects
releases
updates
categories
tags
release_tags
update_tags
users
settings
```

## projects

```text
id
name
slug
description
logo
website_url
created
updated
```

## releases

```text
id
project
version
title
slug
description
cover_image
status
published_at
created
updated
```

## updates

```text
id
release
title
content
category
position
image
external_url
github_url
created
updated
```

## categories

```text
id
project
name
slug
icon
position
```

## tags

```text
id
project
name
slug
```

Relationships:

```text
Project
  |
  ├── Releases
  │      |
  │      └── Updates
  |
  ├── Categories
  |
  └── Tags
```

---

# 15. API

The frontend communicates with the backend through HTTP APIs.

Initial public endpoints:

```http
GET /api/releases
GET /api/releases/:slug
GET /api/updates
GET /api/categories
GET /api/tags
GET /api/project
GET /feed.xml
```

Administrative operations:

```http
POST /api/releases
PATCH /api/releases/:id
DELETE /api/releases/:id

POST /api/updates
PATCH /api/updates/:id
DELETE /api/updates/:id
```

Authentication and authorization must be enforced for administrative operations.

---

# 16. Authentication

Administrators require authentication.

Public users do not require an account.

The initial permission model is intentionally simple:

```text
Anonymous
    |
    └── Read published content

Authenticated Admin
    |
    ├── Create
    ├── Edit
    ├── Publish
    └── Delete
```

More advanced roles can be introduced later:

```text
Owner
Admin
Editor
Author
Viewer
```

---

# 17. Frontend Architecture

The frontend should be developed independently from PocketBase implementation details.

Recommended initial stack:

```text
React
TypeScript
Tailwind CSS
```

A modern component library such as shadcn/ui may be used where appropriate.

The frontend should contain:

```text
src/
├── components/
├── pages/
├── layouts/
├── lib/
├── hooks/
├── api/
├── types/
└── styles/
```

The frontend should not contain business logic that belongs in the backend.

---

# 18. Design Direction

The design should be:

```text
Minimal
Modern
Typography-focused
Fast
Responsive
Accessible
```

Visual references include:

* Linear
* Vercel
* Stripe
* GitHub
* Raycast

These are design references, not dependencies.

The project should avoid:

* Excessive gradients
* Excessive animations
* Overly complex dashboards
* Large decorative graphics
* Unnecessary UI elements

The update content should remain the primary focus.

---

# 19. Responsive Design

Shiplog must work on:

```text
Desktop
Tablet
Mobile
```

The public changelog should remain readable on a narrow mobile screen.

Navigation should collapse appropriately.

---

# 20. Theme

The MVP should support:

```text
Light
Dark
System
```

Theme preference should persist locally.

Project owners should eventually be able to configure branding.

---

# 21. Deployment

The project should support Docker-based deployment.

The target architecture is:

```text
Internet
    |
    v
Reverse Proxy
    |
    ├── Frontend
    |
    └── PocketBase
```

A future deployment may optionally include:

```text
n8n
GitHub
PostgreSQL
Redis
Object Storage
```

but none of these are required by the core system.

---

# 22. Docker

The project should eventually provide:

```text
docker-compose.yml
```

A basic deployment should ideally require only:

```bash
docker compose up -d
```

Environment configuration should be documented.

---

# 23. Integration Architecture

Integrations should communicate through stable APIs or webhooks.

Example:

```text
GitHub
   |
   | Webhook
   v
Shiplog API
   |
   v
PocketBase
```

or:

```text
GitHub
   |
   v
n8n
   |
   v
Shiplog API
```

The second architecture allows users to implement arbitrary automation.

---

# 24. GitHub Integration — Future

Possible functionality:

```text
GitHub Release
      |
      v
Shiplog
      |
      v
Draft Release
```

The system may also support:

* GitHub tags
* Pull requests
* Commit references
* Contributors
* Release assets

GitHub integration should not be required for normal Shiplog usage.

---

# 25. n8n Integration — Future

n8n should be treated as an external automation platform.

Example:

```text
GitHub Release
      |
      v
     n8n
      |
      ├── LLM
      |
      ├── Categorization
      |
      └── Shiplog API
              |
              v
           Published
```

Shiplog should provide documentation and example n8n workflows rather than embedding n8n into the core application.

---

# 26. AI Integration — Future

AI may assist with:

* Release summarization
* Categorization
* Title generation
* Description generation
* Translation
* Release grouping

However, AI should always be optional.

The core product must work without an AI provider.

---

# 27. Wiki.js Integration — Future

Wiki.js can serve as a documentation platform.

Shiplog may optionally link:

```text
Update
   |
   └── Documentation
          |
          └── Wiki.js
```

Shiplog itself should not become a general-purpose Wiki.

Its focus remains product updates.

---

# 28. Embeddable Widget — Future

A future feature may allow websites to embed recent updates.

Example:

```html
<script src="https://updates.example.com/widget.js"></script>
```

Possible result:

```text
Latest Updates

v1.5.0
New project dashboard

v1.4.0
Team workspaces
```

This should be implemented only after the core product is stable.

---

# 29. Webhooks — Future

Shiplog should eventually expose webhooks such as:

```text
release.created
release.published
release.updated
release.deleted
```

Example:

```text
Shiplog
   |
   | release.published
   v
Webhook
   |
   ├── Discord
   ├── Slack
   ├── n8n
   └── Custom service
```

---

# 30. Non-Goals

Shiplog is NOT intended to become:

### A Wiki

Documentation systems such as Wiki.js already solve this problem.

### A Project Management Tool

Shiplog should not manage tasks, sprints, or project planning.

### A Git Replacement

GitHub and GitLab already handle source control.

### A Full CMS

Shiplog only needs the CMS capabilities required for product updates.

### A SaaS Billing Platform

The first version has no billing or subscription system.

### An AI Product

AI is an optional integration.

---

# 31. Licensing

The core Shiplog project should use a permissive open-source license.

MIT is the preferred initial choice.

Third-party dependencies must retain their respective licenses.

---

# 32. Development Philosophy

The project should follow a backend-first development process.

The primary development responsibilities are:

```text
Product architecture
Database
API
Authentication
Authorization
Deployment
Integrations
Infrastructure
```

Frontend development can be assisted heavily by AI coding agents.

However, frontend implementation must follow the API and data model defined by the project architecture.

AI agents must not arbitrarily change the backend architecture.

---

# 33. AI Coding Rules

When using Claude Code, Codex, or another coding agent:

1. Read the project specification first.
2. Do not change API contracts without explicit approval.
3. Do not change database models without explicit approval.
4. Do not introduce unnecessary dependencies.
5. Keep components modular.
6. Prefer simple implementations.
7. Do not add features outside the current milestone.
8. Run tests and type checking after changes.
9. Explain architectural changes before implementing them.
10. Keep documentation synchronized with implementation.

The AI agent is an implementation assistant, not the product architect.

---

# 34. Development Milestones

## Milestone 0 — Architecture

Deliver:

```text
PROJECT_SPEC.md
DATABASE.md
API.md
ARCHITECTURE.md
```

No frontend work is required.

---

## Milestone 1 — Backend MVP

Implement:

```text
PocketBase
Projects
Releases
Updates
Categories
Tags
Authentication
Permissions
Public API
```

At the end of this milestone, the backend must be usable without the custom frontend.

---

## Milestone 2 — Public Frontend

Implement:

```text
Homepage
Release list
Release detail
Markdown rendering
Images
Search
Dark mode
Responsive design
```

The frontend consumes only the defined API.

---

## Milestone 3 — Publishing Workflow

Implement:

```text
Draft
Published
Archived
```

Ensure unpublished releases cannot be accessed publicly.

---

## Milestone 4 — RSS / Atom

Implement:

```text
/feed.xml
```

---

## Milestone 5 — Docker Deployment

Provide:

```text
Dockerfile
docker-compose.yml
.env.example
deployment documentation
```

The project should be deployable on a clean server.

---

## Milestone 6 — Integrations

Only after the core system is stable:

```text
GitHub
Webhooks
n8n
AI
Wiki.js
```

---

# 35. Success Criteria

The MVP is considered successful when a developer can:

```text
1. Deploy Shiplog
2. Open the admin interface
3. Create a project
4. Create v1.0.0
5. Add several update items
6. Publish the release
7. Open the public URL
8. See a polished changelog
9. Search the update
10. Subscribe through RSS
```

The entire process should be simple enough that a developer can understand the system without reading extensive documentation.

---

# 36. Long-term Vision

The long-term goal is to make Shiplog an open infrastructure layer for product communication.

The ecosystem may eventually look like:

```text
                         ┌─────────────┐
                         │   GitHub    │
                         └──────┬──────┘
                                │
                         ┌──────▼──────┐
                         │     n8n     │
                         └──────┬──────┘
                                │
                         ┌──────▼──────┐
                         │   Shiplog   │
                         │             │
                         │ API / CMS   │
                         │             │
                         └──────┬──────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
        Web Changelog         RSS              Widget
             │
             ▼
          Users
```

Shiplog should become the place where a project's product changes are stored and presented, while other systems can produce, consume, and automate those changes.

---

# 37. One-Sentence Definition

> **Shiplog is an open-source, self-hosted platform for creating, managing, automating, and beautifully publishing product updates.**

---

# 38. Initial Technical Stack

### Backend

```text
PocketBase
SQLite
REST API
```

### Frontend

```text
React
TypeScript
Tailwind CSS
```

### Deployment

```text
Docker
Docker Compose
Nginx / Reverse Proxy
```

### Future integrations

```text
GitHub
n8n
AI APIs
Wiki.js
Webhooks
RSS
```

---

# 39. The Most Important Architectural Rule

Shiplog should remain small.

The project must resist the temptation to become:

```text
Changelog
+ Wiki
+ Blog
+ Roadmap
+ Project Management
+ AI
+ Analytics
+ CRM
+ Notifications
+ ...
```

The core product is:

> **Create → Manage → Publish → Consume product updates.**

Everything else should support this loop rather than replace it.

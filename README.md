# Connections RD Website

Standalone Astro project for `connectionsrd.com`.

## Structure

- `app.tsx`: final landing page assembly and section order.
- `componentes/`: reusable site components and sections.
- `paginas/`: human-facing page modules. Start here when adding or changing a full page.
- `src/pages/`: minimal Astro route wrappers.
- `public/`: images, logos, videos, and static files served by the site.
- `herramientas/`: content, Convex client, icon helpers, weather helpers, and utility code.

## Maintenance Guide

- Change landing copy, section order, links, and local asset references in `herramientas/content/home-blocks.ts`.
- Change global phone, email, and social links in `herramientas/content/site-contact.ts`.
- Change a section UI in `componentes/blocks/`; large blocks may have nearby folders for subcomponents and CSS.
- Change shared UI pieces in `componentes/shared/`.
- Add future page implementations under `paginas/`, then expose them with a small Astro wrapper in `src/pages/`.
- Add a new home block by updating `herramientas/content/types.ts`, adding a block component, then registering it in `componentes/blocks/HomeBlockRenderer.tsx`.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Design Skill

The local Codex environment includes the `frontend-design` skill installed at:

```text
C:\Users\julio\.codex\skills\frontend-design\SKILL.md
```

Use it when creating, redesigning, or reviewing frontend UI for this project. It is based on Anthropic's official `frontend-design` skill for distinctive, production-grade web interfaces:

- Source: https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md
- Raw install source: https://raw.githubusercontent.com/anthropics/claude-code/main/plugins/frontend-design/skills/frontend-design/SKILL.md

Restart Codex if the skill does not appear in a new session. Project-specific design guidance lives in `docs/design-frontend-guide.md`.

## Notes

- Content is English-only and lives in `herramientas/content/home-blocks.ts`.
- Shared editable content types live in `herramientas/content/types.ts`.
- The site is a standalone Astro/React implementation with local content and local public assets.
- Lead capture uses Convex through `herramientas/convex/client.ts`.
- Lead form validation and payload mapping live in `herramientas/leads/lead-form.ts`.
- Weather uses the local Astro route at `src/pages/api/weather.ts`, which reads Convex `weather_logs` through `clima.getRecentWeatherHistory`.

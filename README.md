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

- Change landing copy, section order, links, and mirrored CMS asset references in `herramientas/content/home-blocks.ts`.
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

## Notes

- Content is English-only and lives in `herramientas/content/home-blocks.ts`.
- Shared editable content types live in `herramientas/content/types.ts`.
- The site does not depend on Puck, CMS preview routes, or multilingual workflows.
- Lead capture uses Convex through `herramientas/convex/client.ts`.
- Lead form validation and payload mapping live in `herramientas/leads/lead-form.ts`.
- Weather uses the local Astro route at `src/pages/api/weather.ts`, which reads Convex `weather_logs` through `clima.getRecentWeatherHistory`.

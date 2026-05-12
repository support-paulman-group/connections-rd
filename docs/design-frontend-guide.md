# Connections RD Design Frontend Guide

## Direction

Connections RD should feel like premium coastal real estate: editorial, calm, confident, and conversion-focused. Use generous spacing, strong image presentation, clear price and unit details, and restrained color contrast. The site should feel refined, not decorative.

## Component Rules

- Prefer one memorable visual idea per section: a dominant image, a precise data panel, or a strong spatial composition.
- Keep CTAs obvious and close to the buyer decision moment. Primary CTAs should remain direct and action-oriented.
- Use cards only for discrete repeated items or framed tools. Avoid nesting cards inside cards.
- Tabs should expose meaningful comparison data when possible, not only labels.
- For missing media, create an intentional placeholder state that still feels on-brand.
- Preserve accessibility: semantic buttons/links, visible focus states, keyboard-friendly controls, and readable contrast.

## Visual Language

- Use semantic theme tokens first: `--background`, `--foreground`, `--primary`, `--accent`, `--muted`, `--muted-foreground`, `--border`, and `--ring`.
- Use project brand tokens only when the semantic token is not specific enough: `--brand-deep`, `--brand-ocean`, `--brand-mist`, and `--brand-sun`.
- Avoid purple gradients, novelty palettes, generic SaaS layouts, and purely decorative blobs.
- Use typography hierarchy deliberately: display serif for premium editorial moments, body sans for clarity.
- Favor subtle depth, thin borders, glassy surfaces used sparingly, and image-led composition.

## Theme Tokens

Global theme values live in `src/styles/tokens.css`. This file is the source of truth for colors, typography, radii, shadows, motion, and shadcn-compatible mappings.

Use these tokens for new component CSS:

```css
.example-panel {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.example-cta {
  background: var(--primary);
  color: var(--primary-foreground);
}
```

Do not add hardcoded colors to component CSS unless the value is truly one-off. If a color repeats or expresses brand, surface, text, focus, or state, add it to `tokens.css`.

## Shadcn Readiness

The token layer intentionally mirrors shadcn/ui CSS variables: `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, and `--radius`.

If shadcn/ui is added later:

- Use `cssVariables: true` in `components.json`.
- Point the global CSS path to `src/styles/global.css`.
- Keep shadcn components mapped to semantic tokens instead of project aliases.
- Add `@/components/ui` path aliases only if the project intentionally adopts that import convention.

Tailwind v4 theme mappings are declared with `@theme inline` in `tokens.css`, so future utility classes such as `bg-background`, `text-foreground`, `bg-primary`, `border-border`, and `ring-ring` can resolve to the same global theme.

## Responsive Checklist

- Verify at mobile widths around 375px and desktop widths around 1366px.
- Confirm text never overlaps, buttons keep usable tap targets, and tabs do not overflow.
- Keep important price, CTA, and unit facts visible without requiring careful scanning.
- If a media block changes height by viewport, define stable min-heights or aspect constraints.

## Skill Usage

Use the installed `frontend-design` skill when asking an LLM to design or polish a section. For this project, anchor prompts with:

```text
Use the frontend-design skill. Direction: premium editorial coastal real estate, refined conversion, no generic AI UI, no purple gradients, no new dependencies unless necessary.
```

Before shipping a UI change, run `npm run check`, `npm run build`, and perform a visual pass on desktop and mobile.

# Chaimel Enjambre — Portfolio (Nuxt 3)

Nuxt 3 + TypeScript + SCSS port of the static portfolio.

## Run

```bash
pnpm install
pnpm dev
```

App boots at http://localhost:3000.

```bash
pnpm typecheck   # full .vue + TS type-check via vue-tsc (nuxt build does NOT do this)
```

## Deployment & SEO

Absolute-URL SEO tags (`canonical`, `og:url`, `og:image`, `twitter:image`) need the real
production origin, so they are **only emitted when it is configured** — the app never ships a
guessed domain. To turn them on:

1. **Set the site origin** (no trailing slash) when building/deploying:

   ```bash
   NUXT_PUBLIC_SITE_URL=https://your-domain.example pnpm build
   ```

   Wired via `runtimeConfig.public.siteUrl` in `nuxt.config.ts`; consumed in `app/app.vue`.

2. **Add the social card image.** A ready, on-brand source lives at `public/og-image.svg`
   (1200×630). Export it to **`public/og-image.png`** (1200×630, < ~200 KB) — e.g. open the SVG
   in a browser/Figma and export, or `rsvg-convert -w 1200 -h 630 public/og-image.svg > public/og-image.png`.
   The meta tags reference `/og-image.png`.

`app/app.vue` also emits JSON-LD `ProfilePage` / `Person` structured data (works with or without
the domain configured).

### Recommended: shrink the project/hero images

`public/projects/p1–p6.jpg` are full-resolution (~4–6.5 MB each, ~34 MB total) but only ever render
into a 220px-tall thumbnail; `public/hero-developer.png` is ~1.75 MB and eagerly preloaded.
Re-export them at display size (project thumbs ≈ 800×520, WebP/AVIF or quality-75 JPG, target
< 100 KB each) for a large LCP/bandwidth win. `loading="lazy"` is already set on the project images.

## Structure

```
portfolio-nuxt/
├── app/
│   ├── app.vue                         ← global IntersectionObserver + scroll progress + SEO (JSON-LD, canonical/og); mounts <NuxtLayout><NuxtPage/>
│   ├── error.vue                       ← branded 404 / 500 page (uses UiWrapper + tokens)
│   ├── layouts/
│   │   └── default.vue                 ← page shell: <LayoutHeader/> <main><slot/></main> <LayoutFooter/>
│   ├── pages/
│   │   └── index.vue                   ← composes home feature components only
│   ├── components/
│   │   ├── ui/                         ← unstyled primitives
│   │   │   └── Wrapper.vue             → <UiWrapper size="narrow|default|wide|fluid">
│   │   ├── core/                       ← reserved for composed, app-wide reusables
│   │   ├── layout/                     ← site chrome consumed by app/layouts/
│   │   │   ├── Header.vue              → <LayoutHeader />
│   │   │   └── Footer.vue              → <LayoutFooter />
│   │   └── features/
│   │       └── home/                   ← components specific to the home page
│   │           ├── Banner.vue          → <FeaturesHomeBanner />
│   │           ├── About.vue           → <FeaturesHomeAbout />
│   │           ├── Projects.vue        → <FeaturesHomeProjects />
│   │           ├── Experience.vue      → <FeaturesHomeExperience />
│   │           ├── Skills.vue          → <FeaturesHomeSkills />
│   │           └── Contactus.vue       → <FeaturesHomeContactus />
│   └── assets/
│       └── styles/
│           ├── main.scss                       ← entry — @use's every partial
│           ├── _normalize.scss                 ← normalize.css v8.0.1 cross-browser baseline
│           ├── _reset.scss                     ← project-specific overrides on top of normalize
│           ├── _typography.scss                ← h1-h3, p, .eyebrow, .section_sub
│           ├── abstracts/
│           │   └── _tokens.scss                ← :root CSS variables (color, shadow, radius, fonts, --gutter)
│           ├── base/                           ← reserved (empty for now)
│           └── components/                     ← mirrors app/components/ layout
│               ├── _scroll-progress.scss
│               ├── _header.scss                ← (matches components/layout/Header.vue)
│               ├── _footer.scss                ← (matches components/layout/Footer.vue)
│               ├── _button.scss
│               ├── _reveal.scss
│               └── features/
│                   ├── _home.scss              ← orchestrator: @use's every home section partial
│                   └── home/                    ← (matches components/features/home/*.vue)
│                       ├── _banner.scss
│                       ├── _about.scss
│                       ├── _projects.scss
│                       ├── _experience.scss
│                       ├── _skills.scss
│                       └── _contactus.scss
├── public/
│   ├── hero-developer.png
│   ├── Chaimel-Enjambre-Resume.pdf
│   └── projects/p1.jpg … p6.jpg
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

## Two layouts directories — what's the difference?

| Path | Owns |
|---|---|
| `app/layouts/` | **Nuxt route layouts.** `default.vue` is the page shell every page automatically inherits. It's the slot orchestrator: header on top, page content in the slot, footer at the bottom. |
| `app/components/layout/` | **Layout building blocks.** The actual `<LayoutHeader />` and `<LayoutFooter />` components consumed by `app/layouts/default.vue`. |

The split keeps `app/layouts/default.vue` declarative and tiny — it just assembles building blocks that live in `components/layout/`.

## Component conventions

Auto-import name comes from the folder path. Each folder is a deliberate layer:

| Folder | Role | Prefix | Example |
|---|---|---|---|
| `ui/` | Unopinionated primitives (no business meaning) | `Ui*` | `<UiWrapper>` |
| `core/` | Composed atoms reused across features | `Core*` | *(reserved for future)* |
| `layout/` | Site chrome consumed by `app/layouts/` | `Layout*` | `<LayoutHeader>`, `<LayoutFooter>` |
| `features/<feature>/` | Components owned by one page/feature | `Features<Feature>*` | `<FeaturesHomeBanner>` |

**Promotion path:** Build new components in `features/`. When a second feature needs the same component, promote it to `core/`. When it has no business meaning at all (pure primitive), it belongs in `ui/`. When it's site chrome consumed by a Nuxt layout, it belongs in `layout/`.

## SCSS conventions

- **SCSS structure mirrors the components folder.** Each feature gets a folder under `components/features/`, with an orchestrator partial one level up (`features/_home.scss`) that `@use`'s every section partial. `main.scss` only knows about `features/home` — not the individual sections inside.
- **Per-section responsive lives inside that section's own partial.** Cross-section responsive (e.g. one breakpoint that affects multiple home sections) goes in `features/_home.scss`.
- All design tokens are CSS custom properties on `:root` in `abstracts/_tokens.scss`. SCSS variables are intentionally avoided so tokens cascade and can be inspected/overridden at runtime.
- Each section's horizontal padding comes from `var(--gutter)`, which drops to `22px` at the 580px breakpoint — change it in one place, every section follows.
- `UiWrapper` owns max-width + centering only. Sections own vertical rhythm + background. Horizontal padding lives on the section via `--gutter`.

### Adding a new feature page (example: about)

```
1. Create app/components/features/about/*.vue  ← page components
2. Create app/assets/styles/components/features/about/_*.scss  ← per-section styles
3. Create app/assets/styles/components/features/_about.scss with:
     @use 'about/intro';
     @use 'about/skills';
     // …per section
4. Add `@use 'components/features/about';` to main.scss
5. Create app/pages/about.vue composing the components
```

## Notes

- Assets live in `public/` so they're served at root (`/hero-developer.png`, `/Chaimel-Enjambre-Resume.pdf`, `/projects/pN.jpg`).
- Global behaviors (reveal-on-scroll, scroll-progress bar, sticky-header shadow) wire up once in `app.vue` and apply to every page.
- Mobile menu state lives in `LayoutHeader`. Rotating-word state lives in `FeaturesHomeBanner`. No global DOM queries from random components.

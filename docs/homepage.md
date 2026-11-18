# Web Box homepage and navigation

The application reuses React, strict TypeScript, Tailwind, HashRouter, IBM Plex local fonts, Lucide icons, and Carbon semantic tokens. No dependencies were added.

## Metadata and navigation

`src/registry/index.ts` supplies category names, short navigation names, descriptions, icon identifiers, order, and planning counts. `getCategoryPath` is shared by the homepage cards, global navigation, breadcrumbs, and tool return links.

The main navigation is Home / Text / Data / Encode / Security / Time / Dev / Image / Resources. Category routes are `/text-content`, `/data-format`, `/encode-convert`, `/security-random`, `/time-schedule`, `/dev-test`, and `/image-design`. Existing `/category/:categoryId` links redirect to canonical category routes with replacement history. HashRouter is retained for static GitHub Pages hosting, so an actual URL is `/#/text-content`.

`src/navigation.ts` derives the active navigation path from the current URL and tool metadata. Direct category pages use `aria-current="page"`; a tool page marks its containing category with `aria-current="location"`. Home and Resources are exact matches. About, Privacy, unknown tools, and other unknown routes have no unrelated selected navigation item. No UI state stores the current page.

`GlobalNavigation` renders the same navigation entries in desktop and mobile layouts. At widths below 1056px it collapses into a menu. Opening focuses a navigation link; clicking an entry or pressing Escape closes it. Focus returns to the toggle for explicit dismissal and moves to page content after route navigation. Leaving the menu by keyboard or clicking outside dismisses it. On desktop resize, focus moves to a visible header link when needed. The menu scrolls vertically within the available viewport height.

## Page structure

The homepage contains seven category cards and one Resources directory entry, with no individual tool cards. Category cards use three columns at 1056px+, two from 672px, and one below 672px. All use native links and shared focus styles.

Planning counts total 60 tools (8, 9, 10, 10, 8, 6, 9). These remain separate from seven registered examples and zero available tools. Category pages filter by `categoryId`, calculate registered/available counts from actual tools, and support empty and not-found states. Coming-soon tool cards have no link; available cards use their registered path. Existing direct tool URLs display a clear planned-tool state.

Resources is an independent top-level page, with nine external entries selected under user authorization. Official addresses and descriptions were checked on 2026-11-18; see `docs/resources.md`. The registry validates HTTPS URLs, credentials, unique IDs, tool paths, category references, and planning counts. External cards use `target="_blank"` and `rel="noopener noreferrer"`, identify external navigation, and explain that destination sites have their own data policies.

## Theme and privacy

Only `light` or `dark` is persisted under `web-box-theme`. Without a valid preference, the page follows system appearance. Moon switches light to dark; Sun switches dark to light. Storage errors leave switching functional in memory. The existing head script applies the initial theme before rendering. The theme hook and interaction remain unchanged in this navigation update.

The directory uses local metadata with no external API or analytics. External sites are contacted only when their links are followed. Search, favorites, recent usage, and command panels are absent.

## Validation

- `npm test`: registry validation and server-rendered page/navigation checks, including all seven categories, tool-parent active states, auxiliary pages, route history, breadcrumbs, and safe resource links.
- `npm run lint`: ESLint.
- `npm run build`: strict TypeScript and production bundle.
- `npm run build:pages`: GitHub Pages subpath bundle.

Browser access to the local preview was denied earlier in the session. Actual responsive overflow, menu keyboard/focus interaction, and system appearance changes require manual browser verification; server-rendered tests do not claim to cover these interactions.

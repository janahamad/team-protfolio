# Interactive Infrastructure Map (Jana's Infrastructure Diagrams tab) — Design Spec

**Date:** 2026-08-14
**Scope:** `frontend/` only — a new interactive diagram component surfaced on Jana's "Infrastructure Diagrams" profile tab.

## Background

The "Infrastructure Diagrams" tab (`DiagramsTab.jsx`) currently only supports a generic image-gallery pattern: a grid of static images (from `member.diagrams`) with a lightbox on click, showing a "coming soon" empty state when the array is empty (true for both members today).

Jana wants to showcase the real infrastructure behind `jxtechstudio.com` (a shared VPS running multiple projects) as a bespoke, interactive, hover/click-driven topology diagram — not a static image. A visual reference (an Eraser.io-style architecture diagram: nested colored group boundaries, line-art icons, orthogonal connectors with inline labels) was approved after two rounds of live-interactive mockup iteration in this conversation. The approved mockup is the source of truth for layout, colors, icon choices, copy, and interaction behavior — this spec describes productionizing it into the real codebase.

## 1. Content Scope & Security

This diagram depicts the real architecture pattern behind jxtechstudio.com's VPS, deliberately kept conceptual rather than literal, per explicit decisions made with Jana:

- **No raw IP address** — the domain (`jxtechstudio.com`) stands in for the server identity, never the literal IP.
- **No exact port numbers for admin/CI/monitoring tools** (Jenkins, Grafana, Prometheus, cAdvisor, node-exporter) — these are named as tools/categories only, not "here's exactly where to find the admin panel."
- **No other clients' or unrelated projects' names** — the "Application Containers" node is generic ("Docker Containers — Frontend + backend, per project"), not a list of the specific apps hosted on the box.
- **Tool honesty** — only tools genuinely in use today (Cloudflare, Nginx, Certbot, Jenkins, Docker, Prometheus, Grafana, cAdvisor, node-exporter) are shown as "active." Terraform and Kubernetes — which Jana may adopt later but hasn't yet — are shown in a visually distinct, dashed, greyed-out "Planned / Roadmap" group, never implied to be in current use.

## 2. Interaction Model

- **Fixed layout** (not a freeform draggable/pannable graph) — nodes sit at fixed positions inside an SVG `viewBox` that scales fluidly with container width (`width: 100%; height: auto`).
- **Hover a node** → that node and its directly-connected nodes/edges/labels stay at full opacity; everything else dims (`opacity: 0.12–0.28` depending on element type). Group boundary boxes do not currently dim (only nodes/edges/edge-labels do, per the approved mockup).
- **Click a node** (or focus + <kbd>Enter</kbd>) → opens/updates a persistent detail panel below the diagram showing the node's title, its category badge, and a one-paragraph description of what that piece does.
- **Keyboard accessible**: every node is a focusable SVG `<g tabindex="0">`; `mouseenter`/`focus` both trigger the hover-highlight; `click`/`Enter` both trigger selection. <kbd>Esc</kbd> clears the current selection and highlight (new in productionization — the mockup didn't wire this up; add it as a `keydown` listener on the container for `Escape`).
- Respect `prefers-reduced-motion`: the opacity/stroke-width hover transitions are wrapped in a media query that disables them for users who've requested reduced motion (the existing sitewide reduced-motion rule in `index.css` only covers `background-color`/`border-color`/`color`, not this component's `opacity`/`stroke-width` transitions, so this component needs its own guard).

## 3. Visual Design

- **Nested colored group boundaries**: an outer "VPS HOST — jxtechstudio.com" box (amber) contains four sub-group boxes — "Reverse Proxy" (teal), "CI / CD" (gold), "Application Containers" (purple), "Monitoring Stack" (green). Cloudflare and GitHub sit outside the VPS boundary (external services). "Planned / Roadmap" sits in its own separate dashed grey box, visually disconnected from the live infrastructure.
- **Line-art icons** (hand-authored inline SVG paths, not an icon library dependency) for: cloud (Cloudflare), shield (Nginx/Certbot), git-branch (GitHub), gear (Jenkins), container/box (Docker), bar-chart (Prometheus/Grafana), plus (Planned).
- **Orthogonal connectors** (right-angle polylines, not bezier curves) with inline text labels on the line itself (e.g. "HTTPS 443", "webhook / poll", "build + deploy", "metrics scrape"), color-matched to the connection's category (live traffic = muted grey, CI = gold, monitoring = green) and line-style-differentiated (solid = live traffic, dashed = build/deploy, dotted = metrics scrape).
- **Color tokens**: the canvas background, card/chip surfaces, headings, and muted text reuse the site's real dark-theme CSS custom properties (`rgb(var(--color-page))`, `rgb(var(--color-surface))`, `rgb(var(--color-heading))`, etc. from `frontend/src/index.css`) rather than the mockup's standalone approximate palette — this keeps the diagram visually and maintainably consistent with the rest of the dark-themed site, avoiding a second competing color system (the mistake found and fixed with the old orphaned `theme.css` earlier in this project). The five diagram-specific **category colors** (proxy teal, CI gold, app purple, monitoring green, planned grey) are new, but scoped locally as constants inside the component — they're single-use semantic categories for this one diagram, not site-wide UI roles, so they don't belong in the global token system.
- Light-mode rendering: since the diagram's background/text use the real page tokens, it already adapts to light mode automatically (light `page`/`surface`/`heading` values swap in the same way every other component does) — no separate light-mode palette needs to be designed.

## 4. Content — Nodes, Groups, and Edges

Exact copy, positions (in the component's coordinate space), categories, and detail-panel text are taken verbatim from the approved mockup (viewable at the artifact URL shared during this conversation). Summary:

**Groups:** VPS Host (outer) → Reverse Proxy, CI/CD, Application Containers, Monitoring Stack (nested) · Planned/Roadmap (separate, dashed).

**Nodes:** Cloudflare (Edge/DNS) · GitHub (Source) · Nginx + Certbot (Reverse Proxy) · Jenkins (CI/CD) · Docker Containers (App layer) · Prometheus + Grafana (Monitoring) · Terraform · K8s (Planned).

**Edges:** Cloudflare→Nginx ("HTTPS 443", live) · Nginx→App ("reverse proxy", live) · GitHub→Jenkins ("webhook / poll", CI) · Jenkins→App ("build + deploy", CI) · App→Monitoring ("metrics scrape", monitoring).

## 5. Integration Point

- **New component:** `frontend/src/components/profile/InfrastructureMap.jsx` — self-contained (data + inline SVG icon paths + rendering + hover/click/Esc logic in one file, mirroring the existing pattern of keeping single-use widget data inline, e.g. `ProfileTabs.jsx`'s `TABS` constant). No new dependencies (no graph/diagram library) — plain SVG built with `document.createElementNS`, matching the mockup's approach.
- **`DiagramsTab.jsx`** is modified to render `<InfrastructureMap />` above the existing image-gallery grid/empty-state, but only for Jana. `MemberProfile.jsx` (the only caller of `DiagramsTab`) passes a new `memberName={member.name}` prop alongside the existing `diagrams={member.diagrams}` prop. `DiagramsTab` renders `<InfrastructureMap />` when `memberName?.toLowerCase() === "jana"` — the same lowercase-name-comparison convention already used elsewhere in the codebase (e.g. `avatarMap[member.name?.toLowerCase()]`). Rana's tab (and any future member without this content) is unaffected — she still sees the existing empty-state / generic gallery behavior exactly as today.
- This is deliberately a one-off, hardcoded association (this specific interactive map is Jana-specific content, not generic data-driven content), which is why it lives as a conditionally-rendered component rather than another entry in the generic `member.diagrams` array — the diagram's node graph isn't the kind of content that fits a `{title, image, description}` shape.

## Out of Scope

- No backend changes — this is entirely static, hardcoded frontend content (no API, no `teamdata.js` changes).
- No freeform drag/pan/zoom (explicitly deferred per the interaction-depth decision).
- No mobile-specific redesign beyond the SVG's existing fluid `viewBox` scaling — small-screen legibility is a known, accepted limitation for v1.
- No icon library dependency — icons are hand-authored inline SVG paths matching the mockup.
- Real infrastructure details beyond what's specified in Section 1 (raw IPs, exact ports, other projects' names) are explicitly excluded, not just deferred.

# Dark Theme (Default) with Light Toggle — Design Spec

**Date:** 2026-08-13
**Scope:** Site-wide (`frontend/`) — Home, Navbar, member profile pages (all four tabs), and the project detail page.

## Background

The site currently has one light theme, with every color hardcoded as a Tailwind arbitrary hex value scattered across every component (e.g. `bg-[#F8F9FE]`, `text-[#3C467B]`) — no shared token system. This spec adds a dark theme, makes it the default for first-time visitors, and adds a toggle so visitors can switch to light and have that choice remembered.

## 1. Token Architecture

A semantic color token layer sits between Tailwind and the components:

- **CSS custom properties**, defined as raw RGB channel triples (not full hex), e.g. `--color-page-bg: 16 18 42;`. Channel-triple format is required so Tailwind's opacity modifiers keep working (`bg-page/50`, `border-subtle/20`), which the codebase already relies on in several places (e.g. `bg-[#6E8CFB]/5`, `border-white/15`).
- Defined in `frontend/src/index.css`: one block under `:root` (light, the fallback/default values), one block under `:root[data-theme="dark"]` (dark overrides).
- **`tailwind.config.js`** extends `theme.colors` with semantic names (`page`, `surface`, `border`, `heading`, `text-secondary`, `text-muted`, `text-faint`, `accent-start`, `accent-end`, `accent-soft`, `hero`) that each resolve to `rgb(var(--color-x) / <alpha-value>)`. Components then write `bg-page text-heading` instead of `bg-[#F8F9FE] text-[#3C467B]`.
- **Toggle mechanism:** a `data-theme="dark"` / `data-theme="light"` attribute on `<html>`, controlled by a `ThemeContext`.
- **No flash of wrong theme:** a small inline script in `frontend/index.html`'s `<head>`, running before React mounts, reads `localStorage.getItem("theme")` synchronously and stamps `data-theme` on `<html>` immediately (falling back to `"dark"` if nothing is stored).

## 2. Color Tokens

| Token | Light (current site) | Dark (Deep Navy — approved) | Used for |
|---|---|---|---|
| `page` | `#F8F9FE` → `248 249 254` | `#10122A` → `16 18 42` | page background |
| `surface` | `#FFFFFF` → `255 255 255` | `#181B3B` → `24 27 59` | cards, navbar |
| `border` | `#ECEEFF` → `236 238 255` | `#262A4D` → `38 42 77` | card/nav borders |
| `heading` | `#3C467B` → `60 70 123` | `#F3F4FF` → `243 244 255` | names, headings |
| `text-secondary` | `#50589C` → `80 88 156` | `#ABB4E8` → `171 180 232` | positions, sub-labels |
| `text-muted` | gray-400 `#9CA3AF` → `156 163 175` | `#9AA3D6` → `154 163 214` | body copy, descriptions |
| `text-faint` | gray-300 `#D1D5DB` → `209 213 219` | `#6C7399` → `108 115 153` | empty-state placeholder text |
| `accent-start` | `#6E8CFB` → `110 140 251` | *unchanged* | gradient buttons, active tab, brand accent |
| `accent-end` | `#A094FF` → `160 148 255` | *unchanged* | gradient buttons, active tab, brand accent |
| `accent-soft` | `#F0F2FF` → `240 242 255` | `#202454` → `32 36 84` | skill pills, hover backgrounds, badges |
| `hero` | `#3C467B` → `60 70 123` | `#181B3B` → `24 27 59` (= `surface`) | Home page hero section background |

Notes:
- Accent colors (`accent-start`/`accent-end`) are identical in both themes — verified against the approved mockup, no separate dark variant needed.
- Status colors (emerald "online" indicator dot, red error text) stay as plain Tailwind utilities (`emerald-400`, `red-400`) — not tokenized, since they already read fine on both backgrounds and aren't part of the brand palette.
- In dark mode, the Home hero section reuses the `surface` value for its background — it's the "elevated" tone against the page, mirroring how the hero is a distinct dark block against the light page today.

## 3. Toggle Component & Behavior

- **`frontend/src/context/ThemeContext.jsx`** (new): a React context exposing `{ theme, toggleTheme }`.
  - On mount: reads `localStorage.getItem("theme")`. If present (`"light"` or `"dark"`), uses it. If absent, defaults to `"dark"`.
  - `toggleTheme()` flips between `"light"` and `"dark"`, writes the new value to `localStorage`, and sets `document.documentElement.dataset.theme` to match.
- **`frontend/src/components/ThemeToggle.jsx`** (new): an icon button consuming `ThemeContext` — shows a sun icon when the current theme is dark (click switches to light) and a moon icon when light (click switches to dark). Mounted in `Navbar.jsx`, next to the member nav links, so it's visible on every page.
- **Transition:** a short (150ms) CSS transition on `background-color`, `color`, and `border-color` applied broadly (e.g. on `body` and a few key containers) so switching themes feels smooth rather than an abrupt flash. Wrapped in a `prefers-reduced-motion` media query guard so it's skipped for users who've asked for reduced motion.
- **No-flash pre-mount script:** inline `<script>` in `frontend/index.html`, placed in `<head>` before the app's root `<script type="module">` tag, that reads `localStorage` synchronously and sets `data-theme` on `<html>` before first paint.

## 4. File Structure

**New files:**
```
frontend/src/context/ThemeContext.jsx    — theme state, localStorage sync, data-theme attribute
frontend/src/components/ThemeToggle.jsx  — sun/moon icon button
```

**Modified — infrastructure:**
```
frontend/index.html                 — add pre-mount no-flash script
frontend/tailwind.config.js         — add token → CSS-variable color mapping
frontend/src/index.css              — add light/dark CSS variable blocks + transition rule
frontend/src/main.jsx               — wrap <App /> in <ThemeProvider>
frontend/src/components/Navbar.jsx  — mount <ThemeToggle />, switch existing color classes to tokens
```

**Modified — color-literal → token swap only** (every `bg-[#...]` / `text-[#...]` / `border-[#...]` arbitrary-hex class replaced with its token equivalent; no layout, logic, or markup structure changes):
```
frontend/src/pages/Home.jsx
frontend/src/pages/MemberProfile.jsx
frontend/src/pages/ProjectDetail.jsx
frontend/src/components/profile/ProfileTabs.jsx
frontend/src/components/profile/ResumeTab.jsx
frontend/src/components/profile/AboutMeTab.jsx
frontend/src/components/profile/ProjectsTab.jsx
frontend/src/components/profile/DiagramsTab.jsx
frontend/src/components/profile/DiagramLightbox.jsx
```

This covers every file in the frontend that currently renders visible, colored UI.

## Out of Scope

- No backend changes — this is a frontend-only, client-side-rendered concern.
- No per-page theme overrides — the whole site shares one theme at a time.
- No system-preference (`prefers-color-scheme`) auto-detection for first-time visitors — the default is always dark regardless of OS setting, per the approved design (a visitor's OS light-mode preference does not override the site's dark-first default; only an explicit toggle click, remembered via `localStorage`, changes it).
- Status colors (emerald/red) are not tokenized or adjusted between themes.

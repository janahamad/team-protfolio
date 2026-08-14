# Dark Theme (Default) with Light Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dark theme (default for first-time visitors) and a light theme, switchable via a toggle in the Navbar, persisted across visits.

**Architecture:** A semantic color token layer — CSS custom properties (RGB channel triples) defined in `frontend/src/index.css`, exposed to Tailwind via `theme.extend.colors` in `frontend/tailwind.config.js`, switched by a `data-theme` attribute on `<html>`. A `ThemeContext` (React context + `localStorage`) controls the attribute; a `ThemeToggle` icon button in the Navbar flips it. Every component's hardcoded hex color classes (`bg-[#F8F9FE]`, `text-[#3C467B]`, etc.) are replaced with the new token classes (`bg-page`, `text-heading`, etc.) — a mechanical, file-by-file swap with no layout or logic changes.

**Tech Stack:** React 19, Tailwind CSS v3 (`theme.extend.colors` with `rgb(var(--x) / <alpha-value>)` pattern), Vite 7. No new dependencies.

## Global Constraints

- No test framework is configured in this codebase. Do not introduce one. Verification uses `npm run lint` plus manual browser checks against the running dev servers (backend `cd backend && npm run dev` on port 8200, frontend `cd frontend && npm run dev`).
- Every token's exact RGB channel values are given below — use them verbatim, do not approximate or recalculate.
- Accent colors (`accent-start` #6E8CFB → `110 140 251`, `accent-end` #A094FF → `160 148 255`) are **identical in both themes** — do not add separate dark variants for these two tokens.
- Status colors (`emerald-400` online indicator, `red-400` error text) and the `DiagramLightbox` backdrop scrim (`bg-[#1B1F3B]/80`) are **deliberately left as literal Tailwind/hex values, not tokenized** — do not convert them.
- The full token table (copy exactly):

  | Token (Tailwind class suffix) | Light RGB | Dark RGB |
  |---|---|---|
  | `page` | `248 249 254` | `16 18 42` |
  | `surface` | `255 255 255` | `24 27 59` |
  | `subtle` | `236 238 255` | `38 42 77` |
  | `heading` | `60 70 123` | `243 244 255` |
  | `secondary` | `80 88 156` | `171 180 232` |
  | `muted` | `156 163 175` | `154 163 214` |
  | `faint` | `209 213 219` | `108 115 153` |
  | `accent-start` | `110 140 251` | `110 140 251` |
  | `accent-end` | `160 148 255` | `160 148 255` |
  | `accent-soft` | `240 242 255` | `32 36 84` |
  | `hero` | `60 70 123` | `24 27 59` |

- First-time visitors (no `localStorage` value yet) get **dark** by default, regardless of OS `prefers-color-scheme`. This is enforced in two places that must stay in sync: the inline pre-mount script in `frontend/index.html` and `ThemeContext.jsx`'s `getInitialTheme()`.

---

### Task 1: Token infrastructure

**Files:**
- Modify: `frontend/tailwind.config.js`
- Modify: `frontend/src/index.css`
- Modify: `frontend/index.html`
- Modify: `frontend/src/main.jsx`
- Create: `frontend/src/context/ThemeContext.jsx`

**Interfaces:**
- Produces: Tailwind color classes `bg-page`, `text-page`, `bg-surface`, `text-surface`, `border-subtle`, `text-heading`, `bg-heading`, `text-secondary`, `bg-secondary`, `text-muted`, `text-faint`, `text-accent-start`/`bg-accent-start`/`from-accent-start`/`to-accent-start`/`via-accent-start`/`border-accent-start`/`shadow-accent-start`, the same set for `accent-end`, `bg-accent-soft`/`ring-accent-soft`, `bg-hero` — all support Tailwind opacity modifiers (e.g. `bg-accent-start/20`). Also produces `useTheme()` (returns `{ theme, toggleTheme }`) and `ThemeProvider` from `frontend/src/context/ThemeContext.jsx` — consumed by Task 2's `ThemeToggle.jsx`.
- Consumes: nothing from earlier tasks (this is the foundation task).

- [ ] **Step 1: Replace `frontend/tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        page: "rgb(var(--color-page) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        subtle: "rgb(var(--color-subtle) / <alpha-value>)",
        heading: "rgb(var(--color-heading) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        faint: "rgb(var(--color-faint) / <alpha-value>)",
        "accent-start": "rgb(var(--color-accent-start) / <alpha-value>)",
        "accent-end": "rgb(var(--color-accent-end) / <alpha-value>)",
        "accent-soft": "rgb(var(--color-accent-soft) / <alpha-value>)",
        hero: "rgb(var(--color-hero) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Replace `frontend/src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-page: 248 249 254;
  --color-surface: 255 255 255;
  --color-subtle: 236 238 255;
  --color-heading: 60 70 123;
  --color-secondary: 80 88 156;
  --color-muted: 156 163 175;
  --color-faint: 209 213 219;
  --color-accent-start: 110 140 251;
  --color-accent-end: 160 148 255;
  --color-accent-soft: 240 242 255;
  --color-hero: 60 70 123;
}

:root[data-theme="dark"] {
  --color-page: 16 18 42;
  --color-surface: 24 27 59;
  --color-subtle: 38 42 77;
  --color-heading: 243 244 255;
  --color-secondary: 171 180 232;
  --color-muted: 154 163 214;
  --color-faint: 108 115 153;
  --color-accent-start: 110 140 251;
  --color-accent-end: 160 148 255;
  --color-accent-soft: 32 36 84;
  --color-hero: 24 27 59;
}

html {
  scroll-behavior: smooth;
}

* {
  font-family: 'Inter', system-ui, sans-serif;
}

body {
  transition: background-color 150ms ease, color 150ms ease;
}

@media (prefers-reduced-motion: reduce) {
  body {
    transition: none;
  }
}
```

- [ ] **Step 3: Replace `frontend/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logow.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="JX Team — Fullstack, DevOps & Infrastructure Engineering portfolio" />
    <title>JX Team Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <script>
      (function () {
        var stored = localStorage.getItem("theme");
        var theme = stored === "light" || stored === "dark" ? stored : "dark";
        document.documentElement.setAttribute("data-theme", theme);
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `frontend/src/context/ThemeContext.jsx`**

```jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

- [ ] **Step 5: Replace `frontend/src/main.jsx`**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 6: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 7: Verify the token infrastructure end-to-end**

Start the backend (`cd backend && npm run dev`) and frontend (`cd frontend && npm run dev`). Open the site in a browser with `localStorage` cleared for that origin (or a fresh incognito window) — this simulates a first-time visitor.

In the browser devtools console, run:
```js
document.documentElement.getAttribute("data-theme")
getComputedStyle(document.documentElement).getPropertyValue("--color-page")
localStorage.getItem("theme")
```
Expected: `"dark"`, `" 16 18 42"` (or equivalent), and `"dark"` respectively — confirming the pre-mount script, the CSS variable blocks, and `ThemeContext`'s default all agree on "dark by default." No visible page changes yet are expected — no component reads the token classes until Task 2 onward — this step only confirms the plumbing.

- [ ] **Step 8: Commit**

```bash
git add frontend/tailwind.config.js frontend/src/index.css frontend/index.html frontend/src/main.jsx frontend/src/context/ThemeContext.jsx
git commit -m "feat: add dark/light theme token infrastructure"
```

---

### Task 2: Theme toggle + Navbar migration

**Files:**
- Create: `frontend/src/components/ThemeToggle.jsx`
- Modify: `frontend/src/components/Navbar.jsx`

**Interfaces:**
- Consumes: `useTheme()` from `frontend/src/context/ThemeContext.jsx` (Task 1) — returns `{ theme, toggleTheme }` where `theme` is `"light" | "dark"`.
- Produces: `ThemeToggle` default-exported component, mounted inside `Navbar.jsx`, no props.

- [ ] **Step 1: Create `frontend/src/components/ThemeToggle.jsx`**

```jsx
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="w-9 h-9 flex items-center justify-center rounded-full text-secondary hover:bg-accent-soft hover:text-heading transition-colors duration-200"
    >
      {isDark ? (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

(Sun icon shown when dark is active — click switches to light. Moon icon shown when light is active — click switches to dark.)

- [ ] **Step 2: Replace `frontend/src/components/Navbar.jsx`**

```jsx
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const members = [
  { id: 1, name: "Rana" },
  { id: 2, name: "Jana" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="JX Team Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-heading tracking-tight group-hover:text-accent-start transition-colors duration-200">
            JX Team
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {members.map((m) => {
            const active = location.pathname === `/member/${m.id}`;
            return (
              <Link
                key={m.id}
                to={`/member/${m.id}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-accent-start text-white shadow-sm shadow-accent-start/30"
                    : "text-secondary hover:bg-accent-soft hover:text-heading"
                }`}
              >
                {m.name}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Verify the toggle in the browser**

With both dev servers running, open the site fresh (cleared `localStorage`). Confirm:
1. The Navbar renders in the dark palette by default (surface `#181B3B`, heading text near-white) — note the rest of the page (Home content) still shows the old light colors at this point, since Home.jsx isn't migrated until Task 3. This is expected.
2. Click the theme toggle icon (sun, since dark is active) — the Navbar switches to the light palette, the icon changes to a moon, and `localStorage.getItem("theme")` now returns `"light"`.
3. Reload the page — the Navbar stays light (persistence confirmed).
4. Click the toggle again — back to dark, `localStorage` updates to `"dark"`, `document.documentElement.getAttribute("data-theme")` is `"dark"`.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/ThemeToggle.jsx frontend/src/components/Navbar.jsx
git commit -m "feat: add theme toggle to Navbar"
```

---

### Task 3: Migrate Home.jsx to tokens

**Files:**
- Modify: `frontend/src/pages/Home.jsx`

**Interfaces:**
- Consumes: token classes from Task 1 (`bg-page`, `bg-hero`, `bg-surface`, `border-subtle`, `text-heading`, `text-secondary`, `text-muted`, `text-faint`, `bg-accent-soft`, `ring-accent-soft`, `accent-start`/`accent-end` variants).

- [ ] **Step 1: Replace `frontend/src/pages/Home.jsx`**

```jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";
import logo from "../assets/logo.png";

const Home = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMembers()
      .then((res) => setMembers(res || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-page">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-start/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-accent-end/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-white/75 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-start animate-pulse" />
            Fullstack · DevOps · Infrastructure Engineering
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            A Team of
            <span className="block mt-1 bg-gradient-to-r from-accent-start via-accent-end to-accent-start bg-clip-text text-transparent">
              Specialized Creators
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-white/60 text-lg leading-relaxed">
            Individual expertise, one unified team.
            Explore each member&apos;s journey, skills, and projects.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-page"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      {/* ── MEMBERS ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-heading mb-2">Meet the Team</h2>
          <p className="text-muted text-sm tracking-wide">Click any card to explore their full profile</p>
        </div>

        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-subtle animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-400 py-16">Failed to load team: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            {members.map((member) => {
              const avatar = avatarMap[member.name?.toLowerCase()] || null;
              return (
                <Link key={member.id} to={`/member/${member.id}`} className="group">
                  <div className="relative bg-surface rounded-3xl overflow-hidden border border-subtle shadow-sm hover:shadow-xl hover:shadow-accent-start/10 hover:border-accent-start/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                    <div className="h-1 bg-gradient-to-r from-accent-start to-accent-end" />

                    <div className="p-8 text-center">
                      {/* Avatar */}
                      <div className="relative inline-block mb-5">
                        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-accent-soft shadow-md">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                              <span className="text-3xl font-bold text-white">{member.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-surface rounded-full shadow-sm" />
                      </div>

                      <h3 className="text-xl font-bold text-heading mb-1">{member.name}</h3>
                      <p className="text-sm text-accent-start font-medium mb-5">{member.position}</p>

                      {member.skills?.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                          {member.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-3 py-1 bg-accent-soft text-secondary rounded-full font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span className="text-xs px-3 py-1 bg-accent-soft text-secondary rounded-full font-medium">
                              +{member.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-start group-hover:gap-3 transition-all duration-200">
                        View Profile
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-24 flex flex-col items-center gap-3">
          <img src={logo} alt="Team Logo" className="w-10 h-10 object-contain opacity-40 hover:opacity-70 transition-opacity duration-300" />
          <span className="text-xs text-faint tracking-widest uppercase">Built with &lt;3/&gt;</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
```

Note: the avatar status dot's border changed from `border-white` to `border-surface` — it sits on a card whose background is `bg-surface`, so its border must match that surface color in both themes (previously this only worked because `surface` happened to equal literal white in the light-only design).

- [ ] **Step 2: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 3: Verify in the browser**

With both dev servers running, open `/` fresh (cleared `localStorage`). Confirm:
1. The whole Home page (hero, member cards, skeleton loader if you throttle network, footer) renders in the dark palette by default — page background `#10122A`, member cards `#181B3B` with `#262A4D` borders, heading text near-white.
2. Click the Navbar's theme toggle — the entire Home page smoothly transitions to the light palette (matching the original design) and back.
3. Hover a member card — confirm the hover shadow/border glow (accent-tinted) still looks correct in both themes.
4. Confirm the hero section's white text/gradient headline is still legible in both themes (it should look identical — the hero background is intentionally dark in both modes).

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/Home.jsx
git commit -m "feat: migrate Home page to theme tokens"
```

---

### Task 4: Migrate MemberProfile.jsx and ProfileTabs.jsx to tokens

**Files:**
- Modify: `frontend/src/pages/MemberProfile.jsx`
- Modify: `frontend/src/components/profile/ProfileTabs.jsx`

**Interfaces:**
- Consumes: token classes from Task 1.

- [ ] **Step 1: Replace `frontend/src/pages/MemberProfile.jsx`**

```jsx
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById, getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";
import ProfileTabs, { PROFILE_TAB_KEYS } from "../components/profile/ProfileTabs";
import ResumeTab from "../components/profile/ResumeTab";
import AboutMeTab from "../components/profile/AboutMeTab";
import ProjectsTab from "../components/profile/ProjectsTab";
import DiagramsTab from "../components/profile/DiagramsTab";
import { brandIcons } from "../assets/icons";

const DEFAULT_TAB = "about";

export default function MemberProfile() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestedTab = searchParams.get("tab");
  const activeTab = PROFILE_TAB_KEYS.includes(requestedTab) ? requestedTab : DEFAULT_TAB;

  const handleTabChange = (tab) => {
    setSearchParams({ tab }, { replace: true });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getMemberById(id), getProjects()])
      .then(([memberData, allProjects]) => {
        setMember(memberData);
        setProjects(allProjects.filter((p) => p.team?.some((m) => m.id === Number(id))));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-subtle border-t-accent-start animate-spin" />
        <p className="text-sm text-muted">Loading profile...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <p className="text-red-400">Error: {error}</p>
    </div>
  );

  if (!member) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <p className="text-muted">Member not found.</p>
    </div>
  );

  const avatar = avatarMap[member.name?.toLowerCase()];

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-accent-start hover:text-secondary transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Team
        </Link>

        {/* ── SLIM PROFILE HEADER ── */}
        <div className="relative bg-surface rounded-[2rem] overflow-hidden shadow-sm border border-subtle mb-10">
          <div className="h-1.5 bg-gradient-to-r from-accent-start to-accent-end" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-start/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-end/8 rounded-full blur-2xl pointer-events-none" />

          <div className="relative p-10 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-8 ring-accent-soft shadow-lg mx-auto">
                {avatar ? (
                  <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 border-2 border-surface rounded-full shadow-sm" />
            </div>

            <h1 className="text-4xl font-extrabold text-heading tracking-tight mb-2">{member.name}</h1>
            <div className="inline-block px-4 py-1 rounded-full bg-accent-soft text-secondary text-sm font-medium mb-6">
              {member.position}
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4">
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-subtle bg-surface hover:border-accent-start hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <img src={brandIcons.linkedin} alt="LinkedIn" className="w-5 h-5 rounded-sm object-contain" />
                </a>
              )}
              {member.social?.github && (
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-subtle bg-surface hover:border-accent-start hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <img src={brandIcons.github} alt="GitHub" className="w-5 h-5 rounded-full object-contain" />
                </a>
              )}
              {member.social?.phone && (
                <a
                  href={`tel:${member.social.phone}`}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-subtle bg-surface hover:border-accent-start hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="Phone"
                >
                  <img src={brandIcons.phone} alt="Phone" className="w-5 h-5 object-contain" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <ProfileTabs activeTab={activeTab} onChange={handleTabChange} />

        {activeTab === "resume" && <ResumeTab member={member} />}
        {activeTab === "about" && <AboutMeTab member={member} projectsCount={projects.length} />}
        {activeTab === "projects" && <ProjectsTab projects={projects} />}
        {activeTab === "diagrams" && <DiagramsTab diagrams={member.diagrams} />}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `frontend/src/components/profile/ProfileTabs.jsx`**

```jsx
const TABS = [
  { key: "resume", label: "Resume" },
  { key: "about", label: "About Me" },
  { key: "projects", label: "Projects" },
  { key: "diagrams", label: "Infrastructure Diagrams" },
];

// eslint-disable-next-line react-refresh/only-export-components -- constant needed alongside the default component export
export const PROFILE_TAB_KEYS = TABS.map((tab) => tab.key);

export default function ProfileTabs({ activeTab, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={
              isActive
                ? "px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-accent-start to-accent-end text-white shadow-sm transition-all duration-200"
                : "px-5 py-2.5 rounded-full text-sm font-semibold bg-surface text-secondary border border-subtle hover:border-accent-start transition-all duration-200"
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Verify in the browser**

Visit `/member/1` and `/member/2` in both themes (toggle via Navbar). Confirm for each:
1. Slim header (avatar, name, position badge, social icons) renders correctly in both themes — no invisible text (e.g. dark text on dark background).
2. The 4 tab pills render correctly — active tab has the accent gradient with white text (should look the same in both themes); inactive tabs use `surface`/`secondary`/`subtle` and visibly change between themes.
3. Loading spinner (throttle network to see it) uses the themed border colors.
4. Switching tabs (`?tab=resume`, etc.) doesn't break theming — spot-check the URL updates correctly still.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/MemberProfile.jsx frontend/src/components/profile/ProfileTabs.jsx
git commit -m "feat: migrate MemberProfile and ProfileTabs to theme tokens"
```

---

### Task 5: Migrate ResumeTab.jsx and AboutMeTab.jsx to tokens

**Files:**
- Modify: `frontend/src/components/profile/ResumeTab.jsx`
- Modify: `frontend/src/components/profile/AboutMeTab.jsx`

**Interfaces:**
- Consumes: token classes from Task 1.

- [ ] **Step 1: Replace `frontend/src/components/profile/ResumeTab.jsx`**

```jsx
import { brandIcons } from "../../assets/icons";

export default function ResumeTab({ member }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-8">
        {/* Skills */}
        <div className="bg-surface rounded-2xl border border-subtle p-6 shadow-sm">
          <h2 className="text-lg font-bold text-heading mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-gradient-to-b from-accent-start to-accent-end rounded-full" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-accent-soft text-secondary border border-subtle hover:border-accent-start transition-colors duration-150 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {member.certifications && member.certifications.length > 0 && (
          <div className="bg-surface rounded-2xl border border-subtle p-6 shadow-sm">
            <h2 className="text-lg font-bold text-heading mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-accent-end to-accent-start rounded-full" />
              Certifications
            </h2>
            <ul className="space-y-3">
              {member.certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-soft text-accent-start flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {i + 1}
                  </span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="lg:col-span-2 space-y-10">
        {member.experience && member.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-heading mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-accent-start to-accent-end rounded-full" />
              Professional Journey
            </h2>
            <div className="space-y-4 relative before:absolute before:left-7 before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-accent-start/30 before:to-accent-end/10">
              {member.experience.map((exp, index) => {
                const companyLower = exp.company.toLowerCase();
                const logoKey = Object.keys(brandIcons).find((key) => companyLower.includes(key));
                const logo = logoKey ? brandIcons[logoKey] : null;
                return (
                  <div key={index} className="relative pl-16 group">
                    <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-surface border border-subtle shadow-sm flex items-center justify-center z-10 group-hover:border-accent-start group-hover:shadow-md transition-all duration-200 overflow-hidden">
                      {logo ? (
                        <img src={logo} alt={exp.company} className="w-9 h-9 object-contain" />
                      ) : (
                        <span className="text-lg font-bold text-accent-start">{exp.company.charAt(0)}</span>
                      )}
                    </div>
                    <div className="bg-surface p-5 rounded-2xl border border-subtle shadow-sm group-hover:shadow-md group-hover:border-accent-start/20 transition-all duration-200">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                        <h4 className="text-base font-bold text-heading">{exp.role}</h4>
                        <span className="text-xs font-semibold text-accent-start bg-accent-soft px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-secondary font-medium mb-3">{exp.company}</p>
                      <p className="text-sm text-muted leading-relaxed">{exp.tasks}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
```

(The two hover-only shades that previously differed slightly from their base color — `hover:bg-[#E8EDFF]` on skill pills — are dropped: they were a near-invisible one-off shade with no token equivalent, and removing them is a strict simplification, not a visible regression, since the border already darkens on hover.)

- [ ] **Step 2: Replace `frontend/src/components/profile/AboutMeTab.jsx`**

```jsx
export default function AboutMeTab({ member, projectsCount }) {
  const stats = [
    { label: "Years Experience", value: member.yearsExperience ?? 0 },
    { label: "Projects Done", value: projectsCount },
    { label: "Technologies", value: member.skills?.length || 0 },
    { label: "Certifications", value: member.certifications?.length || 0 },
  ];

  return (
    <div className="bg-surface rounded-2xl border border-subtle p-8 shadow-sm">
      <h2 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-gradient-to-b from-accent-start to-accent-end rounded-full" />
        About Me
      </h2>
      <p className="text-muted leading-relaxed mb-8 max-w-2xl">{member.bio}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center bg-page rounded-xl border border-subtle py-5 px-2"
          >
            <p className="text-2xl font-bold text-heading">{stat.value}</p>
            <p className="text-xs text-muted mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Verify in the browser**

On `/member/1?tab=resume` and `/member/2?tab=resume`, in both themes: confirm Skills pills, Certifications list, and Experience timeline cards are all legible with correct contrast in dark mode (this is the tab with the most color usage — check especially the timeline's connecting line and company-logo fallback circles). On `?tab=about` for both members, in both themes: confirm the bio text and the 4 stat tiles (inset panels) are legible — the stat tile background should look subtly different from the card background it sits inside, in both themes.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/profile/ResumeTab.jsx frontend/src/components/profile/AboutMeTab.jsx
git commit -m "feat: migrate ResumeTab and AboutMeTab to theme tokens"
```

---

### Task 6: Migrate ProjectsTab.jsx, DiagramsTab.jsx, and DiagramLightbox.jsx to tokens

**Files:**
- Modify: `frontend/src/components/profile/ProjectsTab.jsx`
- Modify: `frontend/src/components/profile/DiagramsTab.jsx`
- Modify: `frontend/src/components/profile/DiagramLightbox.jsx`

**Interfaces:**
- Consumes: token classes from Task 1.

- [ ] **Step 1: Replace `frontend/src/components/profile/ProjectsTab.jsx`**

```jsx
import { Link } from "react-router-dom";

export default function ProjectsTab({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="bg-surface p-10 rounded-2xl border border-dashed border-subtle text-center">
        <p className="text-faint text-sm">Collaborative works coming soon...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          className="group bg-surface rounded-2xl border border-subtle overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent-start/20 transition-all duration-200"
        >
          <div className="relative h-40 overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{project.title.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-heading/0 group-hover:bg-heading/40 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-bold tracking-wide transition-opacity duration-200">
                View Project →
              </span>
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-bold text-heading mb-2">{project.title}</h4>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 bg-accent-soft text-accent-start rounded-md font-bold uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted leading-relaxed line-clamp-3">{project.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Replace `frontend/src/components/profile/DiagramsTab.jsx`**

```jsx
import { useState } from "react";
import DiagramLightbox from "./DiagramLightbox";

function DiagramThumbnail({ diagram, onSelect }) {
  const [hasError, setHasError] = useState(false);
  const showFallback = !diagram.image || hasError;

  return (
    <button
      type="button"
      onClick={() => onSelect(diagram)}
      className="group text-left bg-surface rounded-2xl border border-subtle overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent-start/20 transition-all duration-200"
    >
      <div className="relative h-40 overflow-hidden bg-accent-soft">
        {showFallback ? (
          <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{diagram.title.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={diagram.image}
            alt={diagram.title}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-heading text-sm">{diagram.title}</h4>
      </div>
    </button>
  );
}

export default function DiagramsTab({ diagrams }) {
  const [selected, setSelected] = useState(null);

  if (!diagrams || diagrams.length === 0) {
    return (
      <div className="bg-surface p-10 rounded-2xl border border-dashed border-subtle text-center">
        <p className="text-faint text-sm">Diagrams coming soon...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {diagrams.map((diagram) => (
          <DiagramThumbnail key={diagram.id} diagram={diagram} onSelect={setSelected} />
        ))}
      </div>
      <DiagramLightbox diagram={selected} onClose={() => setSelected(null)} />
    </>
  );
}
```

- [ ] **Step 3: Replace `frontend/src/components/profile/DiagramLightbox.jsx`**

```jsx
import { useEffect, useState } from "react";

export default function DiagramLightbox({ diagram, onClose }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [diagram]);

  if (!diagram) return null;

  const showFallback = !diagram.image || hasError;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1B1F3B]/80 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-surface rounded-2xl overflow-hidden max-w-3xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/90 hover:bg-surface text-heading flex items-center justify-center shadow-sm z-10"
          aria-label="Close"
        >
          ✕
        </button>
        {showFallback ? (
          <div className="w-full h-56 bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
            <span className="text-5xl font-bold text-white">{diagram.title.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={diagram.image}
            alt={diagram.title}
            onError={() => setHasError(true)}
            className="w-full max-h-[60vh] object-contain bg-page"
          />
        )}
        <div className="p-6">
          <h3 className="text-lg font-bold text-heading mb-2">{diagram.title}</h3>
          {diagram.description && (
            <p className="text-sm text-muted leading-relaxed">{diagram.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

Note: the backdrop (`bg-[#1B1F3B]/80`) is intentionally left as a literal hex value, per the Global Constraints — it's a fixed modal scrim, not a themed surface.

- [ ] **Step 4: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 5: Verify in the browser**

On `/member/2?tab=projects` in both themes: confirm project cards (gradient fallback covers, since `image` is still `null` for all seed projects), tech badges, and the hover overlay all look correct.

On `/member/2?tab=diagrams`: confirm the "Diagrams coming soon..." empty state is legible in both themes. Then, temporarily add one diagram entry to Jana's `diagrams` array in `backend/src/Data/teamdata.js` (e.g. `{ id: 1, title: "Test", image: null, description: "test" }`), restart the backend, and confirm: the thumbnail's gradient fallback renders correctly in both themes, clicking it opens the lightbox with the same fallback and correctly themed card background/text, and the backdrop stays visually dark (fixed scrim) in both themes. Remove the test entry and restart the backend before committing.

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/profile/ProjectsTab.jsx frontend/src/components/profile/DiagramsTab.jsx frontend/src/components/profile/DiagramLightbox.jsx
git commit -m "feat: migrate ProjectsTab, DiagramsTab, and DiagramLightbox to theme tokens"
```

---

### Task 7: Migrate ProjectDetail.jsx and final full-site verification

**Files:**
- Modify: `frontend/src/pages/ProjectDetail.jsx`

**Interfaces:**
- Consumes: token classes from Task 1.

- [ ] **Step 1: Replace `frontend/src/pages/ProjectDetail.jsx`**

```jsx
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProjects()
      .then((allProjects) => {
        const found = allProjects.find((p) => p.id === Number(id));
        if (!found) throw new Error("Project not found");
        setProject(found);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-subtle border-t-accent-start animate-spin" />
        <p className="text-sm text-muted">Loading project...</p>
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <p className="text-red-400">{error || "Project not found."}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          type="button"
          onClick={() => (location.key === "default" ? navigate("/") : navigate(-1))}
          className="inline-flex items-center gap-2 text-sm text-accent-start hover:text-secondary transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back
        </button>

        <div className="bg-surface rounded-[2rem] overflow-hidden shadow-sm border border-subtle">
          <div className="h-56 sm:h-72 w-full overflow-hidden">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                <span className="text-6xl font-bold text-white">{project.title.charAt(0)}</span>
              </div>
            )}
          </div>

          <div className="p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-heading tracking-tight mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 bg-accent-soft text-accent-start rounded-md font-bold uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-muted leading-relaxed mb-8">{project.description}</p>

            {project.team?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold text-heading uppercase tracking-wider mb-3">Team</h2>
                <div className="flex flex-wrap gap-3">
                  {project.team.map((member) => {
                    const avatar = avatarMap[member.name?.toLowerCase()];
                    return (
                      <Link
                        key={member.id}
                        to={`/member/${member.id}?tab=projects`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-subtle bg-page hover:border-accent-start transition-colors duration-150"
                      >
                        <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                          {avatar ? (
                            <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] font-bold text-white">{member.name.charAt(0)}</span>
                          )}
                        </span>
                        <span className="text-sm font-medium text-secondary">{member.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-bold text-accent-start hover:underline"
              >
                View Code ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 3: Verify ProjectDetail in the browser**

Navigate to `/project/3` and `/project/5` (has a `github` link) in both themes: confirm the cover fallback, tech badges, description, Team section (with real avatars), and "View Code ↗" link all render correctly in both themes.

- [ ] **Step 4: Final full-site verification pass**

With `localStorage` cleared (fresh visitor), walk through the entire site once in dark (the default) and once in light, confirming no regressions from the migration:

1. `/` — hero, member cards, footer.
2. `/member/1` and `/member/2` — header, all 4 tabs (Resume, About Me, Projects, Infrastructure Diagrams).
3. `/project/3`, `/project/5` — detail page, Back button (should return to the correct member + Projects tab).
4. Toggle the theme from the Navbar on at least 3 different pages — confirm it's instant and consistent across the whole page (no element stuck in the old theme).
5. Reload the page after toggling to light — confirm it stays light (persistence).
6. Clear `localStorage` again (or open a new incognito window) — confirm the site defaults back to dark.
7. Check the browser console for errors on every page in both themes — zero errors expected.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/ProjectDetail.jsx
git commit -m "feat: migrate ProjectDetail to theme tokens"
```

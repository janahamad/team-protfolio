# Member Profile Tabs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single-scroll `MemberProfile.jsx` layout with a 4-tab interface (Resume / About Me / Projects / Infrastructure Diagrams), applied to all members, plus a dedicated project detail page.

**Architecture:** Extract the existing Skills/Certifications/Experience markup into a `ResumeTab` component, add three new tab components (`AboutMeTab`, `ProjectsTab`, `DiagramsTab` + `DiagramLightbox`), and a `ProfileTabs` tab-bar component. `MemberProfile.jsx` keeps a slimmed header (avatar/name/position/socials) and switches between the four tab components based on a `?tab=` URL query param. A new `/project/:id` route adds a `ProjectDetail.jsx` page, reusing the existing `getProjects()` API call (no new backend endpoint).

**Tech Stack:** React 19, react-router-dom v7 (`useSearchParams`), Tailwind CSS v3, Vite 7 (frontend). Express 5 backend, static data module (`backend/src/Data/teamdata.js`), no database.

## Global Constraints

- No test framework is configured in this codebase (no Jest/Vitest, no React Testing Library; `backend/package.json`'s `test` script is a stub that exits 1). Do not introduce one as part of this feature — it's out of scope. Verification steps in this plan use `npm run lint` (frontend) plus manual checks against the running dev servers instead of automated tests, matching the project's existing conventions.
- Follow existing color/style tokens exactly: background `#F8F9FE`, card border `#ECEEFF`, primary gradient `from-[#6E8CFB] to-[#A094FF]`, heading text `#3C467B`, secondary text `#50589C`, muted text `text-gray-400`/`text-gray-500`. These already appear throughout `MemberProfile.jsx` — reuse them verbatim in new components, don't invent new colors.
- Backend runs on port 8200 (`backend/.env` → `PORT=8200`); frontend dev server proxies `/api` to `http://localhost:8200` (`frontend/vite.config.js`). Start both with `npm run dev` in their respective directories (or `npm run dev` from the backend uses `nodemon`, frontend uses `vite`).
- No new backend routes or database changes in this plan — `/members/:id` and `/projects` already return everything needed.

---

### Task 1: Data model — add yearsExperience, diagrams, and project images

**Files:**
- Modify: `backend/src/Data/teamdata.js`

**Interfaces:**
- Produces: `member.yearsExperience` (number), `member.diagrams` (array of `{ id, title, image, description }`, empty for now), `project.image` (string path or `null`) — consumed by Task 2 (`AboutMeTab`, `DiagramsTab`) and Task 2/3 (`ProjectsTab`, `ProjectDetail`).

- [ ] **Step 1: Add `yearsExperience` and `diagrams` to both members**

Open `backend/src/Data/teamdata.js`. In the Rana object (id: 1), add two fields after `image: ""`:

```js
    image: "",
    yearsExperience: 1,
    diagrams: [],
```

In the Jana object (id: 2), add the same two fields after `image: ""` (estimated from her listed experience history — Jul 2023 COOP through the current Aljawad Premium role — adjust the number later if you want a different value):

```js
    image: "",
    yearsExperience: 3,
    diagrams: [],
```

- [ ] **Step 2: Add `image: null` to every project**

In the same file, add an `image` field to each of the four project objects in the `projects` array (ids 1, 2, 3, 5), right after each `title`/`description` pair — e.g. for project id 1:

```js
  {
    id: 1,
    title: "SmartMargin",
    description: "A responsive web app that helps small business owners calculate profit margins and visualize cost breakdowns in real time.",
    image: null,
    team: [1], // Rana solo
    technologies: ["React", "Node.js", "PostgreSQL"]
  },
```

Repeat for projects with `id: 2`, `id: 3`, and `id: 5`, inserting `image: null,` in the same position (after `description`, before `team`). Leave every other field unchanged.

- [ ] **Step 3: Verify the API returns the new fields**

Start the backend:

```bash
cd backend && npm run dev
```

In a separate terminal, confirm the new fields are present:

```bash
curl -s http://localhost:8200/api/members/2 | grep -o '"yearsExperience":[0-9]*'
curl -s http://localhost:8200/api/members/2 | grep -o '"diagrams":\[\]'
curl -s http://localhost:8200/api/projects | grep -o '"image":null' | head -1
```

Expected: each command prints a match (`"yearsExperience":3`, `"diagrams":[]`, `"image":null`). Stop the backend (Ctrl+C) once confirmed.

- [ ] **Step 4: Commit**

```bash
git add backend/src/Data/teamdata.js
git commit -m "feat: add yearsExperience, diagrams, and project image fields to team data"
```

---

### Task 2: Tabbed profile page

**Files:**
- Create: `frontend/src/components/profile/ProfileTabs.jsx`
- Create: `frontend/src/components/profile/AboutMeTab.jsx`
- Create: `frontend/src/components/profile/ResumeTab.jsx`
- Create: `frontend/src/components/profile/ProjectsTab.jsx`
- Create: `frontend/src/components/profile/DiagramLightbox.jsx`
- Create: `frontend/src/components/profile/DiagramsTab.jsx`
- Modify: `frontend/src/pages/MemberProfile.jsx`

**Interfaces:**
- Consumes: `member` object shape from Task 1 (`yearsExperience`, `diagrams`, `skills`, `certifications`, `experience`, `bio`, `social`, `name`, `position`), `projects` array (each with `id`, `title`, `description`, `image`, `technologies`) already filtered by member in `MemberProfile.jsx`, `brandIcons` from `frontend/src/assets/icons` (existing), `avatarMap` from `frontend/src/assets/avatars` (existing).
- Produces: `ProfileTabs` exports default component with props `{ activeTab, onChange }` and named export `PROFILE_TAB_KEYS` (array of the 4 valid tab key strings: `"resume"`, `"about"`, `"projects"`, `"diagrams"`) — consumed by `MemberProfile.jsx` for query-param validation. `ResumeTab`, `AboutMeTab`, `ProjectsTab`, `DiagramsTab` each export a default component consumed only by `MemberProfile.jsx`.

- [ ] **Step 1: Create the tab bar component**

Create `frontend/src/components/profile/ProfileTabs.jsx`:

```jsx
const TABS = [
  { key: "resume", label: "Resume" },
  { key: "about", label: "About Me" },
  { key: "projects", label: "Projects" },
  { key: "diagrams", label: "Infrastructure Diagrams" },
];

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
                ? "px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#6E8CFB] to-[#A094FF] text-white shadow-sm transition-all duration-200"
                : "px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-[#50589C] border border-[#ECEEFF] hover:border-[#6E8CFB] transition-all duration-200"
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

- [ ] **Step 2: Create the About Me tab**

Create `frontend/src/components/profile/AboutMeTab.jsx`:

```jsx
export default function AboutMeTab({ member, projectsCount }) {
  const stats = [
    { label: "Years Experience", value: member.yearsExperience ?? 0 },
    { label: "Projects Done", value: projectsCount },
    { label: "Technologies", value: member.skills?.length || 0 },
    { label: "Certifications", value: member.certifications?.length || 0 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEFF] p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#3C467B] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-gradient-to-b from-[#6E8CFB] to-[#A094FF] rounded-full" />
        About Me
      </h2>
      <p className="text-gray-500 leading-relaxed mb-8 max-w-2xl">{member.bio}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center bg-[#F8F9FE] rounded-xl border border-[#ECEEFF] py-5 px-2"
          >
            <p className="text-2xl font-bold text-[#3C467B]">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the Resume tab (extracted from the current page)**

Create `frontend/src/components/profile/ResumeTab.jsx`:

```jsx
import { brandIcons } from "../../assets/icons";

export default function ResumeTab({ member }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-8">
        {/* Skills */}
        <div className="bg-white rounded-2xl border border-[#ECEEFF] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#3C467B] mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-gradient-to-b from-[#6E8CFB] to-[#A094FF] rounded-full" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F0F2FF] text-[#50589C] border border-[#ECEEFF] hover:border-[#6E8CFB] hover:bg-[#E8EDFF] transition-colors duration-150 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {member.certifications && (
          <div className="bg-white rounded-2xl border border-[#ECEEFF] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#3C467B] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-[#A094FF] to-[#6E8CFB] rounded-full" />
              Certifications
            </h2>
            <ul className="space-y-3">
              {member.certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#F0F2FF] text-[#6E8CFB] flex items-center justify-center flex-shrink-0 text-xs font-bold">
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
            <h2 className="text-xl font-bold text-[#3C467B] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-[#6E8CFB] to-[#A094FF] rounded-full" />
              Professional Journey
            </h2>
            <div className="space-y-4 relative before:absolute before:left-7 before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-[#6E8CFB]/30 before:to-[#A094FF]/10">
              {member.experience.map((exp, index) => {
                const companyLower = exp.company.toLowerCase();
                const logoKey = Object.keys(brandIcons).find((key) => companyLower.includes(key));
                const logo = logoKey ? brandIcons[logoKey] : null;
                return (
                  <div key={index} className="relative pl-16 group">
                    <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-white border border-[#ECEEFF] shadow-sm flex items-center justify-center z-10 group-hover:border-[#6E8CFB] group-hover:shadow-md transition-all duration-200 overflow-hidden">
                      {logo ? (
                        <img src={logo} alt={exp.company} className="w-9 h-9 object-contain" />
                      ) : (
                        <span className="text-lg font-bold text-[#6E8CFB]">{exp.company.charAt(0)}</span>
                      )}
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-[#ECEEFF] shadow-sm group-hover:shadow-md group-hover:border-[#6E8CFB]/20 transition-all duration-200">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                        <h4 className="text-base font-bold text-[#3C467B]">{exp.role}</h4>
                        <span className="text-xs font-semibold text-[#6E8CFB] bg-[#F0F2FF] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-[#50589C] font-medium mb-3">{exp.company}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{exp.tasks}</p>
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

- [ ] **Step 4: Create the Projects tab**

Create `frontend/src/components/profile/ProjectsTab.jsx`:

```jsx
import { Link } from "react-router-dom";

export default function ProjectsTab({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="bg-white p-10 rounded-2xl border border-dashed border-[#ECEEFF] text-center">
        <p className="text-gray-300 text-sm">Collaborative works coming soon...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          className="group bg-white rounded-2xl border border-[#ECEEFF] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#6E8CFB]/20 transition-all duration-200"
        >
          <div className="relative h-40 overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#6E8CFB] to-[#A094FF] flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{project.title.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-[#3C467B]/0 group-hover:bg-[#3C467B]/40 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-bold tracking-wide transition-opacity duration-200">
                View Project →
              </span>
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-bold text-[#3C467B] mb-2">{project.title}</h4>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 bg-[#F0F2FF] text-[#6E8CFB] rounded-md font-bold uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{project.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Create the diagram lightbox**

Create `frontend/src/components/profile/DiagramLightbox.jsx`:

```jsx
export default function DiagramLightbox({ diagram, onClose }) {
  if (!diagram) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1B1F3B]/80 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#3C467B] flex items-center justify-center shadow-sm z-10"
          aria-label="Close"
        >
          ✕
        </button>
        <img src={diagram.image} alt={diagram.title} className="w-full max-h-[60vh] object-contain bg-[#F8F9FE]" />
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#3C467B] mb-2">{diagram.title}</h3>
          {diagram.description && (
            <p className="text-sm text-gray-500 leading-relaxed">{diagram.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create the Infrastructure Diagrams tab**

Create `frontend/src/components/profile/DiagramsTab.jsx`:

```jsx
import { useState } from "react";
import DiagramLightbox from "./DiagramLightbox";

export default function DiagramsTab({ diagrams }) {
  const [selected, setSelected] = useState(null);

  if (!diagrams || diagrams.length === 0) {
    return (
      <div className="bg-white p-10 rounded-2xl border border-dashed border-[#ECEEFF] text-center">
        <p className="text-gray-300 text-sm">Diagrams coming soon...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {diagrams.map((diagram) => (
          <button
            key={diagram.id}
            type="button"
            onClick={() => setSelected(diagram)}
            className="group text-left bg-white rounded-2xl border border-[#ECEEFF] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#6E8CFB]/20 transition-all duration-200"
          >
            <div className="relative h-40 overflow-hidden bg-[#F0F2FF]">
              <img
                src={diagram.image}
                alt={diagram.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-[#3C467B] text-sm">{diagram.title}</h4>
            </div>
          </button>
        ))}
      </div>
      <DiagramLightbox diagram={selected} onClose={() => setSelected(null)} />
    </>
  );
}
```

- [ ] **Step 7: Restructure MemberProfile.jsx to use the tabs**

Replace the full contents of `frontend/src/pages/MemberProfile.jsx` with:

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
    <div className="min-h-screen bg-[#F8F9FE] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#ECEEFF] border-t-[#6E8CFB] animate-spin" />
        <p className="text-sm text-gray-400">Loading profile...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#F8F9FE] flex items-center justify-center">
      <p className="text-red-400">Error: {error}</p>
    </div>
  );

  if (!member) return (
    <div className="min-h-screen bg-[#F8F9FE] flex items-center justify-center">
      <p className="text-gray-400">Member not found.</p>
    </div>
  );

  const avatar = avatarMap[member.name?.toLowerCase()];

  return (
    <div className="min-h-screen bg-[#F8F9FE]">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#6E8CFB] hover:text-[#50589C] transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Team
        </Link>

        {/* ── SLIM PROFILE HEADER ── */}
        <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#ECEEFF] mb-10">
          <div className="h-1.5 bg-gradient-to-r from-[#6E8CFB] to-[#A094FF]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6E8CFB]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#A094FF]/8 rounded-full blur-2xl pointer-events-none" />

          <div className="relative p-10 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-8 ring-[#F0F2FF] shadow-lg mx-auto">
                {avatar ? (
                  <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#6E8CFB] to-[#A094FF] flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
            </div>

            <h1 className="text-4xl font-extrabold text-[#3C467B] tracking-tight mb-2">{member.name}</h1>
            <div className="inline-block px-4 py-1 rounded-full bg-[#F0F2FF] text-[#50589C] text-sm font-medium mb-6">
              {member.position}
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4">
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#ECEEFF] bg-white hover:border-[#6E8CFB] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
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
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#ECEEFF] bg-white hover:border-[#6E8CFB] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <img src={brandIcons.github} alt="GitHub" className="w-5 h-5 rounded-full object-contain" />
                </a>
              )}
              {member.social?.phone && (
                <a
                  href={`tel:${member.social.phone}`}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#ECEEFF] bg-white hover:border-[#6E8CFB] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
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

- [ ] **Step 8: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors (in particular, no `no-unused-vars` — every import in `MemberProfile.jsx` is used: `brandIcons` for the social icons, `avatarMap` for the avatar).

- [ ] **Step 9: Manual browser verification**

With the backend still running on port 8200 (`cd backend && npm run dev`), start the frontend:

```bash
cd frontend && npm run dev
```

Open the printed local URL, navigate to a member profile (click a team member card from the home page, or go directly to `/member/2`), and verify:
1. Page loads on the **About Me** tab by default, showing the bio and 4 stat tiles (Years Experience, Projects Done, Technologies, Certifications) with correct numbers.
2. Clicking **Resume** shows Skills, Certifications, and Experience timeline (same content/styling as the old page), and the URL updates to `...?tab=resume`.
3. Clicking **Projects** shows a grid of project cards with a gradient-fallback cover (since `image` is `null` for now) and hover overlay text.
4. Clicking **Infrastructure Diagrams** shows the "Diagrams coming soon..." empty state (since `diagrams` is `[]` for now).
5. Reloading the page while on a non-default tab (e.g. `/member/2?tab=resume`) keeps that tab active.
6. Repeat steps 1–4 for `/member/1` (Rana) to confirm the shared component works for both members.
7. To sanity-check the lightbox before real diagram images exist: temporarily add one test entry to Jana's `diagrams` array in `backend/src/Data/teamdata.js` (e.g. `{ id: 1, title: "Test", image: "https://placehold.co/600x400", description: "Test diagram" }`), restart the backend, click the thumbnail on the Diagrams tab, confirm the lightbox opens with the image/title/description and closes on backdrop click or the ✕ button — then **remove the test entry** and restart the backend again before committing.

- [ ] **Step 10: Commit**

```bash
git add frontend/src/components/profile frontend/src/pages/MemberProfile.jsx
git commit -m "feat: add tabbed member profile (Resume, About Me, Projects, Infrastructure Diagrams)"
```

---

### Task 3: Project detail page

**Files:**
- Create: `frontend/src/pages/ProjectDetail.jsx`
- Modify: `frontend/src/App.jsx`

**Interfaces:**
- Consumes: `getProjects()` from `frontend/src/api/teamApi.js` (existing, unchanged), project shape from Task 1/2 (`id`, `title`, `description`, `image`, `technologies`, `team` [array of populated member objects with `id`, `name`], `github`).
- Produces: route `/project/:id` rendering `ProjectDetail`, consumed by the `Link` in `ProjectsTab.jsx` (`to={`/project/${project.id}`}`, already wired in Task 2).

- [ ] **Step 1: Create the project detail page**

Create `frontend/src/pages/ProjectDetail.jsx`:

```jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../api/teamApi";

export default function ProjectDetail() {
  const { id } = useParams();
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
    <div className="min-h-screen bg-[#F8F9FE] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#ECEEFF] border-t-[#6E8CFB] animate-spin" />
        <p className="text-sm text-gray-400">Loading project...</p>
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen bg-[#F8F9FE] flex items-center justify-center">
      <p className="text-red-400">{error || "Project not found."}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FE]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to={`/member/${project.team?.[0]?.id ?? ""}`}
          className="inline-flex items-center gap-2 text-sm text-[#6E8CFB] hover:text-[#50589C] transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back
        </Link>

        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#ECEEFF]">
          <div className="h-56 sm:h-72 w-full overflow-hidden">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#6E8CFB] to-[#A094FF] flex items-center justify-center">
                <span className="text-6xl font-bold text-white">{project.title.charAt(0)}</span>
              </div>
            )}
          </div>

          <div className="p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-[#3C467B] tracking-tight mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 bg-[#F0F2FF] text-[#6E8CFB] rounded-md font-bold uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-gray-500 leading-relaxed mb-8">{project.description}</p>

            {project.team?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold text-[#3C467B] uppercase tracking-wider mb-3">Team</h2>
                <div className="flex flex-wrap gap-3">
                  {project.team.map((member) => (
                    <Link
                      key={member.id}
                      to={`/member/${member.id}?tab=projects`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#ECEEFF] bg-[#F8F9FE] hover:border-[#6E8CFB] transition-colors duration-150"
                    >
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6E8CFB] to-[#A094FF] flex items-center justify-center text-[10px] font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                      <span className="text-sm font-medium text-[#50589C]">{member.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-bold text-[#6E8CFB] hover:underline"
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

- [ ] **Step 2: Wire the route**

Open `frontend/src/App.jsx`. Add the import and route:

```jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MemberProfile from "./pages/MemberProfile";
import ProjectDetail from "./pages/ProjectDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/:id" element={<MemberProfile />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}
```

- [ ] **Step 3: Lint check**

```bash
cd frontend && npm run lint
```

Expected: no errors.

- [ ] **Step 4: Manual browser verification**

With both dev servers running (backend on 8200, frontend via `npm run dev`):
1. Go to a member profile (e.g. `/member/2`), click **Projects**, click any project card.
2. Confirm you land on `/project/<id>` showing the cover fallback (gradient + initial), title, tech badges, full description, a **Team** section listing every member on that project (clicking a team member navigates to `/member/<id>?tab=projects`), and a "View Code ↗" link for projects that have a `github` field (e.g. "SEO Checker Pro").
3. Click **← Back** and confirm it returns to that member's profile.
4. Directly visit a project with no `github` field (e.g. `/project/2`, "Banking System") and confirm the "View Code" link is correctly absent, with no console errors.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/ProjectDetail.jsx frontend/src/App.jsx
git commit -m "feat: add project detail page reachable from the Projects tab"
```

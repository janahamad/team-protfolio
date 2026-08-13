# Member Profile Tabs — Design Spec

**Date:** 2026-08-13
**Scope:** `frontend/src/pages/MemberProfile.jsx` and its data source (`backend/src/Data/teamdata.js`), applied to all team members (currently Rana and Jana).

## Background

The current `MemberProfile.jsx` renders a single, non-tabbed layout for every member: a profile header (avatar, name, bio, stats, social links) followed by a two-column content area with Skills/Certifications in a sidebar and Experience/Projects in the main column.

This spec replaces that single-scroll layout with a tabbed interface: **Resume**, **About Me**, **Projects**, **Infrastructure Diagrams**. The redesign applies to the shared `MemberProfile.jsx` component, so it affects every member's page, not just Jana's.

## 1. Data Model Changes

### `backend/src/Data/teamdata.js`

Each member object gains:
- `yearsExperience: <number>` — manually set per member (not computed from the free-text `period` strings in `experience`, which aren't reliably parseable). Example: Jana `5`, Rana `1`.
- `diagrams: []` — array of `{ id, title, image, description }`. Starts empty for all members; populated for Jana once images are provided.

Each project in the shared `projects` array gains:
- `image: "<path>"` — cover image used by the Projects tab grid.

No other fields change. No backend route changes are needed:
- `/members/:id` already returns the full member object, including the new fields.
- `/projects` already returns all projects with `team` populated; the client already fetches this list in `MemberProfile.jsx` and filters by member id. The new Project Detail page reuses this same fetched list and finds the project by id client-side — no new `/projects/:id` endpoint.

## 2. Page Layout (`MemberProfile.jsx`)

### Header (always visible, all tabs)
Slimmed down from today's version to: avatar, name, position badge, social links (LinkedIn/GitHub/phone). The bio paragraph and the numeric stats row are removed from the header — they move into the About Me tab so they aren't duplicated.

### Tab bar
Four pill-style tabs, styled consistently with the existing gradient/rounded visual language (`#6E8CFB` → `#A094FF`, already used for section-header accent bars): **Resume**, **About Me**, **Projects**, **Infrastructure Diagrams**.

### Tab state
URL-synced via `useSearchParams` (react-router-dom): `?tab=resume|about|projects|diagrams`. Missing or invalid values default to `about`. Changing tabs updates the query param without a full page navigation (content swap only).

### Tab content
One of four subcomponents renders based on the active tab:

- **ResumeTab** — today's Skills sidebar + Certifications sidebar + Experience timeline, same styling as currently implemented, minus the Projects section (moved to its own tab).
- **AboutMeTab** — intro paragraph (`member.bio`) + a 4-tile stat row:
  - Years Experience → `member.yearsExperience`
  - Projects Done → `projects.length` (already filtered to this member, same filtering logic as today)
  - Technologies → `member.skills.length`
  - Certifications → `member.certifications?.length || 0`
- **ProjectsTab** — grid of project cards, each showing a cover image (`project.image`) with a hover overlay; clicking a card navigates to `/project/:id`. Empty state (no projects) reuses the existing dashed-border placeholder pattern ("Collaborative works coming soon...").
- **DiagramsTab** — grid of diagram thumbnails from `member.diagrams`. Empty state uses the same dashed-border placeholder pattern ("Diagrams coming soon...") when the array is empty. Clicking a thumbnail opens a lightbox (see below). This tab is shown for every member, regardless of role — it isn't conditionally hidden.

Default active tab on page load: **About Me**.

## 3. Project Detail Page

New route: `/project/:id` → new page `frontend/src/pages/ProjectDetail.jsx`.

- Fetches all projects via the existing `getProjects()` API function; finds the matching project by id client-side (mirrors the pattern already used in `MemberProfile.jsx`).
- Displays: large cover image, title, full description, technology badges, team members (small avatar + name, each linking back to `/member/:id?tab=projects`), and a "View Code ↗" link when `project.github` is present.
- Includes a "← Back" link (same visual pattern as the existing "Back to Team" link).
- Loading / error / not-found states match the existing style conventions already used in `MemberProfile.jsx`.

## 4. Diagram Lightbox

`DiagramLightbox.jsx`, used only within `DiagramsTab`:
- Clicking a diagram thumbnail opens a full-screen overlay showing the zoomed image, title, and description.
- Closes via backdrop click or an ✕ button.
- Pure client-side component state — no routing involved.

## 5. File Structure

```
frontend/src/
  pages/
    MemberProfile.jsx        (updated: slim header + tab bar + renders tab subcomponents)
    ProjectDetail.jsx        (new)
  components/
    profile/
      ProfileTabs.jsx        (new — tab bar)
      ResumeTab.jsx           (new)
      AboutMeTab.jsx          (new)
      ProjectsTab.jsx         (new)
      DiagramsTab.jsx         (new)
      DiagramLightbox.jsx     (new)
```

`App.jsx` gains one new route:
```jsx
<Route path="/project/:id" element={<ProjectDetail />} />
```

## Out of Scope

- No new backend endpoints.
- No CMS/upload mechanism for diagram or project images — image paths are added directly to `teamdata.js` as static asset references, the same way avatars are handled today via `avatarMap`.
- Actual diagram images and any new project entries will be provided later and added to the data file at that time; this spec only builds the tab/UI scaffolding and empty states.

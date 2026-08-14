import { useEffect, useState } from "react";

const ICONS = {
  cloud: "M6 17a3.5 3.5 0 0 1-.4-6.98A4.8 4.8 0 0 1 15 8.4a3.4 3.4 0 0 1-.7 6.6H6z",
  shield: "M12 3l6.5 2.7v4.8c0 4.6-3 7.9-6.5 9.5-3.5-1.6-6.5-4.9-6.5-9.5V5.7L12 3z",
  git: "M6 5v9M6 5a1.8 1.8 0 1 0 0 0zM6 19a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 6 19zM6 14c0 3 2 3 6 3M18 8a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 18 8zM18 8v3",
  gear: "M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6",
  box: "M4 8.2 12 4l8 4.2-8 4.2-8-4.2zM4 8.2v7.6L12 20l8-4.2V8.2M12 12.4V20",
  chart: "M4.5 19.5V4.5M4.5 19.5h15M8 16v3M12 11v8M16 14v5",
  plus: "M12 5v14M5 12h14",
};

const CATEGORY_COLORS = {
  proxy: "#54c4c4",
  ci: "#e0b04a",
  app: "#9682f0",
  mon: "#60c88c",
  planned: "#64687c",
};

const VPS_COLOR = "#e69e42";

const GROUPS = [
  { id: "vps", label: "VPS HOST — jxtechstudio.com", color: VPS_COLOR, x: 260, y: 40, w: 860, h: 600, dashed: false },
  { id: "proxy", label: "REVERSE PROXY", color: CATEGORY_COLORS.proxy, x: 300, y: 90, w: 260, h: 190, dashed: false },
  { id: "ci", label: "CI / CD", color: CATEGORY_COLORS.ci, x: 300, y: 400, w: 260, h: 190, dashed: false },
  { id: "app", label: "APPLICATION CONTAINERS", color: CATEGORY_COLORS.app, x: 610, y: 90, w: 260, h: 500, dashed: false },
  { id: "mon", label: "MONITORING STACK", color: CATEGORY_COLORS.mon, x: 920, y: 220, w: 170, h: 260, dashed: false },
  { id: "planned", label: "PLANNED / ROADMAP", color: CATEGORY_COLORS.planned, x: 40, y: 480, w: 190, h: 160, dashed: true },
];

const NODES = [
  { id: "cloudflare", x: 135, y: 130, icon: "cloud", label: "Cloudflare", sub: "DNS + CDN", cat: "proxy",
    detail: "DNS and edge caching sit in front of every domain on this box. Traffic is proxied through Cloudflare before it ever reaches the VPS." },
  { id: "github", x: 135, y: 300, icon: "git", label: "GitHub", sub: "Source · push to main", cat: "ci",
    detail: "Every project has its own GitHub repository. A push to main triggers the whole deploy pipeline." },
  { id: "nginx", x: 430, y: 185, icon: "shield", label: "Nginx + Certbot", sub: "TLS · vhost routing", cat: "proxy",
    detail: "A single Nginx instance reverse-proxies every project to its own container by hostname. Certbot keeps SSL certificates renewed automatically." },
  { id: "jenkins", x: 430, y: 495, icon: "gear", label: "Jenkins", sub: "Polls every 2 min", cat: "ci",
    detail: "Jenkins polls each repo on a schedule. On a new commit: clean up old containers, rebuild Docker images, redeploy — fully automated." },
  { id: "app", x: 740, y: 340, icon: "box", label: "Docker Containers", sub: "Frontend + backend, per project", cat: "app",
    detail: "Each project runs as its own isolated frontend + backend container pair, orchestrated with Docker Compose." },
  { id: "mon", x: 1005, y: 350, icon: "chart", label: "Prometheus + Grafana", sub: "cAdvisor · node-exporter", cat: "mon",
    detail: "cAdvisor and node-exporter scrape container and host metrics, Prometheus stores them, Grafana turns them into dashboards." },
  { id: "planned", x: 135, y: 560, icon: "plus", label: "Terraform · K8s", sub: "Not in use yet", cat: "planned",
    detail: "Infrastructure-as-code (Terraform) and container orchestration (Kubernetes) are on the roadmap as the project count grows — not part of the current setup." },
];

const EDGES = [
  { from: "cloudflare", to: "nginx", label: "HTTPS 443", kind: "live" },
  { from: "nginx", to: "app", label: "reverse proxy", kind: "live" },
  { from: "github", to: "jenkins", label: "webhook / poll", kind: "ci" },
  { from: "jenkins", to: "app", label: "build + deploy", kind: "ci" },
  { from: "app", to: "mon", label: "metrics scrape", kind: "mon" },
];

function edgeColor(kind) {
  if (kind === "ci") return CATEGORY_COLORS.ci;
  if (kind === "mon") return CATEGORY_COLORS.mon;
  return "#8a8ea6";
}

function orthPath(ax, ay, bx, by) {
  const midX = (ax + bx) / 2;
  return `M ${ax} ${ay} L ${midX} ${ay} L ${midX} ${by} L ${bx} ${by}`;
}

function connectedIds(id) {
  const set = new Set([id]);
  EDGES.forEach((e) => {
    if (e.from === id) set.add(e.to);
    if (e.to === id) set.add(e.from);
  });
  return set;
}

function LegendItem({ color, label, dashed }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-2.5 h-2.5 rounded-sm"
        style={{ border: `1.5px ${dashed ? "dashed" : "solid"} ${color}` }}
      />
      {label}
    </div>
  );
}

export default function InfrastructureMap() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
        setHoveredId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const active = hoveredId ? connectedIds(hoveredId) : null;
  const isNodeDim = (id) => !!active && !active.has(id);
  const isEdgeDim = (e) => {
    if (!active) return false;
    return !(active.has(e.from) && active.has(e.to) && (e.from === hoveredId || e.to === hoveredId));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 text-xs text-muted mb-5 pb-4 border-b border-subtle">
        <LegendItem color={VPS_COLOR} label="VPS boundary" />
        <LegendItem color={CATEGORY_COLORS.proxy} label="Reverse proxy" />
        <LegendItem color={CATEGORY_COLORS.ci} label="CI/CD" />
        <LegendItem color={CATEGORY_COLORS.app} label="App containers" />
        <LegendItem color={CATEGORY_COLORS.mon} label="Monitoring" />
        <LegendItem color={CATEGORY_COLORS.planned} label="Planned" dashed />
      </div>

      <div className="relative bg-page border border-subtle rounded-2xl overflow-hidden">
        <svg viewBox="0 0 1160 700" className="w-full h-auto block">
          {GROUPS.map((g) => (
            <g key={g.id}>
              <rect
                x={g.x} y={g.y} width={g.w} height={g.h} rx={14}
                fill={g.color} fillOpacity={0.05}
                stroke={g.color} strokeWidth={g.id === "vps" ? 1.4 : 1.2}
                strokeDasharray={g.dashed ? "6,5" : "none"}
              />
              <rect
                x={g.x + 14} y={g.y - 9}
                width={g.label.length * 7 + 14} height={18} rx={4}
                fill="rgb(var(--color-page))"
              />
              <text
                x={g.x + 20} y={g.y + 4}
                fontFamily="ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
                fontSize={10.5} letterSpacing={0.4}
                fill={g.color}
              >
                {g.label}
              </text>
            </g>
          ))}

          {EDGES.map((e) => {
            const na = NODES.find((n) => n.id === e.from);
            const nb = NODES.find((n) => n.id === e.to);
            const ax = na.x + 46, ay = na.y, bx = nb.x - 46, by = nb.y;
            const midX = (ax + bx) / 2;
            const dim = isEdgeDim(e);
            const color = edgeColor(e.kind);
            return (
              <g
                key={`${e.from}-${e.to}`}
                className={`transition-opacity duration-[250ms] motion-reduce:transition-none ${dim ? "opacity-10" : "opacity-100"}`}
              >
                <path
                  d={orthPath(ax, ay, bx, by)} fill="none"
                  stroke={color}
                  strokeWidth={e.kind === "live" ? 2 : 1.5}
                  strokeDasharray={e.kind === "ci" ? "6,5" : e.kind === "mon" ? "1.5,4" : "none"}
                  strokeLinecap="round"
                />
                <rect
                  x={midX - (e.label.length * 6.5 + 12) / 2} y={ay - 16}
                  width={e.label.length * 6.5 + 12} height={14} rx={3}
                  fill="rgb(var(--color-page))"
                />
                <text
                  x={midX} y={ay - 5} textAnchor="middle"
                  fontFamily="ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
                  fontSize={9.5} fill={color}
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {NODES.map((n) => {
            const dim = isNodeDim(n.id);
            const isSelected = selected?.id === n.id;
            const color = CATEGORY_COLORS[n.cat];
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.label}: ${n.sub}`}
                className={`cursor-pointer outline-none transition-opacity duration-[250ms] motion-reduce:transition-none ${dim ? "opacity-30" : "opacity-100"}`}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(n.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => setSelected(n)}
                onKeyDown={(e) => { if (e.key === "Enter") setSelected(n); }}
              >
                <circle
                  cx={n.x} cy={n.y} r={30}
                  className="fill-surface"
                  stroke={color} strokeWidth={isSelected ? 2.5 : 1.3}
                />
                <g transform={`translate(${n.x - 13},${n.y - 13}) scale(${26 / 24})`} className="text-heading">
                  <path d={ICONS[n.icon]} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x={n.x} y={n.y + 48} textAnchor="middle" fontSize={12} fontWeight={700} className="fill-heading">
                  {n.label}
                </text>
                <text x={n.x} y={n.y + 62} textAnchor="middle" fontSize={9.5} className="fill-faint">
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-6 bg-surface border border-subtle rounded-2xl p-6">
        {selected ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-extrabold text-heading">{selected.label}</h3>
              <span
                className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border bg-accent-soft text-secondary"
                style={{ borderColor: CATEGORY_COLORS[selected.cat] }}
              >
                {selected.sub}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">{selected.detail}</p>
          </>
        ) : (
          <p className="text-sm text-faint">Click a node above to see details.</p>
        )}
      </div>
    </div>
  );
}

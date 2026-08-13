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

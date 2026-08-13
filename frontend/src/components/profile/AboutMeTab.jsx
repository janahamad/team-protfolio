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

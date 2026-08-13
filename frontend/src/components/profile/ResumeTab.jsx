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

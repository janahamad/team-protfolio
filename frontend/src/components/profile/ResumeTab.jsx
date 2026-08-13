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

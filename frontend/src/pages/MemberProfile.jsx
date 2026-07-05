import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById, getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";
import { brandIcons } from "../assets/icons";

export default function MemberProfile() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const expCount = member.experience?.length || 0;
  const skillCount = member.skills?.length || 0;

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

        {/* ── PROFILE HEADER ── */}
        <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-[#ECEEFF] mb-10">
          {/* Top gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#6E8CFB] to-[#A094FF]" />

          {/* Background blobs */}
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
            <div className="inline-block px-4 py-1 rounded-full bg-[#F0F2FF] text-[#50589C] text-sm font-medium mb-5">
              {member.position}
            </div>

            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">{member.bio}</p>

            {/* Stats row */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#3C467B]">{skillCount}</p>
                <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Skills</p>
              </div>
              {expCount > 0 && (
                <div className="text-center border-l border-r border-[#ECEEFF] px-8">
                  <p className="text-2xl font-bold text-[#3C467B]">{expCount}</p>
                  <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Experiences</p>
                </div>
              )}
              <div className="text-center">
                <p className="text-2xl font-bold text-[#3C467B]">{projects.length}</p>
                <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">Projects</p>
              </div>
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

        {/* ── CONTENT GRID ── */}
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

            {/* Experience */}
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
                        {/* Company icon */}
                        <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-white border border-[#ECEEFF] shadow-sm flex items-center justify-center z-10 group-hover:border-[#6E8CFB] group-hover:shadow-md transition-all duration-200 overflow-hidden">
                          {logo ? (
                            <img src={logo} alt={exp.company} className="w-9 h-9 object-contain" />
                          ) : (
                            <span className="text-lg font-bold text-[#6E8CFB]">{exp.company.charAt(0)}</span>
                          )}
                        </div>

                        {/* Card */}
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

            {/* Projects */}
            <section>
              <h2 className="text-xl font-bold text-[#3C467B] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-gradient-to-b from-[#A094FF] to-[#6E8CFB] rounded-full" />
                Projects
              </h2>
              {projects.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl border border-dashed border-[#ECEEFF] text-center">
                  <p className="text-gray-300 text-sm">Collaborative works coming soon...</p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-2xl border border-[#ECEEFF] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#6E8CFB]/20 transition-all duration-200"
                    >
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
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#6E8CFB] hover:underline"
                        >
                          View Code ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

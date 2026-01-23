import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById, getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";
import { brandIcons } from "../assets/icons";

export default function MemberProfile() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getMemberById(id).then(setMember);

    getProjects().then(all =>
      setProjects(all.filter(p =>
        p.team?.some(m => m.id === Number(id))
      ))
    );
  }, [id]);

  if (!member) return <p className="mt-20 text-center">Loading...</p>;

  const avatar = avatarMap[member.name?.toLowerCase()];

  return (
    <div className="min-h-screen bg-[#F8F9FE]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-sm text-[#6E8CFB] hover:text-[#50589C] transition-colors mb-8 group">
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
          Back to Team
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#ECEEFF] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6E8CFB] to-[#A094FF]"></div>

          <div className="w-40 h-40 mx-auto rounded-full bg-[#F0F2FF] p-1 shadow-inner relative z-10">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white">
              {avatar ? (
                <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl font-bold text-[#50589C]">{member.name.charAt(0)}</span>
              )}
            </div>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold text-[#3C467B] tracking-tight">
            {member.name}
          </h1>

          <div className="mt-2 inline-block px-4 py-1 rounded-full bg-[#F0F2FF] text-[#50589C] text-sm font-medium">
            {member.position}
          </div>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            {member.bio}
          </p>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-6">
            {member.social?.linkedin && (
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src={brandIcons.linkedin} alt="LinkedIn" className="w-8 h-8 rounded-md" />
              </a>
            )}
            {member.social?.github && (
              <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <img src={brandIcons.github} alt="GitHub" className="w-8 h-8 bg-white rounded-full" />
              </a>
            )}
            {member.social?.phone && (
              <a href={`tel:${member.social.phone}`} className="hover:scale-110 transition-transform">
                <img src={brandIcons.phone} alt="Phone" className="w-8 h-8 rounded-md" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          {/* Sidebar: Skills */}
          <div className="lg:col-span-1 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-[#3C467B] mb-6 flex items-center">
                <span className="w-2 h-8 bg-[#6E8CFB] rounded-full mr-3"></span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-[#ECEEFF] text-[#50589C] shadow-sm hover:border-[#6E8CFB] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {member.certifications && (
              <section>
                <h2 className="text-2xl font-bold text-[#3C467B] mb-6 flex items-center">
                  <span className="w-2 h-8 bg-[#A094FF] rounded-full mr-3"></span>
                  Certifications
                </h2>
                <ul className="space-y-3">
                  {member.certifications.map((cert, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="text-[#6E8CFB] mr-2">•</span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Main Content: Experience & Projects */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience Section */}
            {member.experience && member.experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-[#3C467B] mb-8">Professional Journey</h2>
                <div className="space-y-8 relative before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ECEEFF]">
                  {member.experience.map((exp, index) => {
                    const logoKey = exp.company.toLowerCase();
                    const logo = brandIcons[logoKey];
                    return (
                      <div key={index} className="relative pl-16 group">
                        <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-white border border-[#ECEEFF] shadow-sm flex items-center justify-center z-10 group-hover:border-[#6E8CFB] transition-colors overflow-hidden">
                          {logo ? (
                            <img src={logo} alt={exp.company} className="w-10 h-10 object-contain" />
                          ) : (
                            <span className="text-xl font-bold text-[#6E8CFB]">{exp.company.charAt(0)}</span>
                          )}
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-[#ECEEFF] shadow-sm group-hover:shadow-md transition-shadow">
                          <span className="text-xs font-semibold text-[#6E8CFB] uppercase tracking-wider">{exp.period}</span>
                          <h4 className="text-xl font-bold text-[#3C467B] mt-1">{exp.role}</h4>
                          <p className="text-[#50589C] font-medium">{exp.company}</p>
                          <p className="mt-3 text-gray-600 leading-relaxed text-sm">{exp.tasks}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Projects Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#3C467B] mb-8">Projects</h2>
              {projects.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl border border-dashed border-[#ECEEFF] text-center">
                  <p className="text-gray-400">Collaborative works coming soon...</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-2xl border border-[#ECEEFF] p-6 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
                      <h4 className="font-bold text-[#3C467B] text-lg">{project.title}</h4>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.technologies?.map(tech => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 bg-[#F0F2FF] text-[#6E8CFB] rounded-md font-bold uppercase">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-4 line-clamp-3">
                        {project.description}
                      </p>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-bold text-[#6E8CFB] hover:underline">
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

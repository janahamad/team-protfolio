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

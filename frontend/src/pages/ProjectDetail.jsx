import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-subtle border-t-accent-start animate-spin" />
        <p className="text-sm text-muted">Loading project...</p>
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <p className="text-red-400">{error || "Project not found."}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          type="button"
          onClick={() => (location.key === "default" ? navigate("/") : navigate(-1))}
          className="inline-flex items-center gap-2 text-sm text-accent-start hover:text-secondary transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back
        </button>

        <div className="bg-surface rounded-[2rem] overflow-hidden shadow-sm border border-subtle">
          <div className="h-56 sm:h-72 w-full overflow-hidden">
            {project.image ? (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                <span className="text-6xl font-bold text-white">{project.title.charAt(0)}</span>
              </div>
            )}
          </div>

          <div className="p-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-heading tracking-tight mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 bg-accent-soft text-accent-start rounded-md font-bold uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-muted leading-relaxed mb-8 whitespace-pre-line">{project.description}</p>

            {project.team?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold text-heading uppercase tracking-wider mb-3">Team</h2>
                <div className="flex flex-wrap gap-3">
                  {project.team.map((member) => {
                    const avatar = avatarMap[member.name?.toLowerCase()];
                    return (
                      <Link
                        key={member.id}
                        to={`/member/${member.id}?tab=projects`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-subtle bg-page hover:border-accent-start transition-colors duration-150"
                      >
                        <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                          {avatar ? (
                            <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] font-bold text-white">{member.name.charAt(0)}</span>
                          )}
                        </span>
                        <span className="text-sm font-medium text-secondary">{member.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-accent-start hover:underline"
                >
                  Visit Live Site ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-accent-start hover:underline"
                >
                  View Code ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function ProjectsTab({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="bg-surface p-10 rounded-2xl border border-dashed border-subtle text-center">
        <p className="text-faint text-sm">Collaborative works coming soon...</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          className="group bg-surface rounded-2xl border border-subtle overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent-start/20 transition-all duration-200"
        >
          <div className="relative h-40 overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{project.title.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-bold tracking-wide transition-opacity duration-200">
                View Project →
              </span>
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-bold text-heading mb-2">{project.title}</h4>
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 bg-accent-soft text-accent-start rounded-md font-bold uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted leading-relaxed line-clamp-3">{project.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

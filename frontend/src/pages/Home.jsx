import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";
import logo from "../assets/logo.png";

const Home = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMembers()
      .then((res) => setMembers(res || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-page">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-start/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-accent-end/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm text-white/75 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-start animate-pulse" />
            Fullstack · DevOps · Infrastructure Engineering
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            A Team of
            <span className="block mt-1 bg-gradient-to-r from-accent-start via-accent-end to-accent-start bg-clip-text text-transparent">
              Specialized Creators
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-white/60 text-lg leading-relaxed">
            Individual expertise, one unified team.
            Explore each member&apos;s journey, skills, and projects.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-page"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      {/* ── MEMBERS ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-heading mb-2">Meet the Team</h2>
          <p className="text-muted text-sm tracking-wide">Click any card to explore their full profile</p>
        </div>

        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-subtle animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-400 py-16">Failed to load team: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            {members.map((member) => {
              const avatar = avatarMap[member.name?.toLowerCase()] || null;
              return (
                <Link key={member.id} to={`/member/${member.id}`} className="group">
                  <div className="relative bg-surface rounded-3xl overflow-hidden border border-subtle shadow-sm hover:shadow-xl hover:shadow-accent-start/10 hover:border-accent-start/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                    <div className="h-1 bg-gradient-to-r from-accent-start to-accent-end" />

                    <div className="p-8 text-center">
                      {/* Avatar */}
                      <div className="relative inline-block mb-5">
                        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-accent-soft shadow-md">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                              <span className="text-3xl font-bold text-white">{member.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-surface rounded-full shadow-sm" />
                      </div>

                      <h3 className="text-xl font-bold text-heading mb-1">{member.name}</h3>
                      <p className="text-sm text-accent-start font-medium mb-5">{member.position}</p>

                      {member.skills?.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                          {member.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-3 py-1 bg-accent-soft text-secondary rounded-full font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span className="text-xs px-3 py-1 bg-accent-soft text-secondary rounded-full font-medium">
                              +{member.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-start group-hover:gap-3 transition-all duration-200">
                        View Profile
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-24 flex flex-col items-center gap-3">
          <img src={logo} alt="Team Logo" className="w-10 h-10 object-contain opacity-40 hover:opacity-70 transition-opacity duration-300" />
          <span className="text-xs text-faint tracking-widest uppercase">Built with &lt;3/&gt;</span>
        </div>
      </section>
    </div>
  );
};

export default Home;

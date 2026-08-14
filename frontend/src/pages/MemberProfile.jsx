import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById, getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";
import ProfileTabs, { PROFILE_TAB_KEYS } from "../components/profile/ProfileTabs";
import ResumeTab from "../components/profile/ResumeTab";
import AboutMeTab from "../components/profile/AboutMeTab";
import ProjectsTab from "../components/profile/ProjectsTab";
import DiagramsTab from "../components/profile/DiagramsTab";
import { brandIcons } from "../assets/icons";

const DEFAULT_TAB = "about";

export default function MemberProfile() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requestedTab = searchParams.get("tab");
  const activeTab = PROFILE_TAB_KEYS.includes(requestedTab) ? requestedTab : DEFAULT_TAB;

  const handleTabChange = (tab) => {
    setSearchParams({ tab }, { replace: true });
  };

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
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-subtle border-t-accent-start animate-spin" />
        <p className="text-sm text-muted">Loading profile...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <p className="text-red-400">Error: {error}</p>
    </div>
  );

  if (!member) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <p className="text-muted">Member not found.</p>
    </div>
  );

  const avatar = avatarMap[member.name?.toLowerCase()];

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-accent-start hover:text-secondary transition-colors mb-8 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Team
        </Link>

        {/* ── SLIM PROFILE HEADER ── */}
        <div className="relative bg-surface rounded-[2rem] overflow-hidden shadow-sm border border-subtle mb-10">
          <div className="h-1.5 bg-gradient-to-r from-accent-start to-accent-end" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-start/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-end/8 rounded-full blur-2xl pointer-events-none" />

          <div className="relative p-10 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-8 ring-accent-soft shadow-lg mx-auto">
                {avatar ? (
                  <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 border-2 border-surface rounded-full shadow-sm" />
            </div>

            <h1 className="text-4xl font-extrabold text-heading tracking-tight mb-2">{member.name}</h1>
            <div className="inline-block px-4 py-1 rounded-full bg-accent-soft text-secondary text-sm font-medium mb-6">
              {member.position}
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4">
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-subtle bg-white hover:border-accent-start hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
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
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-subtle bg-white hover:border-accent-start hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <img src={brandIcons.github} alt="GitHub" className="w-5 h-5 rounded-full object-contain" />
                </a>
              )}
              {member.social?.phone && (
                <a
                  href={`tel:${member.social.phone}`}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-subtle bg-white hover:border-accent-start hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="Phone"
                >
                  <img src={brandIcons.phone} alt="Phone" className="w-5 h-5 object-contain" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <ProfileTabs activeTab={activeTab} onChange={handleTabChange} />

        {activeTab === "resume" && <ResumeTab member={member} />}
        {activeTab === "about" && <AboutMeTab member={member} projectsCount={projects.length} />}
        {activeTab === "projects" && <ProjectsTab projects={projects} />}
        {activeTab === "diagrams" && <DiagramsTab diagrams={member.diagrams} />}
      </div>
    </div>
  );
}

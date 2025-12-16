import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById, getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";

export default function MemberProfile() {
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // ✅ SAME AS ORIGINAL (but async-safe)
    getMemberById(id).then(memberData => {
      setMember(memberData);
    });

    getProjects().then(allProjects => {
      const memberProjects = allProjects.filter(project =>
        project.team?.some(m => m.id === Number(id))
      );
      setProjects(memberProjects);
    });
  }, [id]);

  if (!member) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  const avatar = avatarMap[member.name?.toLowerCase()] || null;

  return (
    <div className="member-profile">
      <Link to="/" className="back-link">← Back to Team</Link>

      <div className="profile-header">
        <div className="avatar large">
          {avatar ? (
            <img src={avatar} alt={member.name} />
          ) : (
            <span>{member.name.charAt(0)}</span>
          )}
        </div>

        <h1>{member.name}</h1>
        <h3>{member.position}</h3>
        <p>{member.bio}</p>
      </div>

      <section className="section">
        <h2>Skills</h2>
        <div className="skills">
          {member.skills.map(skill => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Projects</h2>
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="projects">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

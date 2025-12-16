import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById, getProjects } from "../api/teamApi";

export default function MemberProfile() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getMemberById(id).then(setMember);

    getProjects().then(allProjects => {
      const solo = allProjects.filter(
        p => p.team.length === 1 && p.team[0].id === Number(id)
      );
      setProjects(solo);
    });
  }, [id]);

  if (!member) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ color: "var(--primary)" }}>{member.name}</h1>
      <h3>{member.position}</h3>
      <p>{member.bio}</p>

      <h4>Skills</h4>
      <ul>
        {member.skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h4>Solo Projects</h4>
      {projects.length === 0 && <p>No solo projects yet.</p>}
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}

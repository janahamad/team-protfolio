import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberById, getProjects } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";

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
    <div className="max-w-5xl mx-auto px-6 py-12">

      <Link to="/" className="text-sm text-[#6E8CFB] hover:underline">
        ← Back to Team
      </Link>

      {/* Profile Header */}
      <div className="text-center mt-10">
        <div className="w-36 h-36 mx-auto rounded-full bg-[#ECEEFF]
                        overflow-hidden flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt={member.name}
                 className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-[#50589C]">
              {member.name.charAt(0)}
            </span>
          )}
        </div>

        <h1 className="mt-6 text-3xl font-bold text-[#3C467B]">
          {member.name}
        </h1>

        <h3 className="text-[#50589C] mt-1">
          {member.position}
        </h3>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {member.bio}
        </p>
      </div>

      {/* Skills */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-[#3C467B] mb-4">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {member.skills.map(skill => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full text-sm
                         bg-[#ECEEFF] text-[#50589C]"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-[#3C467B] mb-4">
          Projects
        </h2>

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow p-5"
              >
                <h4 className="font-semibold text-[#3C467B]">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-600 mt-2">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

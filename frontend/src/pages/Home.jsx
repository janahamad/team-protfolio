import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMembers } from "../api/teamApi";
import { avatarMap } from "../assets/avatars";
import logo from "../assets/logo.png";

const gradients = [
  "from-[#50589C] to-[#6E8CFB]",
  "from-[#636CCB] to-[#50589C]",
  "from-[#6E8CFB] to-[#636CCB]",
  "from-[#50589C] to-[#636CCB]",
];

const Home = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers().then((res) => {
      setMembers(res || []);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#3C467B]">

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          A Team of Specialized Creators
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-white/80 mb-6">
          Individual expertise, one unified team.
          Explore each member’s journey, skills, and projects.
        </p>

        <p className="text-sm text-[#6E8CFB] tracking-wide">
          UI/UX • Fullstack • Infrastructure & DevOps Engineering • Project Management
        </p>
      </section>

      {/* ================= MEMBERS ================= */}
      <section className="bg-[#F7F8FC] rounded-t-[48px]">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">

          <h2 className="text-3xl font-bold text-[#3C467B] text-center mb-2">
            Meet the Team
          </h2>

          <p className="text-center text-gray-500 mb-12">
            Click any member to explore their profile.
          </p>

          {/* ===== Cards ===== */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, index) => {
              const avatar =
                avatarMap[member.name?.toLowerCase()] || null;

              return (
                <Link
                  key={member.id}
                  to={`/member/${member.id}`}
                  className="group"
                >
                  <div
                    className={`relative h-60 rounded-2xl p-6
                      bg-gradient-to-br ${gradients[index % gradients.length]}
                      shadow-lg hover:shadow-xl hover:-translate-y-2
                      transition-all duration-300`}
                  >
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mt-4 overflow-hidden flex items-center justify-center">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="text-center mt-6 text-white">
                      <h3 className="text-xl font-semibold">
                        {member.name}
                      </h3>

                      <p className="text-sm text-white/80 mt-1">
                        {member.position}
                      </p>
                    </div>

                    {/* Hover CTA */}
                    <span
                      className="absolute bottom-4 left-1/2 -translate-x-1/2
                        text-xs text-white/70 opacity-0
                        group-hover:opacity-100 transition"
                    >
                      View Profile →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ===== Logo ===== */}
          <div className="mt-20 flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <img
                src={logo}
                alt="Team Logo"
                className="w-16 h-19 md:w-20 md:h-20 opacity-80 hover:opacity-100 transition"
              />

              <span className="text-sm text-gray-400 tracking-wide">
                Built with &lt;3/&gt;
              </span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;

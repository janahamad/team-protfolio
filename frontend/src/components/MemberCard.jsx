import { Link } from "react-router-dom";
import { avatarMap } from "../assets/avatars";

const MemberCard = ({ member }) => {
  const avatar = avatarMap[member.name?.toLowerCase()] || null;

  return (
    <Link to={`/member/${member.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md p-6 text-center
                      hover:shadow-xl hover:-translate-y-1
                      transition-all duration-300">

        {/* Avatar */}
        <div className="w-28 h-28 mx-auto rounded-full bg-[#F2F4FF]
                        flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl font-semibold text-[#50589C]">
              {member.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="mt-4 text-xl font-semibold text-[#3C467B]">
          {member.name}
        </h3>

        {/* Role */}
        <p className="text-sm text-gray-500">{member.position}</p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {member.skills?.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full
                         bg-[#ECEEFF] text-[#50589C]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <span className="block mt-5 text-sm font-medium
                         text-[#6E8CFB] group-hover:underline">
          View Profile →
        </span>
      </div>
    </Link>
  );
};

export default MemberCard;

import { Link } from "react-router-dom";
import { avatarMap } from "../assets/avatars/index.js";

const MemberCard = ({ member }) => {
  const avatar =
    member?.name && avatarMap[member.name.toLowerCase()]
      ? avatarMap[member.name.toLowerCase()]
      : null;

  return (
    <Link to={`/member/${member.id}`} style={{ textDecoration: "none" }}>
      <div className="member-card">
        <div className="avatar">
          {avatar ? (
            <img src={avatar} alt={member.name} />
          ) : (
            <span>{member.name.charAt(0)}</span>
          )}
        </div>

        <h3>{member.name}</h3>
        <p className="role">{member.position}</p>

        <div className="skills">
          {member.skills?.slice(0, 3).map((skill, i) => (
            <span key={i} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>

        <span className="cta">View Profile →</span>
      </div>
    </Link>
  );
};

export default MemberCard;

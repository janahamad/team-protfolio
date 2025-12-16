import { Link } from "react-router-dom";

export default function MemberCard({ member }) {
  return (
    <Link to={`/member/${member.id}`}>
      <div style={styles.card}>
        <h3>{member.name}</h3>
        <p>{member.position}</p>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    backgroundColor: "var(--secondary)",
    color: "#fff",
    padding: "24px",
    borderRadius: "12px",
    transition: "0.3s",
    cursor: "pointer"
  }
};

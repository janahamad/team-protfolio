import { useEffect, useState } from "react";
import { getMembers } from "../api/teamApi";
import MemberCard from "../components/MemberCard";

export default function Home() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers().then(setMembers);
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Building Ideas. Growing Together.</h1>
        <p>Great teams don’t happen by chance — they’re built.</p>
      </header>

      <div style={styles.grid}>
        {members.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px"
  },
  header: {
    marginBottom: "40px",
    color: "var(--primary)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  }
};

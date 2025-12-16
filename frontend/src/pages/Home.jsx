import { useEffect, useState } from "react";
import { getMembers } from "../api/teamApi";
import MemberCard from "../components/MemberCard";

const Home = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getMembers();
        setMembers(res?.data?.data || []); // ✅ FIX IS HERE
      } catch (err) {
        console.error("Failed to load members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="container">
      <h1 className="title">Meet the Team</h1>
      <p className="subtitle">
        A passionate team building modern, scalable solutions.
      </p>

      <div className="grid">
        {members.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Home;

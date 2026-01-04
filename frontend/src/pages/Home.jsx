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
        setMembers(res?.data?.data || []);
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
      {/* ===== Hero Section ===== */}
      <section className="hero">
        <h1 className="hero-title">
          A Team of Specialized Creators
        </h1>

        <p className="hero-subtitle">
          This platform brings together individual portfolios in one place.
          Select a team member from the navigation to explore their work.
        </p>

        <p className="hero-roles">
          Frontend • Backend • UI/UX • Project Management
        </p>
      </section>

      {/* ===== Team Section ===== */}
      <section className="team-section">
        <h2 className="title">Meet the Team</h2>
        <p className="subtitle">
          A passionate team building modern, scalable solutions.
        </p>

        <div className="grid">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

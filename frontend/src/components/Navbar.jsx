import { Link } from "react-router-dom";

const members = [
  { id: 1, name: "Rana" },
  { id: 2, name: "Jana" },
  { id: 3, name: "Manar" },
  { id: 4, name: "Shatha" },
];

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>Our Team</Link>

      <div style={styles.links}>
        {members.map(m => (
          <Link key={m.id} to={`/member/${m.id}`} style={styles.link}>
            {m.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "var(--primary)",
    color: "#fff",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    fontWeight: 500
  }
};

import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const members = [
  { id: 1, name: "Rana" },
  { id: 2, name: "Jana" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="JX Team Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-heading tracking-tight group-hover:text-accent-start transition-colors duration-200">
            JX Team
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {members.map((m) => {
            const active = location.pathname === `/member/${m.id}`;
            return (
              <Link
                key={m.id}
                to={`/member/${m.id}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-accent-start text-white shadow-sm shadow-accent-start/30"
                    : "text-secondary hover:bg-accent-soft hover:text-heading"
                }`}
              >
                {m.name}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

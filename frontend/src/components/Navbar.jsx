import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const members = [
  { id: 1, name: "Rana" },
  { id: 2, name: "Jana" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ECEEFF]">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="JX Team Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-[#3C467B] tracking-tight group-hover:text-[#6E8CFB] transition-colors duration-200">
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
                    ? "bg-[#6E8CFB] text-white shadow-sm shadow-[#6E8CFB]/30"
                    : "text-[#50589C] hover:bg-[#F0F2FF] hover:text-[#3C467B]"
                }`}
              >
                {m.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";

const members = [
  { id: 1, name: "Rana" },
  { id: 2, name: "Jana" },
  { id: 3, name: "Manar" },
  { id: 4, name: "Shatha" },
];

export default function Navbar() {
  return (
    <nav className="bg-[#3C467B] text-white px-8 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-xl font-bold tracking-wide hover:text-[#6E8CFB] transition"
      >
        Our Team
      </Link>

      <div className="flex gap-6">
        {members.map((m) => (
          <Link
            key={m.id}
            to={`/member/${m.id}`}
            className="font-medium hover:text-[#6E8CFB] transition"
          >
            {m.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

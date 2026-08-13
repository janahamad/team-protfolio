import { useState } from "react";
import DiagramLightbox from "./DiagramLightbox";

export default function DiagramsTab({ diagrams }) {
  const [selected, setSelected] = useState(null);

  if (!diagrams || diagrams.length === 0) {
    return (
      <div className="bg-white p-10 rounded-2xl border border-dashed border-[#ECEEFF] text-center">
        <p className="text-gray-300 text-sm">Diagrams coming soon...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {diagrams.map((diagram) => (
          <button
            key={diagram.id}
            type="button"
            onClick={() => setSelected(diagram)}
            className="group text-left bg-white rounded-2xl border border-[#ECEEFF] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#6E8CFB]/20 transition-all duration-200"
          >
            <div className="relative h-40 overflow-hidden bg-[#F0F2FF]">
              <img
                src={diagram.image}
                alt={diagram.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-[#3C467B] text-sm">{diagram.title}</h4>
            </div>
          </button>
        ))}
      </div>
      <DiagramLightbox diagram={selected} onClose={() => setSelected(null)} />
    </>
  );
}

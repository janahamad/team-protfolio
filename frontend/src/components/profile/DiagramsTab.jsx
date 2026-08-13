import { useState } from "react";
import DiagramLightbox from "./DiagramLightbox";

function DiagramThumbnail({ diagram, onSelect }) {
  const [hasError, setHasError] = useState(false);
  const showFallback = !diagram.image || hasError;

  return (
    <button
      type="button"
      onClick={() => onSelect(diagram)}
      className="group text-left bg-surface rounded-2xl border border-subtle overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent-start/20 transition-all duration-200"
    >
      <div className="relative h-40 overflow-hidden bg-accent-soft">
        {showFallback ? (
          <div className="w-full h-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{diagram.title.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={diagram.image}
            alt={diagram.title}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-heading text-sm">{diagram.title}</h4>
      </div>
    </button>
  );
}

export default function DiagramsTab({ diagrams }) {
  const [selected, setSelected] = useState(null);

  if (!diagrams || diagrams.length === 0) {
    return (
      <div className="bg-surface p-10 rounded-2xl border border-dashed border-subtle text-center">
        <p className="text-faint text-sm">Diagrams coming soon...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {diagrams.map((diagram) => (
          <DiagramThumbnail key={diagram.id} diagram={diagram} onSelect={setSelected} />
        ))}
      </div>
      <DiagramLightbox diagram={selected} onClose={() => setSelected(null)} />
    </>
  );
}

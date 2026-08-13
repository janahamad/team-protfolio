import { useEffect, useState } from "react";

export default function DiagramLightbox({ diagram, onClose }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [diagram]);

  if (!diagram) return null;

  const showFallback = !diagram.image || hasError;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1B1F3B]/80 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#3C467B] flex items-center justify-center shadow-sm z-10"
          aria-label="Close"
        >
          ✕
        </button>
        {showFallback ? (
          <div className="w-full h-56 bg-gradient-to-br from-[#6E8CFB] to-[#A094FF] flex items-center justify-center">
            <span className="text-5xl font-bold text-white">{diagram.title.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={diagram.image}
            alt={diagram.title}
            onError={() => setHasError(true)}
            className="w-full max-h-[60vh] object-contain bg-[#F8F9FE]"
          />
        )}
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#3C467B] mb-2">{diagram.title}</h3>
          {diagram.description && (
            <p className="text-sm text-gray-500 leading-relaxed">{diagram.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

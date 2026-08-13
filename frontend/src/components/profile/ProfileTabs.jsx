const TABS = [
  { key: "resume", label: "Resume" },
  { key: "about", label: "About Me" },
  { key: "projects", label: "Projects" },
  { key: "diagrams", label: "Infrastructure Diagrams" },
];

// eslint-disable-next-line react-refresh/only-export-components -- constant needed alongside the default component export
export const PROFILE_TAB_KEYS = TABS.map((tab) => tab.key);

export default function ProfileTabs({ activeTab, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={
              isActive
                ? "px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-accent-start to-accent-end text-white shadow-sm transition-all duration-200"
                : "px-5 py-2.5 rounded-full text-sm font-semibold bg-surface text-secondary border border-subtle hover:border-accent-start transition-all duration-200"
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

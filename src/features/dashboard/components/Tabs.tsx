import { TabKeys } from "@/constants/TabKeys";
import { Tab } from "@/hooks/useTabs";
import { FiPlus } from "react-icons/fi";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: TabKeys) => void;
  tabs: Tab[];
}

const Tabs = ({ activeTab, setActiveTab, tabs }: TabsProps) => {
  return (
    <div className="tabs flex gap-4 mb-8">
      {tabs.map(({ id, label }) => {
        const isActive = activeTab === id;
        const isNewRequest = id === TabKeys.NEW;

        const base =
          "relative px-4 py-2 font-semibold transition-all focus:outline-none";
        const regular =
          `border-b-2 ${isActive
            ? "border-indigo-500 text-indigo-900"
            : "border-transparent text-gray-600 hover:text-indigo-700 hover:border-indigo-700"}`;

        // CTA style for "New Request"
        const cta =
          "group rounded-full px-5 py-2 text-white " +
          "bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 " +
          "shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 " +
          "hover:scale-[1.02] active:scale-[0.99] " +
          "focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={[
              base,
              isNewRequest ? cta : regular
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="relative z-10 flex items-center gap-2">
              {isNewRequest && <FiPlus className="h-4 w-4" aria-hidden="true" />}
              <span>{label}</span>
            </span>

            {/* glossy sheen on hover (CTA only) */}
            {isNewRequest && (
              <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            )}

            {/* subtle ping dot to draw attention (CTA only) */}
            {isNewRequest && (
              <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white/90"></span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;

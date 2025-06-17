import { TabKeys } from "@/constants/TabKeys";
import { Tab } from "@/hooks/useTabs";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: TabKeys) => void;
  tabs: Tab[];
}

const Tabs = ({ activeTab, setActiveTab, tabs }: TabsProps) => {
  return (
    <div className="tabs flex gap-4 mb-8">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`tab-btn px-4 py-2 font-semibold border-b-2 ${activeTab === id
            ? "border-purple-500 text-blue-900"
            : "border-transparent text-gray-600"
            } transition-opacity hover:text-blue-700 hover:border-blue-700 focus:outline-none`}
          aria-current={activeTab === id ? "page" : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

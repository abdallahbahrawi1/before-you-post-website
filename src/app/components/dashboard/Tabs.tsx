interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "active", label: "Active Requests" },
    { id: "history", label: "History" },
    { id: "new", label: "New Request" },
  ];

  return (
    <div className="tabs flex gap-4 mb-8">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`tab-btn px-4 py-2 font-semibold border-b-2 ${
            activeTab === id
              ? "border-purple-500 text-blue-900"
              : "border-transparent text-gray-600"
          } transition-opacity`}
          aria-current={activeTab === id ? "page" : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

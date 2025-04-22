'use client';

import Tabs from "./Tabs";
import PointsTracker from "./PointsTracker";
import ActiveRequests from "./ActiveRequests";
import History from "./History";
// import NewRequestForm from "./NewRequestForm";
import RequestWizard from "./RequestWizard";
import { TabKeys } from "@/constants/TabKeys";
import { useTabs, Tab } from "../..//hooks/useTabs";
import CancelButton from "../ui/CancelButton";



const tabs: Tab[] = [
  { id: TabKeys.ACTIVE, label: "Active Requests" },
  { id: TabKeys.HISTORY, label: "History" },
  { id: TabKeys.NEW, label: "New Request" },
];

const Dashboard = () => {
  const { activeTab, setActiveTab } = useTabs(tabs);

  const renderContent = () => {
    switch (activeTab) {
      case TabKeys.ACTIVE:
        return <ActiveRequests />;
      case TabKeys.HISTORY:
        return <History />;
      case TabKeys.NEW:
        return <RequestWizard />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-28 p-6 space-y-6">
      <PointsTracker />
      {activeTab === TabKeys.NEW ? (
        <>
          <CancelButton onClick={() => setActiveTab(TabKeys.ACTIVE)} />
        </>
      )
        : (
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        )}
      {renderContent()}
    </div>
  );
};

export default Dashboard;


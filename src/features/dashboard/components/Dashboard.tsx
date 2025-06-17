'use client';

import ActiveRequests from "./ActiveRequests";
import History from "./History";
import RequestWizard from "./RequestWizard";
import Tabs from "./Tabs";
import PointsTracker from "./PointsTracker";
import { Tab, useTabs } from "@/hooks/useTabs";
import { TabKeys } from "@/constants/TabKeys";
import { Button } from "@/ui/inputs/Button";
import { FaArrowLeft } from "react-icons/fa";






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
          <Button
            variant="cancel"                     // orange “back” style
            onClick={() => setActiveTab(TabKeys.ACTIVE)}
            iconLeft={<FaArrowLeft size={15} />} // arrow icon
          >
            Cancel
          </Button>
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


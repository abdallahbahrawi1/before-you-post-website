'use client';

import { useState } from "react";
import Tabs from "./Tabs";
import PointsTracker from "./PointsTracker";
import ActiveRequests from "./ActiveRequests";
import History from "./History";
import NewRequestForm from "./NewRequestForm";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("active");

  const renderContent = () => {
    switch (activeTab) {
      case "active":
        return <ActiveRequests />;
      case "history":
        return <History />;
      case "new":
        return <NewRequestForm />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-28 p-6 space-y-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PointsTracker />
      {renderContent()}
    </div>
  );
};

export default Dashboard;


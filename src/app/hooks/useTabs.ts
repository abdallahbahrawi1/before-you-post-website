import { useState } from "react";
import { TabKeys } from "@/constants/TabKeys";


export interface Tab {
  id: TabKeys;
  label: string;
}

export function useTabs(initialTabs: Tab[]) {
  const [activeTab, setActiveTab] = useState<TabKeys>(initialTabs[0].id); // Set the initial active tab to the first tab in the array

  return { activeTab, setActiveTab };
}
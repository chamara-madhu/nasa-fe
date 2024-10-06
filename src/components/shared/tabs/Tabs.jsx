import React from "react";
import TabElement from "./TabElement";

const Tabs = ({ tabs, activeTab, handleTabs }) => {
  return (
    <div className="flex pt-5 px-5">
      {tabs.map((tab) => (
        <TabElement
          key={tab.value}
          isActive={activeTab === tab.value}
          onClick={() => handleTabs(tab.value)}
        >
          {tab.label}
        </TabElement>
      ))}
    </div>
  );
};

export default Tabs;

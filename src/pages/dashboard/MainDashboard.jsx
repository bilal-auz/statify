import React from "react";

import HeaderSection from "./Components/MainDashboard/HeaderSection";
import ListeningSummary from "./Components/MainDashboard/ListeningSummary";

function MainDashboard() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between mb-2">
        <HeaderSection />
      </div>
      <div className="flex flex-col justify-between mb-2">
        <ListeningSummary />
      </div>
    </div>
  );
}

export default MainDashboard;

import React, { useEffect, useState } from "react";
import { AuthState } from "../Context/AuthContextProvider";
import { useHistory } from "react-router-dom";
import MainDashboard from "./dashboard/MainDashboard";
import Profile from "./dashboard/Profile";
import Title from "./dashboard/Title";

function Dashboard() {
  const history = useHistory();
  const { user } = AuthState();
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) history.push("/login");
  }, []);

  return (
    <div className="h-screen w-screen px-8 py-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <Title />
        </div>
        <div className="body flex flex-col">
          <div className="tabs py-5">
            <a
              className={
                "tab tab-bordered" + (activeTab === 1 && " tab-active")
              }
              onClick={() => setActiveTab(1)}
            >
              Dashboard
            </a>
            <a
              className={
                "tab tab-bordered" + (activeTab === 2 && " tab-active")
              }
              onClick={() => setActiveTab(2)}
            >
              Profile
            </a>
          </div>
          {activeTab == 1 && <MainDashboard />}
          {activeTab == 2 && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

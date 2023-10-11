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
    <div className="h-screen w-screen overflow-y-scroll">
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-between w-full max-w-md lg:max-w-7xl items-center px-8 py-4">
          <Title />
        </div>
        <div className="body flex flex-col mx-auto w-full max-w-md lg:max-w-7xl px-8">
          <div className="tabs py-5">
            <a
              className={
                "tab tab-bordered font-[spotify-light] font-bold " +
                ((activeTab === 1 && " text-s_green border-s_green") ||
                  " text-[#a6adba80] hover:text-s_green")
              }
              onClick={() => setActiveTab(1)}
            >
              Dashboard
            </a>
            <a
              className={
                "tab tab-bordered font-[spotify-light] font-bold" +
                ((activeTab === 2 && " text-s_green border-s_green") ||
                  " text-[#a6adba80] hover:text-s_green")
              }
              onClick={() => setActiveTab(2)}
            >
              Profile
            </a>
            <button className="tab tab-bordered btn-disabled flex-1 hover:cursor-default" />
          </div>
          {activeTab == 1 && <MainDashboard />}
          {activeTab == 2 && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

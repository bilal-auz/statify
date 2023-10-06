import React, { useEffect } from "react";
import { AuthState } from "../Context/AuthContextProvider";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();
  const { user } = AuthState();

  useEffect(() => {
    console.log("In dashboard");
    if (!user) history.push("/login");
  }, [history]);

  return <div>{(user && "Dashboard") || "NO"}</div>;
}

export default Dashboard;

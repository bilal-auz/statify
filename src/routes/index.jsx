import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Redirect to="dashboard" />
    </Switch>
  );
};

export default Routes;

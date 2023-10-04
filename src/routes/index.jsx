import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/dashbaord" exact component={Dashboard} />
        <Redirect to="/dashbaord" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AuthContextProvider from "../Context/AuthContextProvider";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/dashbaord" exact component={Dashboard} />
          <Redirect to="/dashbaord" />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default Routes;

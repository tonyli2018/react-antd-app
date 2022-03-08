import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import History from "./history";
import ULS from "./_userlist";
import UserList from "./userlist";
import SystemSetting from "./syssetting";
import AddUser from "./adduser";
import Test from "./test";
import SecondPage from "./SecondPage";
import User from "./user";
import Home from "./home";
import Login from "./login";
import ErrorPage from "./error";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/userlist">
          <UserList />
        </Route>
        <Route path="/sysVariables">
          <SystemSetting />
        </Route>
        <Route path="/adduser">
          <AddUser />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/SecondPage">
          <SecondPage />
        </Route>
        <Route path="/_userList">
          <ULS />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

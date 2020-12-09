import React from "react";
import { Route, Switch } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import RouteNavigation from "../components/RouteNavigation";

const HomePage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignSelf: "flex-start"}}>
    <HeaderBar title={"MetroFare"} />
    <RouteNavigation />
  </div>
);

export const WebRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
};

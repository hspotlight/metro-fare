import React from "react";
import { Route, Switch } from "react-router-dom";
import RouteNavigation from "../components/RouteNavigation";

const HomePage = () => (
  <>
    <RouteNavigation />
  </>
);

export const WebRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
};

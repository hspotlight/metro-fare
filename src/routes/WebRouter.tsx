import React from "react";
import { Route, Switch } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import RouteNavigation from "../components/RouteNavigation";
import RoutesSearchResult from "../components/RoutesSearchResult";

const pageWithHeaderStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start",
  width: "100%",
};

const HomePage = () => (
  <div style={pageWithHeaderStyle}>
    <HeaderBar title={"MetroFare"} />
    <RouteNavigation />
  </div>
);

const RoutesPage = () => (
  <div style={pageWithHeaderStyle}>
    <HeaderBar title={"Routes"} />
    <RoutesSearchResult />
  </div>
);

export const WebRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/routes" component={RoutesPage} />
    </Switch>
  );
};

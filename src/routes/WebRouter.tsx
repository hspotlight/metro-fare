import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import RouteDetail from "../components/RouteDetail";
import RouteNavigation from "../components/RouteNavigation";
import RoutesSearchResult from "../components/RoutesSearchResult";
import SelectStation from "../components/SelectStation";

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
    <HeaderBar title={"Routes"} backButton />
    <RoutesSearchResult />
  </div>
);

const RouteDetailPage = () => (
  <div style={pageWithHeaderStyle}>
    <HeaderBar title={"Route Detail"} backButton />
    <RouteDetail />
  </div>
);

const SelectStationPage = () => (
  <div style={pageWithHeaderStyle}>
    <HeaderBar title={"Stations"} backButton />
    <SelectStation />
  </div>
);

const RedirectToHomePage = () => {
  const history = useHistory();

  useEffect(() => {
    history.replace("/");
  }, []);

  return <div></div>;
};

export const WebRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/routes" component={RoutesPage} />
      <Route path="/route-detail" component={RouteDetailPage} />
      <Route path="/select-station/:type" component={SelectStationPage} />
      <Route component={RedirectToHomePage} />
    </Switch>
  );
};

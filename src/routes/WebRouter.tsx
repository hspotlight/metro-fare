import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import RouteNavigation from "../components/RouteNavigation";

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

const RedirectToHomePage = () => {
  const history = useHistory();

  useEffect(() => {
    history.replace("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};

export const WebRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={RedirectToHomePage} />
    </Switch>
  );
};

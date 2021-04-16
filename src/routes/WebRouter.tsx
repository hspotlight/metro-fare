import React from "react";
import { Route, Switch } from "react-router-dom";

const RedirectToHomePage = () => {
  return <div></div>;
};

export const WebRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={RedirectToHomePage} />
    </Switch>
  );
};

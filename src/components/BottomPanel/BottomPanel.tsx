import React from "react";
import { canShowRoutingDrawer } from "../../config/featureToggle";
import { FromToSelectPanel } from "../FromToSelectDrawer/FromToSelectPanel";

export const BottomPanel = () => {
  return canShowRoutingDrawer() ? <FromToSelectPanel /> : null;
};

import React from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { useDrawerCtx } from "../../contexts/DrawerProvider";

export const SideMenu = () => {
  const { showSideMenu, setSideMenu } = useDrawerCtx();
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={showSideMenu}
      onClose={() => setSideMenu(false)}
      onOpen={() => setSideMenu(true)}
    >
      <div>helloworld</div>
    </SwipeableDrawer>
  );
};

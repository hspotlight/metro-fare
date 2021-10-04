import React, { createContext, useContext, useState } from "react";

const initialMapContext = {
  showSideMenu: false,
  setSideMenu: (_: boolean) => {},
  showRouteSearchDrawer: false,
  setRouteSearchDrawer: (_: boolean) => {},
};

export const DrawerContext = createContext(initialMapContext);

export const useDrawerContext = () => useContext(DrawerContext);

const DrawerProvider = ({ children }: { children: any }) => {
  const [showSideMenu, setSideMenu] = useState<boolean>(false);
  const [showRouteSearchDrawer, setRouteSearchDrawer] = useState<boolean>(
    false
  );

  return (
    <DrawerContext.Provider
      value={{
        showSideMenu,
        setSideMenu,
        showRouteSearchDrawer,
        setRouteSearchDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;

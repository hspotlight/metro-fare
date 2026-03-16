import React, { createContext, useContext, useState } from "react";

type DrawerContextType = {
  showSideMenu: boolean;
  setSideMenu: (value: boolean) => void;
  showRouteSearchDrawer: boolean;
  setRouteSearchDrawer: (value: boolean) => void;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawerContext = (): DrawerContextType => {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }

  return context;
};

const DrawerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [showSideMenu, setSideMenu] = useState<boolean>(false);
  const [showRouteSearchDrawer, setRouteSearchDrawer] =
    useState<boolean>(false);

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

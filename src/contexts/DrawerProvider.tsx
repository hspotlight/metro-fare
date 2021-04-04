import React, { createContext, useContext, useState } from "react";

const initialMapContext = {
  showSideMenu: false,
  setSideMenu: (_: boolean) => {},
};

export const DrawerContext = createContext(initialMapContext);

export const useDrawerCtx = () => useContext(DrawerContext);

const DrawerProvider = ({ children }: { children: any }) => {
  const [showSideMenu, setSideMenu] = useState<boolean>(false);

  return (
    <DrawerContext.Provider
      value={{
        showSideMenu,
        setSideMenu,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;

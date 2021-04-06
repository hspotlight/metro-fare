import React, { createContext, useContext, useState } from "react";
import { MetroLineLayerVisibility } from "../types";
import { DEFAULT_METRO_LINE_LAYERS } from "../common/mapConstants";

const initialMapContext = {
  showMetroLineLayers: DEFAULT_METRO_LINE_LAYERS,
  setShowMetroLayers: (_: MetroLineLayerVisibility) => {},
};

export const MapContext = createContext(initialMapContext);

export const useMapContext = () => useContext(MapContext);

const MapProvider = ({ children }: { children: any }) => {
  const [
    showMetroLineLayers,
    setShowMetroLayers,
  ] = useState<MetroLineLayerVisibility>(DEFAULT_METRO_LINE_LAYERS);

  return (
    <MapContext.Provider
      value={{
        showMetroLineLayers,
        setShowMetroLayers,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;

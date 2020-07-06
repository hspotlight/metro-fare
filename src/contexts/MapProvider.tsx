import React, { createContext, useState } from "react";
import { MetroLineLayerVisibility } from "../types";
import { DEFAULT_METRO_LINE_LAYERS } from "../common/mapConstants";

const initialMapContext = {
  showMetroLineLayers: DEFAULT_METRO_LINE_LAYERS,
  setShowMetroLayers: (_: MetroLineLayerVisibility) => {},
};

export const MapContext = createContext(initialMapContext);

const MapProvider = ({ children }: { children: any }) => {
  const [showMetroLineLayers, setShowMetroLayers] = useState<
    MetroLineLayerVisibility
  >(DEFAULT_METRO_LINE_LAYERS);

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

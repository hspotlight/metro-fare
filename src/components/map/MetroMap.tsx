import React, { useState, useEffect, useContext } from "react";
import { Map, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { DEFAULT_MAP_CENTER, DUMMY_MAP_POSITION } from "../../common/mapConstants";
import MapControl from "./MapControl";
import { TripContext } from "../../contexts/TripProvider";
import { MapContext } from "../../contexts/MapProvider";
import { MetroLineLayers } from "./MetroLineLayers";
import { TravelRouteLayer } from "./TravelRouteLayer";

export const MetroMap = () => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(DEFAULT_MAP_CENTER);
  const { setShowMetroLayers } = useContext(MapContext);
  const { journey } = useContext(TripContext);
  
  useEffect(() => {
    if (!(mapCenter[0] === DEFAULT_MAP_CENTER[0] && mapCenter[1] === DEFAULT_MAP_CENTER[1])) {
      setMapCenter(DEFAULT_MAP_CENTER);
    }
  }, [mapCenter]);

  useEffect(() => {
    const isVisible = journey.route.length === 0;
    setShowMetroLayers({
      mrtBlue: isVisible,
      btsSilom: isVisible,
      btsSukhumvit: isVisible,
      btsGold: isVisible,
      arl: isVisible,
      brt: isVisible
    });
  }, [journey, setShowMetroLayers])

  return (
    <div className="width-100 height-100">
        <Map
          className="width-100 height-100"
          center={mapCenter}
          zoom={12}
          minZoom={12}
          maxZoom={17}
          zoomControl={false}
        >
          <MapControl 
            onResetViewClick={() => setMapCenter(DUMMY_MAP_POSITION)} />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MetroLineLayers />
          {journey.route.length > 0 && <TravelRouteLayer />}
        </Map>
    </div>
  );
};
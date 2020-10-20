import React, { useState, useEffect, useContext } from "react";
import {
  Map,
  TileLayer,
  Polyline,
  FeatureGroup,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { colors } from "../common/colors";
import { Station } from "../types";
import { DEFAULT_MAP_CENTER, DUMMY_MAP_POSITION } from "../common/mapConstants";
import MapControl from "./map/MapControl";
import StationMarker from "./map/StationMarker";
import { getAllStations, getStation, getStationKeysFromTravelRoute } from "../services/util.service";
import { TripContext } from "../contexts/TripProvider";
import { getColorFromLineType, getInterChangeLineColor } from "../services/ui-style.service";
import { MapContext } from "../contexts/MapProvider";
import { MetroLineLayers } from "./map/MetroLineLayers";

export const MetroMap = () => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(DEFAULT_MAP_CENTER);
  const { setShowMetroLayers } = useContext(MapContext);
  const { travelRoute } = useContext(TripContext);
  
  useEffect(() => {
    if (!(mapCenter[0] === DEFAULT_MAP_CENTER[0] && mapCenter[1] === DEFAULT_MAP_CENTER[1])) {
      setMapCenter(DEFAULT_MAP_CENTER);
    }
  }, [mapCenter]);

  useEffect(() => {
    const isVisible = travelRoute.route.length === 0;
    setShowMetroLayers({
      mrtBlue: isVisible,
      btsSilom: isVisible,
      btsSukhumvit: isVisible,
      arl: isVisible,
      brt: isVisible
    });
  }, [travelRoute, setShowMetroLayers])

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
          {travelRoute.route.length > 0 && <TravelRouteLayer />}
        </Map>
    </div>
  );
};

const TravelRouteLayer = () => {
  const { travelRoute } = useContext(TripContext);

  const source = getStation(travelRoute.source);
  const destination = getStation(travelRoute.destination);

  if (!(source && destination)) {
    return null;
  }
  const stationKeys = getStationKeysFromTravelRoute(travelRoute);
  const allStationsInRoute = getAllStations(stationKeys);

  const intermediateStations = allStationsInRoute.filter((station) =>
    station.key !== source.key && station.key !== destination.key
  )

  return (
    <>
      <FeatureGroup name="travel-route">
        {allStationsInRoute.map((currentStation, index) => {
          if (index === 0) return null;
          const prevStation = allStationsInRoute[index - 1];
          const polyline = [prevStation.position, currentStation.position];
          const color = getInterChangeLineColor(currentStation.lineType, prevStation.lineType);

          return (
            <Polyline
              key={`travel-route-${prevStation.key}-${currentStation.key}`}
              positions={polyline}
              color={color}
              weight={7}
            />
          );
        })}
      </FeatureGroup>
      <FeatureGroup name="travel-route-station">
        <StationMarker
          station={source as Station}
          fillColor={colors.sourceStation}
          showPopup={false}
          radius={12}
        />
        {intermediateStations.map((station) => {
          return (
            <StationMarker
              key={`intermediate-${station.key}`}
              station={station as Station}
              fillColor={getColorFromLineType(station.lineType)}
              showPopup={false}
              radius={12}
            />
          );
        })}
        <StationMarker
          station={destination as Station}
          fillColor={colors.destinationStation}
          showPopup={false}
          radius={12}
        />
      </FeatureGroup>
    </>
  );
}

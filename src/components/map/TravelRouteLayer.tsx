import React, { useContext } from "react";
import { Polyline, FeatureGroup } from "react-leaflet";
import StationMarker from "../map/StationMarker";
import {
  getAllStations,
  getStation,
  getStationKeysFromTravelRoute,
} from "../../services/util.service";
import {
  getColorFromLineType,
  getInterChangeLineColor,
} from "../../services/ui-style.service";
import { colors } from "../../common/colors";
import { Station } from "../../types";
import { TripContext } from "../../contexts/TripProvider";

export const TravelRouteLayer = () => {
  const { travelRoute } = useContext(TripContext);

  const source = getStation(travelRoute.source);
  const destination = getStation(travelRoute.destination);

  if (!(source && destination)) {
    return null;
  }
  const stationKeys = getStationKeysFromTravelRoute(travelRoute);
  const allStationsInRoute = getAllStations(stationKeys);

  const intermediateStations = allStationsInRoute.filter(
    (station) => station.key !== source.key && station.key !== destination.key
  );

  return (
    <>
      <FeatureGroup name="travel-route">
        {allStationsInRoute.map((currentStation, index) => {
          if (index === 0) return null;
          const prevStation = allStationsInRoute[index - 1];
          const polyline = [prevStation.position, currentStation.position];
          const color = getInterChangeLineColor(
            currentStation.lineType,
            prevStation.lineType
          );

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
};

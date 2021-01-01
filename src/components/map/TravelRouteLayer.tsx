import React, { useContext } from "react";
import { Polyline, FeatureGroup } from "react-leaflet";
import StationMarker from "../map/StationMarker";
import {
  getAllStations,
  getStation,
  getStationIdsFromTravelRoute,
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
  const stationIds = getStationIdsFromTravelRoute(travelRoute);
  const allStationsInRoute = getAllStations(stationIds);

  const intermediateStations = allStationsInRoute.filter(
    (station) => station.id !== source.id && station.id !== destination.id
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
              key={`travel-route-${prevStation.id}-${currentStation.id}`}
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
              key={`intermediate-${station.id}`}
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

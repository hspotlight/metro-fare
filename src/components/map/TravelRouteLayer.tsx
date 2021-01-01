import React, { useContext } from "react";
import { Polyline, FeatureGroup } from "react-leaflet";
import StationMarker from "../map/StationMarker";
import {
  getAllStations,
  getStation,
  getStationIdsFromJourney,
} from "../../services/util.service";
import {
  getColorFromLineType,
  getInterChangeLineColor,
} from "../../services/ui-style.service";
import { colors } from "../../common/colors";
import { Station } from "../../types";
import { TripContext } from "../../contexts/TripProvider";

export const TravelRouteLayer = () => {
  const { journey } = useContext(TripContext);

  const from = getStation(journey.from);
  const to = getStation(journey.to);

  if (!(from && to)) {
    return null;
  }
  const stationIds = getStationIdsFromJourney(journey);
  const allStationsInRoute = getAllStations(stationIds);

  const intermediateStations = allStationsInRoute.filter(
    (station) => station.id !== from.id && station.id !== to.id
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
          station={from as Station}
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
          station={to as Station}
          fillColor={colors.destinationStation}
          showPopup={false}
          radius={12}
        />
      </FeatureGroup>
    </>
  );
};

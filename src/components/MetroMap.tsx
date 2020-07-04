import React, { useState, useEffect, useContext } from "react";
import {
  Map,
  TileLayer,
  Polyline,
  FeatureGroup,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { colors } from "../common/colors";
import { LineType, Station } from "../types";
import { DEFAULT_MAP_CENTER, DUMMY_MAP_POSITION } from "../common/mapConstants";
import MapControl from "./map/MapControl";
import StationMarker from "./map/StationMarker";
import { filterStationByLineType, getPolyLineFromStations, getStation, getStationsFromTravelRoute } from "../services/util.service";
import { TripContext } from "../contexts/TripProvider";

const mrtBlueStations = filterStationByLineType(LineType.MRT_BLUE);
const btsSilomStations = filterStationByLineType(LineType.BTS_SILOM);
const btsSukhumvitStations = filterStationByLineType(LineType.BTS_SUKHUMVIT);

export const MetroMap = () => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(DEFAULT_MAP_CENTER);
  const { travelRoute } = useContext(TripContext);
  
  useEffect(() => {
    if (!(mapCenter[0] === DEFAULT_MAP_CENTER[0] && mapCenter[1] === DEFAULT_MAP_CENTER[1])) {
      setMapCenter(DEFAULT_MAP_CENTER);
    }
  }, [mapCenter]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        style={{ height: "100%", width: "100%" }}
        center={mapCenter}
        zoom={12}
        minZoom={12}
        maxZoom={17}
        zoomControl={false}
      >
        <MapControl onResetViewClick={() => setMapCenter(DUMMY_MAP_POSITION)} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {travelRoute.route.length === 0 && <MetroLineLayers /> }
        {travelRoute.route.length > 0 && <TravelRouteLayer />}
      </Map>
    </div>
  );
};

const MetroLineLayers = () => {
  return (
    <>
      <FeatureGroup name="mrt-blue-line">
        <Polyline
          positions={getPolyLineFromStations(mrtBlueStations)}
          color={colors.mrtBlue}
        />
        <Polyline
          positions={[
            [13.740013, 100.470773],
            [13.7298, 100.474151],
          ]}
          color={colors.mrtBlue}
        />
      </FeatureGroup>
      <FeatureGroup name="bts-silom-line">
        <Polyline
          positions={getPolyLineFromStations(btsSilomStations)}
          color={colors.btsSilom}
        />
      </FeatureGroup>
      <FeatureGroup name="bts-sukhumvit-line">
        <Polyline
          positions={getPolyLineFromStations(btsSukhumvitStations)}
          color={colors.btsSukhumvit}
        />
      </FeatureGroup>
      <FeatureGroup name="mrt-blue-station">
        {mrtBlueStations.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.mrtBlue}
          />
        ))}
      </FeatureGroup>
      <FeatureGroup name="bts-silom-station">
        {btsSilomStations.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.btsSilom}
          />
        ))}
      </FeatureGroup>
      <FeatureGroup name="bts-sukhumvit-station">
        {btsSukhumvitStations.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.btsSukhumvit}
          />
        ))}
      </FeatureGroup>
    </>
  )
}

const TravelRouteLayer = () => {
  const { travelRoute } = useContext(TripContext);

  const source = getStation(travelRoute.route[0].route[0]);
  const destination = getStation(
    travelRoute.route[travelRoute.route.length - 1].route[
      travelRoute.route[travelRoute.route.length - 1].route.length - 1
    ]
  );

  if (!(source && destination)) {
    return null;
  }
  const allStationsInRoute = getStationsFromTravelRoute(travelRoute);
  const intermediateStations = allStationsInRoute.filter((station) =>
    station.key !== source.key && station.key !== destination.key
  )

  return (
    <>
      <FeatureGroup name="travel-route">
        <Polyline
          positions={getPolyLineFromStations(allStationsInRoute)}
          color={colors.travelRoute}
          weight={7}
        />
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

const getColorFromLineType = (lineType: LineType) => {
  switch(lineType) {
    case LineType.MRT_BLUE: return colors.mrtBlue;
    case LineType.BTS_SILOM: return colors.btsSilom;
    case LineType.BTS_SUKHUMVIT: return colors.btsSukhumvit;
    default: return colors.btsSilom;
  }
}
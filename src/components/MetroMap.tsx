import React, { useState, useEffect } from "react";
import {
  Map,
  TileLayer,
  Polyline,
  FeatureGroup,
  LayersControl,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { colors } from "../common/colors";
import { LineType } from "../types";
import { STATIONS, Station } from "../data/Stations";
import { DEFAULT_MAP_CENTER, DUMMY_MAP_POSITION, DEFAULT_MAP_MAX_BOUNDS } from "../common/mapConstants";
import MapControl from "./map/MapControl";
import StationMarker from "./map/StationMarker";

const filterLineType = (lineType: LineType) => (
  STATIONS.filter((station) => station.lineType === lineType && !station.isNotAvailable)
);

const mrtBlueStations = filterLineType(LineType.MRT_BLUE);
const btsSilomStations = filterLineType(LineType.BTS_SILOM);
const btsSukhumvitStations = filterLineType(LineType.BTS_SUKHUMVIT);

const getPolyLineFromStations = (stations: Station[]): LatLngTuple[] => {
  return stations.map((station) => station.position);
};

export const MetroMap = () => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(DEFAULT_MAP_CENTER);

  useEffect(() => {
    if (!(mapCenter[0] === DEFAULT_MAP_CENTER[0] && mapCenter[1] === DEFAULT_MAP_CENTER[1])) {
      setMapCenter(DEFAULT_MAP_CENTER);
    }
  }, [mapCenter]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        maxBounds={DEFAULT_MAP_MAX_BOUNDS}
        style={{ height: "100%", width: "100%" }}
        center={mapCenter}
        zoom={12}
        minZoom={12}
        maxZoom={17}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Standard map" checked={true}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="MRT Blue Line" checked={true}>
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
          </LayersControl.Overlay>
          <LayersControl.Overlay name="BTS Silom Line" checked={true}>
            <FeatureGroup name="bts-silom-line">
              <Polyline
                positions={getPolyLineFromStations(btsSilomStations)}
                color={colors.btsSilom}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="BTS Sukhumvit Line" checked={true}>
            <FeatureGroup name="bts-sukhumvit-line">
              <Polyline
                positions={getPolyLineFromStations(btsSukhumvitStations)}
                color={colors.btsSukhumvit}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="MRT Blue Line Station" checked={true}>
            <FeatureGroup name="mrt-blue-station">
              {mrtBlueStations.map((station) => (
                <StationMarker
                  key={station.key}
                  station={station}
                  color={colors.mrtBlue}
                />
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="BTS Silom Line Station" checked={true}>
            <FeatureGroup name="bts-silom-station">
              {btsSilomStations.map((station) => (
                <StationMarker
                  key={station.key}
                  station={station}
                  color={colors.btsSilom}
                />
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="BTS Sukhumvit Line Station"
            checked={true}
          >
            <FeatureGroup name="bts-sukhumvit-station">
              {btsSukhumvitStations.map((station) => (
                <StationMarker
                  key={station.key}
                  station={station}
                  color={colors.btsSukhumvit}
                />
              ))}
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <MapControl onResetViewClick={() => setMapCenter(DUMMY_MAP_POSITION)} />
      </Map>
    </div>
  );
};

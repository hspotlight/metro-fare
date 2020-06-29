import React, { useState, useContext } from "react";
import {
  Map,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
  FeatureGroup,
  LayersControl,
  Tooltip
} from "react-leaflet";
import { LatLngTuple, LatLngBoundsLiteral } from "leaflet";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { TripContext } from "../contexts/TripProvider";
import { getStationName } from "../services/util.service";
import { colors } from "../common/colors";
import { LineType } from "../types";
import { STATIONS, Station } from "../data/Stations";

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
  const [mapCenter] = useState<LatLngTuple>([13.773565, 100.521852]);

  // will change maxBound later
  const maxBounds: LatLngBoundsLiteral = [
    [13.449045, 100.0327245],
    [14.0599723, 100.9603826],
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Map
        maxBounds={maxBounds}
        style={{ height: "100%", width: "100%" }}
        center={mapCenter}
        zoom={12}
        minZoom={12}
        maxZoom={17}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer
            name="BaseMap"
            checked={true}
          >
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
          <LayersControl.Overlay name="BTS Sukhumvit Line Station" checked={true}>
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
      </Map>
    </div>
  );
};

const StationMarker = ({
  station,
  color,
}: {
  station: Station;
  color: string;
}) => {
  const { t: translate, i18n } = useTranslation();
  const { setSource, setDestination } = useContext(TripContext);
  const stationName = `(${station.key}) ${getStationName(station, i18n.language)}`;
  const popupRef = React.useRef(null);

  const closePopusOnClick = () => {
    // @ts-ignore
    popupRef.current.leafletElement.options.leaflet.map.closePopup();
  };

  return (
    <CircleMarker
      center={station.position}
      radius={10}
      color="black"
      weight={1.5}
      fillColor={color}
      fillOpacity={1}
    >
      <Popup ref={popupRef}>
        <section
          style={{ display: "flex", flexDirection: "column", width: "170px" }}
        >
          <h3>{stationName}</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSource(station.key);
              closePopusOnClick();
            }}
          >
            {translate("map.popup.setSource")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDestination(station.key);
              closePopusOnClick();
            }}
          >
            {translate("map.popup.setDestination")}
          </Button>
        </section>
      </Popup>
      <Tooltip>{stationName}</Tooltip>
    </CircleMarker>
  );
};

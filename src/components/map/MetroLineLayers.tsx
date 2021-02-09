import React, { useContext } from "react";
import { Polyline, FeatureGroup, LayersControl } from "react-leaflet";
import { MapContext } from "../../contexts/MapProvider";
import { MRT_BLUE, BTS_SILOM, BTS_SUKHUMVIT, ARL, BRT, BTS_GOLD } from "../../data";
import { getPolyLineFromStations } from "../../services/util.service";
import StationMarker from "./StationMarker";
import { colors } from "../../common/colors";

export const MetroLineLayers = () => {
  const { showMetroLineLayers } = useContext(MapContext);
  const mrtThapraPosition = MRT_BLUE[31].position;
  const polylineLayers = [
    {
      layername: "MRT-blue-line",
      color: colors.mrtBlue,
      polyline: [mrtThapraPosition, ...getPolyLineFromStations(MRT_BLUE)],
      isVisible: true,
    },
    {
      layername: "BTS-silom-line",
      color: colors.btsSilom,
      polyline: getPolyLineFromStations(BTS_SILOM),
      isVisible: true,
    },
    {
      layername: "BTS-sukhumvit-line",
      color: colors.btsSukhumvit,
      polyline: getPolyLineFromStations(BTS_SUKHUMVIT),
      isVisible: true,
    },
    {
      layername: "BTS-gold-line",
      color: colors.btsGold,
      polyline: getPolyLineFromStations(BTS_GOLD),
      isVisible: true,
    },
    {
      layername: "ARL-line",
      color: colors.arl,
      polyline: getPolyLineFromStations(ARL),
      isVisible: true,
    },
    {
      layername: "BRT-line",
      color: colors.brt,
      polyline: getPolyLineFromStations(BRT),
      isVisible: true,
    },
  ];
  const stationLayers = [
    {
      layername: "MRT-blue-station",
      isVisible: showMetroLineLayers.mrtBlue,
      color: colors.mrtBlue,
      stations: MRT_BLUE,
    },
    {
      layername: "BTS-silom-station",
      isVisible: showMetroLineLayers.btsSilom,
      color: colors.btsSilom,
      stations: BTS_SILOM,
    },
    {
      layername: "BTS-sukhumvit-station",
      isVisible: showMetroLineLayers.btsSukhumvit,
      color: colors.btsSukhumvit,
      stations: BTS_SUKHUMVIT,
    },
    {
      layername: "BTS-gold-station",
      isVisible: showMetroLineLayers.btsGold,
      color: colors.btsGold,
      stations: BTS_GOLD,
    },
    {
      layername: "ARL-station",
      isVisible: showMetroLineLayers.arl,
      color: colors.arl,
      stations: ARL,
    },
    {
      layername: "BRT-station",
      isVisible: showMetroLineLayers.brt,
      color: colors.brt,
      stations: BRT,
    },
  ];

  const displayPolylineLayers = () => {
    return polylineLayers.map((polylineLayer) => (
      <LayersControl.Overlay
        key={polylineLayer.layername}
        name={polylineLayer.layername}
        checked={polylineLayer.isVisible}
      >
        <FeatureGroup name={polylineLayer.layername}>
          <Polyline
            positions={polylineLayer.polyline}
            color={polylineLayer.color}
          />
        </FeatureGroup>
      </LayersControl.Overlay>
    ));
  };

  const displayStationLayers = () => {
    return stationLayers.map((stationLayer) => (
      <LayersControl.Overlay
        key={stationLayer.layername}
        name={stationLayer.layername}
        checked={stationLayer.isVisible}
      >
        <FeatureGroup name="mrt-blue-station">
          {stationLayer.stations.map((station) => (
            <StationMarker
              key={station.id}
              station={station}
              fillColor={stationLayer.color}
            />
          ))}
        </FeatureGroup>
      </LayersControl.Overlay>
    ));
  };

  return (
    <LayersControl position="topright">
      {displayPolylineLayers()}
      {displayStationLayers()}
    </LayersControl>
  );
};

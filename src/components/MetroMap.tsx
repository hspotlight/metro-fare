import React, { useState, useEffect, useContext } from "react";
import {
  Map,
  TileLayer,
  Polyline,
  FeatureGroup,
  LayersControl,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { colors } from "../common/colors";
import { Station, MetroLineLayerVisibility } from "../types";
import { DEFAULT_MAP_CENTER, DUMMY_MAP_POSITION, DEFAULT_METRO_LINE_LAYERS } from "../common/mapConstants";
import MapControl from "./map/MapControl";
import StationMarker from "./map/StationMarker";
import { getPolyLineFromStations, getStation, getStationsFromTravelRoute } from "../services/util.service";
import { TripContext } from "../contexts/TripProvider";
import { MRT_BLUE, BTS_SILOM, BTS_SUKHUMVIT, ARL, BRT } from "../data";
import { getColorFromLineType } from "../services/ui-style.service";

export const MetroMap = () => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(DEFAULT_MAP_CENTER);
  const [showMetroLineLayers, setShowMetroLayers] = useState<MetroLineLayerVisibility>(DEFAULT_METRO_LINE_LAYERS);
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
  }, [travelRoute])

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
        <MapControl 
        showMetroLineLayers={showMetroLineLayers} 
        setShowMetroLayers={setShowMetroLayers}
        onResetViewClick={() => setMapCenter(DUMMY_MAP_POSITION)} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MetroLineLayers showMetroLineLayers={showMetroLineLayers} />
        {travelRoute.route.length > 0 && <TravelRouteLayer />}
      </Map>
    </div>
  );
};

const MetroLineLayers = ({showMetroLineLayers}: {showMetroLineLayers: MetroLineLayerVisibility}) => {
  return (
    <LayersControl position="topright">
    <LayersControl.Overlay name="MRT Blue Line" checked={true}>
      <FeatureGroup name="mrt-blue-line">
        <Polyline
          positions={getPolyLineFromStations(MRT_BLUE)}
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
          positions={getPolyLineFromStations(BTS_SILOM)}
          color={colors.btsSilom}
        />
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="BTS Sukhumvit Line" checked={true}>
      <FeatureGroup name="bts-sukhumvit-line">
        <Polyline
          positions={getPolyLineFromStations(BTS_SUKHUMVIT)}
          color={colors.btsSukhumvit}
        />
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="ARL Line" checked={true}>
      <FeatureGroup name="arl-line">
        <Polyline
          positions={getPolyLineFromStations(ARL)}
          color={colors.arl}
        />
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="BRT Line" checked={true}>
      <FeatureGroup name="brt-line">
        <Polyline
          positions={getPolyLineFromStations(BRT)}
          color={colors.brt}
        />
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="MRT Blue Station" checked={showMetroLineLayers.mrtBlue}>
      <FeatureGroup name="mrt-blue-station">
        {MRT_BLUE.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.mrtBlue}
          />
        ))}
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="BTS Silom Station" checked={showMetroLineLayers.btsSilom}>
      <FeatureGroup name="bts-silom-station">
        {BTS_SILOM.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.btsSilom}
          />
        ))}
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="BTS Sukhumvit Station" checked={showMetroLineLayers.btsSukhumvit}>
      <FeatureGroup name="bts-sukhumvit-station">
        {BTS_SUKHUMVIT.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.btsSukhumvit}
          />
        ))}
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Airport Rail Link Station" checked={showMetroLineLayers.arl}>
      <FeatureGroup name="arl-station">
        {ARL.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.arl}
          />
        ))}
      </FeatureGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="BRT Station" checked={showMetroLineLayers.brt}>
      <FeatureGroup name="brt-station">
        {BRT.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={colors.brt}
          />
        ))}
      </FeatureGroup>
      </LayersControl.Overlay>
    </LayersControl>
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
    case LineType.ARL: return colors.arl;
    case LineType.BRT: return colors.brt;
    default: return colors.btsSilom;
  }
}
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
import { Station } from "../types";
import { DEFAULT_MAP_CENTER, DUMMY_MAP_POSITION } from "../common/mapConstants";
import MapControl from "./map/MapControl";
import StationMarker from "./map/StationMarker";
import { getPolyLineFromStations, getStation, getStationsFromTravelRoute } from "../services/util.service";
import { TripContext } from "../contexts/TripProvider";
import { MRT_BLUE, BTS_SILOM, BTS_SUKHUMVIT, ARL, BRT } from "../data";
import { getColorFromLineType, getInterChangeLineColor } from "../services/ui-style.service";
import { MapContext } from "../contexts/MapProvider";

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

const MetroLineLayers = () => {
  const { showMetroLineLayers } = useContext(MapContext);
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

  const source = getStation(travelRoute.source);
  const destination = getStation(travelRoute.destination);

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

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
import { getAllStations, getPolyLineFromStations, getStation, getStationKeysFromTravelRoute } from "../services/util.service";
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
  const mrtThapraPosition = MRT_BLUE[31].position;
  const polylineLayers = [{
    layername: "MRT-blue-line",
    color: colors.mrtBlue,
    polyline: [mrtThapraPosition, ...getPolyLineFromStations(MRT_BLUE)],
    isVisible: true,
  }, {
    layername: "BTS-silom-line",
    color: colors.btsSilom,
    polyline: getPolyLineFromStations(BTS_SILOM),
    isVisible: true,
  }, {
    layername: "BTS-sukhumvit-line",
    color: colors.btsSukhumvit,
    polyline: getPolyLineFromStations(BTS_SUKHUMVIT),
    isVisible: true,
  }, {
    layername: "ARL-line",
    color: colors.arl,
    polyline: getPolyLineFromStations(ARL),
    isVisible: true,
  }, {
    layername: "BRT-line",
    color: colors.brt,
    polyline: getPolyLineFromStations(BRT),
    isVisible: true,
  }]
  const stationLayers = [{
    layername: "MRT-blue-station",
    isVisible: showMetroLineLayers.mrtBlue,
    color: colors.mrtBlue,
    stations: MRT_BLUE,
  }, {
    layername: "BTS-silom-station",
    isVisible: showMetroLineLayers.btsSilom,
    color: colors.btsSilom,
    stations: BTS_SILOM,
  }, {
    layername: "BTS-sukhumvit-station",
    isVisible: showMetroLineLayers.btsSukhumvit,
    color: colors.btsSukhumvit,
    stations: BTS_SUKHUMVIT,
  }, {
    layername: "ARL-station",
    isVisible: showMetroLineLayers.arl,
    color: colors.arl,
    stations: ARL,
  }, {
    layername: "BRT-station",
    isVisible: showMetroLineLayers.brt,
    color: colors.brt,
    stations: BRT,
  }]

  const displayPolylineLayers = () => {
    return polylineLayers.map(polylineLayer => (
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
  }

  const displayStationLayers = () => {
    return stationLayers.map(stationLayer => (
      <LayersControl.Overlay 
        key={stationLayer.layername}
        name={stationLayer.layername} 
        checked={stationLayer.isVisible}
        >
      <FeatureGroup name="mrt-blue-station">
        {stationLayer.stations.map((station) => (
          <StationMarker
            key={station.key}
            station={station}
            fillColor={stationLayer.color}
          />
        ))}
      </FeatureGroup>
      </LayersControl.Overlay>
    ))
  }

  return (
    <LayersControl position="topright">
      {displayPolylineLayers()}
      {displayStationLayers()}
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

import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { DEFAULT_MAP_CENTER } from "../../common/mapConstants";
import MapControl from "./MapControl";
import { Trip, useTripContext } from "../../contexts/TripProvider";
import { useMapContext } from "../../contexts/MapProvider";
import { MetroLineLayers } from "./MetroLineLayers";
import { TravelRouteLayer } from "./TravelRouteLayer";
import FromToMarker from "./Marker/Marker";
import { getStation } from "../../services/util.service";

export const MetroMap = () => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple>(DEFAULT_MAP_CENTER);
  const { setShowMetroLayers } = useMapContext();
  const { trip, journey } = useTripContext();

  useEffect(() => {
    if (
      !(
        mapCenter[0] === DEFAULT_MAP_CENTER[0] &&
        mapCenter[1] === DEFAULT_MAP_CENTER[1]
      )
    ) {
      setMapCenter(DEFAULT_MAP_CENTER);
    }
  }, [mapCenter]);

  useEffect(() => {
    const isVisible = journey.route.length === 0;
    setShowMetroLayers({
      mrtBlue: isVisible,
      btsSilom: isVisible,
      btsSukhumvit: isVisible,
      btsGold: isVisible,
      arl: isVisible,
      brt: isVisible,
    });
  }, [journey, setShowMetroLayers]);

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
        <MapControl />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MetroLineLayers />
        {journey.route.length > 0 && <TravelRouteLayer />}
        <FromToStationLayer trip={trip} />
      </Map>
    </div>
  );
};

const FromToStationLayer = ({ trip }: { trip: Trip }) => {
  const fromStation = getStation(trip.fromId);
  const toStation = getStation(trip.toId);
  // TODO: add popover to show station name and unselect option
  return (
    <FeatureGroup name="from-to-station">
      {fromStation && (
        <FromToMarker position={fromStation.position} type={"from"} />
      )}
      {toStation && <FromToMarker position={toStation.position} type={"to"} />}
    </FeatureGroup>
  );
};

import React, { useEffect } from "react";
import { useTripContext } from "../contexts/TripProvider";
import RouteDetailInsight from "./RouteDetailInsight";
import RouteFromTo from "./RouteFromTo";
import SelectedRoute from "./SelectedRoute";
import "../styles/RouteDetail.scss";
import { getStation, getStationKeysFromTravelRoute } from "../services/util.service";
import { useHistory, useLocation } from "react-router-dom";
import { METRO_STATION } from "../types";
import FareService from "../services/fare.service";

const RouteDetail = () => {
  const { travelRoute, setTravelRoute } = useTripContext();
  const nStations = getStationKeysFromTravelRoute(travelRoute).length;
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  useEffect(() => {
    const source = query.get("source");
    const destination = query.get("destination");
    const routeIndex = query.get("route");
    if (getStation(source as METRO_STATION) && getStation(destination as METRO_STATION)) {
      const localTravelRoutes = FareService.findAllRoutes(
        source as METRO_STATION,
        destination as METRO_STATION
      )
      .sort((a, b) => a.fare - b.fare)
      .slice(0, 5);

      if (routeIndex !== null && localTravelRoutes[+routeIndex]) {
        setTravelRoute(localTravelRoutes[+routeIndex])
      } else {
        history.replace(`/routes?source=${source}&destination=${destination}`)
      }
    } else {
      history.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="route-detail">
      <RouteFromTo
        departure={travelRoute.source}
        arrival={travelRoute.destination}
      />
      <RouteDetailInsight nStations={nStations} fare={travelRoute.fare} />

      <div className="selected-route">
        <SelectedRoute travelRoute={travelRoute} />
      </div>
    </div>
  );
};

export default RouteDetail;

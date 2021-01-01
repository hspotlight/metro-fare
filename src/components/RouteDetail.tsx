import React, { useEffect } from "react";
import { useTripContext } from "../contexts/TripProvider";
import RouteDetailInsight from "./RouteDetailInsight";
import RouteFromTo from "./RouteFromTo";
import SelectedRoute from "./SelectedRoute";
import "../styles/RouteDetail.scss";
import { getStation, getStationIdsFromJourney } from "../services/util.service";
import { useHistory, useLocation } from "react-router-dom";
import { METRO_STATION_ID } from "../types";
import FareService from "../services/fare.service";
import Analytics from "../analytics/Analytics";

const RouteDetail = () => {
  const { journey, setJourney } = useTripContext();
  const nStations = getStationIdsFromJourney(journey).length;
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  useEffect(() => {
    Analytics.logCurrentScreen('route_detail_screen');
    const source = query.get("source");
    const destination = query.get("destination");
    const routeIndex = query.get("route");
    if (getStation(source as METRO_STATION_ID) && getStation(destination as METRO_STATION_ID)) {
      const localJourneys = FareService.findAllRoutes(
        source as METRO_STATION_ID,
        destination as METRO_STATION_ID
      )
      .sort((a, b) => a.fare - b.fare)
      .slice(0, 5);

      if (routeIndex !== null && localJourneys[+routeIndex]) {
        setJourney(localJourneys[+routeIndex])
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
        departure={journey.from}
        arrival={journey.to}
      />
      <RouteDetailInsight nStations={nStations} fare={journey.fare} />

      <div className="selected-route">
        <SelectedRoute journey={journey} />
      </div>
    </div>
  );
};

export default RouteDetail;

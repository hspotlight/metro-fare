import React, { useEffect } from "react";
import { useTripContext } from "../contexts/TripProvider";
import RouteDetailInsight from "./RouteDetailInsight";
import RouteFromTo from "./RouteFromTo";
import SelectedRoute from "./SelectedRoute";
import "../styles/RouteDetail.scss";
import { getStation, getStationIdsFromJourney } from "../services/util.service";
import { useHistory, useLocation } from "react-router-dom";
import { Journey, METRO_STATION_ID } from "../types";
import Analytics from "../analytics/Analytics";
import NavigationService from "../services/navigation.service";

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
      const fetchAllRoute = async () => {
        let localJourneys: Journey[] = await NavigationService.findAllRoutesWithFare(
          source as METRO_STATION_ID,
          destination as METRO_STATION_ID
        )

        localJourneys = localJourneys
        .sort((a, b) => a.fare - b.fare)
        .slice(0, 5);

        if (routeIndex !== null && localJourneys[+routeIndex]) {
          setJourney(localJourneys[+routeIndex])
        } else {
          history.replace(`/routes?source=${source}&destination=${destination}`)
        }
      }

      fetchAllRoute()
      
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

import React, { useEffect, useState } from "react";
import { useTripContext } from "../contexts/TripProvider";
import { METRO_STATION_ID, Journey } from "../types";
import RouteFromTo from "./RouteFromTo";
import RouteInfoCard from "./RouteInfoCard";
import { useHistory, useLocation } from "react-router-dom";
import { getStation } from "../services/util.service";
import Analytics from "../analytics/Analytics";
import NavigationService from "../services/navigation.service";

const RoutesSearchResult = () => {
  const history = useHistory();
  const { trip, setTrip, setJourney } = useTripContext();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    Analytics.logCurrentScreen("route_search_result_screen");
    const source = query.get("source");
    const destination = query.get("destination");
    if (
      getStation(source as METRO_STATION_ID) &&
      getStation(destination as METRO_STATION_ID)
    ) {
      setTrip(source as METRO_STATION_ID, destination as METRO_STATION_ID);
    } else {
      history.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (trip.source && trip.destination) {
      const fetchAllRoutes = () => {
        let journeys = NavigationService.findAllRoutesWithFare(
          trip.source,
          trip.destination
        );

        journeys = journeys.sort((a, b) => a.fare - b.fare).slice(0, 5);
        setJourneys(journeys);
      };

      fetchAllRoutes();
    }
  }, [trip]);

  const handleViewRouteDetail = (journey: Journey, index: number) => {
    setJourney(journey);
    history.push(
      `route-detail?source=${journey.from}&destination=${journey.to}&&route=${index}`
    );
  };

  return (
    <div>
      <RouteFromTo from={trip.source} to={trip.destination} />
      {journeys.length > 0 &&
        journeys.map((journey, index) => {
          return (
            <RouteInfoCard
              key={index}
              journey={journey}
              onClick={() => handleViewRouteDetail(journey, index)}
            />
          );
        })}
    </div>
  );
};

export default RoutesSearchResult;

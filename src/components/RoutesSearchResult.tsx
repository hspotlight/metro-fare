import React, { useEffect, useState } from "react";
import { useTripContext } from "../contexts/TripProvider";
import FareService from "../services/fare.service";
import { METRO_STATION, TravelRoute } from "../types";
import RouteFromTo from "./RouteFromTo";
import RouteInfoCard from "./RouteInfoCard";
import { useHistory, useLocation } from "react-router-dom";
import { getStation } from "../services/util.service";

const RoutesSearchResult = () => {
  const history = useHistory();
  const { trip, setTravelRoute, setJourney } = useTripContext();
  const [travelRoutes, setTravelRoutes] = useState<TravelRoute[]>([]);
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const source = query.get("source");
    const destination = query.get("destination");
    if (getStation(source as METRO_STATION) && getStation(destination as METRO_STATION)) {
      setJourney(source as METRO_STATION, destination as METRO_STATION);
    } else {
      history.replace('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (trip.source && trip.destination) {
      const travelRoutes = FareService.findAllRoutes(
        trip.source,
        trip.destination
      )
        .sort((a, b) => a.fare - b.fare)
        .slice(0, 5);
      setTravelRoutes(travelRoutes);
    }
  }, [trip]);

  const handleViewRouteDetail = (travelRoute: TravelRoute, index: number) => {
    setTravelRoute(travelRoute);
    history.push(`route-detail?source=${travelRoute.source}&destination=${travelRoute.destination}&&route=${index}`);
  };

  return (
    <div>
      <RouteFromTo departure={trip.source} arrival={trip.destination} />
      {travelRoutes.length > 0 &&
        travelRoutes.map((travelRoute, index) => {
          return (
            <RouteInfoCard
              key={index}
              travelRoute={travelRoute}
              title={"Route " + (index + 1)}
              onClick={() => handleViewRouteDetail(travelRoute, index)}
            />
          );
        })}
    </div>
  );
};

export default RoutesSearchResult;

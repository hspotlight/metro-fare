import React, { useEffect, useState } from "react";
import { useTripContext } from "../contexts/TripProvider";
import FareService from "../services/fare.service";
import { TravelRoute } from "../types";
import RouteFromTo from "./RouteFromTo";
import RouteInfoCard from "./RouteInfoCard";

const RoutesSearchResult = () => {
  const { trip } = useTripContext();
  const [travelRoutes, setTravelRoutes] = useState<TravelRoute[]>([])

  useEffect(() => {
    if (trip.source && trip.destination) {
      const travelRoutes = FareService.findAllRoutes(trip.source, trip.destination)
        .sort((a, b) => a.fare - b.fare)
        .slice(0, 5);
      setTravelRoutes(travelRoutes)
    }
  }, [trip])

  const handleViewRouteDetail = (travelRoute: TravelRoute) => {
    console.log('x', travelRoute)
  }

  return (
    <div>
      <RouteFromTo departure={trip.source} arrival={trip.destination} />
      {travelRoutes.length > 0 &&
        travelRoutes.map((travelRoute, index) => {
          console.log(travelRoute)
          return <RouteInfoCard key={index} travelRoute={travelRoute} title={'Route ' + (index + 1)} onClick={handleViewRouteDetail} />
        })
      }
    </div>
  );
};

export default RoutesSearchResult;

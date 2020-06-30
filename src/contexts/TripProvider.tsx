import React, { createContext, useState } from "react";
import { METRO_STATION } from "../types/MetroStation";
import { TravelRoute } from "../types";

export type Trip = {
  source: METRO_STATION;
  destination: METRO_STATION;
};

export const unfilledTrip: Trip = {
  source: "" as METRO_STATION,
  destination: "" as METRO_STATION,
};

export const emptyTravelRoute: TravelRoute = {
  route: [],
  fare: 0
};

const initialTripContext = {
  trip: unfilledTrip,
  travelRoute: emptyTravelRoute,
  setSource: (_: METRO_STATION) => {},
  setDestination: (_: METRO_STATION) => {},
  setTravelRoute: (_: TravelRoute) => {},
  resetTrip: () => {},
  resetTravelRoute: () => {},
};

export const TripContext = createContext(initialTripContext);

const TripProvider = ({ children }: { children: any }) => {
  const [trip, setTrip] = useState<Trip>(unfilledTrip);
  const [travelRoute, setTravelRoute] = useState<TravelRoute>(emptyTravelRoute);

  const setSource = (source: METRO_STATION) => {
    setTrip({
      ...trip,
      source,
    });
  };

  const setDestination = (destination: METRO_STATION) => {
    setTrip({
      ...trip,
      destination,
    });
  };

  const resetTrip = () => {
    setTrip(unfilledTrip);
  };

  const resetTravelRoute = () => {
    setTravelRoute(emptyTravelRoute);
  };

  return (
    <TripContext.Provider
      value={{
        trip,
        travelRoute,
        setSource,
        setDestination,
        resetTrip,
        setTravelRoute,
        resetTravelRoute,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripProvider;

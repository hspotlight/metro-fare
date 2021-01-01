import React, { createContext, useContext, useState } from "react";
import { METRO_STATION_ID } from "../types/MetroStationId";
import { TravelRoute } from "../types";

export type Trip = {
  source: METRO_STATION_ID;
  destination: METRO_STATION_ID;
};

export const unfilledTrip: Trip = {
  source: "" as METRO_STATION_ID,
  destination: "" as METRO_STATION_ID,
};

export const emptyTravelRoute: TravelRoute = {
  route: [],
  fare: 0,
  source: "" as METRO_STATION_ID,
  destination: "" as METRO_STATION_ID,
};

const initialTripContext = {
  trip: unfilledTrip,
  travelRoute: emptyTravelRoute,
  setJourney: (a: METRO_STATION_ID, b: METRO_STATION_ID) => {},
  setSource: (_: METRO_STATION_ID) => {},
  setDestination: (_: METRO_STATION_ID) => {},
  setTravelRoute: (_: TravelRoute) => {},
  resetTrip: () => {},
  resetTravelRoute: () => {},
};

export const TripContext = createContext(initialTripContext);

export const useTripContext = () => useContext(TripContext);

const TripProvider = ({ children }: { children: any }) => {
  const [trip, setTrip] = useState<Trip>(unfilledTrip);
  const [travelRoute, setTravelRoute] = useState<TravelRoute>(emptyTravelRoute);

  const setSource = (source: METRO_STATION_ID) => {
    setTrip({
      ...trip,
      source,
    });
  };

  const setDestination = (destination: METRO_STATION_ID) => {
    setTrip({
      ...trip,
      destination,
    });
  };

  const setJourney = (departure: METRO_STATION_ID, arrival: METRO_STATION_ID) => {
    setTrip({
      source: departure,
      destination: arrival
    })
  }

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
        setJourney,
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

import React, { createContext, useState } from "react";
import { METRO_STATION } from "../types/MetroStation";

export type Trip = {
  source: METRO_STATION;
  destination: METRO_STATION;
};

export const unfilledTrip: Trip = {
  source: "" as METRO_STATION,
  destination: "" as METRO_STATION,
};

const initialTripContext = {
  trip: unfilledTrip,
  setSource: (_: METRO_STATION) => {},
  setDestination: (_: METRO_STATION) => {},
  resetTrip: () => {},
};

export const TripContext = createContext(initialTripContext);

const TripProvider = ({ children }: { children: any }) => {
  const [trip, setTrip] = useState<Trip>(unfilledTrip);

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

  return (
    <TripContext.Provider
      value={{ trip, setSource, setDestination, resetTrip }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripProvider;

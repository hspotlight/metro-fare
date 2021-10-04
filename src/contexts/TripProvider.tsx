import React, { createContext, useContext, useState } from "react";
import { METRO_STATION_ID } from "../types/MetroStationId";
import { Journey } from "../types";
import { UNFILLED_JOURNEY, UNFILLED_TRIP } from "../common/constants";

export type Trip = {
  fromId: METRO_STATION_ID;
  toId: METRO_STATION_ID;
};

const initialTripContext = {
  trip: UNFILLED_TRIP,
  journey: UNFILLED_JOURNEY,
  setTrip: (a: METRO_STATION_ID, b: METRO_STATION_ID) => {},
  setJourney: (_: Journey) => {},
  resetTrip: () => {},
  resetJourney: () => {},
};

export const TripContext = createContext(initialTripContext);

export const useTripContext = () => useContext(TripContext);

// TODO: refactor travelroute to journey
const TripProvider = ({ children }: { children: any }) => {
  const [trip, setTripState] = useState<Trip>(UNFILLED_TRIP);
  const [journey, setJourney] = useState<Journey>(UNFILLED_JOURNEY);

  const setTrip = (fromId: METRO_STATION_ID, toId: METRO_STATION_ID) => {
    setTripState({
      fromId: fromId,
      toId: toId,
    });
  };

  const resetTrip = () => {
    setTripState(UNFILLED_TRIP);
  };

  const resetJourney = () => {
    setJourney(UNFILLED_JOURNEY);
  };

  return (
    <TripContext.Provider
      value={{
        trip,
        journey,
        setTrip,
        resetTrip,
        setJourney,
        resetJourney,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripProvider;

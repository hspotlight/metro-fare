import React, { createContext, useContext, useState } from "react";
import { METRO_STATION_ID } from "../types/MetroStationId";
import { Journey } from "../types";

export type Trip = {
  source: METRO_STATION_ID;
  destination: METRO_STATION_ID;
};

export const unfilledTrip: Trip = {
  source: "" as METRO_STATION_ID,
  destination: "" as METRO_STATION_ID,
};

export const unfilledJourney: Journey = {
  route: [],
  fare: 0,
  from: "" as METRO_STATION_ID,
  to: "" as METRO_STATION_ID,
};

const initialTripContext = {
  trip: unfilledTrip,
  journey: unfilledJourney,
  setTrip: (a: METRO_STATION_ID, b: METRO_STATION_ID) => {},
  setSource: (_: METRO_STATION_ID) => {},
  setDestination: (_: METRO_STATION_ID) => {},
  setJourney: (_: Journey) => {},
  resetTrip: () => {},
  resetJourney: () => {},
};

export const TripContext = createContext(initialTripContext);

export const useTripContext = () => useContext(TripContext);

// TODO: refactor travelroute to journey
const TripProvider = ({ children }: { children: any }) => {
  const [trip, setTripState] = useState<Trip>(unfilledTrip);
  const [journey, setJourney] = useState<Journey>(unfilledJourney);

  const setSource = (source: METRO_STATION_ID) => { // todo remove
    setTripState({
      ...trip,
      source,
    });
  };

  const setDestination = (destination: METRO_STATION_ID) => {  // todo remove
    setTripState({
      ...trip,
      destination,
    });
  };

  const setTrip = (departure: METRO_STATION_ID, arrival: METRO_STATION_ID) => {
    setTripState({
      source: departure,
      destination: arrival
    })
  }

  const resetTrip = () => {
    setTripState(unfilledTrip);
  };

  const resetJourney = () => {
    setJourney(unfilledJourney);
  };

  return (
    <TripContext.Provider
      value={{
        trip,
        journey,
        setTrip,
        setSource,
        setDestination,
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

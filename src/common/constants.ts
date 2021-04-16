import { Trip } from "../contexts/TripProvider";
import { Journey, METRO_STATION_ID } from "../types";

export const EMPTY_STATION_ID = "" as METRO_STATION_ID

export const UNFILLED_TRIP: Trip = {
    fromId: EMPTY_STATION_ID,
    toId: EMPTY_STATION_ID,
};

export const UNFILLED_JOURNEY: Journey = {
    route: [],
    fare: 0,
    from: EMPTY_STATION_ID,
    to: EMPTY_STATION_ID,
};
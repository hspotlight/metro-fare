import { METRO_STATION_ID } from "./MetroStationId";
import { FareType } from "./FareType";

export type RouteSegment = {
    route: METRO_STATION_ID[],
    fareType: FareType
}
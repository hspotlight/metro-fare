import { METRO_STATION } from "./MetroStation";
import { FareType } from "./FareType";

export type RouteSegment = {
    route: METRO_STATION[],
    fareType: FareType
}
import { METRO_STATION_ID } from "./MetroStationId";
import { Intersection } from "./Intersection";

export type Line = {
    line: METRO_STATION_ID[],
    intersections?: Intersection[],
}

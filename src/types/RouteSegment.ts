import { METRO_STATION_ID } from "./MetroStationId";
import { LineType } from "./LineType";

export type RouteSegment = {
    route: METRO_STATION_ID[],
    lineType: LineType
}
import { METRO_STATION_ID, LineType } from ".";

export type TravelRoute = {
    route: {
        route: METRO_STATION_ID[],
        lineType: LineType,
        fare: number
    }[],
    fare: number,
    source: METRO_STATION_ID,
    destination: METRO_STATION_ID,
}
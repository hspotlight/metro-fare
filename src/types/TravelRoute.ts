import { METRO_STATION_ID, LineType } from ".";

export type Journey = {
    route: {
        route: METRO_STATION_ID[],
        lineType: LineType,
        fare: number
    }[],
    fare: number,
    from: METRO_STATION_ID,
    to: METRO_STATION_ID,
}
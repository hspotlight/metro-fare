import { METRO_FARE } from "../common/fare";
import { RouteSegment } from "../types/RouteSegment";

export const calculateFareFromRouteSegment = (routeSegment: RouteSegment, hasMoreThanOneSegment = false): number => {
    const fareTable: number[] = METRO_FARE[routeSegment.fareType];

    const hops = routeSegment.route.length - 1;
    if (hops === 0 && hasMoreThanOneSegment) {
        return 0;
    }

    if (hops > fareTable.length - 1) {
        return fareTable[fareTable.length - 1];
    }

    return fareTable[hops];
}
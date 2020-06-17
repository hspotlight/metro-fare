import { METRO_FARE } from "../common/fare";
import { RouteSegment } from "../types/RouteSegment";
import { FareType } from "../types/FareType";
import { LineType } from "../types/LineType";

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

export const getLineTypeFromFareType = (fareType: FareType): LineType => {
    switch(fareType) {
        case FareType.BTS_SILOM: return LineType.BTS_SILOM;
        default: return LineType.MRT_BLUE;
    }
}
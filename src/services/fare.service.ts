import { isInterchangeStation } from "./util.service";
import { RouteSegment, LineType } from "../types";
import { MRT_BLUE_CYCLE, MRT_BLUE_TAIL } from "../data";
import { METRO_FARE } from "../common/fare";
import { getBTSFareFromTable } from "./btsFare.service";

const calculateFareFromRouteSegment = (routeSegment: RouteSegment, isTravelToSelf: boolean): number => {
    const stationId = routeSegment.route[0];
    const hops = calculateHop(routeSegment);

    if (!isTravelToSelf && hops === 0 && isInterchangeStation(stationId)) {
        return 0;
    }

    if (routeSegment.lineType === LineType.BTS || routeSegment.lineType === LineType.BTS_GOLD) {
        return getBTSFareFromTable(routeSegment.route[0], routeSegment.route[routeSegment.route.length - 1]);
    }

    const fareTable: number[] = METRO_FARE[routeSegment.lineType];

    if (hops > fareTable.length - 1) {
        return fareTable[fareTable.length - 1];
    }

    return fareTable[hops];
}

const calculateHop = (routeSegment: RouteSegment) => {
    if (routeSegment.lineType !== LineType.MRT_BLUE) return routeSegment.route.length - 1;

    let hops = routeSegment.route.length - 1;
    const stationId = routeSegment.route[0];
    const lastStationId = routeSegment.route[hops];
    const indexA = MRT_BLUE_CYCLE.findIndex(s => s === stationId) 
    const indexB = MRT_BLUE_CYCLE.findIndex(s => s === lastStationId)
    const isInTheRing = (index: number) => index !== -1
    const getHopFromCycleStation = (indexA: number, indexB: number) => 
        Math.min(
            Math.abs(indexA - indexB),
            MRT_BLUE_CYCLE.length - Math.abs(indexA - indexB)
        );
    const getHopFromTailStation = (indexA: number, indexB: number) => 
        Math.abs(indexA - indexB)
    if (isInTheRing(indexA) && isInTheRing(indexB)) {
        hops = getHopFromCycleStation(indexA, indexB)
    } 
    else if (isInTheRing(indexA) && !isInTheRing(indexB)) {
        const thapraIndex = 0
        hops = getHopFromTailStation(thapraIndex, MRT_BLUE_TAIL.indexOf(lastStationId))
            + getHopFromCycleStation(thapraIndex, MRT_BLUE_CYCLE.indexOf(stationId))
    }
     else if (!isInTheRing(indexA) && isInTheRing(indexB)) {
        const thapraIndex = 0
        hops = getHopFromTailStation(thapraIndex, MRT_BLUE_TAIL.indexOf(stationId))
            + getHopFromCycleStation(thapraIndex, MRT_BLUE_CYCLE.indexOf(lastStationId))
    }
    return hops
}

const FareService = {
    calculateFareFromRouteSegment
}

export default FareService;
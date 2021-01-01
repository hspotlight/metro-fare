import GraphService, { metroGraph } from "./graph.service";
import { getLineTypeFromFareType, isExtensionBorderStation, isInterchangeStation } from "./util.service";
import { FareType, METRO_STATION_ID, RouteSegment, TravelRoute } from "../types";
import { MRT_BLUE_CYCLE, MRT_BLUE_TAIL } from "../data";
import { METRO_FARE } from "../common/fare";

const findAllRoutes = (source: METRO_STATION_ID, destination: METRO_STATION_ID): TravelRoute[] => {
    const routeSegmentsList = GraphService.findAllRoutes(source, destination, metroGraph);
    const travelRoutes = routeSegmentsList.map(routeSegments => {
        return FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);
    })
    return travelRoutes;
}
const getTravelRouteFromRouteSegments = (routeSegments: RouteSegment[], source: METRO_STATION_ID, destination: METRO_STATION_ID): TravelRoute => {
    const isTravelToSelf = source === destination;
    let totalFare = 0;
    const route = routeSegments.map((routeSegment: RouteSegment) => {
        const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
        const lineType = getLineTypeFromFareType(routeSegment.fareType);
        totalFare += fare;
        return {
            route: routeSegment.route,
            lineType,
            fare
        };
    });
    return {
        route,
        fare: totalFare,
        source,
        destination,
    };
}

const calculateFareFromRouteSegment = (routeSegment: RouteSegment, isTravelToSelf: boolean): number => {
    const fareTable: number[] = METRO_FARE[routeSegment.fareType];

    const hops = calculateHop(routeSegment);

    const station = routeSegment.route[0];
    if (!isTravelToSelf && hops === 0 && (isInterchangeStation(station) || isExtensionBorderStation(station))) {
        return 0;
    }

    if (hops > fareTable.length - 1) {
        return fareTable[fareTable.length - 1];
    }

    return fareTable[hops];
}

const calculateHop = (routeSegment: RouteSegment) => {
    if (routeSegment.fareType !== FareType.MRT_BLUE) return routeSegment.route.length - 1;

    let hops = routeSegment.route.length - 1;
    const station = routeSegment.route[0];
    const lastStation = routeSegment.route[hops];
    const indexA = MRT_BLUE_CYCLE.findIndex(s => s === station) 
    const indexB = MRT_BLUE_CYCLE.findIndex(s => s === lastStation)
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
        hops = getHopFromTailStation(thapraIndex, MRT_BLUE_TAIL.indexOf(lastStation))
            + getHopFromCycleStation(thapraIndex, MRT_BLUE_CYCLE.indexOf(station))
    }
     else if (!isInTheRing(indexA) && isInTheRing(indexB)) {
        const thapraIndex = 0
        hops = getHopFromTailStation(thapraIndex, MRT_BLUE_TAIL.indexOf(station))
            + getHopFromCycleStation(thapraIndex, MRT_BLUE_CYCLE.indexOf(lastStation))
    }
    return hops
}

const FareService = {
    findAllRoutes,
    getTravelRouteFromRouteSegments,
    calculateFareFromRouteSegment
}

export default FareService;
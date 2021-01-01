import GraphService from "./graph.service";
import { getLineTypeFromFareType, isExtensionBorderStation, isInterchangeStation } from "./util.service";
import { FareType, METRO_STATION_ID, RouteSegment, Journey } from "../types";
import { METRO_GRAPH, MRT_BLUE_CYCLE, MRT_BLUE_TAIL } from "../data";
import { METRO_FARE } from "../common/fare";

const metroGraph = GraphService.createGraph(METRO_GRAPH);

const findAllRoutes = (from: METRO_STATION_ID, to: METRO_STATION_ID): Journey[] => {
    const routeSegmentsList = GraphService.findAllRoutes(from, to, metroGraph);
    const journeys = routeSegmentsList.map(routeSegments => {
        return FareService.getJourneyFromRouteSegments(routeSegments, from, to);
    })
    return journeys;
}

const getJourneyFromRouteSegments = (routeSegments: RouteSegment[], from: METRO_STATION_ID, to: METRO_STATION_ID): Journey => {
    const isTravelToSelf = from === to;
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
        from: from,
        to: to,
    };
}

const calculateFareFromRouteSegment = (routeSegment: RouteSegment, isTravelToSelf: boolean): number => {
    const fareTable: number[] = METRO_FARE[routeSegment.fareType];

    const hops = calculateHop(routeSegment);

    const stationId = routeSegment.route[0];
    if (!isTravelToSelf && hops === 0 && (isInterchangeStation(stationId) || isExtensionBorderStation(stationId))) {
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
    findAllRoutes,
    getJourneyFromRouteSegments,
    calculateFareFromRouteSegment
}

export default FareService;
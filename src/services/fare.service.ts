import GraphService from "./graph.service";
import { isExtensionBorderStation, isInterchangeStation } from "./util.service";
import { METRO_STATION_ID, RouteSegment, Journey, LineType } from "../types";
import { METRO_GRAPH, MRT_BLUE_CYCLE, MRT_BLUE_TAIL } from "../data";
import { METRO_FARE } from "../common/fare";
import { getBTSFareFromTable } from "./btsFare.service";

const metroGraph = GraphService.createGraph(METRO_GRAPH);

// TODO: refactor fare service as producer
const findAllRoutes = async (from: METRO_STATION_ID, to: METRO_STATION_ID): Promise<Journey[]> => {
    const routeSegmentsList = GraphService.findAllRoutes(from, to, metroGraph);
    // TODO: refactor to reduce number of call to btsFare (if backend is implemented)
    const journeys = await Promise.all(routeSegmentsList.map(routeSegments => {
        return FareService.getJourneyFromRouteSegments(routeSegments, from, to);
    }))
    return journeys;
}

const getJourneyFromRouteSegments = async (routeSegments: RouteSegment[], from: METRO_STATION_ID, to: METRO_STATION_ID): Promise<Journey> => {
    const isTravelToSelf = from === to;
    let totalFare = 0;
    const fares = await Promise.all(routeSegments.map((routeSegment: RouteSegment) => {
        return calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
    }));
    const route = routeSegments.map((routeSegment: RouteSegment, routeIndex: number) => {
        const fare = fares[routeIndex];
        totalFare += fare;
        return {
            route: routeSegment.route,
            lineType: routeSegment.lineType,
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

const calculateFareFromRouteSegment = async (routeSegment: RouteSegment, isTravelToSelf: boolean): Promise<number> => {
    const stationId = routeSegment.route[0];
    if (routeSegment.lineType === LineType.BTS || routeSegment.lineType === LineType.BTS_GOLD) {
        if (!isTravelToSelf && routeSegment.route.length === 1 && (isInterchangeStation(stationId) || isExtensionBorderStation(stationId))) {
            return 0;
        }

        const fare = await getBTSFareFromTable(routeSegment.route[0], routeSegment.route[routeSegment.route.length - 1]);
        return fare
    }

    const fareTable: number[] = METRO_FARE[routeSegment.lineType];

    const hops = calculateHop(routeSegment);

    if (!isTravelToSelf && hops === 0 && (isInterchangeStation(stationId) || isExtensionBorderStation(stationId))) {
        return 0;
    }

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
    findAllRoutes,
    getJourneyFromRouteSegments,
    calculateFareFromRouteSegment
}

export default FareService;
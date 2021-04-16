import PriorityQueue from "priorityqueue";
import { getLineTypeFromStationId } from "./util.service";
import { Journey, METRO_STATION_ID, RouteSegment } from "../types";
import { StationHop } from "../types/StationHop";
import cloneDeep from "lodash.clonedeep";
import GraphService from "./graph.service";
import FareService from "./fare.service";
import { METRO_GRAPH } from "../data";

const lowestHopsComparator = (stationA: StationHop, stationB: StationHop) => stationB.getTotalHops() - stationA.getTotalHops();

const metroGraph = GraphService.createGraph(METRO_GRAPH);

const findAllRoutesWithFare = (from: METRO_STATION_ID, to: METRO_STATION_ID): Journey[] => {
    const routeSegmentsList = findAllRoutes(from, to, metroGraph);
    // TODO: refactor to reduce number of call to btsFare (if backend is implemented)
    const journeys = routeSegmentsList.map(routeSegments => {
        return getJourneyFromRouteSegments(routeSegments, from, to);
    })
    return journeys;
}

const findAllRoutes = (fromId: METRO_STATION_ID, toId: METRO_STATION_ID, graph: any): RouteSegment[][] => {
    const routeSegment: RouteSegment = { route: [fromId], lineType: getLineTypeFromStationId(fromId) };

    const comparator = lowestHopsComparator;
    const stationsToBeVisited = new PriorityQueue({ comparator });
    stationsToBeVisited.push(new StationHop(fromId, [routeSegment]));

    const allPossibleRoutes: RouteSegment[][] = [];
    while (stationsToBeVisited.length > 0) {
        const currentStation = stationsToBeVisited.pop() as StationHop;

        if (currentStation.station === toId) {
            allPossibleRoutes.push(currentStation.routeSegments);
        }

        const nextStationIds: METRO_STATION_ID[] = graph[currentStation.station];
        nextStationIds.forEach(nextStation => {

            if (!currentStation.isStationInPath(nextStation)) {
                const routeSegments: RouteSegment[] = getNextStationRouteSegments(cloneDeep(currentStation.routeSegments), nextStation);
                const nextStationHop = new StationHop(nextStation, routeSegments);
                stationsToBeVisited.push(nextStationHop);
            }
        });
    }
    return allPossibleRoutes;
}

const getNextStationRouteSegments = (routeSegments: RouteSegment[], nextStation: METRO_STATION_ID): RouteSegment[] => {
    const lineType = getLineTypeFromStationId(nextStation);

    if (routeSegments[routeSegments.length - 1].lineType === lineType) {
        routeSegments[routeSegments.length - 1].route.push(nextStation);
    } else {
        const routeSegment: RouteSegment = {
            route: [nextStation],
            lineType: lineType
        };
        routeSegments.push(routeSegment)
    }

    return routeSegments;
}

const getJourneyFromRouteSegments = (routeSegments: RouteSegment[], from: METRO_STATION_ID, to: METRO_STATION_ID): Journey => {
    const isTravelToSelf = from === to;
    let totalFare = 0;
    const fares = routeSegments.map((routeSegment: RouteSegment) => {
        return FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
    });
    const routeSegmentsWithFare = routeSegments.map((routeSegment: RouteSegment, routeIndex: number) => {
        const fare = fares[routeIndex];
        totalFare += fare;
        return {
            ...routeSegment,
            fare
        };
    });
    return {
        route: routeSegmentsWithFare,
        fare: totalFare,
        from: from,
        to: to,
    };
}

const NavigationService = {
    findAllRoutesWithFare,
    findAllRoutes,
    getNextStationRouteSegments,
    getJourneyFromRouteSegments
}

export default NavigationService;

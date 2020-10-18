import GraphService, { metroGraph } from "./graph.service";
import { calculateFareFromRouteSegment, getLineTypeFromFareType } from "./util.service";
import { METRO_STATION, RouteSegment, TravelRoute } from "../types";

const findAllRoutes = (source: METRO_STATION, destination: METRO_STATION): TravelRoute[] => {
    const routeSegmentsList = GraphService.findAllRoutes(source, destination, metroGraph);
    const travelRoutes = routeSegmentsList.map(routeSegments => {
        return FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);
    })
    return travelRoutes;
}
const getTravelRouteFromRouteSegments = (routeSegments: RouteSegment[], source: METRO_STATION, destination: METRO_STATION) => {
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

const FareService = {
    findAllRoutes,
    getTravelRouteFromRouteSegments
}

export default FareService;
import { graphService, metroGraph, FindRouteMethod } from "./graph.service";
import { calculateFareFromRouteSegment, getLineTypeFromFareType } from "./util.service";
import { METRO_STATION, LineType, RouteSegment } from "../types";

export type TravelRoute = {
    route: {
        route: METRO_STATION[],
        lineType: LineType,
        fare: number
    }[],
    fare: number,
}

export const FareService = {
    calculate(source: METRO_STATION, destination: METRO_STATION, findRouteMethod: FindRouteMethod = 'lowestHop'): TravelRoute {
        const routeSegments = graphService.findRoute(source, destination, metroGraph, findRouteMethod);

        let totalFare = 0;
        const route = routeSegments.map((routeSegment: RouteSegment) => {
            const fare = calculateFareFromRouteSegment(routeSegment);
            const lineType = getLineTypeFromFareType(routeSegment.fareType);
            totalFare += fare;
            return {
                route: routeSegment.route,
                lineType,
                fare
            }
        });
        return {
            route,
            fare: totalFare
        }
    }
}
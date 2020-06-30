import { graphService, metroGraph } from "./graph.service";
import { calculateFareFromRouteSegment, getLineTypeFromFareType } from "./util.service";
import { METRO_STATION, RouteSegment, TravelRoute } from "../types";

export const FareService = {
    calculate(source: METRO_STATION, destination: METRO_STATION): TravelRoute {
        const routeSegments = graphService.findRoute(source, destination, metroGraph);

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
import { METRO_STATION } from "../types/MetroStation";
import { graphService, metroGraph } from "./graph.service";
import { RouteSegment } from "../types/RouteSegment";
import { calculateFareFromRouteSegment, getLineTypeFromFareType } from "./util.service";
import { LineType } from "../types/LineType";

export type TravelRoute = {
    route: {
        route: METRO_STATION[],
        lineType: LineType,
        fare: number
    }[],
    fare: number,
}

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
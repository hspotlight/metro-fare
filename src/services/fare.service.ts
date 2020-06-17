import { METRO_STATION } from "../types/MetroStation";
import { graphService, metroGraph } from "./graph.service";
import { RouteSegment } from "../types/RouteSegment";
import { FareType } from "../types/FareType";
import { calculateFareFromRouteSegment } from "./util.service";

export type TravelRoute = {
    route: {
        route: METRO_STATION[],
        fareType: FareType,
        fare: number
    }[],
    fare: number,
}

export const FareService = {
    calculate(source: METRO_STATION, destination: METRO_STATION): TravelRoute {
        const routeSegments = graphService.findRoute(source, destination, metroGraph);

        let totalFare = 0;
        const route = routeSegments.map((routeSegment: RouteSegment) => {
            const fare = calculateFareFromRouteSegment(routeSegment, routeSegments.length > 1);
            totalFare += fare;
            return {
                route: routeSegment.route,
                fareType: routeSegment.fareType,
                fare
            }
        });
        return {
            route,
            fare: totalFare
        }
    }
}
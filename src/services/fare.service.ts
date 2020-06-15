import { METRO_STATION } from "../types/MetroStation";
import { METRO_FARE } from "../common/fare";
import { graphService, metroGraph } from "./graph.service";
import { RouteSegment } from "../types/RouteSegment";

export type TravelRoute = {
    route: METRO_STATION[],
    fare: number,
}

export const FareService = {
    calculate(source: METRO_STATION, destination: METRO_STATION): TravelRoute {
        const routeSegments = graphService.findRoute(source, destination, metroGraph);
        return {
            route: routeSegments[0].route,
            fare: this.calculateTotalFareFromRoute(routeSegments[0])
        };
    },
    calculateTotalFareFromRoute(routeSegment: RouteSegment): number {
        const fareTable: number[] = METRO_FARE[routeSegment.fareType];

        const hops = routeSegment.route.length - 1;
        if (hops > fareTable.length) {
            return fareTable[fareTable.length - 1];
        }

        return fareTable[hops];
    }
}
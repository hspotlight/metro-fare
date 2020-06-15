import { METRO_STATION } from "../types/MetroStation";
import { METRO_FARE } from "../common/fare";
import { graphService, metroGraph } from "./graph.service";
import { RouteSegment } from "../types/RouteSegment";

export type TravelRoute = {
    route: {
        route: METRO_STATION[],
        fare: number
    }[],
    fare: number,
}

export const FareService = {
    calculate(source: METRO_STATION, destination: METRO_STATION): TravelRoute {
        const routeSegments = graphService.findRoute(source, destination, metroGraph);

        let totalFare = 0;
        const route = routeSegments.map((routeSegment: RouteSegment, index: number) => {
            const isLastSegment = routeSegments.length > 1 && index === routeSegments.length - 1;
            const fare = this.calculateTotalFareFromRoute(routeSegment, isLastSegment);
            totalFare += fare;
            return {
                route: routeSegment.route,
                fare
            }
        });
        return {
            route,
            fare: totalFare
        }
    },
    calculateTotalFareFromRoute(routeSegment: RouteSegment, isLastSegment = false): number {
        const fareTable: number[] = METRO_FARE[routeSegment.fareType];
        
        const hops = routeSegment.route.length - 1;
        if (hops === 0 && isLastSegment) {
            return 0;
        }

        if (hops > fareTable.length) {
            return fareTable[fareTable.length - 1];
        }

        return fareTable[hops];
    }
}
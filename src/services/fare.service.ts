import { METRO_STATION } from "../types/MetroStation";
import { MRT_BLUE_FARE } from "../common/constants";
import { graphService, metroGraph } from "./graph.service";

export const FareService = {
    calculate(source: METRO_STATION, destination: METRO_STATION): number {
        const route = graphService.findRoute(source, destination, metroGraph);
        const hops = route.length - 1;
        if (hops > 13) {
            return MRT_BLUE_FARE[13];
        }
        return MRT_BLUE_FARE[hops];
    }
}
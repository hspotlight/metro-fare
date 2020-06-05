import { METRO_STATION } from "../types/MetroStation";
import { MRT_BLUE_LINE } from "../data/MrtBlueLine";
import { MRT_BLUE_FARE } from "../common/constants";

export const FareService = {
    calculate(source: METRO_STATION, destination: METRO_STATION): number {
        const sourceIndex = MRT_BLUE_LINE.line.indexOf(source);
        const destinationIndex = MRT_BLUE_LINE.line.indexOf(destination);
        const hops = Math.abs(sourceIndex - destinationIndex);
        if (hops > 13) {
            return MRT_BLUE_FARE[13];
        }
        return MRT_BLUE_FARE[hops];
    }
}
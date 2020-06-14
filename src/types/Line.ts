import { METRO_STATION } from "./MetroStation";
import { Intersection } from "./Intersection";

export type Line = {
    line: METRO_STATION[],
    intersections?: Intersection[],
}

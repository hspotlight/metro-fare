import { METRO_STATION } from "./MetroStation";

export type Line = {
    line: METRO_STATION[],
    intersections?: Intersection[],
}

export type Intersection = METRO_STATION[];
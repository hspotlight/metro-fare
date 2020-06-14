import { Line } from "./Line";
import { Intersection } from "./Intersection";

export type Graph = {
    lines: Line[],
    intersections?: Intersection[]
}
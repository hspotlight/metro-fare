import { Line, Intersection } from "./Line";

export type Graph = {
    lines: Line[],
    intersections?: Intersection[]
}
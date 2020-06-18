import { MRT_BLUE_LINE } from "./MrtBlueLine";
import { BTS_SILOM_LINE } from "./BtsSilomLine";
import { MRT_BLUE_STATION, BTS_SILOM_STATION, Graph } from "../types";

export const METRO_GRAPH: Graph = {
    lines: [
        MRT_BLUE_LINE,
        BTS_SILOM_LINE,
    ],
    intersections: [
        [MRT_BLUE_STATION.SILOM, BTS_SILOM_STATION.SALA_DAENG],
        [MRT_BLUE_STATION.BANG_WA, BTS_SILOM_STATION.BANG_WA]
    ]
}
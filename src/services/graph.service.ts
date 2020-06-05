import { Line } from "../types/Line";
import { MRT_BLUE_LINE } from "../data/MrtBlueLine";

export const graphService = {
    create(metroLine: Line) {
        const metroGraph = Object.create(null);
        metroLine.line.forEach((station, index) => {
            metroGraph[station] = [];
            if (index > 0) {
                const prevStation = metroLine.line[index - 1];
                metroGraph[station].push(prevStation);
            }
            if (index + 1 < metroLine.line.length) {
                const nextStation = metroLine.line[index + 1];
                metroGraph[station].push(nextStation);
            }
        });
        return metroGraph;
    },
}

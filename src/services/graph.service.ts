import { Line } from "../types/Line";
import { METRO_STATION } from "../types/MetroStation";
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
        metroLine.intersections?.forEach(intersection => {
            const firstStation = intersection[0];
            const secondStation = intersection[1];
            metroGraph[firstStation].push(secondStation);
            metroGraph[secondStation].push(firstStation);
        });
        return metroGraph;
    },
    findRoute(source: METRO_STATION, destination: METRO_STATION, graph: any) {
        if (source === destination) return [source];

        const prevStation = Object.create(null);
        prevStation[source] = null;

        const stationToBeVisited = [source];
        while(stationToBeVisited.length > 0) {
            const currentStation = stationToBeVisited.shift() as string;

            if (currentStation === destination) break;

            graph[currentStation].forEach((nextStation: any) => {
                if (Object.keys(prevStation).indexOf(nextStation) === -1) {
                    stationToBeVisited.push(nextStation);
                    prevStation[nextStation] = currentStation;
                }
            });
        }

        const route = [destination];
        let prev = prevStation[destination];
        while(prev !== null) {
            route.push(prev);
            prev = prevStation[prev];
        }

        return route.reverse();
    }
}

export const metroGraph = graphService.create(MRT_BLUE_LINE);
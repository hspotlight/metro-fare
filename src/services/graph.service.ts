import { Line } from "../types/Line";
import { MRT_BLUE_LINE } from "../data/MrtBlueLine";
import { METRO_STATION } from "../types/MetroStation";

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
        metroLine.intersections?.forEach((intersection: METRO_STATION[]) => {
            const firstStation = intersection[0];
            const secondStation = intersection[1];
            metroGraph[firstStation].push(secondStation);
            metroGraph[secondStation].push(firstStation);
        });
        return metroGraph;
    },
    findRoute(source: METRO_STATION, destination: METRO_STATION, graph?: any): METRO_STATION[] {
        if (source === destination) return [source];

        const stationsToBeVisited = [{station: source, path: [source]}];
        const visitedStations = Object.create({});
        visitedStations[source] = true;

        while (stationsToBeVisited.length > 0) {
            const currentStation = stationsToBeVisited[0];
            stationsToBeVisited.shift();
            const nextStations = graph[currentStation.station];
            for (let i = 0; i < nextStations.length; i++) {
                const nextStation = nextStations[i];
                if (nextStation === destination) return [...currentStation.path, destination];

                if (Object.keys(visitedStations).indexOf(nextStation) === -1) {
                    stationsToBeVisited.push({station: nextStation, path: [...currentStation.path, nextStation]});
                    visitedStations[nextStation] = true;
                }
            }
        }
        return [];
    }
}

export const metroGraph = graphService.create(MRT_BLUE_LINE);
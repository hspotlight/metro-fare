import { Line, Intersection } from "../types/Line";
import { MRT_BLUE_LINE } from "../data/MrtBlueLine";
import { METRO_STATION } from "../types/MetroStation";
import { Graph } from "../types/Graph";

export const graphService = {
    createGraph(metroGraph: Graph, graph = Object.create(null)) {
        metroGraph.lines.forEach((line: Line) => {
            this.addLineToGraph(line, graph);
        })
        if (metroGraph.intersections) {
            this.addIntersectionsToGraph(metroGraph.intersections, graph);
        }
        return graph;
    },
    addLineToGraph(metroLine: Line, graph = Object.create(null)) {
        metroLine.line.forEach((station, index) => {
            graph[station] = [];
            if (index > 0) {
                const prevStation = metroLine.line[index - 1];
                graph[station].push(prevStation);
            }
            if (index + 1 < metroLine.line.length) {
                const nextStation = metroLine.line[index + 1];
                graph[station].push(nextStation);
            }
        });
        if (metroLine.intersections) {
            this.addIntersectionsToGraph(metroLine.intersections, graph);
        }
        return graph;
    },
    addIntersectionsToGraph(intersections: Intersection[], graph: any) {
        intersections.forEach((intersection: METRO_STATION[]) => {
            const firstStation = intersection[0];
            const secondStation = intersection[1];
            graph[firstStation].push(secondStation);
            graph[secondStation].push(firstStation);
        });
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

export const metroGraph = graphService.addLineToGraph(MRT_BLUE_LINE);
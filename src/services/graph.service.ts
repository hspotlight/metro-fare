import { METRO_STATION_ID, Graph, Line, Intersection } from "../types";

type AdjacencyList = {
    [key in METRO_STATION_ID]?: METRO_STATION_ID[];
}

const createGraph = (metroGraph: Graph, graph = Object.create(null)): AdjacencyList => {
    metroGraph.lines.forEach((line: Line) => {
        addLineToGraph(line, graph);
    })
    if (metroGraph.intersections) {
        addIntersectionsToGraph(metroGraph.intersections, graph);
    }
    return graph;
}

const addLineToGraph = (metroLine: Line, graph = Object.create(null)) => {
    metroLine.line.forEach((station, index) => {
        if (!graph[station]) {
            graph[station] = [];
        }
        if (graph[station]) {
            if (index > 0) {
                const prevStation = metroLine.line[index - 1];
                graph[station].push(prevStation);
            }
            if (index + 1 < metroLine.line.length) {
                const nextStation = metroLine.line[index + 1];
                graph[station].push(nextStation);
            }
        }
    });
    if (metroLine.intersections) {
        addIntersectionsToGraph(metroLine.intersections, graph);
    }
    return graph;
}

const addIntersectionsToGraph = (intersections: Intersection[], graph: any) => {
    intersections.forEach((intersection: METRO_STATION_ID[]) => {
        const firstStation = intersection[0];
        const secondStation = intersection[1];
        graph[firstStation].push(secondStation);
        graph[secondStation].push(firstStation);
    });
}

const GraphService = {
    createGraph
}

export default GraphService;

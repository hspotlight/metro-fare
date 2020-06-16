import { Line } from "../types/Line";
import { Intersection } from "../types/Intersection";
import { METRO_STATION, BTS_SILOM_STATION } from "../types/MetroStation";
import { Graph } from "../types/Graph";
import { RouteSegment } from "../types/RouteSegment";
import { FareType } from "../types/FareType";
import { METRO_GRAPH } from "../data/MetroGraph";

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
    findRoute(source: METRO_STATION, destination: METRO_STATION, graph: any): RouteSegment[] {
        const routeSegment: RouteSegment = { route: [source], fareType: getFareTypeFromStationId(source) };
        const stationsToBeVisited = [new StationHop(source, [routeSegment])];

        const visitedStations = Object.create({});
        
        while (stationsToBeVisited.length > 0) {
            const currentStation = stationsToBeVisited.shift() as StationHop;
            
            if (currentStation.station === destination) {
                return currentStation.paths;
            }
            
            if (!Object.keys(visitedStations).includes(currentStation.station)) {
                visitedStations[currentStation.station] = true;

                const nextStations: METRO_STATION[]  = graph[currentStation.station];

                nextStations.forEach(nextStation => {
                    const routeSegments: RouteSegment[] = getNextStationRouteSegments(currentStation, nextStation);

                    const nextStationHop = new StationHop(nextStation, routeSegments);

                    stationsToBeVisited.push(nextStationHop);
                });
            }

        }
        return [];
    }
}

const getFareTypeFromStationId = (station: METRO_STATION): FareType => {
    if (Object.values(BTS_SILOM_STATION).includes(station as BTS_SILOM_STATION)) return FareType.BTS
    return FareType.MRT_BLUE
}

const getNextStationRouteSegments = (currentStation: StationHop, nextStation: METRO_STATION) => {
    const fareType = getFareTypeFromStationId(nextStation);
    const routeSegments: RouteSegment[] = currentStation.paths.map((routeSegment: RouteSegment): RouteSegment => {
        return {
            route: [...routeSegment.route],
            fareType: routeSegment.fareType
        };
    });

    if (routeSegments[routeSegments.length - 1].fareType === fareType) {
        routeSegments[routeSegments.length - 1].route.push(nextStation);
    } else {
        const routeSegment: RouteSegment = {
            route: [nextStation],
            fareType
        };
        routeSegments.push(routeSegment)
    }

    return routeSegments;
}

export class StationHop {
    station: METRO_STATION;
    paths: RouteSegment[];

    constructor(station: METRO_STATION, paths: RouteSegment[]) {
        this.station = station;
        this.paths = paths;
    }
}

export const metroGraph = graphService.createGraph(METRO_GRAPH);

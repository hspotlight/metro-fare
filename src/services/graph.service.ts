import PriorityQueue from "priorityqueue";
import { getFareTypeFromStationId } from "./util.service";
import { METRO_STATION, Graph, RouteSegment, Line, Intersection } from "../types";
import { METRO_GRAPH } from "../data/MetroGraph";
import { StationHop } from "../types/StationHop";

const lowestFareComparator = (stationA: StationHop, stationB: StationHop) => stationB.getFare() - stationA.getFare();
const lowestHopsComparator = (stationA: StationHop, stationB: StationHop) => stationB.getTotalHops() - stationA.getTotalHops();

export type FindRouteMethod = 'lowestFare' | 'lowestHop'

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
            if (!Object.keys(graph).includes(station)) {
                graph[station] = [];
            }
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
    findRoute(source: METRO_STATION, destination: METRO_STATION, graph: any, findRouteMethod: FindRouteMethod = 'lowestHop'): RouteSegment[] {
        const routeSegment: RouteSegment = { route: [source], fareType: getFareTypeFromStationId(source) };
        
        const comparator = findRouteMethod === 'lowestHop' ? lowestHopsComparator : lowestFareComparator; 
        const stationsToBeVisited = new PriorityQueue({ comparator });
        stationsToBeVisited.push(new StationHop(source, [routeSegment]));

        const minimumFare = Object.create({});
        minimumFare[source] = 0;

        const visitedStations = Object.create({});
        const isStationVisted = (currentStation: StationHop) => !Object.keys(visitedStations).includes(currentStation.station)

        while (stationsToBeVisited.length > 0) {
            const currentStation = stationsToBeVisited.pop() as StationHop;
            
            if (currentStation.station === destination) {
                return currentStation.paths;
            }
            
            if (isStationVisted(currentStation)) {
                visitedStations[currentStation.station] = true;

                const nextStations: METRO_STATION[]  = graph[currentStation.station];

                nextStations.forEach(nextStation => {
                    const routeSegments: RouteSegment[] = getNextStationRouteSegments(currentStation, nextStation);

                    const nextStationHop = new StationHop(nextStation, routeSegments);
                    const fare = nextStationHop.getFare();

                    if (minimumFare[nextStation] === undefined || fare < minimumFare[nextStation]) {
                        minimumFare[nextStation] = fare;
                        stationsToBeVisited.push(nextStationHop);
                    }
                });
            }
        }
        return [];
    }
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

export const metroGraph = graphService.createGraph(METRO_GRAPH);
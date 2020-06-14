import { graphService } from "../graph.service";
import { Line } from "../../types/Line";
import { MRT_BLUE_STATION } from "../../types/MetroStation";
import { Graph } from "../../types/Graph";

describe('GraphService', () => {
    describe('CreateGraph', () => {
        it('should create the graph of MRT line', () => {
            const expectedResult = {
                'LAT_PHRAO': [MRT_BLUE_STATION.RATCHADAPHISEK],
                'RATCHADAPHISEK': [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN],
                'SUTTHISAN': [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG],
                'HUAI_KHWANG': [MRT_BLUE_STATION.SUTTHISAN],
            };
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                    MRT_BLUE_STATION.SUTTHISAN,
                    MRT_BLUE_STATION.HUAI_KHWANG,
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }

            const graph = graphService.createGraph(metroGraph);

            expect(graph).toMatchObject(expectedResult);
        });
    });

    describe('FindRoute', () => {
        it('should return array of 1 station when source and destination is the same station', () => {
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.LAT_PHRAO,
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }
            const source = MRT_BLUE_STATION.LAT_PHRAO;
            const destination = MRT_BLUE_STATION.LAT_PHRAO;
            
            const graph = graphService.createGraph(metroGraph);
            const route = graphService.findRoute(source, destination, graph);

            expect(route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO]);
        });
        it('should return array of 2 station when distance between source and destination is 1 hop', () => {
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }
            const source = MRT_BLUE_STATION.LAT_PHRAO;
            const destination = MRT_BLUE_STATION.RATCHADAPHISEK;
            
            const graph = graphService.createGraph(metroGraph);
            const route = graphService.findRoute(source, destination, graph);

            expect(route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK]);
        });
        it('should return array of 2 station when distance between source and destination is 1 hop', () => {
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }
            const source = MRT_BLUE_STATION.LAT_PHRAO;
            const destination = MRT_BLUE_STATION.PHAHON_YOTHIN;
            
            const graph = graphService.createGraph(metroGraph);
            const route = graphService.findRoute(source, destination, graph);

            expect(route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.PHAHON_YOTHIN]);
        });
        it('should return array of 3 station when distance between source and destination is 2 hop', () => {
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }            
            const source = MRT_BLUE_STATION.PHAHON_YOTHIN;
            const destination = MRT_BLUE_STATION.RATCHADAPHISEK;
            
            const graph = graphService.createGraph(metroGraph);
            const route = graphService.findRoute(source, destination, graph);

            const expectedResult = [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK];
            expect(route).toMatchObject(expectedResult);
        });
        it('should return array of 4 station when distance between source and destination is 3 hop', () => {
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                    MRT_BLUE_STATION.SUTTHISAN
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }
            const source = MRT_BLUE_STATION.PHAHON_YOTHIN;
            const destination = MRT_BLUE_STATION.SUTTHISAN;
            
            const graph = graphService.createGraph(metroGraph);
            const route = graphService.findRoute(source, destination, graph);

            const expectedResult = [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.SUTTHISAN];
            expect(route).toMatchObject(expectedResult);
        });
        it('should return array of 2 station when distance between source and destination is 1 hop (cyclic graph)', () => {
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                    MRT_BLUE_STATION.SUTTHISAN
                ],
                intersections: [
                    [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.SUTTHISAN]
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }
            const source = MRT_BLUE_STATION.PHAHON_YOTHIN;
            const destination = MRT_BLUE_STATION.SUTTHISAN;
            
            const graph = graphService.createGraph(metroGraph);
            const route = graphService.findRoute(source, destination, graph);

            const expectedResult = [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.SUTTHISAN];
            expect(route).toMatchObject(expectedResult);
        });
    });
});
import GraphService from "./graph.service";
import { MRT_BLUE_STATION_ID, Line, Graph } from "../types";

describe('GraphService', () => {
    describe('CreateGraph', () => {
        it('should create the graph of MRT line', () => {
            const expectedResult = Object.create({});
            expectedResult[MRT_BLUE_STATION_ID.LAT_PHRAO] = [MRT_BLUE_STATION_ID.RATCHADAPHISEK];
            expectedResult[MRT_BLUE_STATION_ID.RATCHADAPHISEK] = [MRT_BLUE_STATION_ID.LAT_PHRAO, MRT_BLUE_STATION_ID.SUTTHISAN];
            expectedResult[MRT_BLUE_STATION_ID.SUTTHISAN] = [MRT_BLUE_STATION_ID.RATCHADAPHISEK, MRT_BLUE_STATION_ID.HUAI_KHWANG];
            expectedResult[MRT_BLUE_STATION_ID.HUAI_KHWANG] = [MRT_BLUE_STATION_ID.SUTTHISAN];

            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION_ID.LAT_PHRAO,
                    MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                    MRT_BLUE_STATION_ID.SUTTHISAN,
                    MRT_BLUE_STATION_ID.HUAI_KHWANG,
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }

            const graph = GraphService.createGraph(metroGraph);

            expect(graph).toMatchObject(expectedResult);
        });
        it('should create the graph with intersection', () => {
            const expectedResult = Object.create({});
            expectedResult[MRT_BLUE_STATION_ID.LAT_PHRAO] = [MRT_BLUE_STATION_ID.RATCHADAPHISEK, MRT_BLUE_STATION_ID.HUAI_KHWANG];
            expectedResult[MRT_BLUE_STATION_ID.RATCHADAPHISEK] = [MRT_BLUE_STATION_ID.LAT_PHRAO, MRT_BLUE_STATION_ID.SUTTHISAN];
            expectedResult[MRT_BLUE_STATION_ID.SUTTHISAN] = [MRT_BLUE_STATION_ID.RATCHADAPHISEK, MRT_BLUE_STATION_ID.HUAI_KHWANG];
            expectedResult[MRT_BLUE_STATION_ID.HUAI_KHWANG] = [MRT_BLUE_STATION_ID.SUTTHISAN, MRT_BLUE_STATION_ID.LAT_PHRAO];

            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION_ID.LAT_PHRAO,
                    MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                    MRT_BLUE_STATION_ID.SUTTHISAN,
                    MRT_BLUE_STATION_ID.HUAI_KHWANG,
                ],
                intersections: [
                    [MRT_BLUE_STATION_ID.LAT_PHRAO, MRT_BLUE_STATION_ID.HUAI_KHWANG]
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }

            const graph = GraphService.createGraph(metroGraph);

            expect(graph).toMatchObject(expectedResult);
        });
    });
});
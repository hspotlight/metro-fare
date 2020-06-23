import { graphService } from "../graph.service";
import { MRT_BLUE_STATION, BTS_SILOM_STATION, Line, Graph, RouteSegment, FareType } from "../../types";

describe('GraphService', () => {
    describe('CreateGraph', () => {
        it('should create the graph of MRT line', () => {
            const expectedResult = Object.create({});
            expectedResult[MRT_BLUE_STATION.LAT_PHRAO] = [MRT_BLUE_STATION.RATCHADAPHISEK];
            expectedResult[MRT_BLUE_STATION.RATCHADAPHISEK] = [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN];
            expectedResult[MRT_BLUE_STATION.SUTTHISAN] = [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG];
            expectedResult[MRT_BLUE_STATION.HUAI_KHWANG] = [MRT_BLUE_STATION.SUTTHISAN];
            
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
            const routeSegment = graphService.findRoute(source, destination, graph);

            expect(routeSegment[0].route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO]);
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
            const routeSegment = graphService.findRoute(source, destination, graph);

            expect(routeSegment[0].route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK]);
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
            const routeSegment = graphService.findRoute(source, destination, graph);

            expect(routeSegment[0].route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.PHAHON_YOTHIN]);
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
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult = [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK];
            expect(routeSegment[0].route).toMatchObject(expectedResult);
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
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult = [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.SUTTHISAN];
            expect(routeSegment[0].route).toMatchObject(expectedResult);
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
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult = [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.SUTTHISAN];
            expect(routeSegment[0].route).toMatchObject(expectedResult);
        });
    });

    describe('FindRoute BTS (with Extension)', () => {
        it('should return route of BTS Extension 1 station and BTS 1 station', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                        BTS_SILOM_STATION.PHO_NIMIT,
                    ],
                }],
            }
            const source = BTS_SILOM_STATION.PHO_NIMIT;
            const destination = BTS_SILOM_STATION.WONGWIAN_YAI;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION.PHO_NIMIT,
                ],
                fareType: FareType.BTS_SILOM_EXTENSION_15,
            }, {
                route: [
                    BTS_SILOM_STATION.WONGWIAN_YAI,
                ],
                fareType: FareType.BTS_SILOM
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS Extension 4 stations and BTS 1 station', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                        BTS_SILOM_STATION.PHO_NIMIT,
                        BTS_SILOM_STATION.TALAT_PHLU,
                        BTS_SILOM_STATION.WUTTHAKAT,
                        BTS_SILOM_STATION.BANG_WA,
                    ],
                }],
            }
            const source = BTS_SILOM_STATION.BANG_WA;
            const destination = BTS_SILOM_STATION.WONGWIAN_YAI;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION.BANG_WA,
                    BTS_SILOM_STATION.WUTTHAKAT,
                    BTS_SILOM_STATION.TALAT_PHLU,
                    BTS_SILOM_STATION.PHO_NIMIT,
                ],
                fareType: FareType.BTS_SILOM_EXTENSION_15,
            }, {
                route: [
                    BTS_SILOM_STATION.WONGWIAN_YAI,
                ],
                fareType: FareType.BTS_SILOM
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS Extension 4 stations and BTS 1 station', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.SURASAK,
                        BTS_SILOM_STATION.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION.KRUNG_THON_BURI,
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                        BTS_SILOM_STATION.PHO_NIMIT,
                        BTS_SILOM_STATION.TALAT_PHLU,
                        BTS_SILOM_STATION.WUTTHAKAT,
                        BTS_SILOM_STATION.BANG_WA,
                    ],
                }],
            }
            const source = BTS_SILOM_STATION.BANG_WA;
            const destination = BTS_SILOM_STATION.SURASAK;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION.BANG_WA,
                    BTS_SILOM_STATION.WUTTHAKAT,
                    BTS_SILOM_STATION.TALAT_PHLU,
                    BTS_SILOM_STATION.PHO_NIMIT,
                ],
                fareType: FareType.BTS_SILOM_EXTENSION_15,
            }, {
                route: [
                    BTS_SILOM_STATION.WONGWIAN_YAI,
                    BTS_SILOM_STATION.KRUNG_THON_BURI,
                    BTS_SILOM_STATION.SAPHAN_TAKSIN,
                    BTS_SILOM_STATION.SURASAK,
                ],
                fareType: FareType.BTS_SILOM
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
    });

    describe('FindRoute BTS-MRT', () => {
        it('should return route of BTS 1 station and MRT 1 station (interchange stations)', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.BANG_WA,
                    ],
                }, {
                    line: [
                        MRT_BLUE_STATION.BANG_WA,
                    ],
                }],
                intersections: [
                    [BTS_SILOM_STATION.BANG_WA, MRT_BLUE_STATION.BANG_WA]
                ]
            }
            const source = BTS_SILOM_STATION.BANG_WA;
            const destination = MRT_BLUE_STATION.BANG_WA;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [BTS_SILOM_STATION.BANG_WA],
                fareType: FareType.BTS_SILOM_EXTENSION_15
            }, {
                route: [MRT_BLUE_STATION.BANG_WA],
                fareType: FareType.MRT_BLUE
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS 2 hops and MRT 2 hops', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SALA_DAENG,
                    ],
                }, {
                    line: [
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.LUMPHINI,
                    ],
                }],
                intersections: [
                    [BTS_SILOM_STATION.SALA_DAENG, MRT_BLUE_STATION.SILOM]
                ]
            }
            const source = BTS_SILOM_STATION.CHONG_NONSI;
            const destination = MRT_BLUE_STATION.LUMPHINI;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [BTS_SILOM_STATION.CHONG_NONSI, BTS_SILOM_STATION.SALA_DAENG,],
                fareType: FareType.BTS_SILOM
            }, {
                route: [MRT_BLUE_STATION.SILOM, MRT_BLUE_STATION.LUMPHINI],
                fareType: FareType.MRT_BLUE
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS 6 hops and MRT 2 hops', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.PHO_NIMIT,
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                        BTS_SILOM_STATION.KRUNG_THON_BURI,
                        BTS_SILOM_STATION.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION.SURASAK,
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SALA_DAENG,
                    ],
                }, {
                    line: [
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.SAM_YAN,
                        MRT_BLUE_STATION.HUA_LAMPHONG,
                    ],
                }],
                intersections: [
                    [BTS_SILOM_STATION.SALA_DAENG, MRT_BLUE_STATION.SILOM]
                ]
            }
            const source = BTS_SILOM_STATION.PHO_NIMIT;
            const destination = MRT_BLUE_STATION.HUA_LAMPHONG;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION.PHO_NIMIT,
                ],
                fareType: FareType.BTS_SILOM_EXTENSION_15,
            }, {
                route: [
                    BTS_SILOM_STATION.WONGWIAN_YAI,
                    BTS_SILOM_STATION.KRUNG_THON_BURI,
                    BTS_SILOM_STATION.SAPHAN_TAKSIN,
                    BTS_SILOM_STATION.SURASAK,
                    BTS_SILOM_STATION.CHONG_NONSI,
                    BTS_SILOM_STATION.SALA_DAENG
                ],
                fareType: FareType.BTS_SILOM
            }, {
                route: [
                    MRT_BLUE_STATION.SILOM,
                    MRT_BLUE_STATION.SAM_YAN,
                    MRT_BLUE_STATION.HUA_LAMPHONG
                ],
                fareType: FareType.MRT_BLUE
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return the route that has minimum fare', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.SURASAK,
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SALA_DAENG,
                    ],
                }, {
                    line: [
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.SAM_YAN,
                        MRT_BLUE_STATION.HUA_LAMPHONG,
                        MRT_BLUE_STATION.WAT_MANGKON,
                        MRT_BLUE_STATION.SAM_YOT,
                        MRT_BLUE_STATION.SANAM_CHAI,
                    ],
                }],
                intersections: [
                    [BTS_SILOM_STATION.SALA_DAENG, MRT_BLUE_STATION.SILOM],
                    [BTS_SILOM_STATION.SURASAK, MRT_BLUE_STATION.SANAM_CHAI],
                ]
            }
            const source = MRT_BLUE_STATION.SILOM;
            const destination = MRT_BLUE_STATION.SANAM_CHAI;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph, 'lowestFare');

            const expectedResult: RouteSegment[] = [{
                route: [
                    MRT_BLUE_STATION.SILOM,
                    MRT_BLUE_STATION.SAM_YAN,
                    MRT_BLUE_STATION.HUA_LAMPHONG,
                    MRT_BLUE_STATION.WAT_MANGKON,
                    MRT_BLUE_STATION.SAM_YOT,
                    MRT_BLUE_STATION.SANAM_CHAI,
                ],
                fareType: FareType.MRT_BLUE
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return the route that has minimum hop', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.SURASAK,
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SALA_DAENG,
                    ],
                }, {
                    line: [
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.SAM_YAN,
                        MRT_BLUE_STATION.HUA_LAMPHONG,
                        MRT_BLUE_STATION.WAT_MANGKON,
                        MRT_BLUE_STATION.SAM_YOT,
                        MRT_BLUE_STATION.SANAM_CHAI,
                    ],
                }],
                intersections: [
                    [BTS_SILOM_STATION.SALA_DAENG, MRT_BLUE_STATION.SILOM],
                    [BTS_SILOM_STATION.SURASAK, MRT_BLUE_STATION.SANAM_CHAI],
                ]
            }
            const source = MRT_BLUE_STATION.SILOM;
            const destination = MRT_BLUE_STATION.SANAM_CHAI;

            const graph = graphService.createGraph(metroGraph);
            const routeSegment = graphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    MRT_BLUE_STATION.SILOM,
                ],
                fareType: FareType.MRT_BLUE
            }, {
                route: [
                    BTS_SILOM_STATION.SALA_DAENG,
                    BTS_SILOM_STATION.CHONG_NONSI,
                    BTS_SILOM_STATION.SURASAK,
                ],
                fareType: FareType.BTS_SILOM
            }, {
                route: [
                    MRT_BLUE_STATION.SANAM_CHAI,
                ],
                fareType: FareType.MRT_BLUE
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
    });
});
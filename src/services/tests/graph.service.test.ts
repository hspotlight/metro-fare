import GraphService from "../graph.service";
import { MRT_BLUE_STATION, BTS_SILOM_STATION, Line, Graph, RouteSegment, FareType, BTS_SUKHUMVIT_STATION } from "../../types";
import { StationHop } from "../../types/StationHop";
import { getFareTypeFromStationId } from "../util.service";

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

            const graph = GraphService.createGraph(metroGraph);

            expect(graph).toMatchObject(expectedResult);
        });
        it('should create the graph with intersection', () => {
            const expectedResult = Object.create({});
            expectedResult[MRT_BLUE_STATION.LAT_PHRAO] = [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG];
            expectedResult[MRT_BLUE_STATION.RATCHADAPHISEK] = [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN];
            expectedResult[MRT_BLUE_STATION.SUTTHISAN] = [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG];
            expectedResult[MRT_BLUE_STATION.HUAI_KHWANG] = [MRT_BLUE_STATION.SUTTHISAN, MRT_BLUE_STATION.LAT_PHRAO];

            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                    MRT_BLUE_STATION.SUTTHISAN,
                    MRT_BLUE_STATION.HUAI_KHWANG,
                ],
                intersections: [
                    [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.HUAI_KHWANG]
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }

            const graph = GraphService.createGraph(metroGraph);

            expect(graph).toMatchObject(expectedResult);
        });
    });

    describe('FindRoute MRT', () => {
        it('should return empty array when there is not possible path from source to destination', () => {
            const metroLine: Line = {
                line: [
                    MRT_BLUE_STATION.LAT_PHRAO,
                ]
            }
            const metroGraph: Graph = {
                lines: [metroLine]
            }
            const source = MRT_BLUE_STATION.LAT_PHRAO;
            const destination = MRT_BLUE_STATION.RATCHADAPHISEK;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            expect(routeSegment).toMatchObject([]);
        });
        it('should return array of 1 station when source and destination is the same station', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                    ]
                }]
            }
            const source = MRT_BLUE_STATION.LAT_PHRAO;
            const destination = MRT_BLUE_STATION.LAT_PHRAO;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [MRT_BLUE_STATION.LAT_PHRAO],
                fareType: FareType.MRT_BLUE,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return array of 2 station when distance between source and destination is 1 hop', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                    ]
                }]
            }
            const source = MRT_BLUE_STATION.LAT_PHRAO;
            const destination = MRT_BLUE_STATION.RATCHADAPHISEK;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK],
                fareType: FareType.MRT_BLUE,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return array of 2 station when distance between source and destination is 1 hop', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        MRT_BLUE_STATION.PHAHON_YOTHIN,
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                    ]
                }]
            }
            const source = MRT_BLUE_STATION.LAT_PHRAO;
            const destination = MRT_BLUE_STATION.PHAHON_YOTHIN;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.PHAHON_YOTHIN],
                fareType: FareType.MRT_BLUE,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return array of 3 station when distance between source and destination is 2 hop', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        MRT_BLUE_STATION.PHAHON_YOTHIN,
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                    ]
                }]
            }
            const source = MRT_BLUE_STATION.PHAHON_YOTHIN;
            const destination = MRT_BLUE_STATION.RATCHADAPHISEK;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK
                ],
                fareType: FareType.MRT_BLUE,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return array of 4 station when distance between source and destination is 3 hop', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        MRT_BLUE_STATION.PHAHON_YOTHIN,
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN
                    ]
                }]
            }
            const source = MRT_BLUE_STATION.PHAHON_YOTHIN;
            const destination = MRT_BLUE_STATION.SUTTHISAN;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                    MRT_BLUE_STATION.SUTTHISAN
                ],
                fareType: FareType.MRT_BLUE,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return array of 2 station when distance between source and destination is 1 hop (cyclic graph)', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        MRT_BLUE_STATION.PHAHON_YOTHIN,
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN
                    ],
                    intersections: [
                        [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.SUTTHISAN]
                    ]
                }]
            }
            const source = MRT_BLUE_STATION.PHAHON_YOTHIN;
            const destination = MRT_BLUE_STATION.SUTTHISAN;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [MRT_BLUE_STATION.PHAHON_YOTHIN, MRT_BLUE_STATION.SUTTHISAN],
                fareType: FareType.MRT_BLUE,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
    });

    describe('FindRoute BTS Silom (with Extension)', () => {
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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION.PHO_NIMIT,
                ],
                fareType: FareType.BTS_SILOM_EXTENSION_15,
            }, {
                route: [
                    BTS_SILOM_STATION.WONGWIAN_YAI,
                ],
                fareType: FareType.BTS
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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

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
                fareType: FareType.BTS
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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

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
                fareType: FareType.BTS
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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [BTS_SILOM_STATION.CHONG_NONSI, BTS_SILOM_STATION.SALA_DAENG,],
                fareType: FareType.BTS
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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

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
                fareType: FareType.BTS
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
        // minimum fare logic is not correct
        it.skip('should return the route that has minimum fare', () => {
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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

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

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

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
                fareType: FareType.BTS
            }, {
                route: [
                    MRT_BLUE_STATION.SANAM_CHAI,
                ],
                fareType: FareType.MRT_BLUE
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
    });

    describe('FindRoute BTS Silom + Sukhumvit', () => {
        it('should return route of BTS 2 stations when travel from ratchadamri to siam', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.SIAM,
                        BTS_SILOM_STATION.RATCHADAMRI,
                    ],
                }, {
                    line: [
                        BTS_SUKHUMVIT_STATION.SIAM,
                    ],
                }]
            }
            const source = BTS_SILOM_STATION.RATCHADAMRI;
            const destination = BTS_SUKHUMVIT_STATION.SIAM;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [BTS_SILOM_STATION.RATCHADAMRI, BTS_SILOM_STATION.SIAM],
                fareType: FareType.BTS
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS 3 stations when travel from ratchadamri to chit lom', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.SIAM,
                        BTS_SILOM_STATION.RATCHADAMRI,
                    ],
                }, {
                    line: [
                        BTS_SUKHUMVIT_STATION.SIAM,
                        BTS_SUKHUMVIT_STATION.CHIT_LOM
                    ],
                }]
            }
            const source = BTS_SILOM_STATION.RATCHADAMRI;
            const destination = BTS_SUKHUMVIT_STATION.CHIT_LOM;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [BTS_SILOM_STATION.RATCHADAMRI, BTS_SILOM_STATION.SIAM, BTS_SUKHUMVIT_STATION.CHIT_LOM],
                fareType: FareType.BTS
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS 5 stations when travel from sala daeng to phloen Chit', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SILOM_STATION.SIAM,
                        BTS_SILOM_STATION.RATCHADAMRI,
                        BTS_SILOM_STATION.SALA_DAENG,
                    ],
                }, {
                    line: [
                        BTS_SUKHUMVIT_STATION.SIAM,
                        BTS_SUKHUMVIT_STATION.CHIT_LOM,
                        BTS_SUKHUMVIT_STATION.PHOLEN_CHIT,
                    ],
                }]
            }
            const source = BTS_SILOM_STATION.SALA_DAENG;
            const destination = BTS_SUKHUMVIT_STATION.PHOLEN_CHIT;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION.SALA_DAENG,
                    BTS_SILOM_STATION.RATCHADAMRI,
                    BTS_SILOM_STATION.SIAM,
                    BTS_SUKHUMVIT_STATION.CHIT_LOM,
                    BTS_SUKHUMVIT_STATION.PHOLEN_CHIT
                ],
                fareType: FareType.BTS
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
    });

    describe('FindRoute BTS Sukhumvit (with Extension)', () => {
        it('should return route of BTS Sukhumvit 1 station and BTS Sukhumvit Extension 1 station', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SUKHUMVIT_STATION.ON_NUT,
                        BTS_SUKHUMVIT_STATION.BANG_CHAK,
                    ],
                }],
            }
            const source = BTS_SUKHUMVIT_STATION.ON_NUT;
            const destination = BTS_SUKHUMVIT_STATION.BANG_CHAK;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SUKHUMVIT_STATION.ON_NUT,
                ],
                fareType: FareType.BTS,
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION.BANG_CHAK,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS Sukhumvit Extension (15 baht) 1 station and BTS Extension (0 baht) 1 station', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SUKHUMVIT_STATION.BEARING,
                        BTS_SUKHUMVIT_STATION.SAMRONG,
                    ],
                }],
            }
            const source = BTS_SUKHUMVIT_STATION.BEARING;
            const destination = BTS_SUKHUMVIT_STATION.SAMRONG;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SUKHUMVIT_STATION.BEARING,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15,
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION.SAMRONG,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS Sukhumvit 1 station and BTS Sukhumvit Extension (0 baht) 1 station', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SUKHUMVIT_STATION.MO_CHIT,
                        BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO,
                    ],
                }],
            }
            const source = BTS_SUKHUMVIT_STATION.MO_CHIT;
            const destination = BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SUKHUMVIT_STATION.MO_CHIT,
                ],
                fareType: FareType.BTS,
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS Sukhumvit Extension (15 baht) 2 stations', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SUKHUMVIT_STATION.BANG_CHAK,
                        BTS_SUKHUMVIT_STATION.PUNNAWITHI,
                    ],
                }],
            }
            const source = BTS_SUKHUMVIT_STATION.BANG_CHAK;
            const destination = BTS_SUKHUMVIT_STATION.PUNNAWITHI;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SUKHUMVIT_STATION.BANG_CHAK,
                    BTS_SUKHUMVIT_STATION.PUNNAWITHI,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS Sukhumvit 1 station and BTS Sukhumvit Extension (15 baht) 4 stations', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SUKHUMVIT_STATION.ON_NUT,
                        BTS_SUKHUMVIT_STATION.BANG_CHAK,
                        BTS_SUKHUMVIT_STATION.PUNNAWITHI,
                        BTS_SUKHUMVIT_STATION.UDOM_SUK,
                        BTS_SUKHUMVIT_STATION.BANG_NA,
                    ],
                }],
            }
            const source = BTS_SUKHUMVIT_STATION.ON_NUT;
            const destination = BTS_SUKHUMVIT_STATION.BANG_NA;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SUKHUMVIT_STATION.ON_NUT,
                ],
                fareType: FareType.BTS
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION.BANG_CHAK,
                    BTS_SUKHUMVIT_STATION.PUNNAWITHI,
                    BTS_SUKHUMVIT_STATION.UDOM_SUK,
                    BTS_SUKHUMVIT_STATION.BANG_NA,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
        it('should return route of BTS Sukhumvit Extension (15 baht) 2 station and BTS Sukhumvit Extension (0 baht) 9 stations', () => {
            const metroGraph: Graph = {
                lines: [{
                    line: [
                        BTS_SUKHUMVIT_STATION.BANG_NA,
                        BTS_SUKHUMVIT_STATION.BEARING,
                        BTS_SUKHUMVIT_STATION.SAMRONG,
                        BTS_SUKHUMVIT_STATION.PU_CHAO,
                        BTS_SUKHUMVIT_STATION.CHANG_ERAWAN,
                        BTS_SUKHUMVIT_STATION.ROYAL_THAI_NAVAL_ACADEMY,
                        BTS_SUKHUMVIT_STATION.PAK_NAM,
                        BTS_SUKHUMVIT_STATION.SRINAGARINDRA,
                        BTS_SUKHUMVIT_STATION.PHRAEK_SA,
                        BTS_SUKHUMVIT_STATION.SAI_LUAT,
                        BTS_SUKHUMVIT_STATION.KHEHA,
                    ],
                }],
            }
            const source = BTS_SUKHUMVIT_STATION.BANG_NA;
            const destination = BTS_SUKHUMVIT_STATION.KHEHA;

            const graph = GraphService.createGraph(metroGraph);
            const routeSegment = GraphService.findRoute(source, destination, graph);

            const expectedResult: RouteSegment[] = [{
                route: [
                    BTS_SUKHUMVIT_STATION.BANG_NA,
                    BTS_SUKHUMVIT_STATION.BEARING,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15,
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION.SAMRONG,
                    BTS_SUKHUMVIT_STATION.PU_CHAO,
                    BTS_SUKHUMVIT_STATION.CHANG_ERAWAN,
                    BTS_SUKHUMVIT_STATION.ROYAL_THAI_NAVAL_ACADEMY,
                    BTS_SUKHUMVIT_STATION.PAK_NAM,
                    BTS_SUKHUMVIT_STATION.SRINAGARINDRA,
                    BTS_SUKHUMVIT_STATION.PHRAEK_SA,
                    BTS_SUKHUMVIT_STATION.SAI_LUAT,
                    BTS_SUKHUMVIT_STATION.KHEHA,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0,
            }]
            expect(routeSegment).toMatchObject(expectedResult);
        });
    });
    describe('getNextStationRouteSegments', () => {
        const source = MRT_BLUE_STATION.CHATUCHAK_PARK;
        const routeSegment = { route: [source], fareType: getFareTypeFromStationId(source) };
        it('should return MRT route segment with two stations (same fareType)', () => {
            const currentStationHop = new StationHop(source, [routeSegment])
            const nextStation = MRT_BLUE_STATION.FAI_CHAI;

            const newRouteSegments = GraphService.getNextStationRouteSegments(currentStationHop, nextStation);

            expect(newRouteSegments).toMatchObject([{
                ...routeSegment,
                route: [
                    ...routeSegment.route,
                    nextStation
                ]
            }]);
        });
        it('should return MRT route segment and BTS route segment (different fareType)', () => {
            const currentStationHop = new StationHop(source, [routeSegment])
            const nextStation = BTS_SUKHUMVIT_STATION.NANA;

            const newRouteSegments = GraphService.getNextStationRouteSegments(currentStationHop, nextStation);

            expect(newRouteSegments).toMatchObject([routeSegment, {
                route: [BTS_SUKHUMVIT_STATION.NANA],
                fareType: FareType.BTS
            }]);
        });
    });
});
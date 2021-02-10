import NavigationService from "./navigation.service";
import GraphService from "./graph.service";
import { MRT_BLUE_STATION_ID, BTS_SILOM_STATION_ID, Line, Graph, RouteSegment, BTS_SUKHUMVIT_STATION_ID, LineType } from "../types";
import { MRT_BLUE_LINE } from "../data";
import { cloneDeep } from "lodash";

describe('NavigationService', () => {
    describe('getNextStationRouteSegments', () => {
        const routeSegment: RouteSegment = { route: [MRT_BLUE_STATION_ID.CHATUCHAK_PARK], lineType: LineType.MRT_BLUE };
        it('should return MRT route segment with two stations (same lineType)', () => {
            const nextStation = MRT_BLUE_STATION_ID.FAI_CHAI;
            const routeSegments = cloneDeep([routeSegment]);

            const newRouteSegments = NavigationService.getNextStationRouteSegments(routeSegments, nextStation);

            expect(newRouteSegments).toMatchObject([{
                ...routeSegment,
                route: [
                    ...routeSegment.route,
                    nextStation
                ]
            }]);
        });
        it('should return MRT route segment and BTS route segment (different lineType)', () => {
            const nextStation = BTS_SUKHUMVIT_STATION_ID.NANA;
            const routeSegments = cloneDeep([routeSegment]);

            const newRouteSegments = NavigationService.getNextStationRouteSegments(routeSegments, nextStation);

            expect(newRouteSegments).toMatchObject([routeSegment, {
                route: [BTS_SUKHUMVIT_STATION_ID.NANA],
                lineType: LineType.BTS
            }]);
        });
    });
    describe('findAllRoutes', () => {
        describe('FindRoute MRT', () => {
            it('should return empty array when there is not possible path from source to destination', () => {
                const metroLine: Line = {
                    line: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                    ]
                }
                const metroGraph: Graph = {
                    lines: [metroLine]
                }
                const source = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const destination = MRT_BLUE_STATION_ID.RATCHADAPHISEK;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                expect(routeSegments).toMatchObject([]);
            });
            it('should return array of 1 station when source and destination is the same station', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            MRT_BLUE_STATION_ID.LAT_PHRAO,
                        ]
                    }]
                }
                const source = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const destination = MRT_BLUE_STATION_ID.LAT_PHRAO;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.LAT_PHRAO],
                    lineType: LineType.MRT_BLUE,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return array of 2 station when distance between source and destination is 1 hop', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            MRT_BLUE_STATION_ID.LAT_PHRAO,
                            MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        ]
                    }]
                }
                const source = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const destination = MRT_BLUE_STATION_ID.RATCHADAPHISEK;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.LAT_PHRAO, MRT_BLUE_STATION_ID.RATCHADAPHISEK],
                    lineType: LineType.MRT_BLUE,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return array of 2 station when distance between source and destination is 1 hop', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                            MRT_BLUE_STATION_ID.LAT_PHRAO,
                            MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        ]
                    }]
                }
                const source = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const destination = MRT_BLUE_STATION_ID.PHAHON_YOTHIN;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.LAT_PHRAO, MRT_BLUE_STATION_ID.PHAHON_YOTHIN],
                    lineType: LineType.MRT_BLUE,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return array of 3 station when distance between source and destination is 2 hop', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                            MRT_BLUE_STATION_ID.LAT_PHRAO,
                            MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        ]
                    }]
                }
                const source = MRT_BLUE_STATION_ID.PHAHON_YOTHIN;
                const destination = MRT_BLUE_STATION_ID.RATCHADAPHISEK;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK
                    ],
                    lineType: LineType.MRT_BLUE,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return array of 4 station when distance between source and destination is 3 hop', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                            MRT_BLUE_STATION_ID.LAT_PHRAO,
                            MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                            MRT_BLUE_STATION_ID.SUTTHISAN
                        ]
                    }]
                }
                const source = MRT_BLUE_STATION_ID.PHAHON_YOTHIN;
                const destination = MRT_BLUE_STATION_ID.SUTTHISAN;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN
                    ],
                    lineType: LineType.MRT_BLUE,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return array of 2 station when distance between source and destination is 1 hop (cyclic graph)', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                            MRT_BLUE_STATION_ID.LAT_PHRAO,
                            MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                            MRT_BLUE_STATION_ID.SUTTHISAN
                        ],
                        intersections: [
                            [MRT_BLUE_STATION_ID.PHAHON_YOTHIN, MRT_BLUE_STATION_ID.SUTTHISAN]
                        ]
                    }]
                }
                const source = MRT_BLUE_STATION_ID.PHAHON_YOTHIN;
                const destination = MRT_BLUE_STATION_ID.SUTTHISAN;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.PHAHON_YOTHIN, MRT_BLUE_STATION_ID.SUTTHISAN],
                    lineType: LineType.MRT_BLUE,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
        });

        describe('FindRoute BTS Silom (with Extension)', () => {
            it('should return route of BTS Extension 1 station and BTS 1 station', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                            BTS_SILOM_STATION_ID.PHO_NIMIT,
                        ],
                    }],
                }
                const source = BTS_SILOM_STATION_ID.PHO_NIMIT;
                const destination = BTS_SILOM_STATION_ID.WONGWIAN_YAI;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                    ],
                    lineType: LineType.BTS
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS Extension 4 stations and BTS 1 station', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                            BTS_SILOM_STATION_ID.PHO_NIMIT,
                            BTS_SILOM_STATION_ID.TALAT_PHLU,
                            BTS_SILOM_STATION_ID.WUTTHAKAT,
                            BTS_SILOM_STATION_ID.BANG_WA,
                        ],
                    }],
                }
                const source = BTS_SILOM_STATION_ID.BANG_WA;
                const destination = BTS_SILOM_STATION_ID.WONGWIAN_YAI;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.BANG_WA,
                        BTS_SILOM_STATION_ID.WUTTHAKAT,
                        BTS_SILOM_STATION_ID.TALAT_PHLU,
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                    ],
                    lineType: LineType.BTS
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS Extension 4 stations and BTS 1 station', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.SURASAK,
                            BTS_SILOM_STATION_ID.SAPHAN_TAKSIN,
                            BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                            BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                            BTS_SILOM_STATION_ID.PHO_NIMIT,
                            BTS_SILOM_STATION_ID.TALAT_PHLU,
                            BTS_SILOM_STATION_ID.WUTTHAKAT,
                            BTS_SILOM_STATION_ID.BANG_WA,
                        ],
                    }],
                }
                const source = BTS_SILOM_STATION_ID.BANG_WA;
                const destination = BTS_SILOM_STATION_ID.SURASAK;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.BANG_WA,
                        BTS_SILOM_STATION_ID.WUTTHAKAT,
                        BTS_SILOM_STATION_ID.TALAT_PHLU,
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                        BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                        BTS_SILOM_STATION_ID.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION_ID.SURASAK,
                    ],
                    lineType: LineType.BTS
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
        });

        describe('FindRoute BTS-MRT', () => {
            it('should return route of BTS 1 station and MRT 1 station (interchange stations)', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.BANG_WA,
                        ],
                    }, {
                        line: [
                            MRT_BLUE_STATION_ID.BANG_WA,
                        ],
                    }],
                    intersections: [
                        [BTS_SILOM_STATION_ID.BANG_WA, MRT_BLUE_STATION_ID.BANG_WA]
                    ]
                }
                const source = BTS_SILOM_STATION_ID.BANG_WA;
                const destination = MRT_BLUE_STATION_ID.BANG_WA;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.BANG_WA],
                    lineType: LineType.BTS
                }, {
                    route: [MRT_BLUE_STATION_ID.BANG_WA],
                    lineType: LineType.MRT_BLUE
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS 2 hops and MRT 2 hops', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.CHONG_NONSI,
                            BTS_SILOM_STATION_ID.SALA_DAENG,
                        ],
                    }, {
                        line: [
                            MRT_BLUE_STATION_ID.SILOM,
                            MRT_BLUE_STATION_ID.LUMPHINI,
                        ],
                    }],
                    intersections: [
                        [BTS_SILOM_STATION_ID.SALA_DAENG, MRT_BLUE_STATION_ID.SILOM]
                    ]
                }
                const source = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const destination = MRT_BLUE_STATION_ID.LUMPHINI;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI, BTS_SILOM_STATION_ID.SALA_DAENG,],
                    lineType: LineType.BTS
                }, {
                    route: [MRT_BLUE_STATION_ID.SILOM, MRT_BLUE_STATION_ID.LUMPHINI],
                    lineType: LineType.MRT_BLUE
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS 6 hops and MRT 2 hops', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.PHO_NIMIT,
                            BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                            BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                            BTS_SILOM_STATION_ID.SAPHAN_TAKSIN,
                            BTS_SILOM_STATION_ID.SURASAK,
                            BTS_SILOM_STATION_ID.CHONG_NONSI,
                            BTS_SILOM_STATION_ID.SALA_DAENG,
                        ],
                    }, {
                        line: [
                            MRT_BLUE_STATION_ID.SILOM,
                            MRT_BLUE_STATION_ID.SAM_YAN,
                            MRT_BLUE_STATION_ID.HUA_LAMPHONG,
                        ],
                    }],
                    intersections: [
                        [BTS_SILOM_STATION_ID.SALA_DAENG, MRT_BLUE_STATION_ID.SILOM]
                    ]
                }
                const source = BTS_SILOM_STATION_ID.PHO_NIMIT;
                const destination = MRT_BLUE_STATION_ID.HUA_LAMPHONG;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                        BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                        BTS_SILOM_STATION_ID.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION_ID.SURASAK,
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SALA_DAENG
                    ],
                    lineType: LineType.BTS
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                        MRT_BLUE_STATION_ID.SAM_YAN,
                        MRT_BLUE_STATION_ID.HUA_LAMPHONG
                    ],
                    lineType: LineType.MRT_BLUE
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return the route that has minimum hop', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.SURASAK,
                            BTS_SILOM_STATION_ID.CHONG_NONSI,
                            BTS_SILOM_STATION_ID.SALA_DAENG,
                        ],
                    }, {
                        line: [
                            MRT_BLUE_STATION_ID.SILOM,
                            MRT_BLUE_STATION_ID.SAM_YAN,
                            MRT_BLUE_STATION_ID.HUA_LAMPHONG,
                            MRT_BLUE_STATION_ID.WAT_MANGKON,
                            MRT_BLUE_STATION_ID.SAM_YOT,
                            MRT_BLUE_STATION_ID.SANAM_CHAI,
                        ],
                    }],
                    intersections: [
                        [BTS_SILOM_STATION_ID.SALA_DAENG, MRT_BLUE_STATION_ID.SILOM],
                        [BTS_SILOM_STATION_ID.SURASAK, MRT_BLUE_STATION_ID.SANAM_CHAI],
                    ]
                }
                const source = MRT_BLUE_STATION_ID.SILOM;
                const destination = MRT_BLUE_STATION_ID.SANAM_CHAI;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                    ],
                    lineType: LineType.MRT_BLUE
                }, {
                    route: [
                        BTS_SILOM_STATION_ID.SALA_DAENG,
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SURASAK,
                    ],
                    lineType: LineType.BTS
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SANAM_CHAI,
                    ],
                    lineType: LineType.MRT_BLUE
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
        });

        describe('FindRoute BTS Silom + Sukhumvit', () => {
            it('should return route of BTS 2 stations when travel from ratchadamri to siam', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.SIAM,
                            BTS_SILOM_STATION_ID.RATCHADAMRI,
                        ],
                    }, {
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.SIAM,
                        ],
                    }]
                }
                const source = BTS_SILOM_STATION_ID.RATCHADAMRI;
                const destination = BTS_SUKHUMVIT_STATION_ID.SIAM;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.RATCHADAMRI, BTS_SILOM_STATION_ID.SIAM],
                    lineType: LineType.BTS
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS 3 stations when travel from ratchadamri to chit lom', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.SIAM,
                            BTS_SILOM_STATION_ID.RATCHADAMRI,
                        ],
                    }, {
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.SIAM,
                            BTS_SUKHUMVIT_STATION_ID.CHIT_LOM
                        ],
                    }]
                }
                const source = BTS_SILOM_STATION_ID.RATCHADAMRI;
                const destination = BTS_SUKHUMVIT_STATION_ID.CHIT_LOM;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.RATCHADAMRI, BTS_SILOM_STATION_ID.SIAM, BTS_SUKHUMVIT_STATION_ID.CHIT_LOM],
                    lineType: LineType.BTS
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS 5 stations when travel from sala daeng to phloen Chit', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SILOM_STATION_ID.SIAM,
                            BTS_SILOM_STATION_ID.RATCHADAMRI,
                            BTS_SILOM_STATION_ID.SALA_DAENG,
                        ],
                    }, {
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.SIAM,
                            BTS_SUKHUMVIT_STATION_ID.CHIT_LOM,
                            BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT,
                        ],
                    }]
                }
                const source = BTS_SILOM_STATION_ID.SALA_DAENG;
                const destination = BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.SALA_DAENG,
                        BTS_SILOM_STATION_ID.RATCHADAMRI,
                        BTS_SILOM_STATION_ID.SIAM,
                        BTS_SUKHUMVIT_STATION_ID.CHIT_LOM,
                        BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT
                    ],
                    lineType: LineType.BTS
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
        });

        describe('FindRoute BTS Sukhumvit (with Extension)', () => {
            it('should return route of BTS Sukhumvit 1 station and BTS Sukhumvit Extension 1 station', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                            BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                        ],
                    }],
                }
                const source = BTS_SUKHUMVIT_STATION_ID.ON_NUT;
                const destination = BTS_SUKHUMVIT_STATION_ID.BANG_CHAK;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                        BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                    ],
                    lineType: LineType.BTS
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS Sukhumvit Extension (15 baht) 1 station and BTS Extension (0 baht) 1 station', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.BEARING,
                            BTS_SUKHUMVIT_STATION_ID.SAMRONG,
                        ],
                    }],
                }
                const source = BTS_SUKHUMVIT_STATION_ID.BEARING;
                const destination = BTS_SUKHUMVIT_STATION_ID.SAMRONG;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BEARING,
                        BTS_SUKHUMVIT_STATION_ID.SAMRONG,
                    ],
                    lineType: LineType.BTS,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS Sukhumvit 1 station and BTS Sukhumvit Extension (0 baht) 1 station', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                            BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO,
                        ],
                    }],
                }
                const source = BTS_SUKHUMVIT_STATION_ID.MO_CHIT;
                const destination = BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                        BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO,
                    ],
                    lineType: LineType.BTS,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS Sukhumvit Extension (15 baht) 2 stations', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                            BTS_SUKHUMVIT_STATION_ID.PUNNAWITHI,
                        ],
                    }],
                }
                const source = BTS_SUKHUMVIT_STATION_ID.BANG_CHAK;
                const destination = BTS_SUKHUMVIT_STATION_ID.PUNNAWITHI;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                        BTS_SUKHUMVIT_STATION_ID.PUNNAWITHI,
                    ],
                    lineType: LineType.BTS,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS Sukhumvit 1 station and BTS Sukhumvit Extension (15 baht) 4 stations', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                            BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                            BTS_SUKHUMVIT_STATION_ID.PUNNAWITHI,
                            BTS_SUKHUMVIT_STATION_ID.UDOM_SUK,
                            BTS_SUKHUMVIT_STATION_ID.BANG_NA,
                        ],
                    }],
                }
                const source = BTS_SUKHUMVIT_STATION_ID.ON_NUT;
                const destination = BTS_SUKHUMVIT_STATION_ID.BANG_NA;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                        BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                        BTS_SUKHUMVIT_STATION_ID.PUNNAWITHI,
                        BTS_SUKHUMVIT_STATION_ID.UDOM_SUK,
                        BTS_SUKHUMVIT_STATION_ID.BANG_NA,
                    ],
                    lineType: LineType.BTS,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
            it('should return route of BTS Sukhumvit Extension (15 baht) 2 station and BTS Sukhumvit Extension (0 baht) 9 stations', () => {
                const metroGraph: Graph = {
                    lines: [{
                        line: [
                            BTS_SUKHUMVIT_STATION_ID.BANG_NA,
                            BTS_SUKHUMVIT_STATION_ID.BEARING,
                            BTS_SUKHUMVIT_STATION_ID.SAMRONG,
                            BTS_SUKHUMVIT_STATION_ID.PU_CHAO,
                            BTS_SUKHUMVIT_STATION_ID.CHANG_ERAWAN,
                            BTS_SUKHUMVIT_STATION_ID.ROYAL_THAI_NAVAL_ACADEMY,
                            BTS_SUKHUMVIT_STATION_ID.PAK_NAM,
                            BTS_SUKHUMVIT_STATION_ID.SRINAGARINDRA,
                            BTS_SUKHUMVIT_STATION_ID.PHRAEK_SA,
                            BTS_SUKHUMVIT_STATION_ID.SAI_LUAT,
                            BTS_SUKHUMVIT_STATION_ID.KHEHA,
                        ],
                    }],
                }
                const source = BTS_SUKHUMVIT_STATION_ID.BANG_NA;
                const destination = BTS_SUKHUMVIT_STATION_ID.KHEHA;

                const graph = GraphService.createGraph(metroGraph);
                const routeSegments = NavigationService.findAllRoutes(source, destination, graph);

                const expectedResult: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_NA,
                        BTS_SUKHUMVIT_STATION_ID.BEARING,
                        BTS_SUKHUMVIT_STATION_ID.SAMRONG,
                        BTS_SUKHUMVIT_STATION_ID.PU_CHAO,
                        BTS_SUKHUMVIT_STATION_ID.CHANG_ERAWAN,
                        BTS_SUKHUMVIT_STATION_ID.ROYAL_THAI_NAVAL_ACADEMY,
                        BTS_SUKHUMVIT_STATION_ID.PAK_NAM,
                        BTS_SUKHUMVIT_STATION_ID.SRINAGARINDRA,
                        BTS_SUKHUMVIT_STATION_ID.PHRAEK_SA,
                        BTS_SUKHUMVIT_STATION_ID.SAI_LUAT,
                        BTS_SUKHUMVIT_STATION_ID.KHEHA,
                    ],
                    lineType: LineType.BTS,
                }]
                expect(routeSegments[0]).toMatchObject(expectedResult);
            });
        });
        it('should return two routes from CHARAN_13 to THAPHRA (any two station pair in MRT line)', () => {
            const source = MRT_BLUE_STATION_ID.CHARAN_13;
            const destination = MRT_BLUE_STATION_ID.THAPHRA;
            const graph = GraphService.createGraph({
                lines: [MRT_BLUE_LINE]
            });
            const routeSegmentslist: RouteSegment[][] = [
                [{
                    route: [
                        MRT_BLUE_STATION_ID.CHARAN_13,
                        MRT_BLUE_STATION_ID.THAPHRA
                    ],
                    lineType: LineType.MRT_BLUE,
                }],
                [{
                    route: [
                        MRT_BLUE_STATION_ID.CHARAN_13,
                        MRT_BLUE_STATION_ID.FAI_CHAI,
                        MRT_BLUE_STATION_ID.BANG_KHUN_NON,
                        MRT_BLUE_STATION_ID.BANG_YI_KHAN,
                        MRT_BLUE_STATION_ID.SIRINDHORN,
                        MRT_BLUE_STATION_ID.BANG_PHLAT,
                        MRT_BLUE_STATION_ID.BANG_O,
                        MRT_BLUE_STATION_ID.BANG_PHO,
                        MRT_BLUE_STATION_ID.TAO_POON,
                        MRT_BLUE_STATION_ID.BANG_SUE,
                        MRT_BLUE_STATION_ID.KAMPHAENG_PHET,
                        MRT_BLUE_STATION_ID.CHATUCHAK_PARK,
                        MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                        MRT_BLUE_STATION_ID.HUAI_KHWANG,
                        MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE,
                        MRT_BLUE_STATION_ID.PHRA_RAM_9,
                        MRT_BLUE_STATION_ID.PHETCHABURI,
                        MRT_BLUE_STATION_ID.SUKHUMVIT,
                        MRT_BLUE_STATION_ID.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE,
                        MRT_BLUE_STATION_ID.KHLONG_TOEI,
                        MRT_BLUE_STATION_ID.LUMPHINI,
                        MRT_BLUE_STATION_ID.SILOM,
                        MRT_BLUE_STATION_ID.SAM_YAN,
                        MRT_BLUE_STATION_ID.HUA_LAMPHONG,
                        MRT_BLUE_STATION_ID.WAT_MANGKON,
                        MRT_BLUE_STATION_ID.SAM_YOT,
                        MRT_BLUE_STATION_ID.SANAM_CHAI,
                        MRT_BLUE_STATION_ID.ITSARAPHAP,
                        MRT_BLUE_STATION_ID.THAPHRA
                    ],
                    lineType: LineType.MRT_BLUE,
                }]];

            const routes = NavigationService.findAllRoutes(source, destination, graph);

            expect(routes).toMatchObject(routeSegmentslist);
        });
    });
});
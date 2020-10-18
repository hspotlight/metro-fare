import FareService from '../fare.service';
import { MRT_BLUE_STATION, BTS_SILOM_STATION, RouteSegment, FareType, BTS_SUKHUMVIT_STATION, TravelRoute, LineType } from '../../types';
import { graphService } from '../graph.service';
import { mocked } from 'ts-jest/dist/utils/testing';

jest.mock('../graph.service')

describe('FareService', () => {

    describe('getTravelRouteFromRouteSegments', () => {
        const expectTravelRoute = (travelRoute: TravelRoute, routeSegments: RouteSegment[], totalFare: number) => {
            routeSegments.forEach((routeSegment, index) => {
                expect(travelRoute.route[index].route).toBe(routeSegment.route);
            })
            expect(travelRoute.fare).toBe(totalFare);
        }

        describe('MRT Blue line', () => {
            it('should return 16 when source and destination are the same station', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION.LAT_PHRAO],
                    fareType: FareType.MRT_BLUE,
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.LAT_PHRAO;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);
                expectTravelRoute(travelRoute, routeSegments, 16);
            });
            it('should return 16 when distance from source-destination is 1 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK],
                    fareType: FareType.MRT_BLUE,
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.RATCHADAPHISEK;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 16);
            });
            it('should return 16 when distance from source-destination is 1 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION.CHARAN_13, MRT_BLUE_STATION.THAPHRA],
                    fareType: FareType.MRT_BLUE,
                }];
                const source = MRT_BLUE_STATION.CHARAN_13;
                const destination = MRT_BLUE_STATION.THAPHRA;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 16);
            });
            it('should return 19 when distance from source-destination is 2 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.SUTTHISAN;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 19);
            });

            it('should return 21 when distance from source-destination is 3 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN,
                        MRT_BLUE_STATION.HUAI_KHWANG,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.HUAI_KHWANG;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 21);
            });
            it('should return 23 when distance from source-destination is 4 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN,
                        MRT_BLUE_STATION.HUAI_KHWANG,
                        MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 23);
            });
            it('should return 25 when distance from source-destination is 5 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN,
                        MRT_BLUE_STATION.HUAI_KHWANG,
                        MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE,
                        MRT_BLUE_STATION.PHRA_RAM_9,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.PHRA_RAM_9;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 25);
            });
            it('should return 42 when distance from source-destination is 13 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN,
                        MRT_BLUE_STATION.HUAI_KHWANG,
                        MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE,
                        MRT_BLUE_STATION.PHRA_RAM_9,
                        MRT_BLUE_STATION.PHETCHABURI,
                        MRT_BLUE_STATION.SUKHUMVIT,
                        MRT_BLUE_STATION.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE,
                        MRT_BLUE_STATION.KHLONG_TOEI,
                        MRT_BLUE_STATION.LUMPHINI,
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.SAM_YAN,
                        MRT_BLUE_STATION.HUA_LAMPHONG,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.HUA_LAMPHONG;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 42);
            });
            it('should return 42 when distance from source-destination more than 13 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION.LAT_PHRAO,
                        MRT_BLUE_STATION.RATCHADAPHISEK,
                        MRT_BLUE_STATION.SUTTHISAN,
                        MRT_BLUE_STATION.HUAI_KHWANG,
                        MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE,
                        MRT_BLUE_STATION.PHRA_RAM_9,
                        MRT_BLUE_STATION.PHETCHABURI,
                        MRT_BLUE_STATION.SUKHUMVIT,
                        MRT_BLUE_STATION.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE,
                        MRT_BLUE_STATION.KHLONG_TOEI,
                        MRT_BLUE_STATION.LUMPHINI,
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.SAM_YAN,
                        MRT_BLUE_STATION.HUA_LAMPHONG,
                        MRT_BLUE_STATION.WAT_MANGKON,
                        MRT_BLUE_STATION.SANAM_CHAI
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const source = MRT_BLUE_STATION.LAT_PHRAO;
                const destination = MRT_BLUE_STATION.SANAM_CHAI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 42);
            });
        });
        describe('BTS Silom line', () => {
            it('should return 16 when source and destination are the same station', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION.CHONG_NONSI],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = BTS_SILOM_STATION.CHONG_NONSI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 16);
            });
            it('should return 23 when travel from CHONG_NONSI to SURASUK (have one station in middle)', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SUKSA_WITTHAYA,
                        BTS_SILOM_STATION.SURASAK
                    ],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = BTS_SILOM_STATION.SURASAK;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 23);
            });
            it('should return 16 when distance from source-destination is 1 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION.CHONG_NONSI, BTS_SILOM_STATION.SALA_DAENG],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = BTS_SILOM_STATION.SALA_DAENG;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 16);
            });
            it('should return 23 when distance from source-destination is 2 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION.CHONG_NONSI, BTS_SILOM_STATION.SALA_DAENG, BTS_SILOM_STATION.RATCHADAMRI],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = BTS_SILOM_STATION.RATCHADAMRI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 23);
            });
            it('should return 37 when distance from source-destination is 6 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SURASAK,
                        BTS_SILOM_STATION.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION.KRUNG_THON_BURI,
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                        BTS_SILOM_STATION.PHO_NIMIT,
                        BTS_SILOM_STATION.TALAT_PHLU
                    ],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = BTS_SILOM_STATION.TALAT_PHLU;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 37);
            });
            it('should return 15 when travel from Wongwian Yai to Pho Nimit', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SILOM_STATION.PHO_NIMIT,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const source = BTS_SILOM_STATION.WONGWIAN_YAI;
                const destination = BTS_SILOM_STATION.PHO_NIMIT;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 15);
            });
            it('should return 31 when travel from Phra Khanong to Pho Nimit', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.KRUNG_THON_BURI,
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SILOM_STATION.PHO_NIMIT,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const source = BTS_SILOM_STATION.KRUNG_THON_BURI;
                const destination = BTS_SILOM_STATION.PHO_NIMIT;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 31);
            });
        });

        describe('BTS Sukhumvit line', () => {
            it('should return 26 when distance from source-destination is 2 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION.RATCHADAMRI, BTS_SILOM_STATION.SIAM, BTS_SUKHUMVIT_STATION.CHIT_LOM],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SILOM_STATION.RATCHADAMRI;
                const destination = BTS_SUKHUMVIT_STATION.CHIT_LOM;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 23);
            });
            it('should return 30 when distance from source-destination is 4 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.SALA_DAENG,
                        BTS_SILOM_STATION.RATCHADAMRI,
                        BTS_SILOM_STATION.SIAM,
                        BTS_SUKHUMVIT_STATION.CHIT_LOM,
                        BTS_SUKHUMVIT_STATION.PHOLEN_CHIT,
                    ],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SILOM_STATION.SALA_DAENG;
                const destination = BTS_SUKHUMVIT_STATION.PHOLEN_CHIT;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 30);
            });
            it('should return 15 when travel from On Nut to Bang chak', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION.ON_NUT,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION.BANG_CHAK,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const source = BTS_SUKHUMVIT_STATION.ON_NUT;
                const destination = BTS_SUKHUMVIT_STATION.BANG_CHAK;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 15);
            });
            it('should return 31 when travel from Phra Khanong to Bang chak', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION.PHRA_KHANONG,
                        BTS_SUKHUMVIT_STATION.ON_NUT,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION.BANG_CHAK,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const source = BTS_SUKHUMVIT_STATION.ON_NUT;
                const destination = BTS_SUKHUMVIT_STATION.BANG_CHAK;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 31);
            });
            it('should return 15 when travel from Bang Na to Sam Rong', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION.BANG_NA,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION.SAMRONG,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0
                }];
                const source = BTS_SUKHUMVIT_STATION.BANG_NA;
                const destination = BTS_SUKHUMVIT_STATION.SAMRONG;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 15);
            });
            it('should return 16 when travel from Saphan Khwai to Ha Yaek Lat Phrao', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION.SAPHAN_KHWAI,
                        BTS_SUKHUMVIT_STATION.MO_CHIT,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0
                }];
                const source = BTS_SUKHUMVIT_STATION.SAPHAN_KHWAI;
                const destination = BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 16);
            });
            it('should return 23 when travel from Saphan Khwai to Ari', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION.SAPHAN_KHWAI,
                        BTS_SUKHUMVIT_STATION.SENA_RUAM,
                        BTS_SUKHUMVIT_STATION.ARI,
                    ],
                    fareType: FareType.BTS,
                }];
                const source = BTS_SUKHUMVIT_STATION.SAPHAN_KHWAI;
                const destination = BTS_SUKHUMVIT_STATION.ARI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 23);
            });
        });
        describe('MRT-BTS Silom', () => {
            it('should return 0 when no hops for BTS and MRT (just walking)', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION.BANG_WA],
                    fareType: FareType.BTS
                }, {
                    route: [MRT_BLUE_STATION.BANG_WA],
                    fareType: FareType.MRT_BLUE
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = MRT_BLUE_STATION.LUMPHINI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 0);
            });
            it('should return 16 when 1 hops for BTS and stop at MRT without traverse', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SALA_DAENG
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION.SILOM,
                    ],
                    fareType: FareType.MRT_BLUE,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = MRT_BLUE_STATION.LUMPHINI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 16);
            });
            it('should return 32 when 1 hops for BTS and 1 hops for MRT', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SALA_DAENG
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.LUMPHINI
                    ],
                    fareType: FareType.MRT_BLUE,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = MRT_BLUE_STATION.LUMPHINI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 32);
            });
            it('should return 56 when 6 hops for BTS and 2 hops for MRT', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION.PHO_NIMIT,
                        BTS_SILOM_STATION.WONGWIAN_YAI,
                        BTS_SILOM_STATION.KRUNG_THON_BURI,
                        BTS_SILOM_STATION.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION.SURASAK,
                        BTS_SILOM_STATION.CHONG_NONSI,
                        BTS_SILOM_STATION.SALA_DAENG,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION.SILOM,
                        MRT_BLUE_STATION.SAM_YAN,
                        MRT_BLUE_STATION.HUA_LAMPHONG,
                    ],
                    fareType: FareType.MRT_BLUE,
                }];
                const source = BTS_SILOM_STATION.CHONG_NONSI;
                const destination = MRT_BLUE_STATION.LUMPHINI;

                const travelRoute = FareService.getTravelRouteFromRouteSegments(routeSegments, source, destination);

                expectTravelRoute(travelRoute, routeSegments, 56);
            });
        });
    });
    describe('findAllRoutes', () => {
        it('should return a single route from CHONG_NONSI to LUMPHINI', () => {
            const routeSegments: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION.CHONG_NONSI,
                    BTS_SILOM_STATION.SALA_DAENG
                ],
                fareType: FareType.BTS,
            }, {
                route: [
                    MRT_BLUE_STATION.SILOM,
                    MRT_BLUE_STATION.LUMPHINI
                ],
                fareType: FareType.MRT_BLUE,
            }];
            mocked(graphService.findAllRoutes).mockReturnValue([routeSegments]);
            
            const source = BTS_SILOM_STATION.CHONG_NONSI;
            const destination = MRT_BLUE_STATION.LUMPHINI;
            const travelRoutes = FareService.findAllRoutes(source, destination);

            const expectedTravelRoute: TravelRoute = {
                route: [{
                    route: [BTS_SILOM_STATION.CHONG_NONSI, BTS_SILOM_STATION.SALA_DAENG],
                    lineType: LineType.BTS,
                    fare: 16
                }, {
                    route: [MRT_BLUE_STATION.SILOM, MRT_BLUE_STATION.LUMPHINI],
                    lineType: LineType.MRT_BLUE,
                    fare: 16
                }],
                fare: 32,
                source: BTS_SILOM_STATION.CHONG_NONSI,
                destination: MRT_BLUE_STATION.LUMPHINI
            };
            expect(travelRoutes).toMatchObject([expectedTravelRoute])
        });

        it('should return a two route from MOCHIT to LUMPHINI', () => {
            const routeSegmentslist: RouteSegment[][] = [
            [{
                route: [
                    BTS_SUKHUMVIT_STATION.MO_CHIT,
                ],
                fareType: FareType.BTS,
            }, {
                route: [
                    MRT_BLUE_STATION.CHATUCHAK_PARK,
                    MRT_BLUE_STATION.PHAHON_YOTHIN
                ],
                fareType: FareType.MRT_BLUE,
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO,
                ],
                fareType: FareType.BTS,
            }], 
            [{
                route: [
                    BTS_SUKHUMVIT_STATION.MO_CHIT,
                    BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO
                ],
                fareType: FareType.BTS,
            }]
            ];
            mocked(graphService.findAllRoutes).mockReturnValue(routeSegmentslist);
            
            const source = BTS_SUKHUMVIT_STATION.MO_CHIT;
            const destination = BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO;
            const travelRoutes = FareService.findAllRoutes(source, destination);

            const expectedTravelRoutes: TravelRoute[] = [{
                route: [{
                    route: [BTS_SUKHUMVIT_STATION.MO_CHIT],
                    lineType: LineType.BTS,
                    fare: 0
                }, {
                    route: [MRT_BLUE_STATION.CHATUCHAK_PARK, MRT_BLUE_STATION.PHAHON_YOTHIN],
                    lineType: LineType.MRT_BLUE,
                    fare: 16
                }, {
                    route: [BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO],
                    lineType: LineType.BTS,
                    fare: 0
                }],
                fare: 16,
                source: BTS_SUKHUMVIT_STATION.MO_CHIT,
                destination: BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO
            }, {
                route: [{
                    route: [BTS_SUKHUMVIT_STATION.MO_CHIT, BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO],
                    lineType: LineType.BTS,
                    fare: 16
                }],
                fare: 16,
                source: BTS_SUKHUMVIT_STATION.MO_CHIT,
                destination: BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO
            }];
            expect(travelRoutes).toMatchObject(expectedTravelRoutes)
        });
    });
});
import FareService from '../fare.service';
import { MRT_BLUE_STATION_ID, BTS_SILOM_STATION_ID, RouteSegment, FareType, BTS_SUKHUMVIT_STATION_ID, Journey, LineType } from '../../types';
import GraphService from '../graph.service';
import { mocked } from 'ts-jest/dist/utils/testing';

jest.mock('../graph.service')

describe('FareService', () => {

    describe('getJourneyFromRouteSegments', () => {
        const expectJourney = (journey: Journey, routeSegments: RouteSegment[], fare: number) => {
            routeSegments.forEach((routeSegment, index) => {
                expect(journey.route[index].route).toBe(routeSegment.route);
            })
            expect(journey.fare).toBe(fare);
        }

        describe('MRT Blue line', () => {
            it('should return 16 when from-to station are the same', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.LAT_PHRAO],
                    fareType: FareType.MRT_BLUE,
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.LAT_PHRAO;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);
                expectJourney(journey, routeSegments, 16);
            });
            it('should return 16 when distance from from-to is 1 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.LAT_PHRAO, MRT_BLUE_STATION_ID.RATCHADAPHISEK],
                    fareType: FareType.MRT_BLUE,
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.RATCHADAPHISEK;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 16 when distance from from-to is 1 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.CHARAN_13, MRT_BLUE_STATION_ID.THAPHRA],
                    fareType: FareType.MRT_BLUE,
                }];
                const from = MRT_BLUE_STATION_ID.CHARAN_13;
                const to = MRT_BLUE_STATION_ID.THAPHRA;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 19 when distance from from-to is 2 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.SUTTHISAN;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 19);
            });

            it('should return 21 when distance from from-to is 3 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                        MRT_BLUE_STATION_ID.HUAI_KHWANG,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.HUAI_KHWANG;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 21);
            });
            it('should return 23 when distance from from-to is 4 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                        MRT_BLUE_STATION_ID.HUAI_KHWANG,
                        MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
            it('should return 25 when distance from from-to is 5 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                        MRT_BLUE_STATION_ID.HUAI_KHWANG,
                        MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE,
                        MRT_BLUE_STATION_ID.PHRA_RAM_9,
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.PHRA_RAM_9;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 25);
            });
            it('should return 42 when distance from from-to is 13 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
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
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.HUA_LAMPHONG;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 42);
            });
            it('should return 42 when distance from from-to more than 13 hops', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
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
                        MRT_BLUE_STATION_ID.SANAM_CHAI
                    ],
                    fareType: FareType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.SANAM_CHAI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 42);
            });
        });
        describe('BTS Silom line', () => {
            it('should return 16 when from-to station are the same', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.CHONG_NONSI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 23 when travel from CHONG_NONSI to SURASUK (have one station in middle)', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SUKSA_WITTHAYA,
                        BTS_SILOM_STATION_ID.SURASAK
                    ],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.SURASAK;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
            it('should return 16 when distance from from-to is 1 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI, BTS_SILOM_STATION_ID.SALA_DAENG],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.SALA_DAENG;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 23 when distance from from-to is 2 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI, BTS_SILOM_STATION_ID.SALA_DAENG, BTS_SILOM_STATION_ID.RATCHADAMRI],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.RATCHADAMRI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
            it('should return 37 when distance from from-to is 6 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SURASAK,
                        BTS_SILOM_STATION_ID.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                        BTS_SILOM_STATION_ID.TALAT_PHLU
                    ],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.TALAT_PHLU;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 37);
            });
            it('should return 15 when travel from Wongwian Yai to Pho Nimit', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SILOM_STATION_ID.WONGWIAN_YAI;
                const to = BTS_SILOM_STATION_ID.PHO_NIMIT;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 15);
            });
            it('should return 31 when travel from Phra Khanong to Pho Nimit', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SILOM_STATION_ID.KRUNG_THON_BURI;
                const to = BTS_SILOM_STATION_ID.PHO_NIMIT;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 31);
            });
        });

        describe('BTS Sukhumvit line', () => {
            it('should return 26 when distance from from-to is 2 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.RATCHADAMRI, BTS_SILOM_STATION_ID.SIAM, BTS_SUKHUMVIT_STATION_ID.CHIT_LOM],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.RATCHADAMRI;
                const to = BTS_SUKHUMVIT_STATION_ID.CHIT_LOM;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
            it('should return 30 when distance from from-to is 4 hop', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.SALA_DAENG,
                        BTS_SILOM_STATION_ID.RATCHADAMRI,
                        BTS_SILOM_STATION_ID.SIAM,
                        BTS_SUKHUMVIT_STATION_ID.CHIT_LOM,
                        BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT,
                    ],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.SALA_DAENG;
                const to = BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 30);
            });
            it('should return 15 when travel from On Nut to Bang chak', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.ON_NUT;
                const to = BTS_SUKHUMVIT_STATION_ID.BANG_CHAK;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 15);
            });
            it('should return 31 when travel from Phra Khanong to Bang chak', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.PHRA_KHANONG,
                        BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.ON_NUT;
                const to = BTS_SUKHUMVIT_STATION_ID.BANG_CHAK;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 31);
            });
            it('should return 15 when travel from Bang Na to Sam Rong', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_NA,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.SAMRONG,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.BANG_NA;
                const to = BTS_SUKHUMVIT_STATION_ID.SAMRONG;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 15);
            });
            it('should return 16 when travel from Saphan Khwai to Ha Yaek Lat Phrao', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI,
                        BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO,
                    ],
                    fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI;
                const to = BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 23 when travel from Saphan Khwai to Ari', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI,
                        BTS_SUKHUMVIT_STATION_ID.SENA_RUAM,
                        BTS_SUKHUMVIT_STATION_ID.ARI,
                    ],
                    fareType: FareType.BTS,
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI;
                const to = BTS_SUKHUMVIT_STATION_ID.ARI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
        });
        describe('MRT-BTS Silom', () => {
            it('should return 0 when no hops for BTS and MRT (just walking)', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.BANG_WA],
                    fareType: FareType.BTS
                }, {
                    route: [MRT_BLUE_STATION_ID.BANG_WA],
                    fareType: FareType.MRT_BLUE
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 0);
            });
            it('should return 16 when 1 hops for BTS and stop at MRT without traverse', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SALA_DAENG
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                    ],
                    fareType: FareType.MRT_BLUE,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 32 when 1 hops for BTS and 1 hops for MRT', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SALA_DAENG
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                        MRT_BLUE_STATION_ID.LUMPHINI
                    ],
                    fareType: FareType.MRT_BLUE,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 32);
            });
            it('should return 56 when 6 hops for BTS and 2 hops for MRT', () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                        BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                        BTS_SILOM_STATION_ID.SAPHAN_TAKSIN,
                        BTS_SILOM_STATION_ID.SURASAK,
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SALA_DAENG,
                    ],
                    fareType: FareType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                        MRT_BLUE_STATION_ID.SAM_YAN,
                        MRT_BLUE_STATION_ID.HUA_LAMPHONG,
                    ],
                    fareType: FareType.MRT_BLUE,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 56);
            });
        });
    });
    describe('findAllRoutes', () => {
        it('should return a single route from CHONG_NONSI to LUMPHINI', () => {
            const routeSegments: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION_ID.CHONG_NONSI,
                    BTS_SILOM_STATION_ID.SALA_DAENG
                ],
                fareType: FareType.BTS,
            }, {
                route: [
                    MRT_BLUE_STATION_ID.SILOM,
                    MRT_BLUE_STATION_ID.LUMPHINI
                ],
                fareType: FareType.MRT_BLUE,
            }];
            mocked(GraphService.findAllRoutes).mockReturnValue([routeSegments]);
            
            const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
            const to = MRT_BLUE_STATION_ID.LUMPHINI;
            const journeys = FareService.findAllRoutes(from, to);

            const expectedJourney: Journey = {
                route: [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI, BTS_SILOM_STATION_ID.SALA_DAENG],
                    lineType: LineType.BTS,
                    fare: 16
                }, {
                    route: [MRT_BLUE_STATION_ID.SILOM, MRT_BLUE_STATION_ID.LUMPHINI],
                    lineType: LineType.MRT_BLUE,
                    fare: 16
                }],
                fare: 32,
                from: BTS_SILOM_STATION_ID.CHONG_NONSI,
                to: MRT_BLUE_STATION_ID.LUMPHINI
            };
            expect(journeys).toMatchObject([expectedJourney])
        });

        it('should return a two route from MOCHIT to LUMPHINI', () => {
            const routeSegmentslist: RouteSegment[][] = [
            [{
                route: [
                    BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                ],
                fareType: FareType.BTS,
            }, {
                route: [
                    MRT_BLUE_STATION_ID.CHATUCHAK_PARK,
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN
                ],
                fareType: FareType.MRT_BLUE,
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO,
                ],
                fareType: FareType.BTS,
            }], 
            [{
                route: [
                    BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                    BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO
                ],
                fareType: FareType.BTS,
            }]
            ];
            mocked(GraphService.findAllRoutes).mockReturnValue(routeSegmentslist);
            
            const from = BTS_SUKHUMVIT_STATION_ID.MO_CHIT;
            const to = BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO;
            const journeys = FareService.findAllRoutes(from, to);

            const expectedJourneys: Journey[] = [{
                route: [{
                    route: [BTS_SUKHUMVIT_STATION_ID.MO_CHIT],
                    lineType: LineType.BTS,
                    fare: 0
                }, {
                    route: [MRT_BLUE_STATION_ID.CHATUCHAK_PARK, MRT_BLUE_STATION_ID.PHAHON_YOTHIN],
                    lineType: LineType.MRT_BLUE,
                    fare: 16
                }, {
                    route: [BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO],
                    lineType: LineType.BTS,
                    fare: 0
                }],
                fare: 16,
                from: BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                to: BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO
            }, {
                route: [{
                    route: [BTS_SUKHUMVIT_STATION_ID.MO_CHIT, BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO],
                    lineType: LineType.BTS,
                    fare: 16
                }],
                fare: 16,
                from: BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                to: BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO
            }];
            expect(journeys).toMatchObject(expectedJourneys)
        });
    });
    describe('calculateFareFromRouteSegment', () => {
        it('should return 16 if travel to itself (MRT)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(16);
        });
        it('should return 16 if route has 1 hop (MRT)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                    MRT_BLUE_STATION_ID.LAT_PHRAO,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(16);
        });
        it('should return 0 if the route segement has one station and it is interchange station  (BTS)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SUKHUMVIT_STATION_ID.ASOK,
                ],
                fareType: FareType.BTS
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 0 if the route segement has one station and it is extension border station  (BTS)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 19 if travel from CHARUN13 to ITSARAPHAP (short route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.CHARAN_13,
                    MRT_BLUE_STATION_ID.THAPHRA,
                    MRT_BLUE_STATION_ID.ITSARAPHAP,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from CHARUN13 to ITSARAPHAP (long route)', () => {
            const routeSegment: RouteSegment = {
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
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from BANG PHAI to ITSARAPHAP (short route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.BANG_PHAI,
                    MRT_BLUE_STATION_ID.THAPHRA,
                    MRT_BLUE_STATION_ID.ITSARAPHAP,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from BANG PHAI to ITSARAPHAP (long route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.BANG_PHAI,
                    MRT_BLUE_STATION_ID.THAPHRA,
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
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from ITSARAPHAP to BANG PHAI (long route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.ITSARAPHAP,
                    MRT_BLUE_STATION_ID.SANAM_CHAI,
                    MRT_BLUE_STATION_ID.SAM_YOT,
                    MRT_BLUE_STATION_ID.WAT_MANGKON,
                    MRT_BLUE_STATION_ID.HUA_LAMPHONG,
                    MRT_BLUE_STATION_ID.SAM_YAN,
                    MRT_BLUE_STATION_ID.SILOM,
                    MRT_BLUE_STATION_ID.LUMPHINI,
                    MRT_BLUE_STATION_ID.KHLONG_TOEI,
                    MRT_BLUE_STATION_ID.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE,
                    MRT_BLUE_STATION_ID.SUKHUMVIT,
                    MRT_BLUE_STATION_ID.PHETCHABURI,
                    MRT_BLUE_STATION_ID.PHRA_RAM_9,
                    MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE,
                    MRT_BLUE_STATION_ID.HUAI_KHWANG,
                    MRT_BLUE_STATION_ID.SUTTHISAN,
                    MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                    MRT_BLUE_STATION_ID.LAT_PHRAO,
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                    MRT_BLUE_STATION_ID.CHATUCHAK_PARK,
                    MRT_BLUE_STATION_ID.KAMPHAENG_PHET,
                    MRT_BLUE_STATION_ID.BANG_SUE,
                    MRT_BLUE_STATION_ID.TAO_POON,
                    MRT_BLUE_STATION_ID.BANG_PHO,
                    MRT_BLUE_STATION_ID.BANG_O,
                    MRT_BLUE_STATION_ID.BANG_PHLAT,
                    MRT_BLUE_STATION_ID.SIRINDHORN,
                    MRT_BLUE_STATION_ID.BANG_YI_KHAN,
                    MRT_BLUE_STATION_ID.BANG_KHUN_NON,
                    MRT_BLUE_STATION_ID.FAI_CHAI,
                    MRT_BLUE_STATION_ID.CHARAN_13,
                    MRT_BLUE_STATION_ID.THAPHRA,
                    MRT_BLUE_STATION_ID.BANG_PHAI
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
    });
});
import FareService from '../fare.service';
import { MRT_BLUE_STATION_ID, BTS_SILOM_STATION_ID, RouteSegment, BTS_SUKHUMVIT_STATION_ID, Journey, LineType } from '../../types';
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
            it('should return 17 when from-to station are the same', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.LAT_PHRAO],
                    lineType: LineType.MRT_BLUE,
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.LAT_PHRAO;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);
                expectJourney(journey, routeSegments, 17);
            });
            it('should return 17 when distance from from-to is 1 hop', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.LAT_PHRAO, MRT_BLUE_STATION_ID.RATCHADAPHISEK],
                    lineType: LineType.MRT_BLUE,
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.RATCHADAPHISEK;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 17);
            });
            it('should return 17 when distance from from-to is 1 hop', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [MRT_BLUE_STATION_ID.CHARAN_13, MRT_BLUE_STATION_ID.THAPHRA],
                    lineType: LineType.MRT_BLUE,
                }];
                const from = MRT_BLUE_STATION_ID.CHARAN_13;
                const to = MRT_BLUE_STATION_ID.THAPHRA;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 17);
            });
            it('should return 19 when distance from from-to is 2 hops', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                    ],
                    lineType: LineType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.SUTTHISAN;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 19);
            });

            it('should return 21 when distance from from-to is 3 hops', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                        MRT_BLUE_STATION_ID.HUAI_KHWANG,
                    ],
                    lineType: LineType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.HUAI_KHWANG;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 21);
            });
            it('should return 24 when distance from from-to is 4 hops', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                        MRT_BLUE_STATION_ID.HUAI_KHWANG,
                        MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE,
                    ],
                    lineType: LineType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 24);
            });
            it('should return 26 when distance from from-to is 5 hops', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        MRT_BLUE_STATION_ID.LAT_PHRAO,
                        MRT_BLUE_STATION_ID.RATCHADAPHISEK,
                        MRT_BLUE_STATION_ID.SUTTHISAN,
                        MRT_BLUE_STATION_ID.HUAI_KHWANG,
                        MRT_BLUE_STATION_ID.THAILAND_CULTURAL_CENTRE,
                        MRT_BLUE_STATION_ID.PHRA_RAM_9,
                    ],
                    lineType: LineType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.PHRA_RAM_9;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 26);
            });
            it('should return 42 when distance from from-to is 13 hops', async () => {
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
                    lineType: LineType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.HUA_LAMPHONG;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 42);
            });
            it('should return 42 when distance from from-to more than 13 hops', async () => {
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
                    lineType: LineType.MRT_BLUE
                }];
                const from = MRT_BLUE_STATION_ID.LAT_PHRAO;
                const to = MRT_BLUE_STATION_ID.SANAM_CHAI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 42);
            });
        });
        describe('BTS Silom line', () => {
            it('should return 16 when from-to station are the same', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI],
                    lineType: LineType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.CHONG_NONSI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 23 when travel from CHONG_NONSI to SURASUK (have one station in middle)', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SAINT_LOUIS,
                        BTS_SILOM_STATION_ID.SURASAK
                    ],
                    lineType: LineType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.SURASAK;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
            it('should return 16 when distance from from-to is 1 hop', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI, BTS_SILOM_STATION_ID.SALA_DAENG],
                    lineType: LineType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.SALA_DAENG;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 23 when distance from from-to is 2 hop', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI, BTS_SILOM_STATION_ID.SALA_DAENG, BTS_SILOM_STATION_ID.RATCHADAMRI],
                    lineType: LineType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.RATCHADAMRI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
            it('should return 48 when distance from from-to is 6 hop', async () => {
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
                    lineType: LineType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = BTS_SILOM_STATION_ID.TALAT_PHLU;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 48);
            });
            it('should return 15 when travel from Wongwian Yai to Pho Nimit', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                    ],
                    lineType: LineType.BTS,
                }, {
                    route: [
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                    ],
                    lineType: LineType.BTS // BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SILOM_STATION_ID.WONGWIAN_YAI;
                const to = BTS_SILOM_STATION_ID.PHO_NIMIT;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 15);
            });
            it('should return 31 when travel from Phra Khanong to Pho Nimit', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.KRUNG_THON_BURI,
                        BTS_SILOM_STATION_ID.WONGWIAN_YAI,
                    ],
                    lineType: LineType.BTS,
                }, {
                    route: [
                        BTS_SILOM_STATION_ID.PHO_NIMIT,
                    ],
                    lineType: LineType.BTS // BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SILOM_STATION_ID.KRUNG_THON_BURI;
                const to = BTS_SILOM_STATION_ID.PHO_NIMIT;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 31);
            });
        });

        describe('BTS Sukhumvit line', () => {
            it('should return 26 when distance from from-to is 2 hop', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.RATCHADAMRI, BTS_SILOM_STATION_ID.SIAM, BTS_SUKHUMVIT_STATION_ID.CHIT_LOM],
                    lineType: LineType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.RATCHADAMRI;
                const to = BTS_SUKHUMVIT_STATION_ID.CHIT_LOM;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
            it('should return 30 when distance from from-to is 4 hop', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.SALA_DAENG,
                        BTS_SILOM_STATION_ID.RATCHADAMRI,
                        BTS_SILOM_STATION_ID.SIAM,
                        BTS_SUKHUMVIT_STATION_ID.CHIT_LOM,
                        BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT,
                    ],
                    lineType: LineType.BTS,
                }];
                const from = BTS_SILOM_STATION_ID.SALA_DAENG;
                const to = BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 30);
            });
            it('should return 15 when travel from On Nut to Bang chak', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                    ],
                    lineType: LineType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                    ],
                    lineType: LineType.BTS // BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.ON_NUT;
                const to = BTS_SUKHUMVIT_STATION_ID.BANG_CHAK;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 15);
            });
            it('should return 31 when travel from Phra Khanong to Bang chak', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.PHRA_KHANONG,
                        BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                    ],
                    lineType: LineType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_CHAK,
                    ],
                    lineType: LineType.BTS // BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.ON_NUT;
                const to = BTS_SUKHUMVIT_STATION_ID.BANG_CHAK;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 31);
            });
            it('should return 15 when travel from Bang Na to Sam Rong', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.BANG_NA,
                    ],
                    lineType: LineType.BTS // BTS_SUKHUMVIT_EXTENSION_15
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.SAMRONG,
                    ],
                    lineType: LineType.BTS // BTS_SUKHUMVIT_EXTENSION_15
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.BANG_NA;
                const to = BTS_SUKHUMVIT_STATION_ID.SAMRONG;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 15);
            });
            it('should return 16 when travel from Saphan Khwai to Ha Yaek Lat Phrao', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI,
                        BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                    ],
                    lineType: LineType.BTS,
                }, {
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO,
                    ],
                    lineType: LineType.BTS // BTS_SUKHUMVIT_EXTENSION_0
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI;
                const to = BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 23 when travel from Saphan Khwai to Ari', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI,
                        BTS_SUKHUMVIT_STATION_ID.SENA_RUAM,
                        BTS_SUKHUMVIT_STATION_ID.ARI,
                    ],
                    lineType: LineType.BTS,
                }];
                const from = BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI;
                const to = BTS_SUKHUMVIT_STATION_ID.ARI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 23);
            });
        });
        describe('MRT-BTS Silom', () => {
            it('should return 0 when no hops for BTS and MRT (just walking)', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [BTS_SILOM_STATION_ID.BANG_WA],
                    lineType: LineType.BTS
                }, {
                    route: [MRT_BLUE_STATION_ID.BANG_WA],
                    lineType: LineType.MRT_BLUE
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 0);
            });
            it('should return 16 when 1 hops for BTS and stop at MRT without traverse', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SALA_DAENG
                    ],
                    lineType: LineType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                    ],
                    lineType: LineType.MRT_BLUE,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 16);
            });
            it('should return 33 when 1 hops for BTS and 1 hops for MRT', async () => {
                const routeSegments: RouteSegment[] = [{
                    route: [
                        BTS_SILOM_STATION_ID.CHONG_NONSI,
                        BTS_SILOM_STATION_ID.SALA_DAENG
                    ],
                    lineType: LineType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                        MRT_BLUE_STATION_ID.LUMPHINI
                    ],
                    lineType: LineType.MRT_BLUE,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 33);
            });
            it('should return 71 when 6 hops for BTS and 2 hops for MRT', async () => {
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
                    lineType: LineType.BTS,
                }, {
                    route: [
                        MRT_BLUE_STATION_ID.SILOM,
                        MRT_BLUE_STATION_ID.SAM_YAN,
                        MRT_BLUE_STATION_ID.HUA_LAMPHONG,
                    ],
                    lineType: LineType.MRT_BLUE,
                }];
                const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
                const to = MRT_BLUE_STATION_ID.LUMPHINI;

                const journey = await FareService.getJourneyFromRouteSegments(routeSegments, from, to);

                expectJourney(journey, routeSegments, 71);
            });
        });
    });
    describe('findAllRoutes', () => {
        it('should return a single route from CHONG_NONSI to LUMPHINI', async () => {
            const routeSegments: RouteSegment[] = [{
                route: [
                    BTS_SILOM_STATION_ID.CHONG_NONSI,
                    BTS_SILOM_STATION_ID.SALA_DAENG
                ],
                lineType: LineType.BTS,
            }, {
                route: [
                    MRT_BLUE_STATION_ID.SILOM,
                    MRT_BLUE_STATION_ID.LUMPHINI
                ],
                lineType: LineType.MRT_BLUE,
            }];
            mocked(GraphService.findAllRoutes).mockReturnValue([routeSegments]);
            
            const from = BTS_SILOM_STATION_ID.CHONG_NONSI;
            const to = MRT_BLUE_STATION_ID.LUMPHINI;
            const journeys = await FareService.findAllRoutes(from, to);

            const expectedJourney: Journey = {
                route: [{
                    route: [BTS_SILOM_STATION_ID.CHONG_NONSI, BTS_SILOM_STATION_ID.SALA_DAENG],
                    lineType: LineType.BTS,
                    fare: 16
                }, {
                    route: [MRT_BLUE_STATION_ID.SILOM, MRT_BLUE_STATION_ID.LUMPHINI],
                    lineType: LineType.MRT_BLUE,
                    fare: 17
                }],
                fare: 33,
                from: BTS_SILOM_STATION_ID.CHONG_NONSI,
                to: MRT_BLUE_STATION_ID.LUMPHINI
            };
            expect(journeys).toMatchObject([expectedJourney])
        });

        it('should return a two route from MOCHIT to LUMPHINI', async () => {
            const routeSegmentslist: RouteSegment[][] = [
            [{
                route: [
                    BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                ],
                lineType: LineType.BTS,
            }, {
                route: [
                    MRT_BLUE_STATION_ID.CHATUCHAK_PARK,
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN
                ],
                lineType: LineType.MRT_BLUE,
            }, {
                route: [
                    BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO,
                ],
                lineType: LineType.BTS,
            }], 
            [{
                route: [
                    BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                    BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO
                ],
                lineType: LineType.BTS,
            }]
            ];
            mocked(GraphService.findAllRoutes).mockReturnValue(routeSegmentslist);
            
            const from = BTS_SUKHUMVIT_STATION_ID.MO_CHIT;
            const to = BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO;
            const journeys = await FareService.findAllRoutes(from, to);

            const expectedJourneys: Journey[] = [{
                route: [{
                    route: [BTS_SUKHUMVIT_STATION_ID.MO_CHIT],
                    lineType: LineType.BTS,
                    fare: 0
                }, {
                    route: [MRT_BLUE_STATION_ID.CHATUCHAK_PARK, MRT_BLUE_STATION_ID.PHAHON_YOTHIN],
                    lineType: LineType.MRT_BLUE,
                    fare: 17
                }, {
                    route: [BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO],
                    lineType: LineType.BTS,
                    fare: 0
                }],
                fare: 17,
                from: BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                to: BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO
            }, {
                route: [{
                    route: [BTS_SUKHUMVIT_STATION_ID.MO_CHIT, BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO],
                    lineType: LineType.BTS,
                    fare: 0
                }],
                fare: 0,
                from: BTS_SUKHUMVIT_STATION_ID.MO_CHIT,
                to: BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO
            }];
            expect(journeys).toMatchObject(expectedJourneys)
        });
    });
    describe('calculateFareFromRouteSegment', () => {
        it('should return 17 if travel to itself (MRT)', async () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(17);
        });
        it('should return 17 if route has 1 hop (MRT)', async () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                    MRT_BLUE_STATION_ID.LAT_PHRAO,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(17);
        });
        it('should return 0 if the route segement has one station and it is interchange station  (BTS)', async () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SUKHUMVIT_STATION_ID.ASOK,
                ],
                lineType: LineType.BTS
            };
            const isTravelToSelf = false;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 0 if the route segement has one station and it is extension border station  (BTS)', async () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SUKHUMVIT_STATION_ID.ON_NUT,
                ],
                lineType: LineType.BTS
            };
            const isTravelToSelf = false;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 19 if travel from CHARUN13 to ITSARAPHAP (short route)', async () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.CHARAN_13,
                    MRT_BLUE_STATION_ID.THAPHRA,
                    MRT_BLUE_STATION_ID.ITSARAPHAP,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from CHARUN13 to ITSARAPHAP (long route)', async () => {
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
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from BANG PHAI to ITSARAPHAP (short route)', async () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.BANG_PHAI,
                    MRT_BLUE_STATION_ID.THAPHRA,
                    MRT_BLUE_STATION_ID.ITSARAPHAP,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from BANG PHAI to ITSARAPHAP (long route)', async () => {
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
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from ITSARAPHAP to BANG PHAI (long route)', async () => {
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
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = await FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
    });
});
import { getStationName, getStation, getPolyLineFromStations, getLineTypeFromFareType, isInterchangeStation, isExtensionBorderStation, getStationKeysFromTravelRoute, getFareTypeFromStationId, getAllStations, calculateFareFromRouteSegment } from '../util.service';
import { MRT_BLUE_STATION, LineType, BTS_SILOM_STATION, METRO_STATION, Station, FareType, BTS_SUKHUMVIT_STATION, TravelRoute, ARL_STATION, BRT_STATION, RouteSegment } from '../../types';

describe('Util Service', () => {
    const station: Station = {
        lineType: LineType.MRT_BLUE,
        key: MRT_BLUE_STATION.BANG_WA,
        nameEN: 'english',
        nameTH: 'thai',
        isNotAvailable: false,
        position: [0, 0]
    };
    describe('getStationName', () => {
        it('should return en name when given language is en', () => {
            const name = getStationName(station, 'en');
            expect(name).toBe(station.nameEN);
        });
        it('should return th name when given language is th', () => {
            const name = getStationName(station, 'th');
            expect(name).toBe(station.nameTH);
        });
    });
    describe('getStation', () => {
        it('should return bts bangwa station', () => {
            const station = getStation(BTS_SILOM_STATION.BANG_WA);

            expect(station).not.toBeNull();
            expect(station?.key).toBe(BTS_SILOM_STATION.BANG_WA);
        });
        it('should return null if station key is not in the list', () => {
            const station = getStation('undefined' as METRO_STATION);

            expect(station).toBeNull()
        });
    });
    describe('getPolyLineFromStations', () => {
        it('should return array of stations position', () => {
            const stations: Station[] = [
                {
                    ...station,
                    position: [0, 0]
                },
                {
                    ...station,
                    position: [1, 1]
                }
            ];
            const polyline = getPolyLineFromStations(stations);
            expect(polyline).toMatchObject([
                [0,0],
                [1,1]
            ])
        });
        it('should return empty array if no station', () => {
            const stations: Station[] = [];
            const polyline = getPolyLineFromStations(stations);
            expect(polyline).toMatchObject([]);
        });
    });
    describe('getLineTypeFromFareType', () => {
        const mappingFareTypeToLineType = [
            { fareType: FareType.BTS, lineType: LineType.BTS},
            { fareType: FareType.BTS_SILOM_EXTENSION_15, lineType: LineType.BTS_SILOM},
            { fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15, lineType: LineType.BTS_SUKHUMVIT},
            { fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0, lineType: LineType.BTS_SUKHUMVIT},
            { fareType: FareType.ARL, lineType: LineType.ARL},
            { fareType: FareType.BRT, lineType: LineType.BRT},
            { fareType: FareType.MRT_BLUE, lineType: LineType.MRT_BLUE},
        ];
        mappingFareTypeToLineType.forEach(mapping => {
            it(`should return ${mapping.lineType} when fare type is ${mapping.fareType}`, () => {
                const lineType = getLineTypeFromFareType(mapping.fareType);
                expect(lineType).toBe(mapping.lineType);
            });
        })
    });
    describe('isInterchangeStation', () => {
        it('should return true if station is interchange', () => {
            const station = MRT_BLUE_STATION.SILOM;
            expect(isInterchangeStation(station)).toBeTruthy();
        });
        it('should return false if station is not interchange', () => {
            const station = MRT_BLUE_STATION.LUMPHINI;
            expect(isInterchangeStation(station)).toBeFalsy();
        });
    });
    describe('isExtensionBorderStation', () => {
        it('should return true if station is extension border', () => {
            const station = BTS_SUKHUMVIT_STATION.MO_CHIT;
            expect(isExtensionBorderStation(station)).toBeTruthy();
        });
        it('should return false if station is not extension border', () => {
            const station = BTS_SUKHUMVIT_STATION.SIAM;
            expect(isExtensionBorderStation(station)).toBeFalsy();
        });
    });
    describe('getStationKeysFromTravelRoute', () => {
        it('should return list of station keys from travel route', () => {
            const travelRoute: TravelRoute = {
                route: [{
                    route: [MRT_BLUE_STATION.SILOM, MRT_BLUE_STATION.LUMPHINI],
                    lineType: LineType.MRT_BLUE,
                    fare: 0
                }, {
                    route: [BTS_SUKHUMVIT_STATION.ARI, BTS_SUKHUMVIT_STATION.ASOK],
                    lineType: LineType.BTS_SUKHUMVIT,
                    fare: 0
                }],
                fare: 0,
                source: MRT_BLUE_STATION.SILOM,
                destination: MRT_BLUE_STATION.LUMPHINI
            };

            const stations = getStationKeysFromTravelRoute(travelRoute);
            expect(stations).toMatchObject([MRT_BLUE_STATION.SILOM, MRT_BLUE_STATION.LUMPHINI, BTS_SUKHUMVIT_STATION.ARI, BTS_SUKHUMVIT_STATION.ASOK]);
        });
    });
    describe('getFareTypeFromStationId', () => {
        const mappingStationIdToFareType = [
            { station: ARL_STATION.MAKKASAN, fareType: FareType.ARL },
            { station: BRT_STATION.RATCHAPRUEK, fareType: FareType.BRT },
            { station: BTS_SILOM_STATION.BANG_WA, fareType: FareType.BTS_SILOM_EXTENSION_15 },
            { station: BTS_SUKHUMVIT_STATION.BANG_NA, fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15 },
            { station: BTS_SUKHUMVIT_STATION.WAT_PHRA_SRI_MAHATHAT, fareType: FareType.BTS_SUKHUMVIT_EXTENSION_0 },
            { station: BTS_SILOM_STATION.SIAM, fareType: FareType.BTS },
            { station: BTS_SUKHUMVIT_STATION.VICTORY_MONUMENT, fareType: FareType.BTS },
            { station: MRT_BLUE_STATION.PHETKASEM_48, fareType: FareType.MRT_BLUE },
        ];
        mappingStationIdToFareType.forEach(mapping => {
            it(`should return ${mapping.fareType} if station key is ${mapping.station}`, () => {
                const fareType = getFareTypeFromStationId(mapping.station)
                expect(fareType).toBe(mapping.fareType);
            });
        })
    });
    describe('getAllStations', () => {
        it('should return all stations from given staion id', () => {
            const stationIds = [MRT_BLUE_STATION.LUMPHINI, MRT_BLUE_STATION.PHAHON_YOTHIN];
            const stations = getAllStations(stationIds);
            expect(stations).toMatchObject([
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.LUMPHINI, nameEN: "Lumphini", nameTH: "ลุมพินี", position: [13.725501,100.545714] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHAHON_YOTHIN, nameEN: "Phahon Yothin", nameTH: "พหลโยธิน", position: [13.812951,100.561568] },
            ]);
        });
    });
    describe('calculateFareFromRouteSegment', () => {
        it('should return 16 if travel to itself (MRT)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(16);
        });
        it('should return 16 if route has 1 hop (MRT)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.LAT_PHRAO,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(16);
        });
        it('should return 0 if the route segement has one station and it is interchange station  (BTS)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SUKHUMVIT_STATION.ASOK,
                ],
                fareType: FareType.BTS
            };
            const isTravelToSelf = false;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 0 if the route segement has one station and it is extension border station  (BTS)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SUKHUMVIT_STATION.ON_NUT,
                ],
                fareType: FareType.BTS_SUKHUMVIT_EXTENSION_15
            };
            const isTravelToSelf = false;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 19 if travel from CHARUN13 to ITSARAPHAP (short route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION.CHARAN_13,
                    MRT_BLUE_STATION.THAPHRA,
                    MRT_BLUE_STATION.ITSARAPHAP,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from CHARUN13 to ITSARAPHAP (long route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION.CHARAN_13,
                    MRT_BLUE_STATION.FAI_CHAI,
                    MRT_BLUE_STATION.BANG_KHUN_NON,
                    MRT_BLUE_STATION.BANG_YI_KHAN,
                    MRT_BLUE_STATION.SIRINDHORN,
                    MRT_BLUE_STATION.BANG_PHLAT,
                    MRT_BLUE_STATION.BANG_O,
                    MRT_BLUE_STATION.BANG_PHO,
                    MRT_BLUE_STATION.TAO_POON,
                    MRT_BLUE_STATION.BANG_SUE,
                    MRT_BLUE_STATION.KAMPHAENG_PHET,
                    MRT_BLUE_STATION.CHATUCHAK_PARK,
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
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
                    MRT_BLUE_STATION.SAM_YOT,
                    MRT_BLUE_STATION.SANAM_CHAI,
                    MRT_BLUE_STATION.ITSARAPHAP,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from BANG PHAI to ITSARAPHAP (short route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION.BANG_PHAI,
                    MRT_BLUE_STATION.THAPHRA,
                    MRT_BLUE_STATION.ITSARAPHAP,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from BANG PHAI to ITSARAPHAP (long route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION.BANG_PHAI,
                    MRT_BLUE_STATION.THAPHRA,
                    MRT_BLUE_STATION.CHARAN_13,
                    MRT_BLUE_STATION.FAI_CHAI,
                    MRT_BLUE_STATION.BANG_KHUN_NON,
                    MRT_BLUE_STATION.BANG_YI_KHAN,
                    MRT_BLUE_STATION.SIRINDHORN,
                    MRT_BLUE_STATION.BANG_PHLAT,
                    MRT_BLUE_STATION.BANG_O,
                    MRT_BLUE_STATION.BANG_PHO,
                    MRT_BLUE_STATION.TAO_POON,
                    MRT_BLUE_STATION.BANG_SUE,
                    MRT_BLUE_STATION.KAMPHAENG_PHET,
                    MRT_BLUE_STATION.CHATUCHAK_PARK,
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
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
                    MRT_BLUE_STATION.SAM_YOT,
                    MRT_BLUE_STATION.SANAM_CHAI,
                    MRT_BLUE_STATION.ITSARAPHAP,
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from ITSARAPHAP to BANG PHAI (long route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION.ITSARAPHAP,
                    MRT_BLUE_STATION.SANAM_CHAI,
                    MRT_BLUE_STATION.SAM_YOT,
                    MRT_BLUE_STATION.WAT_MANGKON,
                    MRT_BLUE_STATION.HUA_LAMPHONG,
                    MRT_BLUE_STATION.SAM_YAN,
                    MRT_BLUE_STATION.SILOM,
                    MRT_BLUE_STATION.LUMPHINI,
                    MRT_BLUE_STATION.KHLONG_TOEI,
                    MRT_BLUE_STATION.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE,
                    MRT_BLUE_STATION.SUKHUMVIT,
                    MRT_BLUE_STATION.PHETCHABURI,
                    MRT_BLUE_STATION.PHRA_RAM_9,
                    MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE,
                    MRT_BLUE_STATION.HUAI_KHWANG,
                    MRT_BLUE_STATION.SUTTHISAN,
                    MRT_BLUE_STATION.RATCHADAPHISEK,
                    MRT_BLUE_STATION.LAT_PHRAO,
                    MRT_BLUE_STATION.PHAHON_YOTHIN,
                    MRT_BLUE_STATION.CHATUCHAK_PARK,
                    MRT_BLUE_STATION.KAMPHAENG_PHET,
                    MRT_BLUE_STATION.BANG_SUE,
                    MRT_BLUE_STATION.TAO_POON,
                    MRT_BLUE_STATION.BANG_PHO,
                    MRT_BLUE_STATION.BANG_O,
                    MRT_BLUE_STATION.BANG_PHLAT,
                    MRT_BLUE_STATION.SIRINDHORN,
                    MRT_BLUE_STATION.BANG_YI_KHAN,
                    MRT_BLUE_STATION.BANG_KHUN_NON,
                    MRT_BLUE_STATION.FAI_CHAI,
                    MRT_BLUE_STATION.CHARAN_13,
                    MRT_BLUE_STATION.THAPHRA,
                    MRT_BLUE_STATION.BANG_PHAI
                ],
                fareType: FareType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
    });
})
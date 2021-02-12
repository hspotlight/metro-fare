import FareService from './fare.service';
import { MRT_BLUE_STATION_ID, RouteSegment, BTS_SUKHUMVIT_STATION_ID, LineType, BTS_SILOM_STATION_ID, ARL_STATION_ID } from '../types';

describe('FareService', () => {

    describe('calculateFareFromRouteSegment', () => {
        it('should return 17 if travel to itself (MRT)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(17);
        });
        it('should return 17 if route has 1 hop (MRT)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.PHAHON_YOTHIN,
                    MRT_BLUE_STATION_ID.LAT_PHRAO,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = true;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(17);
        });
        it('should return 0 if the route segement has one station and it is interchange station  (BTS)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SUKHUMVIT_STATION_ID.ASOK,
                ],
                lineType: LineType.BTS
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 0 if it is interchange station (BTS)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.BANG_WA,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(0);
        });
        it('should return 16 if travel from Chong Nonsri to Sala Daeng (BTS)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    BTS_SILOM_STATION_ID.CHONG_NONSI,
                    BTS_SILOM_STATION_ID.SALA_DAENG,
                ],
                lineType: LineType.BTS
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(16);
        });
        it('should return 15 if travel from SUVARNABHUMI to LAT_KRABANG (ARL)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    ARL_STATION_ID.SUVARNABHUMI,
                    ARL_STATION_ID.LAT_KRABANG,
                ],
                lineType: LineType.ARL
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(15);
        });
        it('should return 19 if travel from CHARAN13 to ITSARAPHAP (short route)', () => {
            const routeSegment: RouteSegment = {
                route: [
                    MRT_BLUE_STATION_ID.CHARAN_13,
                    MRT_BLUE_STATION_ID.THAPHRA,
                    MRT_BLUE_STATION_ID.ITSARAPHAP,
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })
        it('should return 19 if travel from CHARAN13 to ITSARAPHAP (long route)', () => {
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
                lineType: LineType.MRT_BLUE
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
                lineType: LineType.MRT_BLUE
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
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(19);
        })

        it('should return 42 if travel more than 13 station (MRT)', () => {
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
                ],
                lineType: LineType.MRT_BLUE
            };
            const isTravelToSelf = false;
            const fare = FareService.calculateFareFromRouteSegment(routeSegment, isTravelToSelf);
            expect(fare).toBe(42);
        })
    });
});
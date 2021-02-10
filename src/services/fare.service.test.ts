import FareService from './fare.service';
import { MRT_BLUE_STATION_ID, RouteSegment, BTS_SUKHUMVIT_STATION_ID, LineType } from '../types';

describe('FareService', () => {

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
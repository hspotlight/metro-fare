import { getStationName, getStation, getPolyLineFromStations, isInterchangeStation, isExtensionBorderStation, getStationIdsFromJourney, getAllStations } from '../util.service';
import { MRT_BLUE_STATION_ID, LineType, BTS_SILOM_STATION_ID, METRO_STATION_ID, Station, BTS_SUKHUMVIT_STATION_ID, Journey } from '../../types';

describe('Util Service', () => {
    const station: Station = {
        lineType: LineType.MRT_BLUE,
        id: MRT_BLUE_STATION_ID.BANG_WA,
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
            const station = getStation(BTS_SILOM_STATION_ID.BANG_WA);

            expect(station).not.toBeUndefined();
            expect(station?.id).toBe(BTS_SILOM_STATION_ID.BANG_WA);
        });
        it('should return null if station id is not in the list', () => {
            const station = getStation('undefined' as METRO_STATION_ID);

            expect(station).toBeUndefined()
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
                [0, 0],
                [1, 1]
            ])
        });
        it('should return empty array if no station', () => {
            const stations: Station[] = [];
            const polyline = getPolyLineFromStations(stations);
            expect(polyline).toMatchObject([]);
        });
    });
    describe('isInterchangeStation', () => {
        it('should return true if station is interchange', () => {
            const station = MRT_BLUE_STATION_ID.SILOM;
            expect(isInterchangeStation(station)).toBeTruthy();
        });
        it('should return false if station is not interchange', () => {
            const station = MRT_BLUE_STATION_ID.LUMPHINI;
            expect(isInterchangeStation(station)).toBeFalsy();
        });
    });
    describe('isExtensionBorderStation', () => {
        it('should return true if station is extension border', () => {
            const station = BTS_SUKHUMVIT_STATION_ID.MO_CHIT;
            expect(isExtensionBorderStation(station)).toBeTruthy();
        });
        it('should return false if station is not extension border', () => {
            const station = BTS_SUKHUMVIT_STATION_ID.SIAM;
            expect(isExtensionBorderStation(station)).toBeFalsy();
        });
    });
    describe('getStationIdsFromJourney', () => {
        it('should return list of station id from journey', () => {
            const journey: Journey = {
                route: [{
                    route: [MRT_BLUE_STATION_ID.SILOM, MRT_BLUE_STATION_ID.LUMPHINI],
                    lineType: LineType.MRT_BLUE,
                    fare: 0
                }, {
                    route: [BTS_SUKHUMVIT_STATION_ID.ARI, BTS_SUKHUMVIT_STATION_ID.ASOK],
                    lineType: LineType.BTS_SUKHUMVIT,
                    fare: 0
                }],
                fare: 0,
                from: MRT_BLUE_STATION_ID.SILOM,
                to: MRT_BLUE_STATION_ID.LUMPHINI
            };

            const stationIds = getStationIdsFromJourney(journey);
            const expectedResult: METRO_STATION_ID[] = [MRT_BLUE_STATION_ID.SILOM, MRT_BLUE_STATION_ID.LUMPHINI, BTS_SUKHUMVIT_STATION_ID.ARI, BTS_SUKHUMVIT_STATION_ID.ASOK];
            expect(stationIds).toMatchObject(expectedResult);
        });
    });
    describe('getAllStations', () => {
        it('should return all stations from given staion id', () => {
            const stationIds = [MRT_BLUE_STATION_ID.LUMPHINI, MRT_BLUE_STATION_ID.PHAHON_YOTHIN];
            const stations = getAllStations(stationIds);
            const expectedResult: Station[] = [
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.LUMPHINI, nameEN: "Lumphini", nameTH: "ลุมพินี", position: [13.725501, 100.545714] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.PHAHON_YOTHIN, nameEN: "Phahon Yothin", nameTH: "พหลโยธิน", position: [13.812951, 100.561568] },
            ];
            expect(stations).toMatchObject(expectedResult);
        });
    });
})
import { getStationName, getStation } from '../util.service';
import { MRT_BLUE_STATION, LineType, BTS_SILOM_STATION, METRO_STATION } from '../../types';
import { Station } from "../../data/Stations";

describe('Util Service', () => {

    describe('getStationName', () => {
        const station: Station = {
            lineType: LineType.MRT_BLUE,
            key: MRT_BLUE_STATION.BANG_WA,
            nameEN: 'english',
            nameTH: 'thai',
            isNotAvailable: false,
        }
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
})
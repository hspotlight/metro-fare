import { FareService } from '../fare.service';
import { MRT_BLUE_STATION } from '../../types/MetroStation';

describe('FareService', () => {
    it('should return 16 when source and destination are the same station', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.LAT_PHRAO;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(16);
    });
    it('should return 16 when distance from source-distance is 1 hop', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.RATCHADAPHISEK;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(16);
    });
    it('should return 16 when distance from source-distance is 1 hop', () => {
        const source = MRT_BLUE_STATION.CHARAN_13;
        const destination = MRT_BLUE_STATION.THAPHRA;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(16);
    });
    it('should return 19 when distance from source-distance is 2 hops', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.SUTTHISAN;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(19);
    });

    it('should return 21 when distance from source-distance is 3 hops', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.HUAI_KHWANG;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(21);
    });
    it('should return 23 when distance from source-distance is 4 hops', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(23);
    });
    it('should return 25 when distance from source-distance is 5 hops', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.PHRA_RAM_9;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(25);
    });
    it('should return 42 when distance from source-distance is 13 hops', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.HUA_LAMPHONG;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(42);
    });
    it('should return 42 when distance from source-distance more than 13 hops', () => {
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.SANAM_CHAI;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.fare).toBe(42);
    });
});
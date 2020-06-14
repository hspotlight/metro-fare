import { FareService } from '../fare.service';
import { MRT_BLUE_STATION } from '../../types/MetroStation';
import { graphService } from '../graph.service';

describe('FareService', () => {
    it('should return 16 when source and destination are the same station', () => {
        const expectedResult = [MRT_BLUE_STATION.LAT_PHRAO];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.LAT_PHRAO;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(16);
    });
    it('should return 16 when distance from source-distance is 1 hop', () => {
        const expectedResult = [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.RATCHADAPHISEK;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(16);
    });
    it('should return 16 when distance from source-distance is 1 hop', () => {
        const expectedResult = [MRT_BLUE_STATION.CHARAN_13, MRT_BLUE_STATION.THAPHRA];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.CHARAN_13;
        const destination = MRT_BLUE_STATION.THAPHRA;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(16);
    });
    it('should return 19 when distance from source-distance is 2 hops', () => {
        const expectedResult = [
            MRT_BLUE_STATION.LAT_PHRAO,
            MRT_BLUE_STATION.RATCHADAPHISEK,
            MRT_BLUE_STATION.SUTTHISAN,
        ];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.SUTTHISAN;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(19);
    });

    it('should return 21 when distance from source-distance is 3 hops', () => {
        const expectedResult = [
            MRT_BLUE_STATION.LAT_PHRAO,
            MRT_BLUE_STATION.RATCHADAPHISEK,
            MRT_BLUE_STATION.SUTTHISAN,
            MRT_BLUE_STATION.HUAI_KHWANG,
        ];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.HUAI_KHWANG;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(21);
    });
    it('should return 23 when distance from source-distance is 4 hops', () => {
        const expectedResult = [
            MRT_BLUE_STATION.LAT_PHRAO,
            MRT_BLUE_STATION.RATCHADAPHISEK,
            MRT_BLUE_STATION.SUTTHISAN,
            MRT_BLUE_STATION.HUAI_KHWANG,
            MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE,
        ];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(23);
    });
    it('should return 25 when distance from source-distance is 5 hops', () => {
        const expectedResult = [
            MRT_BLUE_STATION.LAT_PHRAO,
            MRT_BLUE_STATION.RATCHADAPHISEK,
            MRT_BLUE_STATION.SUTTHISAN,
            MRT_BLUE_STATION.HUAI_KHWANG,
            MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE,
            MRT_BLUE_STATION.PHRA_RAM_9,
        ];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.PHRA_RAM_9;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(25);
    });
    it('should return 42 when distance from source-distance is 13 hops', () => {
        const expectedResult = [
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
        ];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.HUA_LAMPHONG;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(42);
    });
    it('should return 42 when distance from source-distance more than 13 hops', () => {
        const expectedResult = [
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
        ];
        graphService.findRoute = jest.fn().mockReturnValueOnce(expectedResult);
        const source = MRT_BLUE_STATION.LAT_PHRAO;
        const destination = MRT_BLUE_STATION.SANAM_CHAI;

        const travelRoute = FareService.calculate(source, destination);

        expect(travelRoute.route).toBe(expectedResult);
        expect(travelRoute.fare).toBe(42);
    });
});
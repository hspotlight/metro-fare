import { FareService } from '../fare.service';
import { MRT_BLUE_STATION } from '../../types/MetroStation';

jest.unmock('../fare.service');

describe('FareService', () => {
    it('should call with source and destination', () => {
        FareService.calculate = jest.fn();
        const source = MRT_BLUE_STATION.BANG_KHAE;
        const destination = MRT_BLUE_STATION.BANG_KHUN_NON;

        FareService.calculate(source, destination);

        expect(FareService.calculate).toBeCalledWith(source, destination);
    });
});
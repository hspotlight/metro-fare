import { FareService } from '../fare.service';

jest.unmock('../fare.service');

describe('FareService', () => {
    it('should call with source and destination', () => {
        FareService.calculate = jest.fn();
        const source = 'source';
        const destination = 'destination';

        FareService.calculate(source, destination);

        expect(FareService.calculate).toBeCalledWith(source, destination);
    });
});
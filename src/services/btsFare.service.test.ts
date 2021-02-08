import { BTS_SILOM_STATION_ID } from "../types";
import { getBTSFare } from "./btsFare.service";

// integration test
describe('getBTSFare', () => {
    it('should return 16 when travel from Saint Louis to Chong Nonsi', async () => {
        const from = BTS_SILOM_STATION_ID.SAINT_LOUIS;
        const to = BTS_SILOM_STATION_ID.CHONG_NONSI;

        const fare = await getBTSFare(from, to);

        expect(fare).toBe(16);
    });

    it('should return 23 when travel from Saint Louis to Sala Deang', async () => {
        const from = BTS_SILOM_STATION_ID.SAINT_LOUIS;
        const to = BTS_SILOM_STATION_ID.SALA_DAENG;

        const fare = await getBTSFare(from, to);

        expect(fare).toBe(23);
    });
});
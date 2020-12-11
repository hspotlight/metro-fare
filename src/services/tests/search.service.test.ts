import { STATIONS } from "../../data";
import { LineType, BTS_SILOM_STATION, Station, MRT_BLUE_STATION } from "../../types";
import { searchStation } from "../search.service";

describe('SearchService', () => {
    describe('searchStation', () => {
        it('should return a result with same line type if term match some part of station line type (BTS)', () => {
            const term = "BTS";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.NATIONAL_STADIUM, nameEN: "National Stadium", nameTH: "สนามกีฬาแห่งชาติ", position: [13.746527, 100.529095] },
                { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SIAM, nameEN: "Siam", nameTH: "สยาม", position: [13.745629, 100.534212] },
            ]
            const results = searchStation(term, stations);
            expect(results).toMatchObject(stations);
        })
        it('should return results that term match with some part of station thai name "บาง"', () => {
            const term = "บาง";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน", position: [13.806139, 100.530752] },
            ]
            const results = searchStation(term, stations);
            expect(results).toMatchObject([
                { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
            ]);
        })
        it('should return results that term match with some part of station english name "Bang"', () => {
            const term = "Bang";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน", position: [13.806139, 100.530752] },
            ]
            const results = searchStation(term, stations);
            expect(results).toMatchObject([
                { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
            ]);
        })
        it('should return one result that term match with the exact station name', () => {
            const term = "Bang Khun Non";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน", position: [13.806139, 100.530752] },
            ]
            const results = searchStation(term, stations);
            expect(results).toMatchObject([
                { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
            ]);
        });
    })
});
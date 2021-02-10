import { LineType, BTS_SILOM_STATION_ID, Station, MRT_BLUE_STATION_ID } from "../types";
import { searchStation } from "./search.service";

describe('SearchService', () => {
    describe('searchStation', () => {
        it('should return a result with same line type if term match some part of station line type (BTS)', () => {
            const term = "BTS";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, id: BTS_SILOM_STATION_ID.NATIONAL_STADIUM, nameEN: "National Stadium", nameTH: "สนามกีฬาแห่งชาติ", position: [13.746527, 100.529095] },
                { lineType: LineType.BTS_SILOM, id: BTS_SILOM_STATION_ID.SIAM, nameEN: "Siam", nameTH: "สยาม", position: [13.745629, 100.534212] },
            ]
            const results = searchStation(term, stations);
            expect(results).toMatchObject(stations);
        })
        it('should return results that term match with some part of station thai name "บาง"', () => {
            const term = "บาง";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, id: BTS_SILOM_STATION_ID.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน", position: [13.806139, 100.530752] },
            ]
            const results = searchStation(term, stations);
            const expectedResult: Station[] = [
                { lineType: LineType.BTS_SILOM, id: BTS_SILOM_STATION_ID.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
            ];
            expect(results).toMatchObject(expectedResult);
        })
        it('should return results that term match with some part of station english name "Bang"', () => {
            const term = "Bang";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, id: BTS_SILOM_STATION_ID.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน", position: [13.806139, 100.530752] },
            ]
            const results = searchStation(term, stations);
            const expectedResult: Station[] = [
                { lineType: LineType.BTS_SILOM, id: BTS_SILOM_STATION_ID.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
            ];
            expect(results).toMatchObject(expectedResult);
        })
        it('should return one result that term match with the exact station name', () => {
            const term = "Bang Khun Non";
            const stations: Station[] = [
                { lineType: LineType.BTS_SILOM, id: BTS_SILOM_STATION_ID.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087, 100.457810] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401, 100.485307] },
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน", position: [13.806139, 100.530752] },
            ]
            const results = searchStation(term, stations);
            const expectedResult: Station[] = [
                { lineType: LineType.MRT_BLUE, id: MRT_BLUE_STATION_ID.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704, 100.473645] },
            ];
            expect(results).toMatchObject(expectedResult);
        });
    })
});
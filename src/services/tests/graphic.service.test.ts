import { graphService } from "../graph.service";
import { Line } from "../../types/Line";
import { MRT_BLUE_STATION } from "../../types/MetroStation";

describe('GraphService', () => {
    it('should create the graph of MRT line', () => {
        const expectedResult = {
            'LAT_PHRAO': [MRT_BLUE_STATION.RATCHADAPHISEK],
            'RATCHADAPHISEK': [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN],
            'SUTTHISAN': [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG],
            'HUAI_KHWANG': [MRT_BLUE_STATION.SUTTHISAN],
        };
        const metroLine: Line = {
            line: [
                MRT_BLUE_STATION.LAT_PHRAO,
                MRT_BLUE_STATION.RATCHADAPHISEK,
                MRT_BLUE_STATION.SUTTHISAN,
                MRT_BLUE_STATION.HUAI_KHWANG,
            ]
        }

        const metroGraph = graphService.create(metroLine);

        expect(metroGraph).toMatchObject(expectedResult);
    });
});
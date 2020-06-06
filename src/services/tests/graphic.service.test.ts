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

    describe('findRoute', () => {
        it('should return route: [source], when the source = destination', () => {
            const metroGraph = {
                'LAT_PHRAO': [MRT_BLUE_STATION.RATCHADAPHISEK],
                'RATCHADAPHISEK': [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN],
                'SUTTHISAN': [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG],
                'HUAI_KHWANG': [MRT_BLUE_STATION.SUTTHISAN],
            };

            const route = graphService.findRoute(MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.LAT_PHRAO, metroGraph);

            expect(route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO]);
        });
        it('should return route: [source, destination], when the source is one station next to destination', () => {
            const metroGraph = {
                'LAT_PHRAO': [MRT_BLUE_STATION.RATCHADAPHISEK],
                'RATCHADAPHISEK': [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN],
                'SUTTHISAN': [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG],
                'HUAI_KHWANG': [MRT_BLUE_STATION.SUTTHISAN],
            };

            const route = graphService.findRoute(MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK, metroGraph);

            expect(route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK]);
        });
        it('should return route: [source, intermidate, destination], when the source is two station next to destination', () => {
            const metroGraph = {
                'LAT_PHRAO': [MRT_BLUE_STATION.RATCHADAPHISEK],
                'RATCHADAPHISEK': [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN],
                'SUTTHISAN': [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG],
                'HUAI_KHWANG': [MRT_BLUE_STATION.SUTTHISAN],
            };

            const route = graphService.findRoute(MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN, metroGraph);

            expect(route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.SUTTHISAN]);
        });
        it('should return route: [source, intermidate, intermidate, destination], when the source is three station next to destination', () => {
            const metroGraph = {
                'LAT_PHRAO': [MRT_BLUE_STATION.RATCHADAPHISEK],
                'RATCHADAPHISEK': [MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.SUTTHISAN],
                'SUTTHISAN': [MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.HUAI_KHWANG],
                'HUAI_KHWANG': [MRT_BLUE_STATION.SUTTHISAN],
            };

            const route = graphService.findRoute(MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.HUAI_KHWANG, metroGraph);

            expect(route).toMatchObject([MRT_BLUE_STATION.LAT_PHRAO, MRT_BLUE_STATION.RATCHADAPHISEK, MRT_BLUE_STATION.SUTTHISAN, MRT_BLUE_STATION.HUAI_KHWANG]);
        });
    });
});
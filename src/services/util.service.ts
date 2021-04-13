import { Station, LineType, METRO_STATION_ID, Journey, Intersection, BTS_SILOM_STATION_ID, MRT_BLUE_STATION_ID, Segment, Train } from "../types";
import { STATIONS } from "../data/Stations";
import { LatLngTuple } from "leaflet";
import { ALL_INTERSECTIONS, EXTENSION_BORDER_STATIONS } from "../data/MetroGraph";

export const isInterchangeStation = (stationId: METRO_STATION_ID): boolean => {
    const interchangeStations: METRO_STATION_ID[] = [];
    ALL_INTERSECTIONS.forEach((stationPair: Intersection) => {
        interchangeStations.push(...stationPair);
    })
    return interchangeStations.includes(stationId);
};

export const isExtensionBorderStation = (stationId: METRO_STATION_ID): boolean => {
    return EXTENSION_BORDER_STATIONS.includes(stationId);
};

export const getLineTypeLabel = (lineType: LineType): string => {
    switch (lineType) {
        case LineType.BRT: return 'BRT';
        case LineType.ARL: return 'ARL';
        case LineType.BTS: return 'BTS';
        case LineType.BTS_GOLD: return 'BTS';
        case LineType.BTS_SILOM: return 'BTS';
        case LineType.BTS_SUKHUMVIT: return 'BTS';
        case LineType.MRT_BLUE: return 'MRT';
        case LineType.MRT_PURPLE: return 'MRT';
        default: return 'MRT';
    }
};

export const getLineTypeFromStationId = (stationId: METRO_STATION_ID): LineType => {
    const station = getStation(stationId);
    if (station) {
        if (station.lineType === LineType.BTS_SILOM || station.lineType === LineType.BTS_SUKHUMVIT) return LineType.BTS
        return station.lineType
    }
    return LineType.MRT_BLUE
}

export const getStation = (stationId: METRO_STATION_ID): Station | undefined => {
    return STATIONS.find(station => station.id === stationId);
};

export const getStationName = (station: Station, lang: string = 'en') => {
    return lang === 'en' ? station.nameEN : station.nameTH;
}

export const getStationIdsFromJourney = (journey: Journey): METRO_STATION_ID[] => {
    let stationIds: METRO_STATION_ID[] = [];
    journey.route.forEach(route => {
        stationIds.push(...route.route)
    });
    return stationIds;
}

export const getAllStations = (stationIds: METRO_STATION_ID[]): Station[] => {
    const stations: Station[] = [];
    stationIds.forEach((stationId: METRO_STATION_ID) => {
        const station = getStation(stationId);
        if (station) {
            stations.push(station);
        }
    });
    return stations;
}

// MAP UTIL
// TODO: get polyline from the real data
export const getPolyLineFromStations = (stations: Station[]): LatLngTuple[] => {
    return stations.map(station => station.position);
};

export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const isMobile = () => {
    const { width } = getWindowDimensions()
    return width <= 768
}

export const getTrainsFromSegment = (segment: Segment): Train[] => {
    if (segment.lineType === LineType.MRT_BLUE) {
        const thaphraIndex = segment.route.indexOf(MRT_BLUE_STATION_ID.THAPHRA);
        if (0 < thaphraIndex && thaphraIndex < segment.route.length - 1) {
            const beforeThaphraStationId = segment.route[thaphraIndex - 1];
            const afterThaphraStationId = segment.route[thaphraIndex + 1];
            if (
                beforeThaphraStationId === MRT_BLUE_STATION_ID.CHARAN_13 ||
                afterThaphraStationId === MRT_BLUE_STATION_ID.CHARAN_13
            ) {
                const firstHalf = segment.route.slice(0, thaphraIndex + 1);
                const secondHalf = segment.route.slice(thaphraIndex);
                return [
                    { lineType: segment.lineType, stations: firstHalf },
                    { lineType: segment.lineType, stations: secondHalf },
                ];
            }
        }
    } else if (segment.lineType === LineType.BTS) {
        const siamIndex = segment.route.indexOf(BTS_SILOM_STATION_ID.SIAM);
        if (0 < siamIndex && siamIndex < segment.route.length - 1) {
            const firstStation = getStation(segment.route[0]);
            const lastStation = getStation(segment.route[segment.route.length - 1]);

            const firstHalf = segment.route.slice(0, siamIndex + 1);
            const secondHalf = segment.route.slice(siamIndex);
            if (
                firstStation &&
                lastStation &&
                firstStation.lineType !== lastStation.lineType
            ) {
                return [
                    { lineType: segment.lineType, stations: firstHalf },
                    { lineType: segment.lineType, stations: secondHalf },
                ];
            }
        }
    }
    return [
        {
            lineType: segment.lineType,
            stations: segment.route,
        },
    ];
};

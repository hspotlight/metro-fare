import { Station, LineType, METRO_STATION_ID, Journey, Intersection, BTS_SILOM_STATION_ID, MRT_BLUE_STATION_ID, Segment, Train, Line } from "../types";
import { STATIONS } from "../data/Stations";
import { LatLngTuple } from "leaflet";
import { ALL_INTERSECTIONS, EXTENSION_BORDER_STATIONS } from "../data/MetroGraph";
import { ARL_LINE, BRT_LINE, BTS_GOLD_LINE, BTS_SILOM_LINE, BTS_SUKHUMVIT_LINE, MRT_BLUE_LINE } from "../data";

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

export const getHeadingDirectionId = (train: Train): METRO_STATION_ID => {
    const line = LineFromTrain(train);

    const firstStationId = train.stations[0];
    const lastStationId = train.stations[train.stations.length - 1];

    let firstIndex = getStationIndex(line, firstStationId);
    let lastIndex = getStationIndex(line, lastStationId);
    if (train.lineType === LineType.MRT_BLUE) {
        const thaphraIndex = train.stations.indexOf(MRT_BLUE_STATION_ID.THAPHRA);
        if (thaphraIndex === -1) {
            return (firstIndex < lastIndex) ? line.line[line.line.length - 1] : MRT_BLUE_STATION_ID.THAPHRA;
        } else if (0 < thaphraIndex && thaphraIndex < train.stations.length - 1) {
            return (firstIndex < lastIndex) ? line.line[line.line.length - 1] : MRT_BLUE_STATION_ID.THAPHRA;
        } else if (thaphraIndex === 0 && train.stations.length > 1) {
            if (train.stations[1] === MRT_BLUE_STATION_ID.CHARAN_13 || train.stations[1] === MRT_BLUE_STATION_ID.BANG_PHAI) {
                return line.line[line.line.length - 1];
            }
            return MRT_BLUE_STATION_ID.THAPHRA;
        } else if (thaphraIndex === train.stations.length - 1 && train.stations.length > 1) {
            if (train.stations[train.stations.length - 2] === MRT_BLUE_STATION_ID.CHARAN_13 || train.stations[train.stations.length - 2] === MRT_BLUE_STATION_ID.BANG_PHAI) {
                return MRT_BLUE_STATION_ID.THAPHRA;
            }
            return line.line[line.line.length - 1];
        }
    }
    const headingStation = (firstIndex < lastIndex) ? line.line[line.line.length - 1] : line.line[0];
    return headingStation;

}

const LineFromTrain = (train: Train): Line => {
    const firstStationId = train.stations[0];
    const lastStationId = train.stations[train.stations.length - 1];
    const firstStation = getStation(firstStationId);
    const lastStation = getStation(lastStationId);

    if (firstStation && lastStation) {
        if (firstStation?.id === BTS_SILOM_STATION_ID.SIAM) {
            return getLineFromLineType(lastStation.lineType);
        }
        else if (lastStation?.id === BTS_SILOM_STATION_ID.SIAM) {
            return getLineFromLineType(firstStation.lineType);
        }
        return getLineFromLineType(firstStation.lineType);
    }
    return getLineFromLineType(train.lineType);
}


const getLineFromLineType = (lineType: LineType): Line => {
    if (lineType === LineType.BRT) {
        return BRT_LINE
    }
    if (lineType === LineType.ARL) {
        return ARL_LINE
    }
    if (lineType === LineType.BTS_SUKHUMVIT) {
        return BTS_SUKHUMVIT_LINE
    }
    if (lineType === LineType.BTS_SILOM) {
        return BTS_SILOM_LINE
    }
    if (lineType === LineType.BTS_GOLD) {
        return BTS_GOLD_LINE
    }
    return MRT_BLUE_LINE
}

const getStationIndex = (line: Line, stationId: METRO_STATION_ID) => {
    return line.line.indexOf(stationId);
}
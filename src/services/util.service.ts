import { FareType, Station, LineType, METRO_STATION_ID, BTS_SILOM_STATION_ID, BTS_SUKHUMVIT_STATION_ID, Journey, ARL_STATION_ID, BRT_STATION_ID, Intersection } from "../types";
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

export const getLineTypeFromFareType = (fareType: FareType): LineType => {
    switch (fareType) {
        case FareType.BTS: return LineType.BTS;
        case FareType.ARL: return LineType.ARL;
        case FareType.BRT: return LineType.BRT;
        default: return LineType.MRT_BLUE;
    }
};
export const getLineTypeLabel = (lineType: LineType): string => {
    switch (lineType) {
        case LineType.BRT: return 'BRT';
        case LineType.ARL: return 'ARL';
        case LineType.BTS: return 'BTS';
        case LineType.BTS_SILOM: return 'BTS';
        case LineType.BTS_SUKHUMVIT: return 'BTS';
        case LineType.MRT_BLUE: return 'MRT';
        case LineType.MRT_PURPLE: return 'MRT';
        default: return 'MRT';
    }
};

// TODO: refactor later
export const getLineTypeFromStationId = (stationId: METRO_STATION_ID): LineType => {
    const fareType = getFareTypeFromStationId(stationId);
    return getLineTypeFromFareType(fareType);
}


// TODO: refactor later remove faretype
export const getFareTypeFromStationId = (stationId: METRO_STATION_ID): FareType => {
    if (Object.values(ARL_STATION_ID).includes(stationId as ARL_STATION_ID)) return FareType.ARL
    if (Object.values(BRT_STATION_ID).includes(stationId as BRT_STATION_ID)) return FareType.BRT
    if (Object.values(BTS_SILOM_STATION_ID).includes(stationId as BTS_SILOM_STATION_ID) ||
        Object.values(BTS_SUKHUMVIT_STATION_ID).includes(stationId as BTS_SUKHUMVIT_STATION_ID)) return FareType.BTS
    return FareType.MRT_BLUE
};

export const getStation = (stationId: METRO_STATION_ID): Station | undefined => {
    return STATIONS.find(stationName => stationName.id === stationId);
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
// TODO: add polyline
export const getPolyLineFromStations = (stations: Station[]): LatLngTuple[] => {
    return stations.map(station => station.position);
};

import { FareType, Station, LineType, METRO_STATION_ID, BTS_SILOM_STATION_ID, BTS_SUKHUMVIT_STATION_ID, TravelRoute, ARL_STATION_ID, BRT_STATION_ID, Intersection } from "../types";
import { STATIONS } from "../data/Stations";
import { BTS_SILOM_EXTENSION_15 } from "../data/BtsSilomLine";
import { BTS_SUKHUMVIT_EXTENSION_15, BTS_SUKHUMVIT_EXTENSION_0 } from "../data/BtsSukhumvitLine";
import { LatLngTuple } from "leaflet";
import { ALL_INTERSECTIONS, EXTENSION_BORDER_STATIONS } from "../data/MetroGraph";

export const isInterchangeStation = (station: METRO_STATION_ID): boolean => {
    const interChangeStations: METRO_STATION_ID[] = [];
    ALL_INTERSECTIONS.forEach((stationPair: Intersection) => {
        interChangeStations.push(...stationPair);
    })
    return interChangeStations.includes(station);
};

export const isExtensionBorderStation = (station: METRO_STATION_ID): boolean => {
    return EXTENSION_BORDER_STATIONS.includes(station);
};

export const getLineTypeFromFareType = (fareType: FareType): LineType => {
    switch (fareType) {
        case FareType.BTS: return LineType.BTS;
        case FareType.BTS_SILOM_EXTENSION_15: return LineType.BTS_SILOM;
        case FareType.BTS_SUKHUMVIT_EXTENSION_15:
        case FareType.BTS_SUKHUMVIT_EXTENSION_0: return LineType.BTS_SUKHUMVIT;
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

// TODO: rename either station id or station key
export const getFareTypeFromStationId = (station: METRO_STATION_ID): FareType => {
    if (Object.values(ARL_STATION_ID).includes(station as ARL_STATION_ID)) return FareType.ARL
    if (Object.values(BRT_STATION_ID).includes(station as BRT_STATION_ID)) return FareType.BRT
    if (BTS_SILOM_EXTENSION_15.includes(station as BTS_SILOM_STATION_ID)) return FareType.BTS_SILOM_EXTENSION_15
    if (BTS_SUKHUMVIT_EXTENSION_15.includes(station as BTS_SUKHUMVIT_STATION_ID)) return FareType.BTS_SUKHUMVIT_EXTENSION_15
    if (BTS_SUKHUMVIT_EXTENSION_0.includes(station as BTS_SUKHUMVIT_STATION_ID)) return FareType.BTS_SUKHUMVIT_EXTENSION_0
    if (Object.values(BTS_SILOM_STATION_ID).includes(station as BTS_SILOM_STATION_ID) ||
        Object.values(BTS_SUKHUMVIT_STATION_ID).includes(station as BTS_SUKHUMVIT_STATION_ID)) return FareType.BTS
    return FareType.MRT_BLUE
};

export const getStation = (searchStation: METRO_STATION_ID): Station | undefined => {
    return STATIONS.find(stationName => stationName.key === searchStation);
};

export const getStationName = (station: Station, lang: string = 'en') => {
    return lang === 'en' ? station.nameEN : station.nameTH;
}

export const getStationKeysFromTravelRoute = (travelRoute: TravelRoute): METRO_STATION_ID[] => {
    let stationKeys: METRO_STATION_ID[] = [];
    travelRoute.route.forEach(route => {
        stationKeys.push(...route.route)
    });
    return stationKeys;
}

export const getAllStations = (stationKeys: METRO_STATION_ID[]): Station[] => {
    const stations: Station[] = [];
    stationKeys.forEach((stationKey: METRO_STATION_ID) => {
        const station = getStation(stationKey);
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

import { METRO_FARE } from "../common/fare";
import { FareType, Station, LineType, RouteSegment, METRO_STATION, BTS_SILOM_STATION, BTS_SUKHUMVIT_STATION, TravelRoute, ARL_STATION, BRT_STATION, Intersection } from "../types";
import { STATIONS } from "../data/Stations";
import { BTS_SILOM_EXTENSION_15 } from "../data/BtsSilomLine";
import { BTS_SUKHUMVIT_EXTENSION_15, BTS_SUKHUMVIT_EXTENSION_0 } from "../data/BtsSukhumvitLine";
import { LatLngTuple } from "leaflet";
import { ALL_INTERSECTIONS, EXTENSION_BORDER_STATIONS } from "../data/MetroGraph";

export const calculateFareFromRouteSegment = (routeSegment: RouteSegment, isTravelToSelf: boolean): number => {
    const fareTable: number[] = METRO_FARE[routeSegment.fareType];

    const hops = routeSegment.route.length - 1;

    const station = routeSegment.route[0];
    if (!isTravelToSelf && hops === 0 && (isInterchangeStation(station) || isExtensionBorderStation(station))) {
        return 0;
    }

    if (hops > fareTable.length - 1) {
        return fareTable[fareTable.length - 1];
    }

    return fareTable[hops];
}

const isInterchangeStation = (station: METRO_STATION): boolean => {
    const interChangeStations: METRO_STATION[] = [];
    ALL_INTERSECTIONS.forEach((intersection: Intersection) => {
        interChangeStations.push(...intersection);
    })
    return interChangeStations.includes(station);
};

const isExtensionBorderStation = (station: METRO_STATION): boolean => {
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

export const getFareTypeFromStationId = (station: METRO_STATION): FareType => {
    if (Object.values(ARL_STATION).includes(station as ARL_STATION)) return FareType.ARL
    if (Object.values(BRT_STATION).includes(station as BRT_STATION)) return FareType.BRT
    if (BTS_SILOM_EXTENSION_15.includes(station as BTS_SILOM_STATION)) return FareType.BTS_SILOM_EXTENSION_15
    if (BTS_SUKHUMVIT_EXTENSION_15.includes(station as BTS_SUKHUMVIT_STATION)) return FareType.BTS_SUKHUMVIT_EXTENSION_15
    if (BTS_SUKHUMVIT_EXTENSION_0.includes(station as BTS_SUKHUMVIT_STATION)) return FareType.BTS_SUKHUMVIT_EXTENSION_0
    if (Object.values(BTS_SILOM_STATION).includes(station as BTS_SILOM_STATION) ||
        Object.values(BTS_SUKHUMVIT_STATION).includes(station as BTS_SUKHUMVIT_STATION)) return FareType.BTS
    return FareType.MRT_BLUE
};

export const getStation = (searchStation: METRO_STATION): Station | null => {
    let station = STATIONS.find(stationName => stationName.key === searchStation);
    if (station) return station;

    return null;
};

export const getStationName = (station: Station, lang: string = 'en') => {
    return lang === 'en' ? station.nameEN : station.nameTH;
}

export const getStationsFromTravelRoute = (travelRoute: TravelRoute): Station[] => {
    const stationKeys = getStationKeysFromTravelRoute(travelRoute);
    return getAllStations(stationKeys);
}

export const getStationsCount = (travelRoute: TravelRoute): number => {
    const stationKeys = getStationKeysFromTravelRoute(travelRoute);
    return stationKeys.length;
}

const getStationKeysFromTravelRoute = (travelRoute: TravelRoute): METRO_STATION[] => {
    let stationKeys: METRO_STATION[] = [];
    travelRoute.route.forEach(route => {
        stationKeys = [...stationKeys, ...route.route]
    });
    return stationKeys;
}

const getAllStations = (stationKeys: METRO_STATION[]): Station[] => {
    const stations: Station[] = [];
    stationKeys.forEach((stationKey: METRO_STATION) => {
        const station = getStation(stationKey);
        if (station) {
            stations.push(station);
        }
    });
    return stations;
}

// map util
// Extract data
export const filterStationByLineType = (lineType: LineType) => (
    STATIONS.filter((station) => station.lineType === lineType && !station.isNotAvailable)
);


// TODO: add polyline
export const getPolyLineFromStations = (stations: Station[]): LatLngTuple[] => {
    return stations.map((station) => station.position);
};
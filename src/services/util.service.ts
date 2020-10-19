import { METRO_FARE } from "../common/fare";
import { FareType, Station, LineType, RouteSegment, METRO_STATION, BTS_SILOM_STATION, BTS_SUKHUMVIT_STATION, TravelRoute, ARL_STATION, BRT_STATION, Intersection } from "../types";
import { STATIONS } from "../data/Stations";
import { BTS_SILOM_EXTENSION_15 } from "../data/BtsSilomLine";
import { BTS_SUKHUMVIT_EXTENSION_15, BTS_SUKHUMVIT_EXTENSION_0 } from "../data/BtsSukhumvitLine";
import { LatLngTuple } from "leaflet";
import { ALL_INTERSECTIONS, EXTENSION_BORDER_STATIONS } from "../data/MetroGraph";
import { MRT_BLUE_CYCLE, MRT_BLUE_TAIL } from "../data";

export const calculateFareFromRouteSegment = (routeSegment: RouteSegment, isTravelToSelf: boolean): number => {
    const fareTable: number[] = METRO_FARE[routeSegment.fareType];

    const hops = calculateHop(routeSegment);

    const station = routeSegment.route[0];
    if (!isTravelToSelf && hops === 0 && (isInterchangeStation(station) || isExtensionBorderStation(station))) {
        return 0;
    }

    if (hops > fareTable.length - 1) {
        return fareTable[fareTable.length - 1];
    }

    return fareTable[hops];
}

export const isInterchangeStation = (station: METRO_STATION): boolean => {
    const interChangeStations: METRO_STATION[] = [];
    ALL_INTERSECTIONS.forEach((stationPair: Intersection) => {
        interChangeStations.push(...stationPair);
    })
    return interChangeStations.includes(station);
};

export const isExtensionBorderStation = (station: METRO_STATION): boolean => {
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

// TODO: rename either station id or station key
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

// TODO: cleanup and remove
export const getStationsFromTravelRoute = (travelRoute: TravelRoute): Station[] => {
    const stationKeys = getStationKeysFromTravelRoute(travelRoute);
    return getAllStations(stationKeys);
}

// TODO: to cleanup and remove
export const getStationsCount = (travelRoute: TravelRoute): number => {
    const stationKeys = getStationKeysFromTravelRoute(travelRoute);
    return stationKeys.length;
}

export const getStationKeysFromTravelRoute = (travelRoute: TravelRoute): METRO_STATION[] => {
    let stationKeys: METRO_STATION[] = [];
    travelRoute.route.forEach(route => {
        stationKeys.push(...route.route)
    });
    return stationKeys;
}

export const getAllStations = (stationKeys: METRO_STATION[]): Station[] => {
    const stations: Station[] = [];
    stationKeys.forEach((stationKey: METRO_STATION) => {
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
    return stations.map((station) => station.position);
};

function calculateHop(routeSegment: RouteSegment) {
    if (routeSegment.fareType !== FareType.MRT_BLUE) return routeSegment.route.length - 1;

    let hops = routeSegment.route.length - 1;
    const station = routeSegment.route[0];
    const lastStation = routeSegment.route[hops];
    const indexA = MRT_BLUE_CYCLE.findIndex(s => s === station) 
    const indexB = MRT_BLUE_CYCLE.findIndex(s => s === lastStation)
    const isInTheRing = (index: number) => index !== -1
    const getHopFromCycleStation = (indexA: number, indexB: number) => 
        Math.min(
            Math.abs(indexA - indexB),
            MRT_BLUE_CYCLE.length - Math.abs(indexA - indexB)
        );
    const getHopFromTailStation = (indexA: number, indexB: number) => 
        Math.abs(indexA - indexB)
    if (isInTheRing(indexA) && isInTheRing(indexB)) {
        hops = getHopFromCycleStation(indexA, indexB)
    } 
    else if (isInTheRing(indexA) && !isInTheRing(indexB)) {
        const thapraIndex = 0
        hops = getHopFromTailStation(thapraIndex, MRT_BLUE_TAIL.indexOf(lastStation))
            + getHopFromCycleStation(thapraIndex, MRT_BLUE_CYCLE.indexOf(station))
    }
     else if (!isInTheRing(indexA) && isInTheRing(indexB)) {
        const thapraIndex = 0
        hops = getHopFromTailStation(thapraIndex, MRT_BLUE_TAIL.indexOf(station))
            + getHopFromCycleStation(thapraIndex, MRT_BLUE_CYCLE.indexOf(lastStation))
    }
    return hops
}

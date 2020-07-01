import { METRO_FARE } from "../common/fare";
import { FareType, Station, LineType, RouteSegment, METRO_STATION, BTS_SILOM_STATION, MRT_BLUE_STATION, BTS_SUKHUMVIT_STATION, TravelRoute } from "../types";
import { STATIONS} from "../data/Stations";
import { BTS_SILOM_EXTENSION_15 } from "../data/BtsSilomLine";
import { BTS_SUKHUMVIT_EXTENSION_15, BTS_SUKHUMVIT_EXTENSION_0 } from "../data/BTSSukhumvitLine";
import { LatLngTuple } from "leaflet";

export const calculateFareFromRouteSegment = (routeSegment: RouteSegment): number => {
    const fareTable: number[] = METRO_FARE[routeSegment.fareType];

    const hops = routeSegment.route.length - 1;

    const station = routeSegment.route[0];
    if (hops === 0 && (isInterchangeStation(station) || isExtensionBorderStation(station))) {
        return 0;
    }

    if (hops > fareTable.length - 1) {
        return fareTable[fareTable.length - 1];
    }

    return fareTable[hops];
}

export const calculateTotalFare = (routeSegments: RouteSegment[]): number => {
    let totalFare = 0;
    routeSegments.forEach(routeSegment => {
        totalFare += calculateFareFromRouteSegment(routeSegment);
    });
    return totalFare;
};

export const getLineTypeFromFareType = (fareType: FareType): LineType => {
    switch (fareType) {
        case FareType.BTS: return LineType.BTS;
        case FareType.BTS_SILOM_EXTENSION_15: return LineType.BTS_SILOM;
        case FareType.BTS_SUKHUMVIT_EXTENSION_15:
        case FareType.BTS_SUKHUMVIT_EXTENSION_0: return LineType.BTS_SUKHUMVIT;
        default: return LineType.MRT_BLUE;
    }
};

const isInterchangeStation = (station: METRO_STATION): boolean => {
    const interChangeStations: METRO_STATION[] = [
        MRT_BLUE_STATION.SILOM, BTS_SILOM_STATION.SALA_DAENG,
        MRT_BLUE_STATION.BANG_WA, BTS_SILOM_STATION.BANG_WA,
        MRT_BLUE_STATION.SUKHUMVIT, BTS_SUKHUMVIT_STATION.ASOK,
        MRT_BLUE_STATION.CHATUCHAK_PARK, BTS_SUKHUMVIT_STATION.MO_CHIT,
        MRT_BLUE_STATION.PHAHON_YOTHIN, BTS_SUKHUMVIT_STATION.HA_YEAK_LAT_PHRAO,
    ];
    return interChangeStations.includes(station);
};

const isExtensionBorderStation = (station: METRO_STATION): boolean => {
    const extensionBorderStation: METRO_STATION[] = [
        BTS_SILOM_STATION.WONGWIAN_YAI,
        BTS_SUKHUMVIT_STATION.ON_NUT,
        BTS_SUKHUMVIT_STATION.BEARING,
        BTS_SUKHUMVIT_STATION.MO_CHIT,
    ];
    return extensionBorderStation.includes(station);
};

export const getFareTypeFromStationId = (station: METRO_STATION): FareType => {
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

// map util
export const filterStationByLineType = (lineType: LineType) => (
    STATIONS.filter((station) => station.lineType === lineType && !station.isNotAvailable)
);

export const getPolyLineFromStations = (stations: Station[]): LatLngTuple[] => {
    return stations.map((station) => station.position);
};

export const getStationsFromTravelRoute = (travelRoute: TravelRoute): Station[] => {
    const stationKeys = getStationKeysFromTravelRoute(travelRoute);
    return getAllStations(stationKeys);
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
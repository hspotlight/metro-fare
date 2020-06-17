import { METRO_FARE } from "../common/fare";
import { RouteSegment } from "../types/RouteSegment";
import { FareType } from "../types/FareType";
import { LineType } from "../types/LineType";
import { METRO_STATION, BTS_SILOM_STATION, MRT_BLUE_STATION } from "../types/MetroStation";

export const calculateFareFromRouteSegment = (routeSegment: RouteSegment): number => {
const fareTable: number[] = METRO_FARE[routeSegment.fareType];

    const hops = routeSegment.route.length - 1;

    const station = routeSegment.route[0];
    if (hops === 0 && (isInterchangeStation(station) || station === BTS_SILOM_STATION.WONGWIAN_YAI)) {
        return 0;
    }

    if (hops > fareTable.length - 1) {
        return fareTable[fareTable.length - 1];
    }

    return fareTable[hops];
}

export const getLineTypeFromFareType = (fareType: FareType): LineType => {
    switch (fareType) {
        case FareType.BTS_SILOM:
        case FareType.BTS_SILOM_EXTENSION_15: return LineType.BTS_SILOM;
        default: return LineType.MRT_BLUE;
    }
}

const isInterchangeStation = (station: METRO_STATION): boolean => {
    const interChangeStations: METRO_STATION[] = [
        MRT_BLUE_STATION.BANG_WA,
        BTS_SILOM_STATION.BANG_WA,
        MRT_BLUE_STATION.SILOM,
        BTS_SILOM_STATION.SALA_DAENG
    ];
    return interChangeStations.includes(station);
}

export const getFareTypeFromStationId = (station: METRO_STATION): FareType => {
    const BTS_SILOM_EXTENSION = [
        BTS_SILOM_STATION.PHO_NIMIT,
        BTS_SILOM_STATION.TALAT_PHLU,
        BTS_SILOM_STATION.WUTTHAKAT,
        BTS_SILOM_STATION.BANG_WA,
    ];
    if (Object.values(BTS_SILOM_EXTENSION).includes(station as BTS_SILOM_STATION)) return FareType.BTS_SILOM_EXTENSION_15
    if (Object.values(BTS_SILOM_STATION).includes(station as BTS_SILOM_STATION)) return FareType.BTS_SILOM
    return FareType.MRT_BLUE
}
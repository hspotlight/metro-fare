import { LineType, METRO_STATION_ID } from ".";
import { LatLngTuple } from "leaflet";

export type Station = {
    lineType: LineType,
    key: METRO_STATION_ID,
    nameEN: string,
    nameTH: string,
    position: LatLngTuple
    isNotAvailable?: boolean,
}
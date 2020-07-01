import { LineType, METRO_STATION } from ".";
import { LatLngTuple } from "leaflet";

export type Station = {
    lineType: LineType,
    key: METRO_STATION,
    nameEN: string,
    nameTH: string,
    position: LatLngTuple
    isNotAvailable?: boolean,
}
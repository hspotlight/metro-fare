import { LatLngTuple, LatLngBoundsLiteral } from "leaflet";
import { MetroLineLayerVisibility } from "../types";

export const DEFAULT_MAP_CENTER: LatLngTuple = [13.773565, 100.521852];
export const DUMMY_MAP_POSITION: LatLngTuple = [13.773565, 100.521853];

export const DEFAULT_MAP_MAX_BOUNDS: LatLngBoundsLiteral = [
    [13.449045, 100.0327245],
    [14.0599723, 100.9603826],
];

export const DEFAULT_METRO_LINE_LAYERS: MetroLineLayerVisibility = {
    mrtBlue: true,
    btsSilom: true,
    btsSukhumvit: true,
    btsGold: true,
    arl: true,
    brt: true
}
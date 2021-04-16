import { METRO_STATION_ID } from "../types";
import { BTS_ID } from "../data/btsId";
import btsFareTable from './btsFareTable.json';

export const getBTSFareFromTable = (from: METRO_STATION_ID, to: METRO_STATION_ID): number => {
    // NOTE: order of the btsID objects must not change
    const fromIndex = BTS_ID.findIndex(btsStation => btsStation.id === from)
    const toIndex = BTS_ID.findIndex(btsStation => btsStation.id === to)

    try {
        let fare = 0;
        if (fromIndex <= toIndex) {
            fare = btsFareTable[from][to];
        } else {
            fare = btsFareTable[to][from];
        }
        return fare;
    } catch (e) {
        return 0;
    }
}

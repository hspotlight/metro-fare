import axios from "axios";
import { METRO_STATION_ID } from "../types";
import qs from 'querystring';
import { BTSFareResponse } from "../types/BTSFareResponse";
import { BTS_ID } from "../data/btsId";
import btsFareTable from './btsFareTable.json';

const BTS_BASE_URL = "https://btsapp1.bts.co.th/webservice/api/";

const api = axios.create({
    baseURL: BTS_BASE_URL,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})

export const getBTSFareFromTable = async (from: METRO_STATION_ID, to: METRO_STATION_ID): Promise<number> => {
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
    } catch(e) {
        return 0;
    }
}

export const getBTSFare = async (from: METRO_STATION_ID, to: METRO_STATION_ID): Promise<number> => {
    const originId = BTS_ID.find(btsStation => btsStation.id === from)?.btsId || 0
    const destinationId = BTS_ID.find(btsStation => btsStation.id === to)?.btsId || 0

    const response: BTSFareResponse = await api.post('gatFareRate', qs.stringify({
        'Origin': '' + originId,
        'Destination': '' + destinationId
    })).then(response => response.data)

    if (response && response.FareRate.length > 0) {
        return +response.FareRate[0].FarePrice
    }
    return 0;
}
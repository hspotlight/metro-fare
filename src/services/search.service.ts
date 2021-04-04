import { STATIONS } from "../data"
import { Station } from "../types"
import { getLineTypeLabel } from "./util.service"

export const searchStation = (term: string, stations: Station[] = STATIONS): Station[] => {
    const pattern = new RegExp(term, 'i')
    let result = stations.filter(station => {
        const englishName = getLineTypeLabel(station.lineType) + ' ' + station.nameEN
        const thaiName = getLineTypeLabel(station.lineType) + ' ' + station.nameTH
        let isMatched = englishName.match(pattern) || thaiName.match(pattern)
        return isMatched
    })

    // TODO: clean up and remove duplicate siam
    result = result.filter((item, idx) => result.findIndex(i => i.id === item.id) === idx)
    return result
}
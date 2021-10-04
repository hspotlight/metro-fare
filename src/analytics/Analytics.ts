import firebase from "firebase/app";

const events = {
    STATION_SEARCH_PAIR: "station_search_pair"
} as const

const screens = {
    ROUTE_NAVIGATION_SCREEN: "route_navigation_screen",
    ROUTE_SEARCH_RESULT_SCREEN: "route_search_result_screen",
    ROUTE_DETAIL_SCREEN: "route_detail_screen",
    SELECT_STATION_SCREEN: "select_station_screen"
} as const

export type AnalyticsEventName = (typeof events)[keyof typeof events]
export type AnalyticsScreenName = (typeof screens)[keyof typeof screens] 

const logEvent = async (eventName: AnalyticsEventName, eventParams?: { [key: string]: any; }) => {
    await firebase.analytics().logEvent(eventName, eventParams)
}

const logCurrentScreen = async (screenName: AnalyticsScreenName) => {
    await firebase.analytics().logEvent(`landed_${screenName}`)
}

export default {
    logEvent,
    logCurrentScreen
}
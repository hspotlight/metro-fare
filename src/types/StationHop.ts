import { METRO_STATION_ID, RouteSegment } from ".";

export class StationHop {
    station: METRO_STATION_ID;
    routeSegments: RouteSegment[];

    constructor(station: METRO_STATION_ID, paths: RouteSegment[]) {
        this.station = station;
        this.routeSegments = paths;
    }

    public getTotalHops(): number {
        let totalHops = 0;
        this.routeSegments.forEach(routeSegment => {
            totalHops += routeSegment.route.length;
        });
        return totalHops;
    }

    public isStationInPath(searchStation: METRO_STATION_ID): boolean {
        let isInPath = false;
        this.routeSegments.forEach(routeSegment => {
            isInPath = isInPath || routeSegment.route.includes(searchStation);
        })
        return isInPath;
    }
}
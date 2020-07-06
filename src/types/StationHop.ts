import { METRO_STATION, RouteSegment } from ".";

export class StationHop {
    station: METRO_STATION;
    routeSegments: RouteSegment[];

    constructor(station: METRO_STATION, paths: RouteSegment[]) {
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

    public isStationInPath(searchStation: METRO_STATION): boolean {
        let isInPath = false;
        this.routeSegments.forEach(routeSegment => {
            isInPath = isInPath || routeSegment.route.includes(searchStation);
        })
        return isInPath;
    }
}
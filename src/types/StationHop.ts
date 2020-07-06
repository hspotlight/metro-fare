import { METRO_STATION, RouteSegment } from ".";

export class StationHop {
    station: METRO_STATION;
    paths: RouteSegment[]; // TODO: Refactor change to routeSegment

    constructor(station: METRO_STATION, paths: RouteSegment[]) {
        this.station = station;
        this.paths = paths;
    }

    public getTotalHops(): number {
        let totalHops = 0;
        this.paths.forEach(path => {
            totalHops += path.route.length;
        });
        return totalHops;
    }

    public isStationInPath(searchStation: METRO_STATION): boolean {
        let isInPath = false;
        this.paths.forEach(path => {
            isInPath = isInPath || path.route.includes(searchStation);
        })
        return isInPath;
    }
}
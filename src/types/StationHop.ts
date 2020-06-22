import { METRO_STATION, RouteSegment } from ".";
import { calculateTotalFare } from "../services/util.service";

export class StationHop {
    station: METRO_STATION;
    paths: RouteSegment[];

    constructor(station: METRO_STATION, paths: RouteSegment[]) {
        this.station = station;
        this.paths = paths;
    }

    public getFare(): number {
        return calculateTotalFare(this.paths);
    }

    public getTotalHops(): number {
        let totalHops = 0;
        this.paths.forEach(path => {
            totalHops += path.route.length;
        });
        return totalHops;
    }
}
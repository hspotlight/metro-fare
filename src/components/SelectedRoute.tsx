import React from "react";
import { Journey } from "../types";
import { SingleSegmentCard } from "./RouteDetailDrawer/SingleSegmentCard";

const SelectedRoute = ({ journey }: { journey: Journey }) => {
  return (
    <div>
      {journey.route.map((routeSegment, segmentIndex) => {
        return (
          <section key={routeSegment.lineType + "-" + segmentIndex}>
            <div style={{ marginTop: "5px" }}></div>
            <SingleSegmentCard segment={routeSegment} />
          </section>
        );
      })}
    </div>
  );
};

export default SelectedRoute;

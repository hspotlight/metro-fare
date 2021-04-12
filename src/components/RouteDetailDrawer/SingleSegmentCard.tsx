import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
} from "@material-ui/core";
import "../../styles/SelectedRoute.scss";
import { METRO_STATION_ID, Segment, Station } from "../../types";
import {
  getLineTypeLabel,
  getStation,
  getStationName,
} from "../../services/util.service";
import { getStationIconStyle } from "../../services/ui-style.service";
import { SegmentCardHeader } from "./SegmentCardHeader";

// TODO: ignore case change train with same line for now
// TODO: ignore heading direction

type SingleSegmentCardProps = {
  segment: Segment;
};

export const SingleSegmentCard = ({ segment }: SingleSegmentCardProps) => {
  const { t: translate } = useTranslation();
  const lineTypeLabel = getLineTypeLabel(segment.lineType);

  return (
    <Card>
      <CardContent>
        <Grid container>
          <SegmentCardHeader
            label={lineTypeLabel}
            fareLabel={`${segment.fare} ${translate("currency.baht")}`}
          />
          <Train segment={segment} showLastStation={true} />
        </Grid>
      </CardContent>
    </Card>
  );
};

type TrainProps = {
  segment: Segment;
  showLastStation?: boolean;
};

const Train = ({ segment, showLastStation }: TrainProps) => {
  const { t: translate } = useTranslation();
  const intermediateStations = segment.route.slice(1, segment.route.length - 1);
  const [showExpandButton, setShowExpandButton] = useState<boolean>(
    intermediateStations.length > 1
  );
  const firstStation = getStation(segment.route[0]);
  const lastStation = getStation(segment.route[segment.route.length - 1]);

  const handleExpandButtonClick = () => {
    setShowExpandButton(false);
  };

  return (
    <>
      <TransferStation station={firstStation} />
      <Grid container>
        <Grid container style={{ marginBottom: "5px" }}>
          <div
            style={{
              marginLeft: "8px",
              marginRight: "12px",
              width: "2px",
              borderLeft: "solid 1px black",
              height: "100%",
            }}
          ></div>
          <Grid item>
            {/* <Grid xs={12}>
                  <Chip label="BTS Nation Stadium" />
                </Grid> */}
            {showExpandButton ? (
              <IconButton>
                <Typography variant="body1" onClick={handleExpandButtonClick}>
                  {translate("route.intermediateStationText", {
                    count: intermediateStations.length,
                  })}
                </Typography>
              </IconButton>
            ) : (
              <Typography
                variant="body1"
                style={{ padding: "12px", color: "rgba(0, 0, 0, 0.54)" }}
              >
                {intermediateStations.map(
                  (stationId: METRO_STATION_ID, index: number) => {
                    const showNewLine = index < segment.route.length - 1;
                    const station = getStation(stationId);
                    return (
                      <>
                        <StationLabel station={station} />
                        {showNewLine && <br />}
                      </>
                    );
                  }
                )}
              </Typography>
            )}
          </Grid>
        </Grid>
        {showLastStation && <TransferStation station={lastStation} />}
      </Grid>
    </>
  );
};

type TransferStationProps = {
  station: Station | undefined;
};

const TransferStation = ({ station }: TransferStationProps) => {
  const stationIconStyle = station ? getStationIconStyle(station.lineType) : "";
  return (
    <Grid container>
      <div className={`station-icon ${stationIconStyle}`}></div>
      <Typography variant="body1">
        <StationLabel station={station} />
      </Typography>
    </Grid>
  );
};

type StationLabelProps = {
  station: Station | undefined;
};

const StationLabel = ({ station }: StationLabelProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  if (!station) {
    return null;
  }

  const lineTypeLabel = getLineTypeLabel(station.lineType);
  return <>{`${lineTypeLabel} ${getStationName(station, language)}`}</>;
};

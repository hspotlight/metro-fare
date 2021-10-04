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
import {
  METRO_STATION_ID,
  Segment,
  Station,
  Train as TrainType,
} from "../../types";
import {
  getHeadingDirectionId,
  getLineTypeLabel,
  getStation,
  getStationName,
  getTrainsFromSegment,
} from "../../services/util.service";
import { getStationIconStyle } from "../../services/ui-style.service";
import { SegmentCardHeader } from "./SegmentCardHeader";

// TODO: change siam icon

type SingleSegmentCardProps = {
  segment: Segment;
};

export const SingleSegmentCard = ({ segment }: SingleSegmentCardProps) => {
  const { t: translate } = useTranslation();
  const lineTypeLabel = getLineTypeLabel(segment.lineType);
  const trains = getTrainsFromSegment(segment);

  return (
    <Card>
      <CardContent>
        <Grid container>
          <SegmentCardHeader
            label={lineTypeLabel}
            fareLabel={`${segment.fare} ${translate("currency.baht")}`}
          />
          {/* TODO: handle convert segments to train */}
          {trains.map((train, index) => {
            return (
              <Train
                train={train}
                showLastStation={trains.length === 1 || index !== 0}
                key={"train" + index}
              />
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

type TrainProps = {
  train: TrainType;
  showLastStation?: boolean;
};

const Train = ({ train, showLastStation }: TrainProps) => {
  const {
    t: translate,
    i18n: { language },
  } = useTranslation();
  const intermediateStations = train.stations.slice(
    1,
    train.stations.length - 1
  );
  const [showExpandButton, setShowExpandButton] = useState<boolean>(
    intermediateStations.length > 1
  );
  const firstStation = getStation(train.stations[0]);
  const lastStation = getStation(train.stations[train.stations.length - 1]);
  const headingStationId = getHeadingDirectionId(train);
  const headingStation = getStation(headingStationId);

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
            {headingStation && (
              <Grid xs={12}>
                <Chip
                  label={`${getLineTypeLabel(
                    headingStation.lineType
                  )} ${getStationName(headingStation, language)}`}
                />
              </Grid>
            )}
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
                    const showNewLine = index < train.stations.length - 1;
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

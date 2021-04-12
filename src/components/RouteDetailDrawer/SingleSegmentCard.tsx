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
import { METRO_STATION_ID, Segment } from "../../types";
import {
  getLineTypeLabel,
  getStation,
  getStationName,
} from "../../services/util.service";
import { getStationIconStyle } from "../../services/ui-style.service";

// TODO: ignore case change train with same line for now
// TODO: ignore heading direction

type SingleSegmentCardProps = {
  segment: Segment;
};

export const SingleSegmentCard = ({ segment }: SingleSegmentCardProps) => {
  const { t: translate, i18n } = useTranslation();
  const intermediateStations = segment.route.slice(1, segment.route.length - 1);
  const [showExpandButton, setShowExpandButton] = useState<boolean>(
    intermediateStations.length > 1
  );
  const firstStation = getStation(segment.route[0]);
  const lastStation = getStation(segment.route[segment.route.length - 1]);
  const lineTypeLabel = getLineTypeLabel(segment.lineType);
  const stationIconStyle = getStationIconStyle(segment.lineType);

  const handleExpandButtonClick = () => {
    setShowExpandButton(false);
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid container item justify="space-between">
            <Typography variant="h6">{lineTypeLabel}</Typography>
            <Typography variant="h6">{`${segment.fare} ${translate(
              "currency.baht"
            )}`}</Typography>
          </Grid>
          <Grid container>
            <Grid container>
              <div className={`station-icon ${stationIconStyle}`}></div>
              <Typography variant="body1">
                {firstStation &&
                  `${lineTypeLabel} ${getStationName(
                    firstStation,
                    i18n.language
                  )}`}
              </Typography>
            </Grid>
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
                    <Typography
                      variant="body1"
                      onClick={handleExpandButtonClick}
                    >
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
                            {station &&
                              `${lineTypeLabel} ${getStationName(
                                station,
                                i18n.language
                              )}`}
                            {showNewLine && <br />}
                          </>
                        );
                      }
                    )}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <div className={`station-icon ${stationIconStyle}`}></div>
              <Typography variant="body1">
                {lastStation &&
                  `${lineTypeLabel} ${getStationName(
                    lastStation,
                    i18n.language
                  )}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

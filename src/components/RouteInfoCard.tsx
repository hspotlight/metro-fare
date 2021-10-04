import React from "react";
import { Journey } from "../types";
import { getStationIdsFromJourney } from "../services/util.service";
import { useTranslation } from "react-i18next";
import { Grid, Paper, Typography } from "@material-ui/core";

import makeStyles from '@material-ui/styles/makeStyles';

const useStyle = makeStyles(() => ({
  container: {
    width: "calc(100% - 40px)",
    padding: "10px 10px",
  },
}));

type RouteInfoCardProps = {
  journey: Journey;
  onClick: () => void;
};

const RouteInfoCard = ({ journey, onClick }: RouteInfoCardProps) => {
  const classes = useStyle();
  const { t: translate } = useTranslation();
  const numberOfStations = getStationIdsFromJourney(journey).length;
  return (
    <Paper className={classes.container}>
      <Grid container direction="column">
        <Grid container item>
          <Grid item xs={6}>
            {numberOfStations} {translate("station.station")}
          </Grid>
          <Grid item xs={6}>
            {journey.fare} {translate("currency.baht")}
          </Grid>
        </Grid>
        <Typography onClick={onClick} color="primary">
          {translate("route.routeDetails")}
        </Typography>
      </Grid>
    </Paper>
  );
};

export default RouteInfoCard;

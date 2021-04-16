import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "12px",
    margin: "12px",
  },
}));

type RouteDetailInsightProps = {
  nStations: number;
  fare: number;
};

export const RouteDetailInsight = ({
  nStations,
  fare,
}: RouteDetailInsightProps) => {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid container justify="space-between">
          <Grid xs={6}>
            <Typography variant="h6">
              {translate("station.totalStation")}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6">
              {translate("station.totalFare")}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid xs={6}>
            <Typography variant="body1">
              {nStations} {translate("station.station")}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="body1">
              {fare} {translate("currency.baht")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RouteDetailInsight;

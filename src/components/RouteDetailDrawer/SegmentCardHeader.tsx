import React from "react";
import { Grid, Typography } from "@material-ui/core";

export const SegmentCardHeader = ({
  label,
  fareLabel,
}: {
  label: string;
  fareLabel: string;
}) => {
  return (
    <Grid container item justifyContent="space-between">
      <Typography variant="h6">{label}</Typography>
      <Typography variant="h6">{fareLabel}</Typography>
    </Grid>
  );
};

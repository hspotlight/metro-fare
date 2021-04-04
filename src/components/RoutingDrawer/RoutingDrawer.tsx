import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  container: {
    bottom: "0px",
    position: "absolute",
    zIndex: 1001,
    height: "50px",
    width: "100%",
  },
  drawer: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
  buttonGroup: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "60%",
    borderRadius: "0px",
  },
}));

export const RoutingDrawer = () => {
  const classes = useStyles();

  const handleUnselectFrom = () => {
    console.log("handleUnselectFrom");
  };
  const handleUnselectTo = () => {
    console.log("handleUnselectTo");
  };
  const handleSwapLocation = () => {
    console.log("handleSwapLocation");
  };
  return (
    <Paper
      classes={{
        root: classes.container,
      }}
    >
      <Grid
        container
        className={classes.drawer}
        xs={11}
        justify="space-between"
      >
        <Grid container className={classes.buttonGroup} xs={11}>
          <Grid item xs={6}>
            <IconButton className={classes.button} size="small">
              <Typography variant="button">From</Typography>
            </IconButton>
            <IconButton onClick={handleUnselectFrom} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <IconButton className={classes.button} size="small">
              <Typography variant="button">To</Typography>
            </IconButton>
            <IconButton onClick={handleUnselectTo} size="small">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container xs={1}>
          <IconButton onClick={handleSwapLocation} size="small">
            <SyncAltIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

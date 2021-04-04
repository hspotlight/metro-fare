import React from "react";
import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import { useDrawerCtx } from "../../contexts/DrawerProvider";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  drawerRoot: {
    height: "100%",
  },
  sideMenuHeader: {
    display: "flex",
    alignItems: "center",
    minHeight: "56px",
    paddingLeft: "16px",
    paddingRight: "16px",
    marginBottom: "2px",
  },
}));
// TODO: update sidemenu
export const SideMenu = () => {
  const { showSideMenu, setSideMenu } = useDrawerCtx();
  const classes = useStyles();
  return (
    <SwipeableDrawer
      anchor={"bottom"}
      open={showSideMenu}
      onClose={() => setSideMenu(false)}
      onOpen={() => setSideMenu(true)}
      classes={{
        paper: classes.drawerRoot,
      }}
    >
      <div>
        <Paper className={classes.sideMenuHeader}>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6">Setting</Typography>
            <IconButton onClick={() => setSideMenu(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Paper>
        <Grid container direction="column">
          <Grid item>Language</Grid>
          <Grid item>About</Grid>
          <Grid item>Feedback</Grid>
        </Grid>
      </div>
    </SwipeableDrawer>
  );
};

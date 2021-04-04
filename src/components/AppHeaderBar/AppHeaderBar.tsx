import React from "react";
import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useDrawerCtx } from "../../contexts/DrawerProvider";
import { canShowSideMenu } from "../../config/featureToggle";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  toolbar: {
    [theme.breakpoints.up("xs")]: {
      minHeight: "56px",
    },
  },
}));

export const AppHeaderBar = () => {
  const classes = useStyles();
  const { setSideMenu } = useDrawerCtx();

  return (
    <AppBar position="static">
      <Toolbar
        classes={{
          root: classes.toolbar,
        }}
      >
        <Grid container justify="space-between" alignItems="center">
          <img
            height="32"
            width="32"
            src="metro-fare-logo.jpg"
            alt="Metro Fare logo"
          />
          <Typography variant="h6" className={classes.title}>
            MetroFare
          </Typography>
          {canShowSideMenu() && (
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon onClick={() => setSideMenu(true)} />
            </IconButton>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

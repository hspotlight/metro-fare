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

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  appbar: {
    alignItems: "center",
  },
}));

export const AppHeaderBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
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
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

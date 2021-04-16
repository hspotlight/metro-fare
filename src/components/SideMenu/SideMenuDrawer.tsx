import React from "react";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import { useDrawerContext } from "../../contexts/DrawerProvider";
import CloseIcon from "@material-ui/icons/Close";
import TranslateIcon from "@material-ui/icons/Translate";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import { useTranslation } from "react-i18next";

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
  drawerContent: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
}));

export const SideMenuDrawer = () => {
  const { showSideMenu, setSideMenu } = useDrawerContext();
  const { t: translate } = useTranslation();
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
            <Typography variant="h6">
              {translate("sidemenuDrawer.settings")}
            </Typography>
            <IconButton onClick={() => setSideMenu(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Paper>
        <List component="nav" aria-label="sidemenu">
          <ListItem button>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText primary={translate("sidemenuDrawer.language")} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={translate("sidemenuDrawer.contact")} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FeedbackOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={translate("sidemenuDrawer.feedback")} />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

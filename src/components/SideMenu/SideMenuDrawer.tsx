import React from "react";
import {
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
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
  menuRightIcon: {
    paddingRight: "16px",
  },
}));

export const SideMenuDrawer = () => {
  const { showSideMenu, setSideMenu } = useDrawerContext();
  const { t: translate } = useTranslation();
  const classes = useStyles();

  const getCurrentMenuLabel = () => {
    return translate("sidemenuDrawer.settings");
  };

  const getCurrentMenu = () => {
    return <SettingsMenu />;
  };

  return (
    <Drawer
      anchor={"bottom"}
      open={showSideMenu}
      onClose={() => setSideMenu(false)}
      classes={{
        paper: classes.drawerRoot,
      }}
    >
      <Paper className={classes.sideMenuHeader}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6">{getCurrentMenuLabel()}</Typography>
          <IconButton onClick={() => setSideMenu(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Paper>
      {getCurrentMenu()}
    </Drawer>
  );
};

const SettingsMenu = () => {
  const {
    t: translate,
    i18n: { language },
  } = useTranslation();
  const classes = useStyles();
  const languageLabel =
    language === "en" ? translate("language.en") : translate("language.th");
  return (
    <List component="nav" aria-label="sidemenu">
      <ListItem button>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText primary={translate("sidemenuDrawer.language")} />
        <Typography variant="body1" className={classes.menuRightIcon}>
          {languageLabel}
        </Typography>
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
  );
};

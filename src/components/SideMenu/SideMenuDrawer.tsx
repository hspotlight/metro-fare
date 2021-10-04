import React, { useState } from "react";
import { Drawer, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import makeStyles from '@material-ui/styles/makeStyles';
import { useDrawerContext } from "../../contexts/DrawerProvider";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";
import { SettingsMenu } from "./SettingsMenu";
import { LanguageMenu } from "./LanguageMenu";
import { ContactMenu } from "./ContactMenu";

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

export type SideMenu = "settings" | "language" | "contact";

export const SideMenuDrawer = () => {
  const { showSideMenu, setSideMenu } = useDrawerContext();
  const [currentMenu, setCurrentMenu] = useState<SideMenu>("settings");
  const { t: translate } = useTranslation();
  const classes = useStyles();

  const getCurrentMenuLabel = () => {
    switch (currentMenu) {
      case "language":
        return translate("sidemenuDrawer.language");
      case "contact":
        return translate("sidemenuDrawer.contact");
      default:
        return translate("sidemenuDrawer.settings");
    }
  };

  const getCurrentMenu = () => {
    switch (currentMenu) {
      case "language":
        return <LanguageMenu />;
      case "contact":
        return <ContactMenu />;
      default:
        return <SettingsMenu setCurrentMenu={setCurrentMenu} />;
    }
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
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item container alignItems="center" xs={10}>
            {currentMenu !== "settings" && (
              <IconButton onClick={() => setCurrentMenu("settings")}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6">{getCurrentMenuLabel()}</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => setSideMenu(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      {getCurrentMenu()}
    </Drawer>
  );
};

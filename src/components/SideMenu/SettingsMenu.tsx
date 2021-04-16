import React from "react";
import { useTranslation } from "react-i18next";
import TranslateIcon from "@material-ui/icons/Translate";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
// import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import { SideMenu as SideMenuType } from "./SideMenuDrawer";
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  menuRightIcon: {
    paddingRight: "28px",
  },
}));

type SettingsMenuProps = {
  setCurrentMenu: (_: SideMenuType) => void;
};

export const SettingsMenu = ({ setCurrentMenu }: SettingsMenuProps) => {
  const {
    t: translate,
    i18n: { language },
  } = useTranslation();
  const classes = useStyles();
  const languageLabel =
    language === "en" ? translate("language.en") : translate("language.th");
  return (
    <List component="nav" aria-label="sidemenu">
      <ListItem button onClick={() => setCurrentMenu("language")}>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText primary={translate("sidemenuDrawer.language")} />
        <Typography variant="body1" className={classes.menuRightIcon}>
          {languageLabel}
        </Typography>
      </ListItem>
      <ListItem button onClick={() => setCurrentMenu("contact")}>
        <ListItemIcon>
          <InfoOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={translate("sidemenuDrawer.contact")} />
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <FeedbackOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={translate("sidemenuDrawer.feedback")} />
      </ListItem> */}
    </List>
  );
};

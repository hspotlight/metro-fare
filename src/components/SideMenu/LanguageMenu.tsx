import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(() => ({
  menuRightIcon: {
    paddingRight: "28px",
  },
}));

export const LanguageMenu = () => {
  const { t: translate, i18n } = useTranslation();
  const classes = useStyles();

  const checkBox = (language: "en" | "th") => {
    if (i18n.language === language) {
      return (
        <ListItemSecondaryAction className={classes.menuRightIcon}>
          <CheckIcon />
        </ListItemSecondaryAction>
      );
    }
    return null;
  };

  const handleChangeLanguage = (language: "en" | "th") => {
    i18n.changeLanguage(language);
  };

  return (
    <List component="nav" aria-label="sidemenu">
      <ListItem button key="th" onClick={() => handleChangeLanguage("th")}>
        <ListItemText primary={translate("language.th")} />
        {checkBox("th")}
      </ListItem>
      <ListItem button key="en" onClick={() => handleChangeLanguage("en")}>
        <ListItemText primary={translate("language.en")} />
        {checkBox("en")}
      </ListItem>
    </List>
  );
};

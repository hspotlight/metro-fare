import { makeStyles, Link, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  container: {
    padding: "16px",
  },
}));

export const ContactMenu = () => {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  return (
    <Grid container alignItems="center" className={classes.container}>
      <Typography variant="body1">
        {translate("contact.developedBy")} &nbsp;
      </Typography>
      <Link href="https://hspotlight.netlify.app/">HSpotlight</Link>
    </Grid>
  );
};

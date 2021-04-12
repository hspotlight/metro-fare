import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLineTypeLabel, getStationName } from "../services/util.service";
import { METRO_STATION_ID, Station } from "../types";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  listItem: {
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  showMoreContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

type SearchResultListProps = {
  searchItems: Station[];
  handleOnItemClick: (_: METRO_STATION_ID) => void;
};

const limit = 10;

export const SearchResultList = ({
  searchItems,
  handleOnItemClick,
}: SearchResultListProps) => {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const searchItemLength = searchItems.length;
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const [showMoreItems, setShowMoreItems] = useState<boolean>(false);

  const topTenItems = searchItems.slice(0, limit);
  const moreItems = searchItems.slice(limit);

  const handleClickShowMore = () => {
    setShowMoreButton(false);
    setShowMoreItems(true);
  };

  useEffect(() => {
    setShowMoreButton(searchItemLength > limit);
  }, [searchItemLength]);

  if (searchItems.length === 0) {
    return null;
  }

  return (
    <>
      <Paper>
        <List>
          {topTenItems.map((item, index) => (
            <SearchItem key={index} item={item} onClick={handleOnItemClick} />
          ))}
          {showMoreItems &&
            moreItems.map((item, index) => (
              <SearchItem key={index} item={item} onClick={handleOnItemClick} />
            ))}
        </List>
      </Paper>
      {showMoreButton && (
        <div className={classes.showMoreContainer}>
          <Button onClick={handleClickShowMore}>
            <Typography variant="button">
              {translate("common.showMore")}
            </Typography>
          </Button>
        </div>
      )}
    </>
  );
};

type SearchItemProps = {
  item: Station;
  onClick: (_: METRO_STATION_ID) => void;
};

const SearchItem = ({ item, onClick }: SearchItemProps) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const lineType = getLineTypeLabel(item.lineType);
  const stationName = getStationName(item, i18n.language);
  return (
    <ListItem className={classes.listItem} onClick={() => onClick(item.id)}>
      <ListItemText primary={`${lineType} [${item.id}] ${stationName}`} />
    </ListItem>
  );
};

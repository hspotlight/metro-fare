import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLineTypeLabel, getStationName } from "../services/util.service";
import { METRO_STATION_ID, Station } from "../types";
import "../styles/SearchResultList.scss";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  listItem: {
    paddingLeft: "8px",
    paddingRight: "8px",
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

  return (
    <div className="search-result-list">
      <List>
        {topTenItems.map((item, index) => (
          <SearchItem key={index} item={item} onClick={handleOnItemClick} />
        ))}
        {showMoreItems &&
          moreItems.map((item, index) => (
            <SearchItem key={index} item={item} onClick={handleOnItemClick} />
          ))}
      </List>
      {showMoreButton && (
        <Button onClick={handleClickShowMore}>Show More</Button>
      )}
    </div>
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

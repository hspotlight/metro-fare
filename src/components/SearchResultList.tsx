import React from "react";
import { useTranslation } from "react-i18next";
import { getLineTypeLabel, getStationName } from "../services/util.service";
import { METRO_STATION_ID, Station } from "../types";
import "../styles/SearchResultList.scss";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";

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

export const SearchResultList = ({
  searchItems,
  handleOnItemClick,
}: SearchResultListProps) => {
  return (
    <div className="search-result-list">
      <List>
        {searchItems.map((item, index) => (
          <SearchItem key={index} item={item} onClick={handleOnItemClick} />
        ))}
      </List>
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

import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/HeaderBar.scss";

type HeaderBarProps = {
  title: string;
  backButton?: boolean;
};

const HeaderBar = ({ title, backButton }: HeaderBarProps) => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <div className="header-bar">
      {backButton && (
        <div className="back-button" onClick={goBack}>
            <i className="fa fa-chevron-left" aria-hidden="true" style={{color: 'black'}} />
        </div>
      )}
      <div className="header-title">{title}</div>
    </div>
  );
};

export default HeaderBar;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/HeaderBar.scss";

type HeaderBarProps = {
  title: string;
  backButton?: string;
};

const HeaderBar = ({ title, backButton }: HeaderBarProps) => {
  return (
    <div className="header-bar">
      {backButton && (
        <div className="back-button">
          <Link to={backButton}>
            <i className="fa fa-chevron-left" aria-hidden="true" style={{color: 'black'}} />
          </Link>
        </div>
      )}
      <div className="header-title">{title}</div>
    </div>
  );
};

export default HeaderBar;

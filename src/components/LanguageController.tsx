import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageController.scss";

const LanguageController = () => {
  const { i18n } = useTranslation();
  const languageActiveClass = (language: string) =>
    i18n.language === language ? "language-active" : "";

  return (
    <section style={{ display: "flex", alignItems: "center" }}>
      <div
        data-testid="language-controller-th"
        className={"flag th " + languageActiveClass("th")}
        onClick={() => i18n.changeLanguage("th")}
      ></div>
      <div
        data-testid="language-controller-en"
        className={"flag en " + languageActiveClass("en")}
        onClick={() => i18n.changeLanguage("en")}
      ></div>
    </section>
  );
};

export default LanguageController;

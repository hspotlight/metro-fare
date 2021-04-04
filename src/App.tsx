import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./contexts/i18n";
import TripProvider from "./contexts/TripProvider";
import { MetroMap } from "./components/map/MetroMap";
import "./styles/App.scss";
import MapProvider from "./contexts/MapProvider";
import { BrowserRouter } from "react-router-dom";
import "./config/firebaseConfig";
import { AppHeaderBar } from "./components/AppHeaderBar/AppHeaderBar";

const App = () => {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <TripProvider>
            <MapProvider>
              <AppHeaderBar />
              <div style={{ height: "calc(100% - 64px)" }}>
                <MetroMap />
              </div>
            </MapProvider>
          </TripProvider>
        </BrowserRouter>
      </I18nextProvider>
    </>
  );
};

export default App;

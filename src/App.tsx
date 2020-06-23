import React from "react";
import Calculator from "./components/Calculator";
import {I18nextProvider} from 'react-i18next';
import i18n from './contexts/i18n';
import "./styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <Calculator />
      </I18nextProvider>
    </div>
  );
};

export default App;

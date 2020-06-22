import React from "react";
import Calculator from "./components/Calculator";
import "./styles/App.scss";
import LanguageProvider from "./contexts/LanguageProvider";

const App = () => {
  return (
    <div className="App">
      <LanguageProvider>
        <Calculator />
      </LanguageProvider>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { FareService, TravelRoute } from "../services/fare.service";
import {
  METRO_STATION,
  BTS_SILOM_STATION,
  LineType,
} from "../types";
import { STATIONS, Station } from "../data/Stations";
import { FindRouteMethod } from "../services/graph.service";
import CalculationResult from "./CalculationResult";
import "../styles/Calculator.scss";
import { getStationName } from "../services/util.service";
import { useTranslation } from "react-i18next";

const Calculator = () => {
  const { t: translate, i18n } = useTranslation();
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [travelRoute, setTravelRoute] = useState<TravelRoute | undefined>(
    undefined
  );
  const [findRouteMethod, setFindRouteMethod] = useState<FindRouteMethod>('lowestHop');
  const [isFormInvalid, setFormInValid] = useState<boolean>(false);

  const calculateRoute = () => {
    const travelRoute = FareService.calculate(
      source as METRO_STATION,
      destination as METRO_STATION,
      findRouteMethod
    );
    setTravelRoute(travelRoute);
  };

  const resetForm = () => {
    setSource("");
    setDestination("");
    setErrorMessage("");
    setFindRouteMethod('lowestHop');
    setTravelRoute(undefined);
  };

  useEffect(() => {
    const isFormValid = (source.length === 0 || destination.length === 0);
    setFormInValid(isFormValid);
  }, [source, destination]);

  return (
    <section className="calculator-container">
      <section className="header">
        <h1>Metro Fare</h1>
        <section style={{display: 'flex', alignItems: 'center'}}>
          <div className={"flag th " + (i18n.language === "th" ? "language-active" : "")} onClick={() => i18n.language !== "th" && i18n.changeLanguage("th")}></div>
          <div className={"flag en " + (i18n.language === "en" ? "language-active" : "")} onClick={() => i18n.language !== "en" && i18n.changeLanguage("en")}></div>
        </section>
      </section>
      <SelectStationComponent
        title={translate('route.source')}
        value={source}
        onChange={setSource}
      />
      <SelectStationComponent
        title={translate('route.destination')}
        value={destination}
        onChange={setDestination}
      />
      <FormControl style={{ width: "100%" }} required>
        <InputLabel htmlFor={'find-route-method'}>{translate('findRouteMethod.method')}</InputLabel>
        <Select
          native
          onChange={(e: any) => setFindRouteMethod(e.target.value as FindRouteMethod)}
          name={"Line"}
          value={findRouteMethod}
          inputProps={{
            id: 'find-route-method',
          }}
        >
          <option value={"lowestHop"}>{translate('findRouteMethod.lowestHop')}</option>
          <option value={'lowestFare'}>{translate('findRouteMethod.lowestFare')}</option>
        </Select>
        <FormHelperText>{translate('common.required')}</FormHelperText>
      </FormControl>
      <section className="form-button-group">
        <Button variant="contained" color="secondary" onClick={resetForm}>
        {translate('common.reset')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateRoute}
          style={{ marginLeft: "20px" }}
          disabled={isFormInvalid}
        >
          {translate('common.search')}
        </Button>
      </section>
      {errorMessage.length > 0 && <ErrorMessage errorMessage={errorMessage} />}
      {travelRoute !== undefined && <CalculationResult travelRoute={travelRoute} language={i18n.language}/>}
    </section>
  );
};

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="form-error-message">{errorMessage}</div>;
};

const SelectStationComponent = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: Function;
}) => {
  const { t: translate, i18n } = useTranslation();
  const [lineType, setLineType] = useState<LineType>(LineType.MRT_BLUE);
  const lineElementId = title + "-line-native-required";
  const selectElementId = title + "-native-required";
  const stationsName = STATIONS.filter(station => station.lineType === lineType && !station.isNotAvailable);

  const handleLineTypeSelectChange = (value: string) => {
    setLineType(value as LineType);
    onChange("");
  };

  useEffect(() => {
    if (Object.values(BTS_SILOM_STATION).find((btsKey => btsKey === value))) {
      setLineType(LineType.BTS_SILOM);
    } else if (value.length !== 0) {
      setLineType(LineType.MRT_BLUE);
    }
  }, [value]);

  return (
    <section>
      <FormControl style={{ width: "145px" }} required>
        <InputLabel htmlFor={lineElementId}>{translate('lineType.line')}</InputLabel>
        <Select
          native
          onChange={(e: any) => handleLineTypeSelectChange(e.target.value)}
          name={"Line"}
          value={lineType}
          inputProps={{
            id: lineElementId,
          }}
        >
          <option value={"MRT_BLUE"}>{translate('lineType.mrtBlue')}</option>
          <option value={"BTS_SILOM"}>{translate('lineType.btsSilom')}</option>
        </Select>
        <FormHelperText>{translate('common.required')}</FormHelperText>
      </FormControl>
      <FormControl style={{ width: "calc(100% - 145px)" }} required>
        <InputLabel htmlFor={selectElementId}>{title}</InputLabel>
        <Select
          native
          onChange={(e) => onChange(e.target.value)}
          name={title}
          value={value}
          inputProps={{
            id: selectElementId,
          }}
        >
          <option value="" disabled></option>
          {stationsName.map((station: Station) => {
            const label = "(" + station.key + ") " + getStationName(station, i18n.language);
            return (
              <option key={station.key} value={station.key}>
                {label}
              </option>
            );
          })}
        </Select>
        <FormHelperText>{translate('common.required')}</FormHelperText>
      </FormControl>
    </section>
  );
};

export default Calculator;

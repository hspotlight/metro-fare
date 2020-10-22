import React from "react";
import { render } from "@testing-library/react";

import SelectedRoute from "../SelectedRoute";
import { MRT_BLUE_STATION, LineType, BTS_SUKHUMVIT_STATION, TravelRoute, Station, BTS_SILOM_STATION } from "../../types";

let travelRoute: TravelRoute;
let station: Station;

import * as uiservice from "../../services/ui-style.service";
jest.mock("../../services/ui-style.service");

const mockGetInterChangeLine = uiservice.getInterChangeLine as jest.MockedFunction<typeof uiservice.getInterChangeLine>;
const mockGetDottedLineStyle = uiservice.getDottedLineStyle as jest.MockedFunction<typeof uiservice.getDottedLineStyle>;
const mockGetStationIconStyle = uiservice.getStationIconStyle as jest.MockedFunction<typeof uiservice.getStationIconStyle>;

import * as service from "../../services/util.service";
jest.mock("../../services/util.service");

const mockGetStation = service.getStation as jest.MockedFunction<typeof service.getStation>;
const mockGetStationName = service.getStationName as jest.MockedFunction<typeof service.getStationName>;

let mockedTranslate = jest.fn();
let mockedChangeLanguage = jest.fn();
jest.mock("react-i18next", () => {
  return {
    useTranslation: () => {
      return ({
        i18n: {
          changeLanguage: mockedChangeLanguage,
        },
        t: mockedTranslate,
      })
    }
  }
});

beforeEach(() => {
  jest.clearAllMocks();
  station = {
    lineType: LineType.MRT_BLUE,
    key: MRT_BLUE_STATION.BANG_WA,
    nameEN: 'english',
    nameTH: 'thai',
    isNotAvailable: false,
    position: [0, 0]
  };
  travelRoute = {
    route: [
      {
        route: [MRT_BLUE_STATION.SILOM, MRT_BLUE_STATION.LUMPHINI],
        lineType: LineType.MRT_BLUE,
        fare: 0
      },
      {
        route: [BTS_SUKHUMVIT_STATION.ARI, BTS_SUKHUMVIT_STATION.ASOK],
        lineType: LineType.BTS_SUKHUMVIT,
        fare: 0
      }
    ],
    fare: 0,
    source: MRT_BLUE_STATION.SILOM,
    destination: MRT_BLUE_STATION.LUMPHINI
  };
  mockGetStation.mockReturnValue(station);
});

describe("<SelectedRoute />", () => {
  test("should render the component without errors", async () => {
    render(<SelectedRoute travelRoute={travelRoute}/>);;
  });

  test("should show the fare and translated text", async () => {
    mockedTranslate.mockReturnValue("Fare");
    travelRoute.fare = 150;
    const { findByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const component =  await findByTestId("selected-route-fare");

    expect(mockedTranslate.mock.calls[0][0]).toBe("route.fare");
    expect(component).toHaveTextContent("Fare: 150");
  });

  test("should show the container with correct classname", async () => {
    const { findByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const component =  await findByTestId("selected-route-container");

    expect(component).toHaveClass("travel-route-container");
  });

  test("should call getInterChangeLine if there are more than 2 route segments", async () => {
    travelRoute.route = [
      { route: [], lineType: LineType.MRT_BLUE, fare: 0},
      { route: [], lineType: LineType.BTS_SUKHUMVIT, fare: 0},
      { route: [], lineType: LineType.BTS_SILOM, fare: 0},
    ]
    mockGetInterChangeLine.mockReturnValueOnce("arl-dotted-line").mockReturnValueOnce("interchange-dotted-line");
    const { findAllByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const components =  await findAllByTestId("selected-route-interchange-dotted-line-style");

    expect(components.length).toBe(3);
    expect(components[1]).toHaveClass("arl-dotted-line");
    expect(components[2]).toHaveClass("interchange-dotted-line");
    expect(mockGetInterChangeLine.mock.calls[0]).toEqual([LineType.BTS_SUKHUMVIT, LineType.MRT_BLUE]);
    expect(mockGetInterChangeLine.mock.calls[1]).toEqual([LineType.BTS_SILOM, LineType.BTS_SUKHUMVIT]);
  });

test("should not have stations if station is not available", async () => {
    station.isNotAvailable = true;
    mockGetStation.mockReturnValue(station);
    const { queryByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const component =  await queryByTestId("selected-route-station");

    expect(component).toBeNull();
  });

  test("should have station names correct if station is available", async () => {
    travelRoute.route = [
      { route: [BTS_SILOM_STATION.SALA_DAENG, BTS_SILOM_STATION.SIAM], lineType: LineType.MRT_BLUE, fare: 0},
    ]
    station.isNotAvailable = false;
    station.key = BTS_SILOM_STATION.SIAM;
    mockGetStation.mockReturnValue(station);
    mockGetStationName.mockReturnValueOnce("station1").mockReturnValueOnce("station2");
    const { getAllByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const components = await getAllByTestId("selected-route-station-name");

    expect(mockGetStation.mock.calls[0][0]).toBe(BTS_SILOM_STATION.SALA_DAENG);
    expect(mockGetStation.mock.calls[1][0]).toBe(BTS_SILOM_STATION.SIAM);
    expect(components.length).toBe(2);
    expect(components[0]).toHaveTextContent(`(${BTS_SILOM_STATION.SIAM}) station1`);
    expect(components[1]).toHaveTextContent(`(${BTS_SILOM_STATION.SIAM}) station2`);
  });

  test("should use dotted line style from ui service get dotted line style when the index is not zero", async () => {
    mockGetDottedLineStyle.mockReturnValue("bts-silom-dotted-line");
    const { getAllByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const components = await getAllByTestId("selected-route-station-dotted-line-style");

    expect(mockGetDottedLineStyle.mock.calls[0][0]).toBe(station.lineType);
    expect(components[0]).toHaveClass("bts-silom-dotted-line");
  });

  test("should not call dotted line style if there is only one station", async () => {
    travelRoute.route = [
      { route: [ BTS_SILOM_STATION.SIAM ], lineType: LineType.MRT_BLUE, fare: 0},
    ]
    const { queryByAltText } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const component = await queryByAltText("selected-route-station-dotted-line-style");

    expect(component).toBeNull();
  });

  test("should use station icon style from ui service", async () => {
    mockGetStationIconStyle.mockReturnValue("bts-silom-icon");
    const { getAllByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const components = await getAllByTestId("selected-route-station-icon-style");

    expect(mockGetStationIconStyle.mock.calls[0][0]).toBe(station.lineType);
    expect(components[0]).toHaveClass("bts-silom-icon");
  });
});

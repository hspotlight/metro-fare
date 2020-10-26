import React from "react";
import { render } from "@testing-library/react";

import SelectedRoute from "../SelectedRoute";
import { MRT_BLUE_STATION, LineType, BTS_SUKHUMVIT_STATION, TravelRoute, Station, BTS_SILOM_STATION } from "../../types";

const travelRoute: TravelRoute = {
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
const station: Station = {
  lineType: LineType.MRT_BLUE,
  key: MRT_BLUE_STATION.BANG_WA,
  nameEN: 'english',
  nameTH: 'thai',
  isNotAvailable: false,
  position: [0, 0]
};  

import * as uiService from "../../services/ui-style.service";
jest.mock("../../services/ui-style.service");

const mockGetInterChangeLine = uiService.getInterChangeLine as jest.MockedFunction<typeof uiService.getInterChangeLine>;
const mockGetDottedLineStyle = uiService.getDottedLineStyle as jest.MockedFunction<typeof uiService.getDottedLineStyle>;
const mockGetStationIconStyle = uiService.getStationIconStyle as jest.MockedFunction<typeof uiService.getStationIconStyle>;

import * as utilService from "../../services/util.service";
jest.mock("../../services/util.service");

const mockGetStation = utilService.getStation as jest.MockedFunction<typeof utilService.getStation>;
const mockGetStationName = utilService.getStationName as jest.MockedFunction<typeof utilService.getStationName>;

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

describe("<SelectedRoute />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetStation.mockReturnValue(station);
  });

  it("should render the component without errors", async () => {
    render(<SelectedRoute travelRoute={travelRoute}/>);
  });

  it("should show the fare and translated text", async () => {
    mockedTranslate.mockReturnValue("Fare");
    const travelRouteWith150Fare = {
      ...travelRoute,
      fare: 150
    }
    const { findByTestId } = render(<SelectedRoute travelRoute={travelRouteWith150Fare}/>);

    const component =  await findByTestId("selected-route-fare");

    expect(mockedTranslate.mock.calls[0][0]).toBe("route.fare");
    expect(component).toHaveTextContent("Fare: 150");
  });

  it("should show the container with correct classname", async () => {
    const { findByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const component =  await findByTestId("selected-route-container");

    expect(component).toHaveClass("travel-route-container");
  });

  it("should call getInterChangeLine if there are more than 2 route segments", async () => {
    const travelRouteWith3Routes = {
      ...travelRoute,
      route: [
        { route: [], lineType: LineType.MRT_BLUE, fare: 0},
        { route: [], lineType: LineType.BTS_SUKHUMVIT, fare: 0},
        { route: [], lineType: LineType.BTS_SILOM, fare: 0},
      ]
    }
    mockGetInterChangeLine.mockReturnValueOnce("arl-dotted-line").mockReturnValueOnce("interchange-dotted-line");
    const { findAllByTestId } = render(<SelectedRoute travelRoute={travelRouteWith3Routes}/>);

    const components =  await findAllByTestId("selected-route-interchange-dotted-line-style");

    expect(components.length).toBe(3);
    expect(components[1]).toHaveClass("arl-dotted-line");
    expect(components[2]).toHaveClass("interchange-dotted-line");
    expect(mockGetInterChangeLine.mock.calls[0]).toEqual([LineType.BTS_SUKHUMVIT, LineType.MRT_BLUE]);
    expect(mockGetInterChangeLine.mock.calls[1]).toEqual([LineType.BTS_SILOM, LineType.BTS_SUKHUMVIT]);
  });

  it("should not have stations if station is not available", async () => {
    const notAvailableStation = {
      ...station,
      isNotAvailable: true
    };
    mockGetStation.mockReturnValue(notAvailableStation);
    const { queryByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const component =  await queryByTestId("selected-route-station");

    expect(component).toBeNull();
  });

  it("should have station names correct if station is available", async () => {
    const travelRouteWithOneRoute = {
      ...travelRoute,
      route: [
        { route: [BTS_SILOM_STATION.SALA_DAENG, BTS_SILOM_STATION.SIAM], lineType: LineType.MRT_BLUE, fare: 0},
      ]
    }
    const stationWithSiamKey = {
      ...station,
      key: BTS_SILOM_STATION.SIAM
    };
    mockGetStation.mockReturnValue(stationWithSiamKey);
    mockGetStationName.mockReturnValueOnce("station1").mockReturnValueOnce("station2");
    const { getAllByTestId } = render(<SelectedRoute travelRoute={travelRouteWithOneRoute}/>);

    const components = await getAllByTestId("selected-route-station-name");

    expect(mockGetStation.mock.calls[0][0]).toBe(BTS_SILOM_STATION.SALA_DAENG);
    expect(mockGetStation.mock.calls[1][0]).toBe(BTS_SILOM_STATION.SIAM);
    expect(components.length).toBe(2);
    expect(components[0]).toHaveTextContent(`(${BTS_SILOM_STATION.SIAM}) station1`);
    expect(components[1]).toHaveTextContent(`(${BTS_SILOM_STATION.SIAM}) station2`);
  });

  it("should use dotted line style from ui service get dotted line style when the index is not zero", async () => {
    mockGetDottedLineStyle.mockReturnValue("bts-silom-dotted-line");
    const { getAllByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const components = await getAllByTestId("selected-route-station-dotted-line-style");

    expect(mockGetDottedLineStyle.mock.calls[0][0]).toBe(station.lineType);
    expect(components[0]).toHaveClass("bts-silom-dotted-line");
  });

  it("should not call dotted line style if there is only one station", async () => {
    const travelRouteWithOneRouteAndOneStation = {
      ...travelRoute,
      route: [
        { route: [ BTS_SILOM_STATION.SIAM ], lineType: LineType.MRT_BLUE, fare: 0},
      ]
    }
    const { queryByAltText } = render(<SelectedRoute travelRoute={travelRouteWithOneRouteAndOneStation}/>);

    const component = await queryByAltText("selected-route-station-dotted-line-style");

    expect(component).toBeNull();
  });

  it("should use station icon style from ui service", async () => {
    mockGetStationIconStyle.mockReturnValue("bts-silom-icon");
    const { getAllByTestId } = render(<SelectedRoute travelRoute={travelRoute}/>);

    const components = await getAllByTestId("selected-route-station-icon-style");

    expect(mockGetStationIconStyle.mock.calls[0][0]).toBe(station.lineType);
    expect(components[0]).toHaveClass("bts-silom-icon");
  });
});

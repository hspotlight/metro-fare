import { render, screen } from "@testing-library/react";
import { DrawerContext } from "../../contexts/DrawerProvider";
import { AppHeaderBar } from "./AppHeaderBar";

jest.mock("../../config/featureToggle", () => ({
  canShowSideMenuDrawer: () => true,
}));

describe("AppHeadBar", () => {
  it("should render header text and logo", () => {
    render(
      <DrawerContext.Provider
        value={{
          showSideMenu: false,
          setSideMenu: () => {},
          showRouteSearchDrawer: false,
          setRouteSearchDrawer: () => {},
        }}
      >
        <AppHeaderBar />
      </DrawerContext.Provider>
    );

    expect(screen.getByText(/MetroFare/)).toBeInTheDocument();
    expect(screen.getByAltText(/Metro Fare logo/)).toBeInTheDocument();
  });

  it("should render menu button", () => {
    render(
      <DrawerContext.Provider
        value={{
          showSideMenu: false,
          setSideMenu: () => {},
          showRouteSearchDrawer: false,
          setRouteSearchDrawer: () => {},
        }}
      >
        <AppHeaderBar />
      </DrawerContext.Provider>
    );

    expect(screen.getByRole("button", { name: "menu" }));
  });
});

import React from "react";
import renderer from "react-test-renderer";
import {AppHeaderBar} from "../components/AppHeaderBar/AppHeaderBar";
import { render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe("<AppHeaderBar /> ", () => {
  it("renders correctly", () => { //a snapshot test
    const tree = renderer.create(<AppHeaderBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders site name correctly", ()=>{
    const { queryByTestId, queryByText } = render(<AppHeaderBar />);
    expect(queryByText("MetroFare")).toBeTruthy();
  })

  it("renders drawer button correctly", ()=>{
    const { queryByTestId, queryByText } = render(<AppHeaderBar />);
    expect(queryByTestId("drawer-btn")).toBeTruthy();
  })

});

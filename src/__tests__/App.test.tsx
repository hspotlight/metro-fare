import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import { render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe("<App /> ", () => {
  it("placeholder test", ()=>{
    expect(true).toBeTruthy();
  })

  // it("renders correctly", () => {
  //   const tree = renderer.create(<App />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it("renders drawer when the drawer button is clicked", async ()=>{
  //   const { queryByTestId, queryByText } = render(<App />);
  //   const drawerBtn = queryByTestId("drawer-btn") as HTMLElement;

  //   await userEvent.click(drawerBtn);

  //   expect(queryByText("Settings")).toBeTruthy();
  // })

});

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import LanguageController from "../LanguageController";

let mockedLanguage = "";
let mockedChangeLanguage = jest.fn();
jest.mock("react-i18next", () => {
  return {
    useTranslation: () => {
      return ({
        i18n: {
          language: mockedLanguage,
          changeLanguage: mockedChangeLanguage,
        }
      })
    }
  }
});

describe("<LanguageController />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have correct class name with th language", async () => {
    mockedLanguage = "th";
    const { findByTestId } = render(<LanguageController />);

    const controller =  await findByTestId("language-controller-th");

    expect(controller).toHaveClass("flag th language-active");
  });

  it("should have correct class name with en language", async () => {
    mockedLanguage = "en";
    const { findByTestId } = render(<LanguageController />);
    
    const controller =  await findByTestId("language-controller-en");

    expect(controller).toHaveClass("flag en language-active");
  });

  it("should call change language with th when click th", async () => {
    const { findByTestId } = render(<LanguageController />);
    const controller = await findByTestId("language-controller-th");

    fireEvent.click(controller);

    expect(mockedChangeLanguage.mock.calls[0][0]).toBe("th");
  });

  it("should call change language with en when click en", async () => {
    const { findByTestId } = render(<LanguageController />);
    const controller =  await findByTestId("language-controller-en");

    fireEvent.click(controller);

    expect(mockedChangeLanguage.mock.calls[0][0]).toBe("en");
  });
});
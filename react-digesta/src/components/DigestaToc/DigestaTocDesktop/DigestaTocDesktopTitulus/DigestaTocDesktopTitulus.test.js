import { render, screen } from "../../../../../test-utils";
import DigestaTocDesktopTitulus from "./DigestaTocDesktopTitulus";
import Spinner from "../../../UI/spinner/Spinner";
import { act, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";
import { digestaActions } from "../../../../store/digesta-slice";
import { MemoryRouter } from "react-router-dom";
import DigestaTocDesktopLex from "../DigestaTocDesktopLex/DigestaTocDesktopLex";

jest.mock("../../../UI/spinner/Spinner", () => jest.fn());

jest.mock("../DigestaTocDesktopLex/DigestaTocDesktopLex", () => jest.fn());
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("DigestaTocDesktopTitulus", () => {
  beforeEach(() => {
    Spinner.mockClear();
    DigestaTocDesktopLex.mockClear();
    useSelector.mockClear();
    useDispatch.mockClear();
  });
  test("renders the component with titulus details, closed if not chosen", async () => {
    const mockLeges = jest.fn();
    DigestaTocDesktopLex.mockImplementation(() => mockLeges);
    useSelector.mockReturnValue(null);
    render(
      <DigestaTocDesktopTitulus
        titulus={{ id: 1, number: 1, title_lat: "Titulus Primus" }}
      />
    );

    await waitFor(() => {
      const tit1 = screen.getByText(/Titulus Primus/i);
      expect(tit1).toBeInTheDocument();
      expect(DigestaTocDesktopLex).not.toHaveBeenCalled();
    });
  });
  test("renders the Spinner component while fetching data", () => {
    // const mockSpinner = jest.fn()
    // Spinner.mockImplementation(() => mockSpinner)

    render(
      <DigestaTocDesktopTitulus
        titulus={{ id: 1, number: 1, title_lat: "Titulus 1" }}
      />
    );

    expect(Spinner).toHaveBeenCalled();
  });

  test("dispatches setChosenTitulusId action when the titulus is clicked", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(1); // chosenTitulusId

    render(
      <MemoryRouter>
        <DigestaTocDesktopTitulus
          titulus={{ id: 1, number: 1, title_lat: "Titulus Primus" }}
        />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const tit1 = await screen.findByRole("button");

    await act(async () => {
      await user.click(tit1);
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      digestaActions.setChosenTitulusId(null)
    );
    // content is closed
  });
});

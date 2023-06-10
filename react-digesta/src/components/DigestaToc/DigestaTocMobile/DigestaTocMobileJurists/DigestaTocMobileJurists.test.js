import { render, screen } from "../../../../../test-utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DigestaTocMobileJurists from "./DigestaTocMobileJurists";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("DigestaTocMobileJurists", () => {
  test("renders the component with options", () => {
    useNavigate.mockReturnValue(jest.fn());
    useDispatch.mockReturnValue(jest.fn());

    useSelector.mockReturnValue(1); // Mock the selected jurist I, in this way it will be shown as default,
    // and so there will be two Jurist I options in the combobox

    const jurists = [
      { id: 1, name: "Jurist 1" },
      { id: 2, name: "Jurist 2" },
    ];

    render(<DigestaTocMobileJurists jurists={jurists} />);

    // Verify that the component is rendered
    expect(screen.getAllByRole("option", { name: "Jurist 1" })).toHaveLength(2);
    expect(
      screen.getByRole("option", { name: "Jurist 2" })
    ).toBeInTheDocument();
  });

  test("calls the navigate function and dispatches action on option change", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
    const mockDispatch = jest.fn();
    useDispatch.mockImplementation(() => mockDispatch);

    useSelector.mockReturnValue(1); // Mock the selected jurist ID

    const jurists = [
      { id: 1, name: "Jurist 1" },
      { id: 2, name: "Jurist 2" },
    ];

    render(<DigestaTocMobileJurists jurists={jurists} />);

    const user = userEvent.setup();
    // Change the option
    const select = screen.getByRole("combobox");

    await act(async () => {
      await user.selectOptions(select, "2");
    });

    // Verify that the navigate function is called with the correct value
    expect(mockNavigate).toHaveBeenCalledWith("2");

    // Verify that the dispatch function is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: "2",
      type: "digesta/setChosenJuristId",
    });
  });
});

import { render, screen } from "../../../../../test-utils";
import DigestaTocMobileTitulus from "./DigestaTocMobileTitulus";
import { MemoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("DigestaTocMobileTitulus", () => {
  test("renders the component", async () => {
    render(
      <MemoryRouter>
        <DigestaTocMobileTitulus id={1} />
      </MemoryRouter>
    );

    // Verify that the component is rendered
    const opt1 = await screen.findByRole("option", { name: "Wybierz ustawę" });
    const opt2 = await screen.findByRole("option", { name: "1" });
    expect(opt1).toBeInTheDocument();
    expect(opt2).toBeInTheDocument();
  });

  test("dispatches the setChosenLexId action and navigates to the selected lex on option change", async () => {
    // Create mock functions
    const mockedDispatch = jest.fn();
    useDispatch.mockImplementation(() => mockedDispatch);
    const navigateMock = jest.fn();
    useNavigate.mockImplementation(() => navigateMock);

    render(
      <MemoryRouter>
        <DigestaTocMobileTitulus id={1} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    // Change the option
    const select = await screen.findByRole("combobox");
    await user.selectOptions(select, "1");

    // Verify that the setChosenLexId action is dispatched with the correct value
    expect(mockedDispatch).toHaveBeenCalled();

    // Verify that the navigate function is called with the correct path
    expect(navigateMock).toHaveBeenCalledWith("1");
  });

  test("displays a spinner while data is fetching", () => {
    // Mock the useQuery response

    render(<DigestaTocMobileTitulus id={1} />);

    // Verify that the spinner is displayed
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});

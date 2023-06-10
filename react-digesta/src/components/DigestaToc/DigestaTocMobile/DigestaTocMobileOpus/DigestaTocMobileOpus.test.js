import { render, screen } from "../../../../../test-utils";
import { useDispatch } from "react-redux";
import DigestaTocMobileOpus from "./DigestaTocMobileOpus";
import { MemoryRouter } from "react-router-dom";
import { getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

// Mock the useDispatch hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("DigestaTocMobileOpus", () => {
  const opus = {
    libri: [
      { id: 1, liber: "I" },
      { id: 2, liber: "II" },
    ],
  };
  const lexPath = "example/path";

  test("renders the component with book options", () => {
    render(
      <MemoryRouter>
        <DigestaTocMobileOpus opus={opus} lexPath={lexPath} />
      </MemoryRouter>
    );

    const chooseBookLabel = screen.getByText("Wybierz księgę");
    const bookOption1 = screen.getByRole("option", {
      name: "Księga I",
    });
    const bookOption2 = screen.getByRole("option", {
      name: "Księga II",
    });
    expect(chooseBookLabel).toBeInTheDocument();
    expect(bookOption1).toBeInTheDocument();
    expect(bookOption2).toBeInTheDocument();
  });

  test("dispatches setChosenOpusLiberId action on book selection", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockImplementation(() => {
      return mockDispatch;
    });

    render(
      <MemoryRouter>
        <DigestaTocMobileOpus opus={opus} lexPath={lexPath} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const bookOptions = screen.getByRole("combobox");
    await act(async () => {
      await user.selectOptions(bookOptions, "1");
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: "1",
      type: "digesta/setChosenOpusLiberId",
    });
  });

  test("renders DigestaTocMobileOpusLiber component when a book is chosen", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockImplementation(() => {
      return mockDispatch;
    });
    render(
      <MemoryRouter>
        <DigestaTocMobileOpus opus={opus} lexPath={lexPath} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const bookOptions = screen.getByRole("combobox");
    await act(async () => {
      await user.selectOptions(bookOptions, "1");
    });

    const option = await screen.findByRole("option", {
      name: "Wybierz fragment",
    });
    expect(option).toBeInTheDocument();
  });
});

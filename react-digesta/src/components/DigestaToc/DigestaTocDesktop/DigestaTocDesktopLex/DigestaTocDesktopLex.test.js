import { render, screen } from "../../../../../test-utils";
import { MemoryRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DigestaTocDesktopLex from "./DigestaTocDesktopLex";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { digestaActions } from "../../../../store/digesta-slice";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("DigestaTocDesktopLex", () => {
  const lex = {
    id: 1,
    lex_nr: "1",
    paragraphi: [
      { id: 2, key: "1" },
      { id: 3, key: "2" },
      { id: 1, key: "pr" },
    ],
  };

  test("renders the component with lex and paragraphi items", () => {
    render(
      <MemoryRouter>
        <DigestaTocDesktopLex
          address="D.1"
          lex={lex}
          legesLength={1}
          path="/"
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "D.1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toBeInTheDocument();
  });

  test("dispatches setChosenLexId when the NavLink is clicked", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(1);
    render(
      <MemoryRouter>
        <DigestaTocDesktopLex
          address="D.1"
          lex={lex}
          legesLength={1}
          path="/"
        />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const leks = screen.getByRole("link", { name: "D.1" });

    await act(async () => {
      await user.click(leks);
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      digestaActions.setChosenLexId(lex.id)
    );
  });

  test("renders the component with default address when address prop is not provided", () => {
    render(
      <MemoryRouter>
        <DigestaTocDesktopLex lex={lex} legesLength={1} path="/" />
      </MemoryRouter>
    );

    expect(screen.getByText("Lex 1")).toBeInTheDocument();
  });
});

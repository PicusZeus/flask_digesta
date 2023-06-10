import { render, screen } from "../../../../../test-utils";
import DigestaTocDesktopBook from "./DigestaTocDesktopBook";
import DigestaTocDesktopTitulus from "../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus";
import { useDispatch, useSelector } from "react-redux";
import { digestaActions } from "../../../../store/digesta-slice";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../DigestaTocDesktopTitulus/DigestaTocDesktopTitulus", () =>
  jest.fn()
);

describe("DigestaTocDesktopBook", () => {
  const book = {
    id: 1,
    book_latin_name: "Book 1",
    tituli: [
      { id: 1, title: "Titulus 1" },
      { id: 2, title: "Titulus 2" },
    ],
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue(1);
  });

  test("renders the component", () => {
    const titulusMock = jest.fn();
    DigestaTocDesktopTitulus.mockImplementation(titulusMock);
    render(<DigestaTocDesktopBook book={book} />);
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(titulusMock).toHaveBeenCalledTimes(2);
  });

  test("dispatches the correct action when the button is clicked", async () => {
    const dispatchMock = useDispatch();
    render(<DigestaTocDesktopBook book={book} />);
    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await act(async () => {
      await user.click(button);
    });
    expect(dispatchMock).toHaveBeenCalledWith(
      digestaActions.setChosenBookId(null)
    );
  });
});

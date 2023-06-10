import { render, screen } from "../../../../../test-utils";
import DigestaTocDesktopBooks from "./DigestaTocDesktopBooks";
import DigestaTocDesktopBook from "../DigestaTocDesktopBook/DigestaTocDesktopBook";

jest.mock("../DigestaTocDesktopBook/DigestaTocDesktopBook", () => jest.fn());

describe("DigestaTocDesktopBooks", () => {
  const books = [
    { id: 1, title: "Book 1" },
    { id: 2, title: "Book 2" },
  ];

  test("renders the component", () => {
    const bookMock = jest.fn();
    DigestaTocDesktopBook.mockImplementation(bookMock);

    render(<DigestaTocDesktopBooks books={books} />);
    expect(screen.getByText("Digesta Iustiniani")).toBeInTheDocument();
    expect(bookMock).toHaveBeenCalledTimes(2);
  });
});

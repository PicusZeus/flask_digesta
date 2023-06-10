import { render, screen } from "../../../../../test-utils";
import DigestaTocDesktopJuristDigestaBooks from "./DigestaTocDesktopJuristDigestaBooks";
import { waitFor } from "@testing-library/react";

describe("DigestaTocDesktopJuristDigestaBooks", () => {
  const booki = [
    { id: 1, book_nr: 2, title: "Book 1" },
    { id: 2, book_nr: 1, title: "Book 2" },
  ];
  test("renders the component with correctly sorted books", async () => {
    render(<DigestaTocDesktopJuristDigestaBooks books={booki} author_id={1} />);

    expect(screen.getByText("Digesta Iustiniani")).toBeInTheDocument();

    await waitFor(() => {
      const books = screen.getAllByText(/Liber/i);
      expect(books[0]).toHaveTextContent("1");
      expect(books[1]).toHaveTextContent("2");
    });
  });
});

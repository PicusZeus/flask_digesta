import { render, screen } from "../../../../../test-utils";
import DigestaTocDesktopOpus from "./DigestaTocDesktopOpus";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";

describe("DigestaTocDesktopOpus", () => {
  test("renders opus title and author", () => {
    const opus = {
      id: 1,
      title_lat: "Opus Title",
      author: {
        name: "Author Name",
      },
      libri: [],
    };
    render(
      <MemoryRouter>
        <DigestaTocDesktopOpus opus={opus} lexPath="path/to/lex" />
      </MemoryRouter>
    );

    expect(screen.getByText("Opus Title")).toBeInTheDocument();
    expect(screen.getByText("Author Name")).toBeInTheDocument();
  });

  test("opens and closes opus on button click", async () => {
    const opus = {
      id: 1,
      title_lat: "Opus Title",
      author: {
        name: "Author Name",
      },
      libri: [{ id: 1, liber: "4" }],
    };

    render(<DigestaTocDesktopOpus opus={opus} lexPath="path/to/lex" />);
    const user = userEvent.setup();
    const opusButton = screen.getByRole("button");

    await act(async () => {
      await user.click(opusButton);
    });
    await waitFor(() => {
      const lib1 = screen.getByText(/Liber 4/i);
      expect(lib1).toBeInTheDocument();
    });
    await act(async () => {
      await user.click(opusButton);
    });
    const lib1 = screen.queryByText(/Liber 4/i);
    expect(lib1).not.toBeInTheDocument();
  });

  // Add more tests as needed for different scenarios and functionality
});

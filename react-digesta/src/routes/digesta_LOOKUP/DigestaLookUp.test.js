import { render, screen } from "../../../test-utils";
import DigestaLookUp from "./DigestaLookUp";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe("DigestaLookUp", () => {
  test("renders the component", () => {
    render(<DigestaLookUp />);
    // Add your assertions for component rendering here
    const header = screen.getByRole("heading", {
      name: "Wyszukaj tekst w Digestach",
    });
    expect(header).toBeInTheDocument();
  });
  test("performs data retrieval on form submission", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DigestaLookUp />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId("searched_term");
    await user.type(searchInput, "leges");

    expect(searchInput).toHaveValue("leges");
    const searchB = screen.getByText("Szukaj");
    expect(searchB).toBeInTheDocument();
    act(() => {
      user.click(searchB);
    });

    const res = await screen.findByText(/występuje/i);
    expect(res).toBeInTheDocument();
  });
});

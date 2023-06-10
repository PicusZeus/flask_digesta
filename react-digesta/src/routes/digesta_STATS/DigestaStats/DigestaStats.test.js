import { render, screen } from "../../../../test-utils";
import { MemoryRouter } from "react-router-dom";
import DigestaStats from "./DigestaStats";

describe("DigestaStats", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <DigestaStats />
      </MemoryRouter>
    );
    const h2 = screen.getByRole("heading", { name: "Digesta składają się z:" });
    expect(h2).toBeInTheDocument();
  });
  test("renders correctly three links", () => {
    render(
      <MemoryRouter>
        <DigestaStats />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
});

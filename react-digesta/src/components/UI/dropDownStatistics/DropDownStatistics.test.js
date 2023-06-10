import { screen, render } from "../../../../test-utils";
import DropDownStatistics from "./DropDownStatistics";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("DropDownMenu", () => {
  test("Renders correctly", () => {
    render(
      <MemoryRouter>
        <DropDownStatistics />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: /statystyki/i });
    expect(button).toBeInTheDocument();
  });
  test("renders correctly dropdown when mouse enters", async () => {
    render(
      <MemoryRouter>
        <DropDownStatistics />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /statystyki/i });
    act(() => {
      user.hover(button);
    });
    const digestaStatsLink = await screen.findByRole("link", {
      name: /digesta/i,
    });
    expect(digestaStatsLink).toBeInTheDocument();
  });
});

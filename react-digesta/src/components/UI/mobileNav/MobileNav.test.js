import { render, screen } from "../../../../test-utils";
import MobileNav from "./MobileNav";

import tokenService from "../../../services/token.service";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock("../../../services/token.service", () => {
  return {
    getUserId: jest.fn(),
  };
});
describe("MobileNav", () => {
  test("renders correctly when logged in", () => {
    tokenService.getUserId.mockImplementation(() => {
      return 1;
    });
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    );
    const logout = screen.getByText("Wyloguj się");
    expect(logout).toBeInTheDocument();
  });
  test("renders correctly when logged out", () => {
    tokenService.getUserId.mockImplementation(() => {
      return false;
    });
    render(
      <MemoryRouter>
        <MobileNav />
      </MemoryRouter>
    );
    const register = screen.getByText("Zarejestruj się");
    expect(register).toBeInTheDocument();
  });
  test("renders correct links, clicking on them toggles menu", async () => {
    const mockedOnToggle = jest.fn();
    render(
      <MemoryRouter>
        <MobileNav onToggle={mockedOnToggle} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const digestaLink = screen.getByRole("link", { name: "Digesta" });
    const jurysciLink = screen.getByRole("link", { name: "Juryści" });
    const operaLink = screen.getByRole("link", { name: "Prace jurystów" });
    const lookUpLink = screen.getByRole("link", { name: "Wyszukaj" });
    const statsLink = screen.getByRole("link", { name: "Statystyki" });

    expect(digestaLink).toHaveAttribute("href", "/digesta");
    expect(jurysciLink).toHaveAttribute("href", "/jurysci");
    expect(operaLink).toHaveAttribute("href", "/opera");
    expect(lookUpLink).toHaveAttribute("href", "/wyszukaj");
    expect(statsLink).toHaveAttribute("href", "/statystyki");

    await act(async () => {
      await user.click(digestaLink);
      await user.click(jurysciLink);
      await user.click(operaLink);
      await user.click(lookUpLink);
      await user.click(statsLink);
    });

    expect(mockedOnToggle).toHaveBeenCalledTimes(5);
  });
});

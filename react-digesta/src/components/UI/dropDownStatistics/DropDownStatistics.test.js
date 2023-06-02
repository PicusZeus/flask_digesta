import { screen, render } from "../../../../test-utils";
import DropDownStatistics from "./DropDownStatistics";
import {MemoryRouter} from "react-router-dom";

describe("DropDownMenu", () => {
  test("Renders correctly", () => {
    render(<MemoryRouter><DropDownStatistics /></MemoryRouter>);
    const button = screen.getByRole("button", { name: /statystyki/i });
    expect(button).toBeInTheDocument();
  });
});

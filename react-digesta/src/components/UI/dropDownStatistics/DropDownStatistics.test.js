import { screen, render } from "../../../../test-utils";
import DropDownStatistics from "./DropDownStatistics";

describe("DropDownMenu", () => {
  test("Renders correctly", () => {
    render(<DropDownStatistics />);
    const button = screen.getByRole("button", { name: /statystyki/i });
    expect(button).toBeInTheDocument();
  });
});

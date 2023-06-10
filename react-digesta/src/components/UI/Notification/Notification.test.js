import { render, screen } from "../../../../test-utils";
import Notification from "./Notification";

describe("Notification", () => {
  test("renders correctly", () => {
    render(<Notification status={200} message={"good"} title={"better"} />);
    const message = screen.getByText("good");
    const title = screen.getByText("better");
    expect(message).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});

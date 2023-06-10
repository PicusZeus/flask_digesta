import { render, screen } from "@testing-library/react";
import Confirmation from "./Confirmation";
import userEvent from "@testing-library/user-event";

describe("Confirmation", () => {
  test("renders correctly", async () => {
    const confirmationAction = jest.fn();
    const cancelAction = jest.fn();
    render(
      <Confirmation
        title="title"
        confirmAction={confirmationAction}
        cancelAction={cancelAction}
        message="message"
      />
    );
    const user = userEvent.setup();
    const title = screen.getByText("title");
    expect(title).toBeInTheDocument();
    const cancelButton = screen.getByRole("button", {
      name: "Anuluj",
    });
    await user.click(cancelButton);
    expect(cancelAction).toBeCalled();
    const confirmationButton = screen.getByRole("button", {
      name: "Potwierdzam",
    });
    await user.click(confirmationButton);
    expect(confirmationAction).toBeCalled();
  });
});

import { render, screen } from "../../../test-utils";
import RepliesViewer from "./RepliesViewer";
import userEvent from "@testing-library/user-event";
import tokenService from "../../services/token.service";
import { act } from "react-dom/test-utils";
import { queryClient } from "../../App";

jest.mock("../../services/token.service", () => {
  return {
    getUserId: jest.fn(),
    getLocalAccessToken: jest.fn(),
  };
});
describe("RepliesViewer loggedin", () => {
  beforeEach(() => {
    tokenService.getUserId.mockImplementation(() => {
      return "1";
    });
    tokenService.getLocalAccessToken.mockImplementation(() => {
      return "123";
    });
  });
  test("renders replies correctly", async () => {
    render(<RepliesViewer repliedId={1} />);

    const testReply = await screen.findByText("testComment12");
    expect(testReply).toBeInTheDocument();
  });
  test("triggers delete when delete button is clicked", async () => {
    render(<RepliesViewer repliedId={1} queryClient={queryClient} />);
    const user = userEvent.setup();
    const deleteButtons = await screen.findAllByRole("button", {
      name: /delete_forever/i,
    });
    await act(async () => {
      await user.click(deleteButtons[0]);
    });
    const deleteConfirmation = await screen.findByRole("button", {
      name: /potwierdzam/i,
    });
    await act(async () => {
      await user.click(deleteConfirmation);
    });
    const testReply = screen.queryByText("testComment12");
    expect(testReply).not.toBeInTheDocument();
  });
});

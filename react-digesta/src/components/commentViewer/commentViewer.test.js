import { render, screen } from "../../../test-utils";
import CommentViewer from "./CommentViewer";
import NotificationService from "../../services/notification.service";
import userEvent from "@testing-library/user-event";
import tokenService from "../../services/token.service";
import { act } from "react-dom/test-utils";
// Mock the dependencies used within the component
jest.mock("../../services/token.service", () => ({
  ...jest.requireActual("../../services/token.service"),
  getUserId: jest.fn(), // Mock the getUserId function
  getLocalAccessToken: jest.fn(),
}));

jest.mock("../../services/notification.service", () => {
  // Mock the NotificationService class
  return jest.fn().mockImplementation(() => ({
    setNotificationPending: jest.fn(),
    setNotificationSuccess: jest.fn(),
    setNotificationError: jest.fn(),
  }));
});

describe("CommentViewer", () => {
  beforeEach(() => {
    // Reset the mock implementations before each test
    jest.clearAllMocks();
  });

  const comment = {
    id: 1,
    likes: [{ user_id: 1236 }, { user_id: 5678 }],
    user: {
      id: 1234,
      username: "JohnDoe",
    },
    date: new Date(),
    comment: "Test comment",
    private: false,
  };

  const onDelete = jest.fn();

  test("renders the comment text", () => {
    render(<CommentViewer comment={comment} onDelete={onDelete} />);
    const commentText = screen.getByText("Test comment");
    expect(commentText).toBeInTheDocument();
  });

  test("displays correct like count", () => {
    render(<CommentViewer comment={comment} onDelete={onDelete} />);
    const likeCount = screen.getByText("2");
    expect(likeCount).toBeInTheDocument();
  });

  describe("user is logged in and comment belongs to him/her", () => {
    beforeEach(() => {
      tokenService.getUserId.mockImplementation(() => {
        return "1234";
      });
    });
    test("onDelete is active and can be called", async () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const user = userEvent.setup();
      const deleteButton = screen.getByRole("button", {
        name: /delete_forever/i,
      });
      await act(async () => {
        await user.click(deleteButton);
      });
      // opens confirmation modal
      const confirmationButton = await screen.findByText("Potwierdzam");
      expect(confirmationButton).toBeInTheDocument();
      await act(async () => {
        await user.click(confirmationButton);
      });

      expect(onDelete).toHaveBeenCalledWith(comment.id);
      expect(screen.queryByText("Potwierdzam")).not.toBeInTheDocument();
    });
    test("edit is active when logged in", async () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const user = userEvent.setup();
      const editButton = screen.getByRole("button", { name: /edit/i });
      const textArea = screen.getByRole("textbox");
      const saveButton = screen.getByRole("button", { name: /save/i });
      expect(textArea).toBeDisabled();
      expect(saveButton).toBeDisabled();
      expect(editButton).not.toBeDisabled();
      await act(async () => {
        await user.click(editButton);
      });
      expect(textArea).not.toBeDisabled();
      expect(saveButton).not.toBeDisabled();
    });
    test("able to reply", async () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const user = userEvent.setup();
      const replyButton = screen.getByRole("button", { name: /reply/i });
      expect(replyButton).not.toBeDisabled();
      await act(async () => {
        await user.click(replyButton);
      });
      const replyForm = await screen.findByPlaceholderText("Treść odpowiedzi");
      expect(replyForm).toBeInTheDocument();
    });

    test("able to like", async () => {
      tokenService.getLocalAccessToken.mockImplementation(() => {
        return "4321";
      });

      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const user = userEvent.setup();
      const likeButton = screen.getByRole("button", { name: /favorite/i });
      expect(likeButton).not.toBeDisabled();
      // there are 2 likes
      await act(async () => {
        await user.click(likeButton);
      });
      let likes = await screen.findByText("3");
      expect(likes).toBeInTheDocument();
      await act(async () => {
        await user.click(likeButton);
      });
      likes = await screen.findByText("2");
      expect(likes).toBeInTheDocument();
    });
  });

  describe("user is logged in and comment doesnt belong to him/her", () => {
    beforeEach(() => {
      tokenService.getUserId.mockImplementation(() => {
        return "1235";
      });
    });
    test("onDelete is inactive and cant be called", () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const deleteButton = screen.getByRole("button", {
        name: /delete_forever/i,
      });
      expect(deleteButton).toBeDisabled();
    });
    test("edit is inactive", () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const editButton = screen.getByRole("button", { name: /edit/i });
      const textArea = screen.getByRole("textbox");
      const saveButton = screen.getByRole("button", { name: /save/i });
      expect(textArea).toBeDisabled();
      expect(saveButton).toBeDisabled();
      expect(editButton).toBeDisabled();
    });
    test("other users are able to reply", async () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const user = userEvent.setup();
      const replyButton = screen.getByRole("button", { name: /reply/i });
      expect(replyButton).not.toBeDisabled();
      await act(async () => {
        await user.click(replyButton);
      });
      const replyForm = await screen.findByPlaceholderText("Treść odpowiedzi");
      expect(replyForm).toBeInTheDocument();
    });

    test("other users are able to like", async () => {
      tokenService.getLocalAccessToken.mockImplementation(() => {
        return "4321";
      });
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const user = userEvent.setup();
      const likeButton = screen.getByRole("button", { name: /favorite/i });
      expect(likeButton).not.toBeDisabled();
      // there are 2 likes
      await act(async () => {
        await user.click(likeButton);
      });
      let likes = await screen.findByText("3");
      const likedButton = screen.getByRole("button", { name: /heart_check/i });
      expect(likes).toBeInTheDocument();
      expect(likedButton).toBeInTheDocument();
      await act(async () => {
        await user.click(likeButton);
      });
      likes = await screen.findByText("2");
      expect(likes).toBeInTheDocument();
    });
  });

  describe("user is not logged in", () => {
    test("onDelete is inactive when logged out", async () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const user = userEvent.setup();
      const deleteButton = screen.getByRole("button", {
        name: /delete_forever/i,
      });
      expect(deleteButton).toBeDisabled();
      await act(async () => {
        await user.click(deleteButton);
      });
      expect(onDelete).not.toHaveBeenCalledWith(comment.id);
    });

    test("edit, save, like is inactive when logged out", () => {
      render(<CommentViewer comment={comment} onDelete={onDelete} />);
      const editButton = screen.getByRole("button", { name: /edit/i });
      expect(editButton).toBeDisabled();
      const saveButton = screen.getByRole("button", { name: /save/i });
      expect(saveButton).toBeDisabled();
      const likeButton = screen.getByRole("button", { name: /favorite/i });
      expect(likeButton).toBeDisabled();
    });
  });
});

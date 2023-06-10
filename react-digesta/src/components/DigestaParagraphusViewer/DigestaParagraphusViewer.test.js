import { render, screen } from "../../../test-utils";
import DigestaParagraphusViewer from "./DigestaParagraphusViewer";
import CommentsViewer from "../commentsViewer/CommentsViewer";

jest.mock("../commentsViewer/CommentsViewer", () => jest.fn());

describe("DigestaParagraphusViewer", () => {
  test("renders paragraphus text", () => {
    const paragraphus = {
      id: 1,
      key: "pr",
      text_lat: "Lorem ipsum dolor sit amet",
    };

    render(<DigestaParagraphusViewer paragraphus={paragraphus} />);

    const paragraphText = screen.getByText(/Lorem ipsum dolor sit amet/i);
    expect(paragraphText).toBeInTheDocument();
  });
  test("renders paragraphus key if available", () => {
    const paragraphus = {
      id: 1,
      key: "1",
      text_lat: "Lorem ipsum dolor sit amet",
    };

    render(<DigestaParagraphusViewer paragraphus={paragraphus} />);

    const paragraphKey = screen.getByText(/Paragraphus 1/i);
    expect(paragraphKey).toBeInTheDocument();
  });
  test("does not render paragraphus key if not available", () => {
    const paragraphus = {
      id: 1,
      key: "pr",
      text_lat: "Lorem ipsum dolor sit amet",
    };

    render(<DigestaParagraphusViewer paragraphus={paragraphus} />);

    const paragraphKey = screen.queryByText(/Paragraphus/i);
    expect(paragraphKey).toBeNull();
  });
  test("renders comments section with correct args", () => {
    const paragraphus = {
      id: 1,
      key: "pr",
      text_lat: "Lorem ipsum dolor sit amet",
    };
    const mockCommentsViewer = jest.fn();
    CommentsViewer.mockImplementation(mockCommentsViewer);

    render(<DigestaParagraphusViewer paragraphus={paragraphus} />);

    expect(mockCommentsViewer).toHaveBeenCalledWith(
      { paragraphus_id: 1, repliedId: null },
      {}
    );
  });
});

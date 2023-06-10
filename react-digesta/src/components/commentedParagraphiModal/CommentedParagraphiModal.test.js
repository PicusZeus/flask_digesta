import { render, screen } from "../../../test-utils";
import { useDispatch } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import CommentedParagraphiModal from "./CommentedParagraphiModal";
import tokenService from "../../services/token.service";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/token.service", () => ({
  ...jest.requireActual("../../services/token.service"),
  getCommentedParagraphi: jest.fn(),
}));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CommentedParagraphiModal", () => {
  beforeEach(() => {
    tokenService.getCommentedParagraphi.mockReturnValue([
      {
        id: 15,
        key: "3",
        lex: {
          id: 55,
          titulus: {
            book: {
              book_nr: 1,
            },
            number: 2,
          },
          lex_nr: 3,
        },
      },
    ]);
  });
  test("renders commented paragraphs correctly", async () => {
    const mockedDispatch = jest.fn();
    const mockedNavigate = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigate.mockReturnValue(mockedNavigate);

    render(
      <MemoryRouter>
        <CommentedParagraphiModal
          onClose={() => {}}
          onCloseMobileMenu={() => {}}
        />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const paragraphButton = screen.getByRole("button");
    await user.click(paragraphButton);

    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/digesta/55/15");
  });

  test("calls onClose and onCloseMobileMenu when button is clicked", async () => {
    const mockedDispatch = jest.fn();
    const mockedNavigate = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigate.mockReturnValue(mockedNavigate);
    const mockedOnClose = jest.fn();
    const mockedOnCloseMobileMenu = jest.fn();

    render(
      <CommentedParagraphiModal
        onClose={mockedOnClose}
        onCloseMobileMenu={mockedOnCloseMobileMenu}
      />
    );
    const user = userEvent.setup();
    const paragraphButton = screen.getByRole("button");

    await user.click(paragraphButton);
    const backdrop = screen.getByTestId("backdrop");
    await user.click(backdrop);

    expect(mockedOnClose).toHaveBeenCalledTimes(2);
    expect(mockedOnCloseMobileMenu).toHaveBeenCalledTimes(1);
  });
});

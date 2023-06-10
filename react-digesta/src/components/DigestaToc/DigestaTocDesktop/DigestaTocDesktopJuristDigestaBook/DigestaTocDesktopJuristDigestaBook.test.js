import { render, screen } from "../../../../../test-utils";
import DigestaTocDesktopJuristDigestaBook from "./DigestaTocDesktopJuristDigestaBook";

import { useDispatch, useSelector } from "react-redux";
import { useDispatch as actualUseDispatch } from "react-redux";
import { useSelector as actualUseSelector } from "react-redux";
import { digestaActions } from "../../../../store/digesta-slice";
import { useQuery } from "@tanstack/react-query";
import DigestaTocDesktopJuristDigestaTitulus from "../DigestaTocDesktopJuristDigestaTitulus/DigestaTocDesktopJuristDigestaTitulus";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { act } from "@testing-library/react";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock(
  "../DigestaTocDesktopJuristDigestaTitulus/DigestaTocDesktopJuristDigestaTitulus",
  () => jest.fn()
);

describe("DigestaTocDesktopJuristDigestaBook", () => {
  const book = { id: 1, book_nr: 1 };
  const author_id = 1;
  beforeEach(() => {
    useSelector.mockImplementation(() => jest.fn());
    useDispatch.mockImplementation(() => jest.fn());
  });

  test("renders the component with closed book", async () => {
    useSelector.mockReturnValueOnce(null);
    useDispatch.mockImplementation(() => jest.fn());
    const titulusMock = jest.fn();
    DigestaTocDesktopJuristDigestaTitulus.mockImplementation(titulusMock);

    render(
      <DigestaTocDesktopJuristDigestaBook book={book} author_id={author_id} />
    );
    const liber = await screen.findByText("Liber 1");
    expect(liber).toBeInTheDocument();
    expect(titulusMock).not.toHaveBeenCalled();
  });

  test("renders the component with open book", async () => {
    useSelector.mockReturnValue(1);
    useDispatch.mockImplementation(() => jest.fn());
    const titulusMock = jest.fn();
    DigestaTocDesktopJuristDigestaTitulus.mockImplementation(titulusMock);

    render(
      <DigestaTocDesktopJuristDigestaBook book={book} author_id={author_id} />
    );
    const liber = await screen.findByText("Liber 1");
    expect(liber).toBeInTheDocument();
    expect(titulusMock).toHaveBeenCalled();
  });

  test("triggers openBookHandler on button click", async () => {
    const newRedux = jest.requireActual("react-redux");
    useSelector.mockImplementation(newRedux.useSelector);
    useDispatch.mockImplementation(newRedux.useDispatch);
    const titulusMock = jest.fn();
    DigestaTocDesktopJuristDigestaTitulus.mockImplementation(titulusMock);

    render(
      <MemoryRouter>
        <DigestaTocDesktopJuristDigestaBook book={book} author_id={author_id} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const button = await screen.findByRole("button");
    await act(async () => {
      await user.click(button);
    });

    expect(titulusMock).toHaveBeenCalled();
    titulusMock.mockClear();
    await act(async () => {
      await user.click(button);
    });
    expect(titulusMock).not.toHaveBeenCalled();
  });

  test("renders the spinner while fetching data", () => {
    render(
      <DigestaTocDesktopJuristDigestaBook book={book} author_id={author_id} />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});

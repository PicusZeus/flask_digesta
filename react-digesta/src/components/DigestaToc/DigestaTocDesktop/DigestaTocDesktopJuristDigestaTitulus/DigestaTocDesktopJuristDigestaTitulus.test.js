import { render, screen } from "../../../../../test-utils";
import { useDispatch, useSelector } from "react-redux";
import DigestaTocDesktopJuristDigestaTitulus from "./DigestaTocDesktopJuristDigestaTitulus";
import { MemoryRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { digestaActions } from "../../../../store/digesta-slice";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("DigestaTocDesktopJuristDigestaTitulus", () => {
  const titulus = {
    id: 1,
    number: "I",
    title_lat: "Title Latin",
  };

  const author_id = 1;

  test("renders the component with titulus details", async () => {
    render(
      <MemoryRouter>
        <DigestaTocDesktopJuristDigestaTitulus
          titulus={titulus}
          author_id={author_id}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Titulus I")).toBeInTheDocument();
      expect(screen.getByText("Title Latin")).toBeInTheDocument();
    });
  });

  test("dispatches setChosenTitulusId when the button is clicked", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue(5);
    render(
      <MemoryRouter>
        <DigestaTocDesktopJuristDigestaTitulus
          titulus={titulus}
          author_id={author_id}
        />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const but = await screen.findByRole("button");
    expect(but).toBeInTheDocument();
    await user.click(but);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      digestaActions.setChosenTitulusId(titulus.id)
    );
  });

  test("renders the component with leges when chosenTitulusId matches titulus.id", async () => {
    // useSelector.mockReturnValue(1);
    useSelector.mockImplementation(() => {
      return 1;
    });

    render(
      <MemoryRouter>
        <DigestaTocDesktopJuristDigestaTitulus
          titulus={titulus}
          author_id={author_id}
        />
      </MemoryRouter>
    );

    const l1 = await screen.findByText("Lex 1");
    const l2 = await screen.findByText("Lex 2");
    expect(l1).toBeInTheDocument();
    expect(l2).toBeInTheDocument();
  });

  test("renders a Spinner when isFetching is true", () => {
    render(
      <DigestaTocDesktopJuristDigestaTitulus
        titulus={titulus}
        author_id={author_id}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});

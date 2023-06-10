import { render, screen } from "../../../../../test-utils";
import { useDispatch, useSelector } from "react-redux";
import DigestaTocMobileJuristDigestaBooks from "./DigestaTocMobileJuristDigestaBooks";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { digestaActions } from "../../../../store/digesta-slice";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("DigestaTocMobileJuristDigestaBooks", () => {
  test("renders the component with options", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValueOnce(2); // chosenBookId

    render(
      <DigestaTocMobileJuristDigestaBooks
        books={[
          { id: 1, book_latin_name: "Book 1" },
          { id: 2, book_latin_name: "Book 2" },
        ]}
        author_id={1}
      />
    );

    // Verify that the component is rendered
    expect(screen.getByRole("option", { name: "Book 1" })).toBeInTheDocument();
    expect(screen.getAllByRole("option", { name: "Book 2" })).toHaveLength(2);
  });

  test("calls the dispatch function on option change", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValueOnce(2); // chosenBookId

    render(
      <DigestaTocMobileJuristDigestaBooks
        books={[
          { id: 1, book_latin_name: "Book 1" },
          { id: 2, book_latin_name: "Book 2" },
        ]}
        author_id={1}
      />
    );
    const user = userEvent.setup();
    // Change the option
    const select = screen.getByRole("combobox");
    await act(async () => {
      await user.selectOptions(select, "2");
    });

    // Verify that the dispatch function is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(
      digestaActions.setChosenBookId(2)
    );

    const tituliToc = await screen.findByText("Wybierz Tytuł");
    expect(tituliToc).toBeInTheDocument();
  });
});

import { render, screen } from "../../../../../test-utils";
import { useDispatch, useSelector } from "react-redux";
import DigestaTocMobileOpera from "./DigestaTocMobileOpera";
import { MemoryRouter } from "react-router-dom";
import { getByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

// Mock the useDispatch and useSelector hooks
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("DigestaTocMobileOpera", () => {
  const opera = [
    { id: 1, title_lat: "Opus 1", author: { name: "Author 1" } },
    { id: 2, title_lat: "Opus 2", author: { name: "Author 2" } },
  ];
  const lexPath = "example/path";

  test("renders the component with opera options", () => {
    useSelector.mockReturnValueOnce(undefined); // Mock initial useSelector return value
    render(
      <MemoryRouter>
        <DigestaTocMobileOpera opera={opera} lexPath={lexPath} />
      </MemoryRouter>
    );

    const chooseOperaLabel = screen.getByText("Wybierz dzieło");
    const operaOption1 = screen.getByRole("option", {
      name: /Opus 1/i,
    });
    const operaOption2 = screen.getByRole("option", {
      name: /Opus 2/i,
    });
    expect(chooseOperaLabel).toBeInTheDocument();
    expect(operaOption1).toBeInTheDocument();
    expect(operaOption2).toBeInTheDocument();
  });

  test("dispatches setChosenOpusId action on opera selection", async () => {
    useSelector.mockReturnValueOnce(1); // Mock useSelector return value after opera selection
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(<DigestaTocMobileOpera opera={opera} lexPath={lexPath} />);
    const user = userEvent.setup();

    const options = screen.getAllByRole("combobox");
    await act(async () => {
      await user.selectOptions(options[0], "1");
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "digesta/setChosenOpusId",
        payload: expect.any(Number),
      })
    );
  });

  test("renders DigestaTocMobileOpus component when an opera is chosen", async () => {
    useSelector.mockReturnValueOnce(1); // Mock useSelector return value after opera selection
    useDispatch.mockReturnValue(jest.fn());

    render(
      <MemoryRouter>
        <DigestaTocMobileOpera opera={opera} lexPath={lexPath} />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const options = screen.getAllByRole("combobox");
    await act(async () => {
      await user.selectOptions(options[0], "1");
    });

    const chooseBookLabel = await screen.findByText("Wybierz księgę");

    expect(chooseBookLabel).toBeInTheDocument();
  });
});

import { render, screen } from "../../../../test-utils";
import { useDispatch } from "react-redux";
import Login from "./Login";
import userEvent from "@testing-library/user-event";
import { loggingIn } from "../../../store/auth-actions";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../../store/auth-actions", () => ({
  ...jest.requireActual("../../../store/auth-actions"),
  loggingIn: jest.fn(),
}));

describe("Login Component", () => {
  test("renders the login form", () => {
    render(<Login onClose={() => {}} />);

    // Check if the username and password inputs are rendered
    const usernameInput = screen.getByLabelText("Podaj nazwę użytkownika");
    const passwordInput = screen.getByLabelText("Podaj hasło");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByText("Prześlij");
    expect(submitButton).toBeInTheDocument();
  });

  test("dispatches login action on form submit", async () => {
    const mockDispatch = jest.fn(); // Mock the dispatch function
    useDispatch.mockImplementation(() => mockDispatch);

    render(<Login onClose={() => {}} />);
    const user = userEvent.setup();
    // Enter values in the username and password inputs
    const usernameInput = screen.getByLabelText("Podaj nazwę użytkownika");
    const passwordInput = screen.getByLabelText("Podaj hasło");
    await user.type(usernameInput, "testUser");
    await user.type(passwordInput, "testPassword");

    // Submit the form
    const submitButton = screen.getByText("Prześlij");
    await user.click(submitButton);

    // Check if the loggingIn action is dispatched with the correct values
    expect(mockDispatch).toHaveBeenCalledWith(
      loggingIn("testUser", "testPassword")
    );
  });
  test("fires close on clicking close button or backdrop", async () => {
    const onCloseMock = jest.fn();
    render(<Login onClose={onCloseMock} />);
    const user = userEvent.setup();
    const closeButton = screen.getByRole("button", { name: "Zamknij" });
    const backdrop = screen.getByTestId("backdrop");
    await user.click(closeButton);
    await user.click(backdrop);

    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });

  // Add more tests as needed
});

import {render, screen} from "../../../../test-utils"
import Register from "./Register";
import {register} from "../../../store/auth-actions";
import userEvent from "@testing-library/user-event";
import {useDispatch} from "react-redux";
import {act} from "react-dom/test-utils";
import classes from "./Register.module.css";

jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn()
}))

jest.mock("../../../store/auth-actions", () => ({
    ...jest.requireActual("../../../store/auth-actions"),
    register: jest.fn()
}))

describe("Register Component", () => {


    test("renders the register form", () => {
        render(
            <Register onClose={() => {
            }}/>
        );

        // Check if the username, email, password, and password_2 inputs are rendered
        const usernameInput = screen.getByLabelText("Nazwa użytkownika");
        const emailInput = screen.getByLabelText("Twój adres email");
        const passwordInput = screen.getByLabelText("Stwórz hasło (min. 8 znaków)");
        const password2Input = screen.getByLabelText("Powtórz hasło");
        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(password2Input).toBeInTheDocument();

        // Check if the submit button is rendered
        const submitButton = screen.getByText("Prześlij");
        expect(submitButton).toBeInTheDocument();
    });

    test("dispatches registeringToggle action on close button click or on backdrop click", async () => {
        const onCloseMock = jest.fn()

        render(
            <Register onClose={onCloseMock}/>
        );
        const user = userEvent.setup()
        const closeButton = screen.getByRole('button', {name: "Zamknij"})
        const backdrop = screen.getByTestId('backdrop')
        await user.click(closeButton)
        await user.click(backdrop)
        // Click the close button

        expect(onCloseMock).toHaveBeenCalledTimes(2)

    });

    test("dispatches register action on form submit with valid data", async () => {
        const mockDispatch = jest.fn()
        useDispatch.mockImplementation(() => mockDispatch)

        render(
            <Register onClose={() => {
            }}/>
        );
        const user = userEvent.setup()

        // Enter values in the inputs
        const usernameInput = screen.getByLabelText("Nazwa użytkownika");
        const emailInput = screen.getByLabelText("Twój adres email");
        const passwordInput = screen.getByLabelText("Stwórz hasło (min. 8 znaków)");
        const password2Input = screen.getByLabelText("Powtórz hasło");
        await act(async () => {
            await user.type(usernameInput, 'testUser')
        })
        await act(async () => {
            await user.type(emailInput, "test@example.com")
        })
        await act(async () => {

            await user.type(passwordInput, "testPassword")
        })
        await act(async () => {
            await user.type(password2Input, "testPassword")
        })


        // Submit the form
        const submitButton = screen.getByText("Prześlij");
        await user.click(submitButton);

        // Check if the register action is dispatched with the correct values
        expect(mockDispatch).toHaveBeenCalledWith(register("testUser", "testPassword", "test@example.com"))

    });
    test("If not valid data, submit button inactive", async () => {
        const mockDispatch = jest.fn()
        useDispatch.mockImplementation(() => mockDispatch)

        render(
            <Register onClose={() => {
            }}/>
        );
        const user = userEvent.setup()

        // Enter values in the inputs
        const usernameInput = screen.getByLabelText("Nazwa użytkownika");
        const emailInput = screen.getByLabelText("Twój adres email");
        const passwordInput = screen.getByLabelText("Stwórz hasło (min. 8 znaków)");
        const password2Input = screen.getByLabelText("Powtórz hasło");

        const submitButton = screen.getByText("Prześlij");

        await act(async () => {
            await user.type(usernameInput, 'testUser')
        })
        await act(async () => {
            await user.type(emailInput, "testexample.com")
        })
        expect(emailInput).toHaveClass(classes.error)

        expect(submitButton).toBeDisabled()

        await act(async () => {
            await user.clear(emailInput)
        })
        await act(async () => {
            await user.type(emailInput, "test@example.com")
        })
        expect(emailInput).not.toHaveClass(classes.error)
        await act(async () => {

            await user.type(passwordInput, "testPassword")
        })
        await act(async () => {
            await user.type(password2Input, "testPasswor")
        })

        expect(passwordInput).toHaveClass(classes.error)
        expect(password2Input).toHaveClass(classes.error)
        expect(submitButton).toHaveClass(classes.button_inactive)
        expect(submitButton).toBeDisabled()
        await act(async () => {
            await user.type(password2Input, "d")
        })
        expect(passwordInput).not.toHaveClass(classes.error)
        expect(password2Input).not.toHaveClass(classes.error)
        expect(submitButton).not.toHaveClass(classes.button_inactive)
        expect(submitButton).not.toBeDisabled()

        // Submit the form


    });

    // Add more tests as needed
});

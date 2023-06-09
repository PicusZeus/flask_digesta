import {render, screen} from "../../../test-utils"
import {MemoryRouter, useRouteError} from "react-router-dom";
import ErrorPage from "./ErrorPage";

// Mocking the useRouteError hook
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useRouteError: jest.fn(),
}));

describe("ErrorPage", () => {
    beforeEach(() => {
        // Reset the mock before each test
        useRouteError.mockReset();
    });

    test("renders error message and code when error data is available", () => {
        const errorData = {
            status: 404,
            data: {
                message: "Page not found",
            },
        };
        useRouteError.mockReturnValueOnce(errorData);

        render(<MemoryRouter>
            <ErrorPage/>
        </MemoryRouter>);

        const errorMessage = screen.getByText(/Coś poszło nie tak/i);
        const message = screen.getByText(/Page not found/i);
        const errorCode = screen.getByText(/Kod błędu 404/i);

        expect(errorMessage).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(errorCode).toBeInTheDocument();
    });

    test("renders error message and code when error data is not available", () => {
        const errorData = {
            status: 500,
        };
        useRouteError.mockReturnValueOnce(errorData);

          render(<MemoryRouter>
            <ErrorPage/>
        </MemoryRouter>);

        const errorMessage = screen.getByText(/Coś poszło nie tak/i);
        const errorCode = screen.getByText(/Kod błędu 500/i);

        expect(errorMessage).toBeInTheDocument();
        expect(errorCode).toBeInTheDocument();
    });
});
